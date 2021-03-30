import React from "react";
import {
	VictoryBar,
	VictoryChart,
	VictoryAxis,
	VictoryTheme,
	VictoryStack,
} from "victory";

const Chart = (props) => {
	return (
		<div className="chart">
			<VictoryChart
				domainPadding={40}
				width={500}
				height={600}
				theme={VictoryTheme.material}
			>
				<VictoryAxis tickValues={props.ratesArray} />
				<VictoryAxis dependentAxis tickFormat={(x) => `$${x}/year`} />
				<VictoryStack>
					<VictoryBar data={props.B1} x="name" y="cost" />
					<VictoryBar data={props.billImpact} x="name" y="cost" />
				</VictoryStack>
			</VictoryChart>
		</div>
	);
};

export default Chart;
