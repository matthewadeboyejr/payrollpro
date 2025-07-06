# Form Types Documentation

This document explains the TypeScript types created for the authentication forms in the PayrollPro application.

## Overview

The form types are designed to work with `react-final-form` and provide type safety for:

- SigninForm component
- SignupForm component
- Form validation
- Form state management

## Type Definitions

### Base Types

#### `FormState`

```typescript
interface FormState {
  submitFailed: boolean | undefined;
  errors: Record<string, string>;
}
```

Represents the state of a form including submission status and validation errors.

#### `FinalFormProps`

```typescript
interface FinalFormProps {
  form: any; // React Final Form API
  handleSubmit: FormRenderProps["handleSubmit"];
  submitting: FormRenderProps["submitting"];
}
```

Base props for any form component using react-final-form.

### Form Value Types

#### `SigninFormValues`

```typescript
interface SigninFormValues {
  email: string;
  password: string;
  check?: boolean; // Remember me checkbox
}
```

Type-safe structure for signin form data.

#### `SignupFormValues`

```typescript
interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  check?: boolean; // Terms acceptance checkbox
}
```

Type-safe structure for signup form data.

### Component Props

#### `SigninFormProps`

```typescript
interface SigninFormProps extends FinalFormProps {}
```

Props for the SigninForm component.

#### `SignupFormProps`

```typescript
interface SignupFormProps extends FinalFormProps {}
```

Props for the SignupForm component.

### Validation Types

#### `FormValidationResult`

```typescript
interface FormValidationResult {
  [key: string]: string[];
}
```

Structure for form validation errors returned by validate.js.

#### `FormConstraints`

```typescript
interface FormConstraints {
  [key: string]: any;
}
```

Structure for validation constraints used by validate.js.

## Usage Examples

### SigninForm Component

```typescript
import { SigninFormProps } from "../types/formFields";

const SigninForm = ({ form, handleSubmit, submitting }: SigninFormProps) => {
  // Component implementation
};
```

### SignupForm Component

```typescript
import { SignupFormProps } from "../types/formFields";

const SignupForm = ({ form, handleSubmit, submitting }: SignupFormProps) => {
  // Component implementation
};
```

### Form Validation

```typescript
import { SigninFormValues, FormValidationResult } from "../types/formFields";

const validateForm = (
  values: SigninFormValues
): FormValidationResult | undefined => {
  return validate(values, signinConstraints) || undefined;
};
```

### Form Submission

```typescript
import { SigninFormValues } from "../types/formFields";

const onSubmit = (values: SigninFormValues) => {
  console.log("Form values:", values);
  // Handle form submission
};
```

## Benefits

1. **Type Safety**: Prevents runtime errors by catching type mismatches at compile time
2. **IntelliSense**: Better IDE support with autocomplete and error detection
3. **Documentation**: Types serve as inline documentation for form structure
4. **Maintainability**: Easier to refactor and maintain form components
5. **Validation**: Type-safe validation functions and error handling

## Integration with react-final-form

The types are designed to work seamlessly with react-final-form:

```typescript
<Form<SigninFormValues>
  onSubmit={onSubmit}
  validate={validateForm}
  render={({ handleSubmit, form, submitting }) => (
    <SigninForm
      handleSubmit={handleSubmit}
      submitting={submitting}
      form={form}
    />
  )}
/>
```

## Future Enhancements

- Add more specific validation types
- Create reusable form field types
- Add form state persistence types
- Implement form submission status types
