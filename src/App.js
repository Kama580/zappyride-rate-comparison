import "./App.css";
import React from "react";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
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
