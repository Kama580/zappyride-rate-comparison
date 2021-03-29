import "./App.css";
import React from "react";
import { flatRate, TOUrate } from "./rates";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			rates: ["flat", "TOU"],
			timesOfDay: { "12to18": "high", "18to12": "low" },
			loadProfile: 9003.714027,
			currentRate: "",
			milesPerYear: 0,
			chargeTimeWindow: "",
			bestPlan: "",
		};
	}

	render() {
		return (
			<div className="App">
				<div className="form">form</div>
				<div className="chart">chart</div>
				<div className="suggestion">suggestion</div>
			</div>
		);
	}
}

export default App;
