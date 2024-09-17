import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from 'redux/slice/userSlice';
import { guestSignIn } from 'apis/api/user';

export function useGuestLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isGuestLoginLoading, setIsGuestLoginLoading] = useState(false);

  const handleGuestLogin = async () => {
    setIsGuestLoginLoading(true);
    const status = await guestSignIn();
    if (status === 200) {
      dispatch(login());
      navigate('/');
    }
    setIsGuestLoginLoading(false);
  };

  return { isGuestLoginLoading, handleGuestLogin };
}

export default useGuestLogin;
