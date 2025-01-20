import * as React from 'react';
import {FORM_DATA, FORM_HOOK_RETURN, FORM_FIELDS} from './constants';
import useFormValidation from './useFormValidation';
import axiosClient from '../../api/client';

export const useForm = (
  initialFormData: FORM_DATA,
  endpoint: string,
): FORM_HOOK_RETURN => {
  const [formData, setFormData] = React.useState(initialFormData);
  const {validateForm, errors, getErrorMessage, validateInput} =
    useFormValidation();
  const [apiError, setApiError] = React.useState('');

  const onChange = React.useCallback(
    (key: string, value: string) => {
      const data = formData[key];
      if (!data) {
        return;
      }

      const changes = {...formData, [key]: {...data, value}};

      setFormData(prevData => {
        const stateObj = {...prevData, [key]: {...data, value}};

        return stateObj;
      });
      validateInput({key, value}, changes);
    },
    [formData, validateInput],
  );

  const onSubmit = React.useCallback(
    async (fields: FORM_FIELDS, shouldValidate: boolean = true) => {
      if (shouldValidate) {
        const isValidForm = validateForm(formData);

        if (!isValidForm) {
          return;
        }
      }
      //   const userData = {
      //     name: formData.username.value,
      //     email: formData.email.value,
      //     password: formData.password.value,
      //     phone: formData.phoneNumber.value,
      //   };
      try {
        await axiosClient.post(endpoint, fields);
      } catch (error) {
        setApiError('Error has Happened!!');
      }
    },
    [formData, validateForm, endpoint],
  );

  return {
    formData,
    onChange,
    onSubmit,
    errors,
    validateInput,
    apiError,
    getErrorMessage,
  };
};

export default useForm;
