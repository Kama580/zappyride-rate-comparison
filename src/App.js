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
			timesOfDay: { "12to18": "high", "18to12": "low" },
			currentRate: "",
			milesPerYear: 0,
			chargeTimeWindow: "",
			bestPlan: "",
		};
		this.setCurrentRate = this.setCurrentRate.bind(this);
	}

	setCurrentRate(rate) {
		this.setState({
			currentRate: rate,
		});
	}

	render() {
		return (
			<div className="App">
				<div className="form">
					form
					<form>
						<label htmlFor="currentRate">Your current plan</label>
						<select
							name="currentRate"
							onChange={(event) => {
								this.setCurrentRate(event.target.value);
							}}
						>
							{this.state.rates.map((rate, idx) => (
								<option key={idx}>{rate}</option>
							))}
						</select>
					</form>
				</div>
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
