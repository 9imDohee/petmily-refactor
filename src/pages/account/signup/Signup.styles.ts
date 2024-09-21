import styled, { keyframes } from 'styled-components';

export const MainContainer = styled.main`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: white;
`;

export const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 100px;
  max-width: 360px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;

  div:nth-child(1) {
    ${(props) => props.theme.fontSize.s20h30}
  }

  div:nth-child(2) {
    ${(props) => props.theme.fontSize.s16h24}
  }
`;

export const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 36px;
  gap: 16px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SignupInputStyle = styled.input<{ error: boolean | null }>`
  width: 100%;
  height: 32px;
  border-radius: 8px;
  border: 1px solid;
  border: 1px solid ${({ theme, error }) => (error ? 'red' : theme.lineColors.coolGray80)};
  padding: 8px;
  ${({ theme }) => theme.fontSize.s14h21}
  font-family: inherit;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const CheckBoxWrapper = styled.div`
  display: flex;
  padding-left: 4px;
  gap: 8px;
`;

export const CheckBoxLabel = styled.label`
  ${(props) => props.theme.fontSize.s14h21}
  color:${(props) => props.theme.textColors.gray40}
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 19px;
  left: 12px;
  width: 18px;
  height: 18px;
`;
