import React from "react";
import rateFunctions from "./rates";
import Chart from "./chart";
import Suggestion from "./suggestion";

const allRates = [
	{
		name: "Flat $0.15/kWh",
		calculation: rateFunctions.flat,
		homeLoadProfile: [{ demand: null, kWh: 9003.714027 }],
	},
	{
		name: "TOU noon to 6pm",
		calculation: rateFunctions.TOU,
		homeLoadProfile: [
			{ demand: "low", kWh: 6937.45295489197 },
			{ demand: "high", kWh: 2066.26107208001 },
		],
	},
];

const timesOfDayOptions = {
	"Between noon and 6pm": "high",
	"After 6pm and before noon": "low",
};

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			currentRate: "Flat $0.15/kWh",
			milesPerYear: 10000,
			chosenTimeWindow: "Between noon and 6pm",
			bestPlan: {},
			B2: [],
			B1: [],
			billImpact: [],
			nonEVAnnualCost: 0,
			includingEVAnnualCost: 0,
		};
		this.handleUserInput = this.handleUserInput.bind(this);
		this.createBillImpact = this.createBillImpact.bind(this);
	}
	componentDidMount() {
		const B1 = this.createB1();
		const billImpact = this.createBillImpact();
		const B2 = this.createB2(B1, billImpact);
		const nonEVAnnualCost = B1.find(
			(element) => element.name === this.state.currentRate
		).cost;
		const includingEVAnnualCost = B2.find(
			(element) => element.name === this.state.currentRate
		).cost;
		const allB2Costs = B2.map((rate) => {
			return rate.cost;
		});
		const bestPlanRate = Math.min(...allB2Costs);
		const bestPlan = B2.find((rate) => rate.cost === bestPlanRate);
		this.setState({
			B1,
			B2,
			billImpact,
			nonEVAnnualCost,
			includingEVAnnualCost,
			bestPlan,
		});
	}
	componentDidUpdate(_, prevState) {
		if (
			prevState.currentRate !== this.state.currentRate ||
			prevState.milesPerYear !== this.state.milesPerYear ||
			prevState.chosenTimeWindow !== this.state.chosenTimeWindow
		) {
			const billImpact = this.createBillImpact();
			const newB2 = this.createB2(this.state.B1, billImpact);
			const nonEVAnnualCost = this.state.B1.find(
				(element) => element.name === this.state.currentRate
			).cost;
			const includingEVAnnualCost = newB2.find(
				(element) => element.name === this.state.currentRate
			).cost;
			const allB2Costs = newB2.map((rate) => {
				return rate.cost;
			});
			const bestPlanRate = Math.min(...allB2Costs);
			const bestPlan = newB2.filter((rate) => {
				return rate.cost === bestPlanRate;
			})[0];
			this.setState({
				nonEVAnnualCost,
				includingEVAnnualCost,
				billImpact,
				B2: newB2,
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
			cost: rate.calculation(rate.homeLoadProfile),
		}));
		return B1;
	}

	createBillImpact() {
		const demand = timesOfDayOptions[this.state.chosenTimeWindow];
		const loadProfile = this.state.milesPerYear * 0.3;
		const billImpact = allRates.map((rate) => ({
			name: rate.name,
			cost: rate.calculation([{ demand, kWh: loadProfile }]),
		}));
		return billImpact;
	}

	createB2(B1, billImpact) {
		const B2 = B1.map((rate) => ({
			name: rate.name,
			cost:
				rate.cost +
				billImpact.find((element) => element.name === rate.name).cost,
		}));
		return B2;
	}

	render() {
		const timesOfDayOptionsArray = Object.keys(timesOfDayOptions);

		return (
			<div className="App">
				<div className="header"></div>
				<div className="main-content">
					<div className="main-container">
						<form className="left-section">
							<div className="form-input">
								<label htmlFor="currentRate">
									Which rate are you currently on?
								</label>
								<p>
									<select name="currentRate" onChange={this.handleUserInput}>
										{allRates.map((rate, idx) => (
											<option key={idx}>{rate.name}</option>
										))}
									</select>
								</p>
							</div>
							<div className="form-input">
								<label htmlFor="milesPerYear">
									How many miles will you be driving per year?
								</label>
								<p>
									<input
										type="range"
										min={1000}
										max={100000}
										name="milesPerYear"
										onChange={this.handleUserInput}
										value={this.state.milesPerYear}
										step={1000}
									/>
								</p>
								<p>{`${this.state.milesPerYear.toLocaleString()} Miles`}</p>
							</div>
							<div className="form-input">
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
							</div>
						</form>
						<div className="right-section">
							<div className="results">
								<Suggestion
									nonEVAnnualCost={this.state.nonEVAnnualCost}
									includingEVAnnualCost={this.state.includingEVAnnualCost}
									bestPlan={this.state.bestPlan}
									currentRate={this.state.B2.find(
										(rate) => rate.name === this.state.currentRate
									)}
								/>
								<Chart
									ratesArray={allRates.map((rate) => {
										return rate.name;
									})}
									B1={this.state.B1}
									currentRate={this.state.currentRate}
									billImpact={this.state.billImpact}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
