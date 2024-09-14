import styled from 'styled-components';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface InputFieldProps<TFormInput extends FieldValues> {
  name: Path<TFormInput>;
  register: UseFormRegister<TFormInput>;
  errors: Record<string, any>;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
}

const InputField = <TFormInput extends FieldValues>({
  name,
  register,
  errors,
  type = 'text',
  placeholder = '',
}: InputFieldProps<TFormInput>) => {
  const errorMessage = errors[name]?.message;
  const hasError = !!errorMessage;

  return (
    <InputWrapper>
      <StyledInput type={type} placeholder={placeholder} {...register(name)} error={hasError} />
      {hasError && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const StyledInput = styled.input<{ error: boolean }>`
  width: 100%;
  height: 32px;
  border-radius: 8px;
  border: 1px solid ${({ error }) => (error ? 'red' : '#ccc')};
  padding: 8px;
  ${({ theme }) => theme.fontSize.s14h21};
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
`;

export default InputField;
