import React from "react";
import {
	VictoryBar,
	VictoryChart,
	VictoryAxis,
	VictoryTheme,
	VictoryStack,
	VictoryLegend,
	VictoryLabel,
} from "victory";

const Chart = (props) => {
	return (
		<div className="result">
			{props.billImpact[0] && (
				<VictoryChart
					label="title"
					className="chart"
					height={400}
					width={600}
					domainPadding={{ x: 100, y: [0, 20] }}
					theme={VictoryTheme.material}
				>
					<VictoryLabel
						text="Rate Comparison"
						x={10}
						y={20}
						fontSize={12}
						style={[{ fontSize: 20 }]}
					/>
					<VictoryAxis tickValues={props.ratesArray} />
					<VictoryAxis
						dependentAxis
						tickFormat={(x) => `$${x.toLocaleString()}/year`}
						padding={{ left: 20, right: 60 }}
						name="name"
						label="Annual Cost"
						axisLabelComponent={<VictoryLabel dy={-80} fontSize={12} />}
						style={{
							tickLabels: {
								fontSize: 12,
								align: "center",
								padding: 0,
								stroke: "none",
							},
						}}
					/>
					<VictoryStack>
						<VictoryBar
							data={props.B1}
							style={{ data: { fill: "#0897FA" } }}
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
							style={{ data: { fill: "#FACA08" } }}
							x="name"
							y="cost"
							animate={{
								duration: 2000,
								onLoad: { duration: 1000 },
							}}
						/>
					</VictoryStack>
					<VictoryLegend
						x={180}
						y={380}
						orientation="horizontal"
						data={[
							{ name: "Electricity for home", symbol: { fill: "#0897FA" } },
							{ name: "Electric Vehicle", symbol: { fill: "#FACA08" } },
						]}
					/>
				</VictoryChart>
			)}
		</div>
	);
};

export default Chart;
