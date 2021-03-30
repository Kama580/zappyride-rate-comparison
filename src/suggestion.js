import React from "react";
import { getRoundedCost } from "./rates";

const Suggestion = (props) => {
	return (
		<div className="result">
			{props.bestPlan.cost && (
				<div id="output-text">
					{console.log("props:", props)}

					<p>
						{`Currently, your annual electricity cost is $${getRoundedCost(
							props.currentPlan.nonEVAnnualCost
						)}`}
						.
					</p>
					<p>{`Staying on the same rate, you can expect to pay an extra $${getRoundedCost(
						props.billImpact.cost
					)} per year for an EV.`}</p>
					<div id="conclusion">
						{props.bestPlan.cost ===
							props.currentPlan.includingEVAnnualCost && (
							<p>
								Seems like you're on the best rate!<br></br>
							</p>
						)}
						{props.bestPlan.cost < props.currentPlan.includingEVAnnualCost && (
							<p>{`If you switch to the ${
								props.bestPlan.name
							} plan, you'll be paying $${getRoundedCost(
								props.bestPlan.cost
							)} per year, which means saving $${getRoundedCost(
								props.currentPlan.includingEVAnnualCost - props.bestPlan.cost
							)} per year`}</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default Suggestion;
