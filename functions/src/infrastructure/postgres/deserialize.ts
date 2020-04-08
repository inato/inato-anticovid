import * as decod from 'decod';

import { Trial, toTrialId } from '../../domain';

export const decodeTrialId = (value: unknown) => toTrialId(decod.string(value));

export const deserialize = (row: unknown): Trial => {
  const trialMandatoryProps = decod.props({
    trialId: decod.at(['trialid'], decodeTrialId),
    publicTitle: decod.at(['public_title'], decod.string),
    webAddress: decod.at(['web_address'], decod.string),
    recruitmentStatus: decod.at(
      ['recruitment_status'],
      decod.nullable(decod.string),
    ),
    therapeuticClasses: decod.at(
      ['therapeutic_classes'],
      decod.array(decod.string),
    ),
    registrationDate: decod.at(['date_registration3'], decod.date),
    exclusionCriteria: decod.at(
      ['exclusion_criteria'],
      decod.nullable(decod.string),
    ),
    inclusionCriteria: decod.at(
      ['inclusion_criteria'],
      decod.nullable(decod.string),
    ),
    hasResultsPublications: decod.at(
      ['has_results_publications'],
      decod.boolean,
    ),
    acronym: decod.at(['acronym'], decod.nullable(decod.string)),
    totalRecruitmentSize: decod.at(['total_recruitment_size'], decod.number),
    countries: decod.at(['countries'], decod.array(decod.string)),
    clinicalOutcomes: decod.at(
      ['clinical_outcome_extracted_'],
      decod.array(decod.string),
    ),
    surrogateOutcomes: decod.at(
      ['surrogate_outcome_extracted_'],
      decod.array(decod.string),
    ),
    resultsPublications: decod.at(
      ['results_publications'],
      decod.array(
        decod.props({
          title: decod.at('title', decod.nullable(decod.string)),
          url: decod.at('url', decod.string),
        }),
      ),
    ),
    studyType: decod.at('study_type', decod.string),
  })(row);

  return new Trial({
    rest: row,
    ...trialMandatoryProps,
  });
};
