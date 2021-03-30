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
		<div className="result">
			<VictoryChart
				className="chart"
				height={400}
				width={500}
				domainPadding={{ x: 100, y: [0, 20] }}
				theme={VictoryTheme.material}
			>
				<VictoryAxis tickValues={props.ratesArray} stile={{ stroke: "none" }} />
				<VictoryAxis
					dependentAxis
					tickFormat={(x) => `$${x}/year`}
					padding={{ left: 20, right: 60 }}
					name="name"
					style={{
						tickLabels: {
							fontSize: 8,
							align: "center",
							padding: 0,
							stroke: "none",
						},
					}}
				/>
				<VictoryStack>
					<VictoryBar
						data={props.B1}
						x="name"
						y="cost"
						left={50}
						animate={{
							duration: 2000,
							onLoad: { duration: 1000 },
						}}
					/>
					<VictoryBar
						data={props.billImpact}
						x="name"
						y="cost"
						animate={{
							duration: 2000,
							onLoad: { duration: 1000 },
						}}
					/>
				</VictoryStack>
			</VictoryChart>
		</div>
	);
};

export default Chart;
