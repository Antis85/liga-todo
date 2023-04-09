import React, { useState, MouseEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { AddTaskStoreInstance } from '../../store';
import { TextField, Checkbox } from 'components/index';
import './AddTaskForm.css';

export function AddTaskFormProto() {
  const { isRequestActive, addTask } = AddTaskStoreInstance;
  // const [textFieldValue, setTextFieldValue] = useState<string>('');
  const [taskNameValue, setTaskNameValue] = useState<string>('');
  const [taskDescValue, setTaskDescValue] = useState<string>('');
  const [checkboxValue, setCheckboxValue] = useState<boolean>(false);
  const navigate = useNavigate();

  const onTaskNameInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    // console.log('onTaskNameInputChange_evt:', evt.target.value);
    setTaskNameValue(evt.target.value);
  };

  const onTaskDescInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    // console.log('onTaskDescInputChange_evt:', evt.target.value);
    setTaskDescValue(evt.target.value);
  };

  const onCheckboxInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    // console.log('onCheckboxInputChange_evt:', evt.target.checked);
    setCheckboxValue(evt.target.checked);
  };

  const onSubmit = async (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    // isDone = false при создании таски!!!
    console.log('onSubmit: ', { taskNameValue, taskDescValue, checkboxValue });
    const addTaskSuccess = await addTask({
      name: taskNameValue,
      info: taskDescValue,
      isImportant: checkboxValue,
      isDone: false,
    });
    if (addTaskSuccess) {
      setTaskNameValue('');
      setTaskDescValue('');
      setCheckboxValue(false);
      navigate('/');
    }
  };

  console.log('isRequestActive:', isRequestActive);

  return (
    <form className="add-form">
      <TextField
        disabled={isRequestActive}
        label={'Task name'}
        placeholder={'Clean room'}
        inputType={'text'}
        value={taskNameValue}
        onChange={onTaskNameInputChange}
        // errorText={''}
      />
      <TextField
        disabled={isRequestActive}
        label={'What to do(description)'}
        placeholder={'Clean my room'}
        inputType={'text'}
        value={taskDescValue}
        onChange={onTaskDescInputChange}
        // errorText={''}
      />
      <Checkbox
        disabled={isRequestActive}
        label={'Important'}
        onChange={onCheckboxInputChange}
        checked={checkboxValue}
      />
      <button disabled={isRequestActive} type="submit" className="btn btn-secondary d-block w-100" onClick={onSubmit}>
        Add task
      </button>
    </form>
  );
}

export const AddTaskForm = observer(AddTaskFormProto);
