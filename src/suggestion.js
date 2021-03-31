import React from "react";
import { getRoundedCost } from "./rates";

const Suggestion = (props) => {
	return (
		<div className="result">
			{props.bestPlan.cost && (
				<div id="output-text">
					<p>{`With an EV, you can expect an addition of $${getRoundedCost(
						props.billImpact.cost
					)} per year to your electricity bill if you stay on the same rate.`}</p>
					<div id="conclusion">
						{props.bestPlan.cost ===
							props.currentPlan.includingEVAnnualCost && (
							<p>
								You're on the best rate!<br></br>
							</p>
						)}
						{props.bestPlan.cost < props.currentPlan.includingEVAnnualCost && (
							<p>{`You can save ~$${getRoundedCost(
								props.currentPlan.includingEVAnnualCost - props.bestPlan.cost
							)} per year by switching to the ${
								props.bestPlan.name
							} rate plan.`}</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default Suggestion;
