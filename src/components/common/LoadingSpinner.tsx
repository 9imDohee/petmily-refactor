import styled, { keyframes } from 'styled-components';

const LoadingSpinner = () => {
  return (
    <LoadingContainer>
      <Spinner />
    </LoadingContainer>
  );
};

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 18px;
  height: 18px;
`;

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid rgb(255 255 255 / 60%);
  border-radius: 50%;
  animation: ${spin} 1.2s linear infinite;
  border-top: 2px solid #fff;
`;

export default LoadingSpinner;
