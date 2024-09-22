import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from 'apis/api/user';

function useSignUp() {
  const navigate = useNavigate();

  const [isSignUpLoading, setIsSignUpLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setIsSignUpLoading(true);
    const status = await signUp(data);
    if (status === 200) {
      alert('가입을 축하합니다! 로그인 후 이용해주세요.');
      navigate('/login');
    }
    setIsSignUpLoading(false);
  };
  return { isSignUpLoading, onSubmit };
}

export default useSignUp;
