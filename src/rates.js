export function flatRate(loadProfile_kWh) {
	return loadProfile_kWh[0].kWh * 0.15;
}

export function TOUrate(loadProfile_kWh) {
	let totalBill = 0;
	for (let i = 0; i < loadProfile_kWh.length; i++) {
		const rate = loadProfile_kWh[i];
		if (rate.demand === "low") {
			totalBill += rate.kWh * 0.08;
		} else if (rate.demand === "high") {
			totalBill += rate.kWh * 0.2;
		}
	}
	return totalBill;
}

const rateFunctions = {
	flat: flatRate,
	TOU: TOUrate,
};

export default rateFunctions;
