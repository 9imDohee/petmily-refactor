import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from 'redux/slice/userSlice';
import { signIn } from 'apis/api/user';

export function useLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setIsLoginLoading(true);
    const status = await signIn(data);
    if (status === 200) {
      dispatch(login());
      navigate('/');
    }
    setIsLoginLoading(false);
  };

  return { isLoginLoading, onSubmit };
}

export default useLogin;
