import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { login } from 'redux/slice/userSlice';
import HomeLogo from '@components/common/HomeLogo';
import InputField from '@components/common/InputField';
import GoogleOAuthButton from '@components/buttons/OAuthButton';
import {
  MainContainer,
  LoginContainer,
  LoginForm,
  SubmitButtonStyle,
  CustomLink,
  LoadingContainer,
  Spinner,
} from './Login.styles';

const schema = yup.object().shape({
  email: yup.string().email('이메일 형식을 지켜주세요.').required('ID는 필수입니다.'),
  password: yup
    .string()
    .min(8, '비밀번호는 8자리 이상이어야 합니다.')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/, '최소 1개의 영문자와 1개의 숫자를 반드시 포함해야 합니다. ')
    .required('비밀번호는 필수입니다.'),
});

type IFormLoginInputs = yup.InferType<typeof schema>;

const Login = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 1);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLoginInputs>({
    resolver: yupResolver(schema),
  });

  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const onSubmit = async (data: IFormLoginInputs) => {
    setIsLoginLoading(true);
    const { email, password } = data;
    try {
      const { data, status } = await axios.post(`${apiUrl}/auth/local`, { identifier: email, password });

      if (status === 200) {
        document.cookie = `access_token=${data.jwt}; Max-age=3600; path=/;`;
        dispatch(login());
        navigate('/');
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        alert('아이디와 비밀번호를 확인해주세요.');
      }
    }
    setIsLoginLoading(false);
  };

  // 게스트 로그인
  const [GuestLoginLoading, setGuestLoginLoading] = useState(false);

  const handleGuestLogin = async () => {
    setGuestLoginLoading(true);

    try {
      const { data, status } = await axios.post(`${apiUrl}/auth/local`, {
        identifier: 'guest@gmail.com',
        password: 'asdf1234',
      });

      if (status === 200) {
        document.cookie = `access_token=${data.jwt}; Max-age=3600; path=/;`;
        dispatch(login());
        navigate('/');
      }
    } catch (error) {
      alert('게스트 로그인에 실패하였습니다.');
    }
    setGuestLoginLoading(false);
  };

  return (
    <MainContainer>
      <LoginContainer>
        <HomeLogo width="150px" height="50px" />
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <InputField name="email" type="email" register={register} errors={errors} placeholder="아이디" />
          <InputField name="password" type="password" register={register} errors={errors} placeholder="비밀번호" />
          <div style={{ position: 'relative' }}>
            <SubmitButtonStyle type="submit">
              {isLoginLoading && (
                <LoadingContainer>
                  <Spinner />
                </LoadingContainer>
              )}
              로 그 인
            </SubmitButtonStyle>
            <SubmitButtonStyle type="button" onClick={handleGuestLogin} disabled={GuestLoginLoading}>
              {GuestLoginLoading && (
                <LoadingContainer>
                  <Spinner />
                </LoadingContainer>
              )}
              Guest 로 그 인
            </SubmitButtonStyle>
          </div>
          <GoogleOAuthButton>Log in with Google</GoogleOAuthButton>
        </LoginForm>
        <CustomLink to="/signup">회원가입하기</CustomLink>
      </LoginContainer>
    </MainContainer>
  );
};

export default Login;
