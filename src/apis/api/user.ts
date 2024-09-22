import { baseInstance } from 'apis/utils/instance';

// 유저(게스트) 로그인
export const signIn = async (data: any) => {
  const { email, password } = data;
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

// 회원가입
export const signUp = async (data: any) => {
  const { name, phone, address, detailAddress, email, nickName, password, petsitterBoolean } = data;
  try {
    const { data, status } = await baseInstance.post(`/auth/local/register`, {
      name,
      phone,
      address: `${address} ${detailAddress}`,
      email,
      nickName,
      password,
      petsitterBoolean,
    });
    return status;
  } catch (e) {
    console.log(e);
    alert('회원 가입에 실패하였습니다. 다시 시도해 주세요.');
  }
};
