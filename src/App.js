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

const nonEVloadProfiles = {
	flat: 9003.714027,
	TOU: 10000,
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
			rates: ["flat", "TOU"],
			currentRate: "flat",
			milesPerYear: 10000,
			chosenTimeWindow: "Between noon and 6pm",
			bestPlan: "",
			LPData: [],
			EVData: [],
		};
		this.handleUserInput = this.handleUserInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount() {
		const LPData = this.createLPData(this.state.rates, nonEVloadProfiles);
		const EVData = this.createEVData();
		// const EVData = this.createEVDate();
		// console.log("ev data:", EVData);
		this.setState({ LPData: LPData, EVData: EVData, loaded: true });
	}
	componentDidUpdate(_, prevState) {
		// const newEVData = this.createEVData();
		// this.setState({ EVData: newEVData });
		if (
			prevState.currentRate !== this.state.currentRate ||
			prevState.milesPerYear !== this.state.milesPerYear ||
			prevState.chosenTimeWindow !== this.state.chosenTimeWindow
		) {
			const newEVData = this.createEVData();
			this.setState({ EVData: newEVData });
		}
		console.log("prev_state:", prevState);
		console.log("this state:", this.state);
	}

	handleUserInput(event) {
		// event.preventDefault();
		this.setState({
			[event.target.name]: event.target.value,
		});
		// console.log("this is the state after user input:", this.state);
	}

	handleSubmit(event) {
		event.preventDefault();
		try {
			console.log("this:", this);
			const newEVData = this.createEVData();
			this.setState({ EVData: newEVData });
		} catch (error) {
			console.log(error);
		}
	}

	createLPData(rates, LPs) {
		const LPData = rates.map((rate) => ({ rate: rate, LP: LPs[rate] }));
		return LPData;
	}

	createEVData() {
		const EVData = this.state.rates.map((rate) => ({
			rate: rate,
			EV: rateFunctions[rate](
				this.state.milesPerYear * 0.3,
				timesOfDayOptions[this.state.chosenTimeWindow]
			),
		}));
		return EVData;
	}

	render() {
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
							{this.state.rates.map((rate, idx) => (
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
							<VictoryAxis tickValues={this.state.rates} />
							<VictoryAxis dependentAxis tickFormat={(x) => `$${x}/year`} />
							<VictoryStack>
								<VictoryBar data={this.state.LPData} x="rate" y="LP" />
								<VictoryBar data={this.state.EVData} x="rate" y="EV" />
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
