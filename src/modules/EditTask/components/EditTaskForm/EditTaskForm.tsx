import React, { useState, MouseEvent, ChangeEvent, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { EditTaskStoreInstance } from '../../store';
import { defaultEditTaskFormValues } from './EditTaskForm.constants';
import { validationSchema } from './EditTaskFormValidationSchema';
import { TextField, Checkbox } from 'components/index';
import { FormTaskEntity } from 'domains/index';
import './EditTaskForm.css';

///////////////////////////////////////////
// interface EditTaskProps {
//   id: string | undefined;
// }
///////////////////////////////////////////
export function EditTaskFormProto() {
  const { loadTask, editTask, task, errorText, isRequestActive } = EditTaskStoreInstance;
  const { id, name, info, isImportant, isDone } = task;
  const { control, handleSubmit, setValue, reset } = useForm<FormTaskEntity>({
    defaultValues: defaultEditTaskFormValues,
    resolver: yupResolver(validationSchema),
  });
  // const [taskNameValue, setTaskNameValue] = useState<string>('');
  // const [taskDescValue, setTaskDescValue] = useState<string>('');
  // const [checkboxImportantValue, setCheckboxImportantValue] = useState<boolean>(false);
  const [checkboxComplitedValue, setCheckboxComplitedValue] = useState<boolean>(false);
  const params = useParams();
  const navigate = useNavigate();
  console.log('params.taskId: ', params.taskId);
  useEffect((): void => {
    loadTask(params.taskId);
  }, [params.taskId]);
  useEffect((): void => {
    // console.log('EditTaskFormProto_task:', task);
    // EditTaskStoreInstance.loadTask({ id });
    console.log(name, info, isImportant, isDone);
    // setTaskNameValue(name);
    // setTaskDescValue(info);
    // setCheckboxImportantValue(isImportant);
    setCheckboxComplitedValue(isDone);
    setValue('name', name);
    setValue('info', info);
    setValue('isImportant', isImportant);
    setValue('isDone', isDone);
  }, [task]);

  /*const onTaskNameInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    // console.log('onTaskNameInputChange_evt:', evt.target.value);
    setTaskNameValue(evt.target.value);
  };
  const onTaskDescInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    // console.log('onTaskDescInputChange_evt:', evt.target.value);
    setTaskDescValue(evt.target.value);
  };
  const onCheckboxImportantChange = (evt: ChangeEvent<HTMLInputElement>) => {
    // console.log('onCheckboxInputChange_evt:', evt.target.checked);
    // console.log('onCheckboxInputChange_target.id:', evt.target.id);
    setCheckboxImportantValue(evt.target.checked);
  };
  const onCheckboxComplitedChange = (evt: ChangeEvent<HTMLInputElement>) => {
    // console.log('onCheckboxInputChange_evt:', evt.target.checked);
    // console.log('onCheckboxInputChange_target.id:', evt.target.id);
    setCheckboxComplitedValue(evt.target.checked);
  };*/
  const onTaskNameInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    // console.log('onTaskNameInputChange_evt:', evt.target.value);
    setValue('name', evt.target.value);
  };
  const onTaskDescInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    // console.log('onTaskDescInputChange_evt:', evt.target.value);
    setValue('info', evt.target.value);
  };
  const onCheckboxImportantChange = (evt: ChangeEvent<HTMLInputElement>) => {
    console.log('onCheckboxImportantChange:', evt.target.checked);
    console.log('onCheckboxImportantChange:', evt.target.disabled);
    // console.log('onCheckboxInputChange_target.id:', evt.target.id);
    setValue('isImportant', evt.target.checked);
  };
  const onCheckboxComplitedChange = (evt: ChangeEvent<HTMLInputElement>) => {
    console.log('onCheckboxComplitedChange:', evt.target.checked);
    console.log('onCheckboxComplitedChange:', evt.target.disabled);
    // console.log('onCheckboxInputChange_target.id:', evt.target.id);
    setValue('isDone', evt.target.checked);
    setCheckboxComplitedValue(evt.target.checked);
  };

  /*const onSubmit = async (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    console.log('onSubmit: ', { taskNameValue, taskDescValue, checkboxImportantValue, checkboxComplitedValue });
    const editTaskSuccess = await editTask({
      id,
      name: taskNameValue,
      info: taskDescValue,
      isImportant: checkboxImportantValue,
      isDone: checkboxComplitedValue,
    });
    if (editTaskSuccess) {
      setTaskNameValue('');
      setTaskDescValue('');
      setCheckboxImportantValue(false);
      setCheckboxComplitedValue(false);
      navigate('/');
    }
  };*/
  const onSubmit = async (data: FormTaskEntity) => {
    // console.log('onSubmit: ', { taskNameValue, taskDescValue, checkboxImportantValue, checkboxComplitedValue });
    console.log('onSubmit: ', { id, ...data });
    const editTaskSuccess = await editTask({
      id,
      ...data,
    });
    if (editTaskSuccess) {
      reset();
      navigate('/');
    }
  };

  return (
    //   <form className="edit-form">
    //   <TextField
    //     disabled={isRequestActive}
    //     label={'Task name'}
    //     placeholder={'Clean room'}
    //     inputType={'text'}
    //     value={taskNameValue}
    //     onChange={onTaskNameInputChange}
    //     // errorText={''}
    //   />
    //   <TextField
    //     disabled={isRequestActive}
    //     label={'What to do(description)'}
    //     placeholder={'Clean my room'}
    //     inputType={'text'}
    //     value={taskDescValue}
    //     onChange={onTaskDescInputChange}
    //     // errorText={''}
    //   />
    //   <Checkbox
    //     disabled={isRequestActive || checkboxComplitedValue}
    //     label={'Important'}
    //     onChange={onCheckboxImportantChange}
    //     checked={checkboxImportantValue}
    //   />
    //   <Checkbox
    //     disabled={isRequestActive}
    //     label={'Complited'}
    //     onChange={onCheckboxComplitedChange}
    //     checked={checkboxComplitedValue}
    //   />
    //   <button disabled={isRequestActive} type="submit" className="btn btn-secondary d-block w-100" onClick={onSubmit}>
    //     Edit task
    //   </button>
    // </form>

    <form onSubmit={handleSubmit(onSubmit)} className="edit-form">
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState: { error } }) => (
          <TextField
            disabled={isRequestActive}
            label={'Task name'}
            placeholder={'Clean room'}
            inputType={'text'}
            value={field.value}
            onChange={onTaskNameInputChange}
            errorText={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="info"
        render={({ field, fieldState: { error } }) => (
          <TextField
            disabled={isRequestActive}
            label={'What to do(description)'}
            placeholder={'Clean my room'}
            inputType={'text'}
            value={field.value}
            onChange={onTaskDescInputChange}
            errorText={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="isImportant"
        render={({ field }) => (
          <Checkbox
            disabled={isRequestActive || checkboxComplitedValue}
            label={'Important'}
            onChange={onCheckboxImportantChange}
            checked={field.value}
          />
        )}
      />
      <Controller
        control={control}
        name="isDone"
        render={({ field }) => (
          <Checkbox
            disabled={isRequestActive}
            label={'Complited'}
            onChange={onCheckboxComplitedChange}
            checked={field.value}
          />
        )}
      />
      <button disabled={isRequestActive} type="submit" className="btn btn-secondary d-block w-100">
        Edit task
      </button>
    </form>
  );
}

export const EditTaskForm = observer(EditTaskFormProto);
