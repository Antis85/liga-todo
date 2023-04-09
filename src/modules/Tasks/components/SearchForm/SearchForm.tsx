import React, { useState, MouseEvent } from 'react';
import { observer } from 'mobx-react';
import { StatusFilter } from '../StatusFilter';
import { TasksStoreInstance } from 'modules/Tasks/store';
import { SearchInput } from 'components/index';
import { FILTER_TYPES } from 'constants/index';
import { FiltersType } from 'domains/index';
import './SearchForm.css';

export function SearchFormProto() {
  const { isTasksLoading, loadTasks } = TasksStoreInstance;
  const [filterType, setFilterType] = useState<FiltersType>(FILTER_TYPES.ALL);
  const [searchValue, setSearchValue] = useState<string>('');

  const onSearchInputChange = (value: string) => {
    console.log('onSearchInputChange_value:', value);
    setSearchValue(value);
  };

  const onSearchInputReset = () => {
    setSearchValue('');
  };

  const onFilterChange = (type: FiltersType) => {
    setFilterType(type);
  };

  const onSubmit = async (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    await loadTasks({ searchValue, filterType });
    setSearchValue('');
    setFilterType(FILTER_TYPES.ALL);
    console.log('search:', { filterType, searchValue });
  };

  return (
    <form className="search-form d-flex justify-content-between">
      <SearchInput
        disabled={isTasksLoading}
        value={searchValue}
        onChange={onSearchInputChange}
        onReset={onSearchInputReset}
      />
      <StatusFilter disabled={isTasksLoading} tasksType={filterType} onChange={onFilterChange} />
      <button disabled={isTasksLoading} type="submit" className="btn btn-primary" onClick={onSubmit}>
        Find
      </button>
    </form>
  );
}

export const SearchForm = observer(SearchFormProto);
