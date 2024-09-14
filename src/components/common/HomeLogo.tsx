import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface HomeLogoProps {
  width?: string;
  height?: string;
}

const HomeLogo = ({ width = '150px', height = '48px' }: HomeLogoProps) => {
  const navigate = useNavigate();
  return (
    <LogoWrapper onClick={() => navigate('/')}>
      <img src="/imgs/Logo.svg" alt="logo" width={width} height={height} />
    </LogoWrapper>
  );
};

export default HomeLogo;

const LogoWrapper = styled.div`
  cursor: pointer;
`;
