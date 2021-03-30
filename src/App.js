import "./App.css";
import React from "react";
import rateFunctions from "./rates";
import Chart from "./chart";
import {
	VictoryBar,
	VictoryChart,
	VictoryAxis,
	VictoryTheme,
	VictoryStack,
} from "victory";

const allRates = [
	{ name: "Flat $0.15/kWh", calculation: rateFunctions.flat },
	{ name: "TOU noon to 6pm", calculation: rateFunctions.TOU },
];

const nonEVloadProfiles = {
	"Flat $0.15/kWh": 9003.714027,
	"TOU noon to 6pm": 10000,
	//TOU number not calculated!
};

const timesOfDayOptions = {
	"Between noon and 6pm": "high",
	"After 6pm and before noon": "low",
};

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			loaded: false,
			currentRate: "flat",
			milesPerYear: 10000,
			chosenTimeWindow: "Between noon and 6pm",
			bestPlan: "",
			B2: [],
			impact: 0,
			B1: [],
			billImpact: [],
		};
		this.handleUserInput = this.handleUserInput.bind(this);
	}
	componentDidMount() {
		const B1 = this.createB1();
		const billImpact = this.createBillImpact();
		// const B2 = B1.map((rate) => ({
		// 	name: rate.name,
		// 	cost:
		// 		rate.cost +
		// 		billImpact.filter((x) => {
		// 			return x.name === rate.name;
		// 		})[0].cost,
		// }));
		const B2 = this.createB2(B1, billImpact);
		// 	for (let i = 0; i < B1; i++) {
		// 		B2["name"] = billImpact[i].name;
		// 		B2["cost"] = billImpact[i].cost + B1[i].cost;
		// 	}
		console.log("B2", B2);
		this.setState({ B1, B2, billImpact, loaded: true });
	}
	componentDidUpdate(_, prevState) {
		if (
			prevState.currentRate !== this.state.currentRate ||
			prevState.milesPerYear !== this.state.milesPerYear ||
			prevState.chosenTimeWindow !== this.state.chosenTimeWindow
		) {
			const newBillImpact = this.createBillImpact();
			const newB2 = this.createB2(this.state.B1, newBillImpact);
			// const newB2 = {};
			const EVLP = [...this.state.billImpact, ...this.state.B1];
			// const newB22 = EVLP.reduce(function(,b){
			// })
			//this has to be refactored to reduce method because I can't know it's adding the same things!!
			// for (let i = 0; i < this.state.B1.length; i++) {
			// 	newB2["name"] = this.state.billImpact[i].name;
			// 	newB2["cost"] = this.state.billImpact[i].cost + this.state.B1[i].cost;
			// }
			// const newB2 = allRates.reduce((acc, curr) => {
			// 	return acc + curr;
			// });
			this.setState({ billImpact: newBillImpact, B2: newB2 });
		}
	}

	handleUserInput(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	createB1() {
		const B1 = allRates.map((rate) => ({
			name: rate.name,
			cost: nonEVloadProfiles[rate.name],
		}));
		return B1;
	}

	createBillImpact() {
		const billImpact = allRates.map((rate) => ({
			name: rate.name,
			cost: rate.calculation(
				this.state.milesPerYear * 0.3,
				timesOfDayOptions[this.state.chosenTimeWindow]
			),
		}));
		return billImpact;
	}

	createB2(B1, billImpact) {
		const B2 = B1.map((rate) => ({
			name: rate.name,
			cost:
				rate.cost +
				billImpact.filter((x) => {
					return x.name === rate.name;
				})[0].cost,
		}));
		return B2;
	}

	render() {
		const ratesArray = allRates.map((rate) => {
			return rate.name;
		});
		const timesOfDayOptionsArray = Object.keys(timesOfDayOptions);
		return (
			<div className="App">
				<form>
					form
					<p>
						<label htmlFor="currentRate">
							What is your current electricity rate?
						</label>
						<select name="currentRate" onChange={this.handleUserInput}>
							{ratesArray.map((rate, idx) => (
								<option key={idx}>{rate}</option>
							))}
						</select>
					</p>
					<p>
						<label htmlFor="milesPerYear">
							How many miles will you be driving per year?
						</label>
						<input
							type="text"
							name="milesPerYear"
							onChange={this.handleUserInput}
							value={this.state.milesPerYear}
						/>
					</p>
					<p>
						<label htmlFor="chosenTimeWindow">
							What time of the day do you plan to charge the EV?
						</label>
					</p>
					<select name="chosenTimeWindow" onChange={this.handleUserInput}>
						{timesOfDayOptionsArray.map((time, idx) => (
							<option key={idx}>{time}</option>
						))}
					</select>
					<button type="submit">Calculate</button>
				</form>
				{this.state.loaded && (
					<div className="chart">
						<VictoryChart
							domainPadding={40}
							width={500}
							height={600}
							theme={VictoryTheme.material}
						>
							<VictoryAxis tickValues={ratesArray} />
							<VictoryAxis dependentAxis tickFormat={(x) => `$${x}/year`} />
							<VictoryStack>
								<VictoryBar data={this.state.B1} x="name" y="cost" />
								<VictoryBar data={this.state.billImpact} x="name" y="cost" />
							</VictoryStack>
						</VictoryChart>
					</div>
				)}
				<div className="suggestion">suggestion</div>
			</div>
		);
	}
}

export default App;
