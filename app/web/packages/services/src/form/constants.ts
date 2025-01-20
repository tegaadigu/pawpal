export enum FORM_VALIDATOR_TYPE {
  email = 'email',
  required = 'required',
  phoneNumber = 'phoneNumber',
  password = 'password',
  confirmPassword = 'confirmPassword',
}

export type FORM_DATA = {
  [key: string]: {
    value?: string;
    type: FORM_VALIDATOR_TYPE;
    validate: boolean;
    key?: string; //Key is the unique identifier to compare password against.
    placeholder?: string;
  };
};

export type FORM_FIELDS = {
  [key: string]: string;
};

export type VALIDATION_ERRORS = {
  [key: string]: string;
};

export type FORM_HOOK_RETURN = {
  formData: FORM_DATA;
  onChange: (key: string, value: string) => void;
  onSubmit: (formField: FORM_FIELDS, shouldValidate?: boolean) => {};
  errors: VALIDATION_ERRORS;
  validateInput: (event: any, formData: FORM_DATA) => void;
  apiError?: string;
  getErrorMessage: (key: string) => string;
};
