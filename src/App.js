import "./App.css";
import React from "react";
import { flatRate, TOUrate } from "./rates";
import Chart from "./chart";
import {
	VictoryBar,
	VictoryChart,
	VictoryAxis,
	VictoryTheme,
	VictoryStack,
} from "victory";

const loadProfiles = {
	flat: 9003.714027,
	TOU: 10000,
	//TOU number not calculated!
};

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			loaded: false,
			rates: ["flat", "TOU"],
			timesOfDay: {
				"Between noon and 6pm": "high",
				"After 6pm and before noon": "low",
			},
			currentRate: "flat",
			milesPerYear: 10000,
			chargeTimeWindow: "Between noon and 6pm",
			bestPlan: "",
			LPData: [],
			EVData: [],
		};
		this.handleUserInput = this.handleUserInput.bind(this);
	}
	componentDidMount() {
		const LPData = this.createLPData(this.state.rates, loadProfiles);
		this.setState({ LPData: LPData, loaded: true });
	}
	componentDidUpdate() {
		console.log("state:", this.state);
	}

	handleUserInput(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	createLPData(rates, LPs) {
		const LPData = rates.map((rate) => ({ rate: rate, LP: LPs[rate] }));
		console.log(LPData);
		return LPData;
	}

	render() {
		const timesOfDayOptions = Object.keys(this.state.timesOfDay);
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
						<label htmlFor="chargeTimeWindow">
							What time of the day do you plan to charge the EV?
						</label>
					</p>
					<select name="chargeTimeWindow" onChange={this.handleUserInput}>
						{timesOfDayOptions.map((time, idx) => (
							<option key={idx}>{time}</option>
						))}
					</select>
				</form>
				{this.state.loaded && (
					<div className="chart">
						<VictoryChart domainPadding={40} width={500} height={600}>
							<VictoryAxis tickValues={this.state.rates} />
							<VictoryAxis dependentAxis tickFormat={(x) => `$${x}/year`} />
							<VictoryStack>
								<VictoryBar data={this.state.LPData} x="rate" y="LP" />
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
