import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import HomeLogo from '@components/common/HomeLogo';
import InputField from '@components/common/InputField';
import GoogleOAuthButton from '@components/buttons/OAuthButton';
import {
  MainContainer,
  LoginContainer,
  LoginForm,
  InputWrapper,
  ButtonWrapper,
  SubmitButton,
  SignupLink,
  LoadingContainer,
  Spinner,
} from './Login.styles';
import useLogin from './hooks/useLogin';
import useGuestLogin from './hooks/useGuestLogin';

const schema = yup.object().shape({
  email: yup.string().email('이메일 형식을 지켜주세요.').required('ID를 입력해주세요.'),
  password: yup
    .string()
    .required('비밀번호를 입력해주세요.')
    .min(8, '비밀번호는 8자리 이상이어야 합니다.')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/, '최소 1개의 영문자와 1개의 숫자를 반드시 포함해야 합니다. '),
});

type IFormLoginInputs = yup.InferType<typeof schema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLoginInputs>({
    resolver: yupResolver(schema),
  });

  const { isLoginLoading, onSubmit } = useLogin();
  const { isGuestLoginLoading, handleGuestLogin } = useGuestLogin();

  return (
    <MainContainer>
      <LoginContainer>
        <HomeLogo width="150px" height="50px" />
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <InputWrapper>
            <InputField name="email" type="email" register={register} errors={errors} placeholder="아이디" />
            <InputField name="password" type="password" register={register} errors={errors} placeholder="비밀번호" />
          </InputWrapper>
          <ButtonWrapper>
            <SubmitButton type="submit">
              {isLoginLoading && (
                <LoadingContainer>
                  <Spinner />
                </LoadingContainer>
              )}
              로 그 인
            </SubmitButton>
            <SubmitButton type="button" onClick={handleGuestLogin} disabled={isGuestLoginLoading}>
              {isGuestLoginLoading && (
                <LoadingContainer>
                  <Spinner />
                </LoadingContainer>
              )}
              Guest 로 그 인
            </SubmitButton>
            <GoogleOAuthButton>Log in with Google</GoogleOAuthButton>
          </ButtonWrapper>
        </LoginForm>
        <SignupLink to="/signup">회원가입하기</SignupLink>
      </LoginContainer>
    </MainContainer>
  );
};

export default Login;
