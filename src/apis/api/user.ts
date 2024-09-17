import { baseInstance } from 'apis/utils/instance';

export const signIn = async (data: any) => {
  const { email, password } = data;
  try {
    const { data, status } = await baseInstance.post('/auth/local', { identifier: email, password });

    if (status === 200) {
      document.cookie = `access_token=${data.jwt}; Max-age=3600; path=/;`;
    }
    return status;
  } catch (error: any) {
    if (error.response.status === 400) {
      alert('아이디와 비밀번호를 확인해주세요.');
    }
  }
};

export const guestSignIn = async () => {
  try {
    const { data, status } = await baseInstance.post(`/auth/local`, {
      identifier: 'guest@petmily.com',
      password: 'asdf1234',
    });

    if (status === 200) {
      document.cookie = `access_token=${data.jwt}; Max-age=3600; path=/;`;
    }
    return status;
  } catch (error: any) {
    if (error.response.status === 400) {
      alert('아이디와 비밀번호를 확인해주세요.');
    }
  }
};
