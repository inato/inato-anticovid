import { trialFactory, trialIdFactory } from '../../domain';

import { serialize } from './serialize';

describe('serialize', () => {
  it('should serialize all fields', () => {
    const date = new Date('Fri, 27 Mar 2020 10:45:59 GMT');
    const trial = trialFactory({
      trialId: trialIdFactory('trialid'),
      publicTitle: 'public_title',
      webAddress: 'web_address',
      recruitmentStatus: 'recruitment_status',
      therapeuticClasses: ['therapeutic_classes'],
      registrationDate: date,
      acronym: 'DisCoVeRy',
      countries: ['France'],
      totalRecruitmentSize: 150,
      clinicalOutcomes: ['Death'],
      surrogateOutcomes: ['Viral Load'],
      resultsPublications: [
        {
          title:
            'Efficacy of hydroxychloroquine in patients with COVID-19: results of a randomized clinical trial',
          url: 'https://www.medrxiv.org/content/10.1101/2020.03.22.20040758v1',
        },
      ],
      studyType: 'Basic Science',
    });
    expect(serialize(trial)).toStrictEqual({
      exclusion_criteria: '',
      inclusion_criteria: '',
      has_results_publications: false,
      public_title: 'public_title',
      web_address: 'web_address',
      recruitment_status: 'recruitment_status',
      therapeutic_classes: ['therapeutic_classes'],
      date_registration3: date,
      registration_timestamp: 1585305959000,
      objectID: 'trialid',
      acronym: 'DisCoVeRy',
      countries: ['France'],
      total_recruitment_size: 150,
      clinical_outcome_extracted_: ['Death'],
      surrogate_outcome_extracted_: ['Viral Load'],
      results_publications: [
        {
          title:
            'Efficacy of hydroxychloroquine in patients with COVID-19: results of a randomized clinical trial',
          url: 'https://www.medrxiv.org/content/10.1101/2020.03.22.20040758v1',
        },
      ],
      study_type: 'Basic Science',
    });
  });

  it('should serialize a null recruitment status', () => {
    const trial = trialFactory({
      recruitmentStatus: null,
    });
    expect(serialize(trial)).toMatchObject({
      recruitment_status: null,
    });
  });

  it('should serialize a trial with additional parameters', () => {
    const trial = trialFactory({
      trialId: trialIdFactory('trialid'),
      rest: {
        other: 'other',
      },
    });
    expect(serialize(trial)).toMatchObject({
      exclusion_criteria: '',
      inclusion_criteria: '',
      objectID: 'trialid',
      other: 'other',
    });
  });
});
