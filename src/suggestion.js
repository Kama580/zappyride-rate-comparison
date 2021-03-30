import React from "react";
import { getRoundedCost } from "./rates";

const Suggestion = (props) => {
	return (
		<div className="result">
			{props.currentRate && (
				<div id="output-text">
					<p>
						{`Currently, your annual electric cost is $${getRoundedCost(
							props.nonEVAnnualCost
						)}`}
						.
					</p>
					<p>{`Staying on the same rate, you can expect to pay $${getRoundedCost(
						props.includingEVAnnualCost
					)} per year with an EV.`}</p>
					<div id="conclusion">
						{props.bestPlan.cost === props.currentRate.cost && (
							<p>
								Seems like you're on the best rate!<br></br>
							</p>
						)}
						{props.bestPlan.cost < props.currentRate.cost && (
							<p>{`If you switch to the ${
								props.bestPlan.name
							} plan, you'll be paying $${getRoundedCost(
								props.bestPlan.cost
							)} per year, which means saving $${getRoundedCost(
								props.currentRate.cost - props.bestPlan.cost
							)} per year`}</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default Suggestion;
