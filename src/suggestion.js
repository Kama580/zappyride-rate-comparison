import React from "react";

const Suggestion = (props) => {
	return (
		<div>
			<p>{`Current annual cost: ${props.currentAnnualCost}`}</p>
			<p>{`Total annual cost: ${props.totalAnnualCost}`}</p>
			{props.bestPlan.cost === props.currentPlan.cost && (
				<div>you're on the best plan</div>
			)}
			{props.bestPlan.cost < props.currentPlan.cost && (
				<div>{`you should switch to the ${props.bestPlan.name} plan at ${props.bestPlan.cost} per year`}</div>
			)}
		</div>
	);
};

export default Suggestion;
