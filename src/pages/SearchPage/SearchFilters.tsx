export interface SearchState {
  refinementList?: { [key: string]: Array<string> };
  toggle?: { [key: string]: string | undefined };
  range?: { [key: string]: { min: number; max: number } | undefined };
}

export const getActiveSearchFilters = (searchState: SearchState) =>
  [
    searchState.toggle?.has_results_publications
      ? 'Has results publications'
      : null,
    searchState.range?.total_recruitment_size?.min
      ? `Min ${searchState.range.total_recruitment_size.min} patients`
      : null,
    searchState.range?.total_recruitment_size?.max
      ? `Max ${searchState.range.total_recruitment_size.max} patients`
      : null,
    ...Object.values(searchState.refinementList ?? []).reduce(
      (acc, value) => [...acc, ...value],
      [],
    ),
  ].filter((value): value is string => !!value);

export const hasActiveSearchFilters = (searchState: SearchState) =>
  getActiveSearchFilters(searchState).length > 0;
