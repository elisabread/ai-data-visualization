export function filterByLabel(
	data: any[],
	data_label: string,
	data_label_nested: string,
	data_label_values: string[]
): any[] {
	const relevantObjs: any[] = [];
	data_label_values.forEach((value) => {
		data.forEach((obj: any) => {
			if (obj[data_label][data_label_nested] === value) {
				relevantObjs.push(obj);
			}
		});
	});

	return relevantObjs;
}

export default filterByLabel;
