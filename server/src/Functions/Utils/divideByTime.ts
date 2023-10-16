type TimeDividedData = {
	label: string;
	data: any[];
};

export function divideByTime(
	data: any,
	labels: any[],
	time_labels: { time_to: string; time_from: string }[]
): TimeDividedData[] {
	const dividedData: TimeDividedData[] = labels.map((label) => {
		return { label: label, data: [] };
	});

	console.log(dividedData);

	time_labels.forEach((time, i) => {
		const timeTo = Math.floor(new Date(time.time_to).getTime() / 1000);
		const timeFrom = Math.floor(new Date(time.time_from).getTime() / 1000);

		data.forEach((obj: any) => {
			const objTime = Math.floor(
				new Date(obj.publication_date).getTime() / 1000
			);
			if (objTime >= timeFrom && objTime <= timeTo) {
				dividedData[i - 1].data.push(obj);
			}
		});
	});

	console.log("Objs divided into different months: ", dividedData);

	return dividedData;
}

export default divideByTime;
