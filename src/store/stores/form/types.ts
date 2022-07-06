export interface FormState {
  errors: FormErrors;
}

export interface FormsState {
  login: FormState;
  registration: FormState;
}

export type FormErrors = string[];
