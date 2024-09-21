import styled from 'styled-components';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface InputFieldProps<TFormInput extends FieldValues> {
  name: Path<TFormInput>;
  type?: React.HTMLInputTypeAttribute;
  register: UseFormRegister<TFormInput>;
  errors: Record<string, any>;
  placeholder?: string;
  value?: string;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

const InputField = <TFormInput extends FieldValues>({
  name,
  type = 'text',
  register,
  errors,
  placeholder = '',
  value,
  onClick,
  onKeyDown,
}: InputFieldProps<TFormInput>) => {
  const errorMessage = errors[name]?.message;
  const hasError = !!errorMessage;

  return (
    <InputWrapper>
      <StyledInput
        type={type}
        placeholder={placeholder}
        {...register(name)}
        error={hasError}
        value={value}
        onClick={onClick}
        onKeyDown={onKeyDown}
      />
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
