import "./App.css";
import React from "react";
import { flatRate, TOUrate } from "./rates";

const loadProfile = {
	flatRate: 9003.714027,
	TOU: 10000,
	//TOU number not calculated!
};

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			rates: ["flat", "TOU"],
			timesOfDay: {
				"Between noon and 6pm": "high",
				"After 6pm and before noon": "low",
			},
			currentRate: "flat",
			milesPerYear: 10000,
			chargeTimeWindow: "",
			bestPlan: "",
		};
		// this.setCurrentRate = this.setCurrentRate.bind(this);
		// this.setMilesPerYear = this.setMilesPerYear.bind(this);
		this.handleUserInput = this.handleUserInput.bind(this);
	}
	componentDidUpdate() {
		console.log("state:", this.state);
	}
	// setCurrentRate(rate) {
	// 	this.setState({
	// 		currentRate: rate,
	// 	});
	// }

	handleUserInput(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	render() {
		return (
			<div className="App">
				<form>
					form
					<label htmlFor="currentRate">
						What is your current electricity rate?
					</label>
					<select name="currentRate" onChange={this.handleUserInput}>
						{this.state.rates.map((rate, idx) => (
							<option key={idx}>{rate}</option>
						))}
					</select>
					<label htmlFor="milesPerYear">
						How many miles will you be driving per year?
					</label>
					<input
						type="text"
						name="milesPerYear"
						onChange={this.handleUserInput}
						value={this.state.milesPerYear}
					/>
				</form>
				<div className="chart">chart</div>
				<div className="suggestion">suggestion</div>
			</div>
		);
	}
}

//which rate they are currently on - dropdown
//how many miles the user will drive per year - slider
//what hours of the day they plan to charge - dropdown

export default App;
