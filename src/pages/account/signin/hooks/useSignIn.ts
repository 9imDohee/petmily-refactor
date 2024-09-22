import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from 'redux/slice/userSlice';
import { signIn } from 'apis/api/user';

function useSignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSignInLoading, setIsSignInLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setIsSignInLoading(true);
    const status = await signIn(data);
    if (status === 200) {
      dispatch(login());
      navigate('/');
    }
    setIsSignInLoading(false);
  };

  return { isSignInLoading, onSubmit };
}

export default useSignIn;
