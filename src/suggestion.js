import React from "react";
import { getRoundedCost } from "./rates";

const Suggestion = (props) => {
	return (
		<div className="result">
			{props.currentPlan && (
				<div id="output-text">
					<p>
						{`Currently, your annual electric cost is $${getRoundedCost(
							props.currentAnnualCost
						)}`}
						.
					</p>
					<p>{`Staying on the same rate, you can expect to pay $${getRoundedCost(
						props.newAnnualCost
					)} per year with an EV.`}</p>
					<div id="conclusion">
						{props.bestPlan.cost === props.currentPlan.cost && (
							<p>
								Seems like you're on the best rate!<br></br>
							</p>
						)}
						{props.bestPlan.cost < props.currentPlan.cost && (
							<p>{`If you switch to the ${
								props.bestPlan.name
							} plan, you'll be paying $${getRoundedCost(
								props.bestPlan.cost
							)} per year, which means saving $${getRoundedCost(
								props.currentPlan.cost - props.bestPlan.cost
							)}per year`}</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default Suggestion;
