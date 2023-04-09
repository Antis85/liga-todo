import React, { useState, MouseEvent } from 'react';
import { observer } from 'mobx-react';
// import * as Yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { StatusFilter } from '../StatusFilter';
import { defaultSearchFormValues } from './SearchForm.constants';
import { TasksStoreInstance } from 'modules/Tasks/store';
import { SearchInput } from 'components/index';
import { FILTER_TYPES } from 'constants/index';
import { FiltersType, SearchFormEntity } from 'domains/index';
import './SearchForm.css';

export function SearchFormProto() {
  const { isTasksLoading, loadTasks } = TasksStoreInstance;
  const { control, handleSubmit, setValue, reset } = useForm<SearchFormEntity>({
    defaultValues: defaultSearchFormValues,
  });
  /*const [filterType, setFilterType] = useState<FiltersType>(FILTER_TYPES.ALL);
  const [searchValue, setSearchValue] = useState<string>('');*/

  /*const onSearchInputChange = (value: string) => {
    console.log('onSearchInputChange_value:', value);
    setSearchValue(value);
  };*/
  const onSearchInputChange = (searchValue: string) => {
    console.log('onSearchInputChange_value:', searchValue);
    setValue('searchValue', searchValue);
  };

  /*const onSearchInputReset = () => {
    if (!searchValue && filterType === FILTER_TYPES.ALL) return;
    setSearchValue('');
    setFilterType(FILTER_TYPES.ALL);
    loadTasks();
  };*/
  const onSearchInputReset = () => {
    setValue('searchValue', '');
  };

  /*const onFilterChange = (type: FiltersType) => {
    setFilterType(type);
  };*/
  const onFilterChange = (filterType: FiltersType) => {
    setValue('filterType', filterType);
  };

  /*const onSubmit = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    loadTasks({ searchValue, filterType });
    //не нужно обнулять фильтр и поиск
    // setSearchValue('');
    // setFilterType(FILTER_TYPES.ALL);
    console.log('search:', { filterType, searchValue });
  };*/
  // const onSubmit = (evt: MouseEvent<HTMLButtonElement>) => {
  //   console.log('submit');
  //   evt.preventDefault();
  //   handleSubmit((data) => {
  //     console.log('data:', data);
  //     loadTasks(data);
  //   })();
  // };
  const onSubmit = (data: SearchFormEntity) => {
    console.log('data', data);
    loadTasks(data);
    reset();
    // evt.preventDefault();
    // handleSubmit((data) => {
    //   console.log('data:', data);
    //   loadTasks(data);
    // });
  };

  return (
    // <form className="search-form d-flex justify-content-between">
    //   <SearchInput
    //     disabled={isTasksLoading}
    //     value={searchValue}
    //     onChange={onSearchInputChange}
    //     onReset={onSearchInputReset}
    //   />
    //   <StatusFilter disabled={isTasksLoading} tasksType={filterType} onChange={onFilterChange} />
    //   <button disabled={isTasksLoading} type="submit" className="btn btn-primary" onClick={onSubmit}>
    //     Find
    //   </button>
    // </form>
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
            // onReset={() => reset()}
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
