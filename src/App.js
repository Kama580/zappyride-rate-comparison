import React from "react";
import rateFunctions from "./rates";
import Chart from "./chart";
import Suggestion from "./suggestion";

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
			currentRate: "Flat $0.15/kWh",
			milesPerYear: 10000,
			chosenTimeWindow: "Between noon and 6pm",
			bestPlan: {},
			B2: [],
			B1: [],
			billImpact: [],
			currentAnnualCost: 0,
			newAnnualCost: 0,
		};
		this.handleUserInput = this.handleUserInput.bind(this);
	}
	componentDidMount() {
		const B1 = this.createB1();
		const billImpact = this.createBillImpact();
		const B2 = this.createB2(B1, billImpact);
		this.setState({ B1, B2, billImpact });
	}
	componentDidUpdate(_, prevState) {
		if (
			prevState.currentRate !== this.state.currentRate ||
			prevState.milesPerYear !== this.state.milesPerYear ||
			prevState.chosenTimeWindow !== this.state.chosenTimeWindow
		) {
			const newBillImpact = this.createBillImpact();
			const newB2 = this.createB2(this.state.B1, newBillImpact);
			const currentAnnualCost = this.state.B1.filter((x) => {
				return x.name === this.state.currentRate;
			})[0].cost;
			const newAnnualCost = newB2.filter((x) => {
				return x.name === this.state.currentRate;
			})[0].cost;
			console.log("line 60 annualcost", newAnnualCost);
			const allB2Costs = newB2.map((rate) => {
				return rate.cost;
			});
			const bestPlanRate = Math.min(...allB2Costs);
			const bestPlan = newB2.filter((rate) => {
				return rate.cost === bestPlanRate;
			})[0];
			this.setState({
				currentAnnualCost,
				newAnnualCost,
				billImpact: newBillImpact,
				B2: newB2,
				loaded: true,
				bestPlan,
			});
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
				<div className="header"></div>
				<div className="main-content">
					<div className="main-container">
						<form className="left-section">
							<p>
								<label htmlFor="currentRate">
									Which rate are you currently on?
								</label>
								<p>
									<select name="currentRate" onChange={this.handleUserInput}>
										{ratesArray.map((rate, idx) => (
											<option key={idx}>{rate}</option>
										))}
									</select>
								</p>
							</p>
							<p>
								<label htmlFor="milesPerYear">
									How many miles will you be driving per year?
								</label>
								<p>
									<input
										type="text"
										name="milesPerYear"
										onChange={this.handleUserInput}
										value={this.state.milesPerYear}
									/>
								</p>
							</p>
							<p>
								<label htmlFor="chosenTimeWindow">
									What hours of the day do you plan to charging your EV?
								</label>
								<p>
									<select
										name="chosenTimeWindow"
										onChange={this.handleUserInput}
									>
										{timesOfDayOptionsArray.map((time, idx) => (
											<option key={idx}>{time}</option>
										))}
									</select>
								</p>
							</p>
						</form>
						<div className="right-section">
							{this.state.loaded && (
								<div className="results">
									<Suggestion
										currentAnnualCost={this.state.currentAnnualCost}
										newAnnualCost={this.state.newAnnualCost}
										bestPlan={this.state.bestPlan}
										currentPlan={
											this.state.B2.filter((rate) => {
												return rate.name === this.state.currentRate;
											})[0]
										}
									/>
									<Chart
										ratesArray={ratesArray}
										B1={this.state.B1}
										billImpact={this.state.billImpact}
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
