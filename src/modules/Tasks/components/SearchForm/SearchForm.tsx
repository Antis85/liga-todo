import React from 'react';
import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import { StatusFilter } from '../StatusFilter';
import { defaultSearchFormValues } from './SearchForm.constants';
import { TasksStoreInstance } from 'modules/Tasks/store';
import { SearchInput } from 'components/index';
import { FiltersType, SearchFormEntity } from 'domains/index';
import './SearchForm.css';

export function SearchFormProto() {
  const { isTasksLoading, loadTasks } = TasksStoreInstance;
  const { control, handleSubmit, setValue } = useForm<SearchFormEntity>({
    defaultValues: defaultSearchFormValues,
  });

  const onSearchInputChange = (searchValue: string) => setValue('searchValue', searchValue);

  const onSearchInputReset = () => setValue('searchValue', '');

  const onFilterChange = (filterType: FiltersType) => setValue('filterType', filterType);

  const onSubmit = (data: SearchFormEntity) => loadTasks(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="search-form d-flex justify-content-between">
      <Controller
        control={control}
        name="searchValue"
        render={({ field }) => (
          <SearchInput
            disabled={isTasksLoading}
            value={field.value}
            onChange={onSearchInputChange}
            onReset={onSearchInputReset}
          />
        )}
      />
      <Controller
        control={control}
        name="filterType"
        render={({ field }) => (
          <StatusFilter disabled={isTasksLoading} onChange={onFilterChange} tasksType={field.value} />
        )}
      />
      <button disabled={isTasksLoading} type="submit" className="btn btn-primary" /*onClick={onSubmit}*/>
        Find
      </button>
    </form>
  );
}

export const SearchForm = observer(SearchFormProto);
