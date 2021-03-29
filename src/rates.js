export function flatRate(loadProfile_kWh) {
	return loadProfile_kWh * 0.15;
}

export function TOUrate(loadProfile_kWh, demand) {
	if (demand === "low") {
		console.log("I hit low");
		return loadProfile_kWh * 0.08;
	} else if (demand === "high") {
		console.log("I hit high");
		return loadProfile_kWh * 0.2;
	}
}

const rateFunctions = {
	flat: flatRate,
	TOU: TOUrate,
};

export default rateFunctions;
