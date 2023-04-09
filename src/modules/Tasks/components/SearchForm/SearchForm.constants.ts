import { FILTER_TYPES } from 'constants/index';
import { SearchFormEntity } from 'domains/index';

export const defaultSearchFormValues: SearchFormEntity = {
  searchValue: '',
  filterType: FILTER_TYPES.ALL,
};
