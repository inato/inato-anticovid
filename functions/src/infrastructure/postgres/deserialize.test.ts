import { deserialize } from "./deserialize";

describe("deserialize", () => {
  it("should trow an Error if one mandatory field is missing", () => {
    const row = {
      trialid: "trialid"
    };
    expect(() => deserialize(row)).toThrowError();
  });
  it("should make a Trial object from a query result row", () => {
    const date = new Date();
    const row = {
      trialid: "trialid",
      public_title: "public_title",
      web_address: "web_address",
      recruitment_status: "recruitment_status",
      therapeutic_classes: ["therapeutic_classes"],
      date_registration3: date,
      exclusion_criteria: null,
      inclusion_criteria: null,
      has_results_publications: false,
      acronym: "DisCoVeRy",
      total_recruitment_size: 150,
      countries: ["France"],
      clinical_outcome_extracted_: ["Death"],
      surrogate_outcome_extracted_: ["Viral Load"],
      results_publications: [
        {
          title:
            "Efficacy of hydroxychloroquine in patients with COVID-19: results of a randomized clinical trial",
          url: "https://www.medrxiv.org/content/10.1101/2020.03.22.20040758v1"
        }
      ],
      study_type: "Basic Science"
    };
    const trial = deserialize(row);

    expect(trial.therapeuticClasses).toEqual(["therapeutic_classes"]);
    expect(trial).toEqual(
      expect.objectContaining({
        trialId: "trialid",
        publicTitle: "public_title",
        webAddress: "web_address",
        recruitmentStatus: "recruitment_status",
        registrationDate: date,
        exclusionCriteria: null,
        inclusionCriteria: null,
        hasResultsPublications: false,
        acronym: "DisCoVeRy",
        totalRecruitmentSize: 150,
        countries: ["France"],
        clinicalOutcomes: ["Death"],
        surrogateOutcomes: ["Viral Load"],
        resultsPublications: [
          {
            title:
              "Efficacy of hydroxychloroquine in patients with COVID-19: results of a randomized clinical trial",
            url: "https://www.medrxiv.org/content/10.1101/2020.03.22.20040758v1"
          }
        ],
        studyType: "Basic Science"
      })
    );
  });
});
