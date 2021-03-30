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
			LPData: [],
			EVData: [],
		};
		this.handleUserInput = this.handleUserInput.bind(this);
	}
	componentDidMount() {
		const LPData = this.createLPData();
		console.log("LPData,", LPData);
		const EVData = this.createEVData();
		this.setState({ LPData: LPData, EVData: EVData, loaded: true });
	}
	componentDidUpdate(_, prevState) {
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
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	createLPData() {
		const LPData = allRates.map((rate) => ({
			rate: rate.name,
			LP: nonEVloadProfiles[rate.name],
		}));
		return LPData;
	}

	createEVData() {
		const EVData = allRates.map((rate) => ({
			rate: rate.name,
			EV: rate.calculation(
				this.state.milesPerYear * 0.3,
				timesOfDayOptions[this.state.chosenTimeWindow]
			),
		}));
		return EVData;
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
