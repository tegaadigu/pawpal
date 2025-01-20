import {useState, useCallback} from 'react';
import {FORM_DATA, FORM_VALIDATOR_TYPE, VALIDATION_ERRORS} from './constants';

// @TODO : write test case for this hook.

// @TODO sync with matti to agree on password type | rule
const validatePassword = (password: string) => {
  var re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
};

type FORM_VALIDATORS = {
  [key: string]: (
    value: string,
    valueConfirmation?: string,
  ) => FORM_VALIDATOR_RETURN;
};

type FORM_VALIDATOR_RETURN = {
  isError: boolean;
  message?: string;
};

type FORM_VALIDATOR_PROP = {
  key: string;
  value: string;
};

// @todo perhaps extract this to a util function and write test case for individual validator..
// Possible refactor - create validator module and each validator function with unit tests.
const validateFormField = (): FORM_VALIDATORS => {
  //returns object of functions to validate each form field
  return {
    [FORM_VALIDATOR_TYPE.required]: (value: string): FORM_VALIDATOR_RETURN => ({
      isError: !value,
      message: 'This field is required.',
    }),
    [FORM_VALIDATOR_TYPE.phoneNumber]: (value: string) => {
      const regex =
        /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
      return {
        isError: !regex.test(value),
        message: 'Please enter a valid Phone number',
      };
    },
    [FORM_VALIDATOR_TYPE.email]: (value: string) => {
      const isValidEmail = String(value)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
      return {
        isError: !isValidEmail?.length,
        message: 'Please enter a valid Email including @ and .',
      };
    },
    [FORM_VALIDATOR_TYPE.password]: (value: string) => {
      let isNotValid;
      let msg;
      if (!value) {
        msg = 'Please enter Password.';
        isNotValid = true;
      } else if (!validatePassword(value)) {
        msg =
          'Password must be min 8 letters, with at least a symbol, upper and lower case letters and a number'; // Discuss password rule with matti
        isNotValid = true;
      }
      return {isError: !!isNotValid, message: msg};
    },
    [FORM_VALIDATOR_TYPE.confirmPassword]: (
      confirmPassword: string,
      password?: string,
    ) => {
      let isNotValid;
      let msg;
      if (!confirmPassword) {
        msg = 'Please enter Confirm Password.';
        isNotValid = true;
      } else if (password !== confirmPassword) {
        msg = 'Password and Confirm Password does not match.';
        isNotValid = true;
      }
      return {isError: !!isNotValid, message: msg};
    },
  };
};

export type FORM_VALIDATION_RETURN = {
  errors: VALIDATION_ERRORS;
  validateForm: (formData: FORM_DATA) => boolean;
  validateInput: (event: any, formData: FORM_DATA) => void;
  getErrorMessage: (key: string) => string;
};

const useFormValidation = (): FORM_VALIDATION_RETURN => {
  const [errors, setError] = useState<VALIDATION_ERRORS>({});

  const doValidationStep = useCallback(
    (key: string, validatorType: FORM_VALIDATOR_TYPE, formData: FORM_DATA) => {
      // performs the actual validation steps
      const validators = validateFormField();
      const data = formData[key];

      if (!data) {
        return;
      }
      if (key === FORM_VALIDATOR_TYPE.confirmPassword) {
        console.log('\n\n\n\ndata data =====>', data);
      }

      const shouldValidate = data.validate;
      const hasValidator = validators[validatorType];

      if (shouldValidate && !!hasValidator) {
        let isValid = true;
        let message = '';
        const fieldData = formData[data?.key || ''];
        if (key === FORM_VALIDATOR_TYPE.confirmPassword && fieldData) {
          const passwordData = fieldData;
          const {isError, message: messageError} = validators[validatorType](
            data?.value || '',
            passwordData?.value || '',
          );
          isValid = !isError;
          message = messageError || '';
        } else {
          const {isError, message: messageError} = validators[validatorType](
            data?.value || '',
          );
          isValid = !isError;
          message = messageError || '';
        }

        setError(prev => {
          const stateObj = {...prev, [key]: isValid ? '' : message};
          if (isValid) {
            delete stateObj[key];
          }
          return stateObj;
        });

        return isValid;
      }

      return true;
    },
    [],
  );

  const validateInput = useCallback(
    (formProp: FORM_VALIDATOR_PROP, formData: FORM_DATA) => {
      let {key} = formProp;
      const formItem = formData[key];
      doValidationStep(key, formItem.type, formData);
    },
    [doValidationStep],
  );

  const validateForm = useCallback(
    (formData: FORM_DATA) => {
      const formErrors = Object.keys(formData).map(key => {
        const formItem = formData[key];
        return doValidationStep(key, formItem.type, formData);
      });
      return formErrors.every(val => val);
    },
    [doValidationStep],
  );

  const getErrorMessage = useCallback(
    (key: string) => {
      return errors[key] || '';
    },
    [errors],
  );

  return {
    errors,
    validateForm,
    validateInput,
    getErrorMessage,
  };
};

export default useFormValidation;
