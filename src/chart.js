import React from "react";
import { getRoundedCost } from "./rates";
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
						x={-25}
						y={10}
						fontSize={12}
						style={[{ fontSize: 20 }]}
					/>
					<VictoryAxis tickValues={props.ratesArray} />
					<VictoryAxis
						dependentAxis
						tickFormat={(x) => `$${x.toLocaleString()}/year`}
						label="Annual Cost"
						style={{
							axisLabel: { padding: 85 },
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
							labels={props.B1.map((B1) => `$${getRoundedCost(B1.cost)}`)}
							style={{
								data: { fill: "#0D77B0" },
								labels: {
									fill: "white",
								},
							}}
							x="name"
							y="cost"
							animate={{
								duration: 2000,
								onLoad: { duration: 1000 },
							}}
							labelComponent={<VictoryLabel dy={30} />}
						/>
						<VictoryBar
							data={props.billImpact}
							labels={props.billImpact.map(
								(bi) => `$${getRoundedCost(bi.cost)}`
							)}
							style={{ data: { fill: "#FABA45" }, labels: { fill: "white" } }}
							x="name"
							y="cost"
							animate={{
								duration: 2000,
								onLoad: { duration: 1000 },
							}}
							labelComponent={<VictoryLabel dy={30} />}
						/>
					</VictoryStack>
					<VictoryLegend
						x={170}
						y={375}
						orientation="horizontal"
						data={[
							{ name: "Electricity for home", symbol: { fill: "#0D77B0" } },
							{ name: "Electric Vehicle", symbol: { fill: "#FABA45" } },
						]}
					/>
				</VictoryChart>
			)}
		</div>
	);
};

export default Chart;
