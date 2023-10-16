export type JobAd = {
	id: string;
	external_id: string;
	application_deadline: string;
	number_of_vacancies: string;
	employment_type: {
		concept_id: string;
		label: string;
		legacy_ams_taxonomy_id: string;
	};
	salary_type: {
		concept_id: string;
		label: string;
		legacy_ams_taxonomy_id: string;
	};
	duration: {
		concept_id: string;
		label: string;
		legacy_ams_taxonomy_id: string;
	};
	working_hours_type: {
		concept_id: string;
		label: string;
		legacy_ams_taxonomy_id: string;
	};
	scope_of_work: { min: string; max: string };
	experience_required: boolean;
	access_to_own_car: boolean;
	driving_license_required: boolean;
	occupation: {
		concept_id: string;
		label: string;
		legacy_ams_taxonomy_id: string;
	};
	occupation_group: {
		concept_id: string;
		label: string;
		legacy_ams_taxonomy_id: string;
	};
	occupation_field: {
		concept_id: string;
		label: string;
		legacy_ams_taxonomy_id: string;
	};
	workplace_address: {
		municipality: string;
		municipality_code: string;
		municipality_concept_id: string;
		region: string;
		region_code: string;
		region_concept_id: string;
		country: string;
		country_code: string;
		country_concept_id: string;
	};
	publication_date: string;
	last_publication_date: string;
	must_have: {
		skills: string[];
		languages: string[];
		work_experiences: [
			{
				weight: string;
				concept_id: string;
				label: string;
				legacy_ams_taxonomy_id: string;
			}
		];
		education: string[];
		education_level: string[];
	};
	nice_to_have: {
		skills: string[];
		languages: string[];
		work_experiences: string[];
		education: string[];
		education_level: string[];
	};
};

// https://mariusschulz.com/blog/tagged-union-types-in-typescript
// type ChartDatum = Record<string, any>;
// const datum: ChartDatum = {
// 	s: "asdasd",
// 	123: "asdasd",
// };

// type DataSchema = Record<string, DataSchemaType>;

// type DataTypes = Date | Number | Array

// type Date = {
// 	kind: "Date";
// };

// type Number = {
// 	kind: "Number";
// };

export const labels = ["occupation", "occupation_field"] as const;

export function isValidLabel(x: string): x is ValidLabel {
	return x in labels;
}

export type ValidLabel = (typeof labels)[number];
