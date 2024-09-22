import { useForm } from 'react-hook-form';
import { useState } from 'react';
import useSignUp from './hooks/useSignUp';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '@components/common/InputField';
import { Modal, Sheet } from '@mui/joy';
import DaumPostcode from 'react-daum-postcode';
import { SubmitButton } from '../signin/SignIn.styles';
import GoogleOAuthButton from '@components/buttons/OAuthButton';
import LoadingSpinner from '@components/common/LoadingSpinner';
import {
  MainContainer,
  SignupContainer,
  TitleWrapper,
  SignUpForm,
  InputWrapper,
  ButtonWrapper,
  CheckBoxWrapper,
  CheckBoxLabel,
  LoadingContainer,
} from './Signup.styles';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, '이름은 2자 이상이어야 합니다.')
    .matches(/[가-힣]+/, '한글만 가능합니다.')
    .required('이름은 필수입니다.'),
  phone: yup
    .string()
    .matches(/^010[0-9]{8}$/, "010으로 시작해야 하며 '-'를 제외한 총 11자리 숫자여야 합니다.")
    .required('전화번호는 필수입니다.'),
  address: yup.string().required('주소는 필수입니다.'),
  detailAddress: yup.string().required('상세주소는 필수입니다.'),
  email: yup.string().email('이메일 형식을 지켜주세요.').required('ID는 필수입니다.'),
  nickName: yup
    .string()
    .min(2, '닉네임은 2자 이상부터 가능합니다.')
    .matches(/^[^!@#$%^&*()_+{}[\]:;<>,.?~|]+$/, '특수문자가 없어야 합니다.')
    .required('닉네임은 필수입니다.'),
  password: yup
    .string()
    .min(8, '비밀번호는 8자리 이상이어야 합니다.')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/, '최소 1개의 영문자와 1개의 숫자를 반드시 포함해야 합니다. ')
    .required('비밀번호는 필수입니다.'),
  passwordConfirm: yup.lazy(() => {
    return yup.string().oneOf([yup.ref('password'), ''], '비밀번호가 서로 다름.');
  }),
  photo: yup.string(),
  petsitterBoolean: yup.boolean(),
});

type IFormSignupInputs = yup.InferType<typeof schema>;

const Signup = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<IFormSignupInputs>({ resolver: yupResolver(schema) });

  const { isSignUpLoading, onSubmit } = useSignUp();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [sido, setSido] = useState('');
  const [sigungu, setSigungu] = useState('');
  const [remainAddress, setRemainAddress] = useState('');
  const [zonecode, setZonecode] = useState('');

  const onToggleModal = () => {
    setIsModalOpen(true);
  };

  const handleComplete = (data: any) => {
    // 우편번호 저장
    setZonecode(data.zonecode);
    // 시.도 저장
    setSido(data.sido);
    // 구.군 저장
    setSigungu(data.sigungu);
    // 상세주소 앞 2단어 제외하고 저장 ('서울 강남구' 제외하고 저장)
    const splitAddress = data.address.split(' ').splice(2).join(' ');
    if (data) {
      clearErrors('address');
    }
    setRemainAddress(splitAddress);
    setIsModalOpen(false);
  };

  return (
    <MainContainer>
      <SignupContainer>
        <TitleWrapper>
          <div>We&apos;re Petmily!</div>
          <div>회원가입</div>
        </TitleWrapper>
        <SignUpForm onSubmit={handleSubmit(onSubmit)}>
          <InputWrapper>
            <InputField name="name" type="text" register={register} errors={errors} placeholder="이름" />
            <InputField name="phone" type="text" register={register} errors={errors} placeholder="연락처" />
            <InputField
              name="address"
              value={zonecode ? `${zonecode} ${sido} ${sigungu} ${remainAddress}` : ''}
              type="text"
              register={register}
              errors={errors}
              placeholder="주소"
              onClick={onToggleModal}
              onKeyDown={onToggleModal}
            />
            <InputField name="detailAddress" type="text" register={register} errors={errors} placeholder="상세주소" />
            <InputField name="email" type="email" register={register} errors={errors} placeholder="이메일" />
            <InputField name="nickName" type="text" register={register} errors={errors} placeholder="닉네임" />
            <InputField name="password" type="password" register={register} errors={errors} placeholder="비밀번호" />
            <InputField
              name="passwordConfirm"
              type="password"
              register={register}
              errors={errors}
              placeholder="비밀번호 확인"
            />
          </InputWrapper>

          <CheckBoxWrapper>
            <input type="checkbox" id="isPetsitter" {...register('petsitterBoolean')} />
            <CheckBoxLabel htmlFor="isPetsitter">펫시터로 가입하기</CheckBoxLabel>
          </CheckBoxWrapper>

          <ButtonWrapper>
            <div style={{ position: 'relative' }}>
              <SubmitButton type="submit">펫밀리 등록</SubmitButton>
              {isSignUpLoading && (
                <LoadingContainer>
                  <LoadingSpinner />
                </LoadingContainer>
              )}
            </div>
            <GoogleOAuthButton>Sign up with Google</GoogleOAuthButton>
          </ButtonWrapper>
        </SignUpForm>
      </SignupContainer>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Sheet sx={{ width: '360px;' }}>
            <DaumPostcode onComplete={handleComplete} />
          </Sheet>
        </Modal>
      )}
    </MainContainer>
  );
};

export default Signup;
