export function filterDataTime(
	data: any[],
	timeTo: number,
	timeFrom: number
): any[] {
	const relevantObjs: any[] = [];
	data.forEach((obj: any) => {
		const objTime = Math.floor(new Date(obj.publication_date).getTime() / 1000);
		if (objTime > timeFrom && objTime < timeTo) {
			relevantObjs.push(obj);
		}
	});
	return relevantObjs;
}

export default filterDataTime;
