import { baseInstance } from 'apis/utils/instance';

// 유저(게스트) 로그인
export const signIn = async (data: any) => {
  const { email, password } = data;
  console.log(data);
  try {
    const { data, status } = await baseInstance.post('/auth/local', {
      identifier: email || 'guest@petmily.com',
      password: password || 'asdf1234',
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
