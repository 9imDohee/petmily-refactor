import { useState, Suspense, lazy } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import GlobalStyle from './styles/Globalstyle';

import BackHeader from '@components/headers/BackHeader';
import LoadingFallback from '@components/LoadingFallback';
import NavHeader from '@components/headers/NavHeader';

import { Switch } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';

const App = () => {
  const [theme, setTheme] = useState('light');

  const isLightMode = theme === 'light';

  const toggleTheme = () => {
    setTheme(isLightMode ? 'dark' : 'light');
  };

  const Home = lazy(() => import('@pages/main/Home'));
  const PetSitterHome = lazy(() => import('@pages/main/PetSitterHome'));
  const Login = lazy(() => import('@pages/account/login/Login'));
  const Signup = lazy(() => import('@pages/account/Signup'));
  const Reviews = lazy(() => import('@pages/main/Reviews'));
  const Mypage = lazy(() => import('@pages/mypage/Mypage'));
  const EditUserProfile = lazy(() => import('@pages/mypage/EditUserProfile'));
  const ViewPetsitters = lazy(() => import('@pages/reservation/ViewPetsitters'));
  const Reservation = lazy(() => import('@pages/reservation/Reservation'));
  const ReservationStepTwo = lazy(() => import('@pages/reservation/ReservationStepTwo'));
  const ReservationStepThree = lazy(() => import('@pages/reservation/ReservationStepThree'));
  const Cares = lazy(() => import('@pages/care/Cares'));
  const RegisterPet = lazy(() => import('@pages/mypage/RegisterPet'));
  const EditPet = lazy(() => import('@pages/mypage/EditPet'));
  const PetsitterViewDetails = lazy(() => import('@pages/reservation/PetsitterViewDetails'));
  const Search = lazy(() => import('@pages/main/Search'));
  const CreateReview = lazy(() => import('@pages/care/CreateReview'));
  const CreateJournal = lazy(() => import('@pages/care/CreateJournal'));
  const SitterSchedule = lazy(() => import('@pages/mypage/SitterSchedule'));
  const OAuthBranch = lazy(() => import('@pages/account/OAuthBranch'));
  const ViewJournal = lazy(() => import('@pages/common/ViewJournal'));
  const QnA = lazy(() => import('@pages/main/QnA'));
  const NotFound = lazy(() => import('@pages/common/404'));

  const AddNavHeaderLayout = () => {
    return (
      <>
        <NavHeader />
        <Outlet />
      </>
    );
  };

  const BackHeaderLayout = () => {
    return (
      <>
        <BackHeader />
        <Outlet />
      </>
    );
  };

  return (
    <ThemeProvider theme={isLightMode ? lightTheme : darkTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <Container>
          <Wrapper>
            <DisplayModeContainer>
              {!isLightMode && (
                <LightModeIcon
                  sx={{
                    width: '20px',
                    height: '24px',
                    color: 'white',
                  }}
                />
              )}
              <Switch checked={!isLightMode} onChange={toggleTheme} />
              {isLightMode && (
                <NightlightIcon
                  sx={{
                    width: '20px',
                    height: '24px',
                    color: '#2E2E2E',
                  }}
                />
              )}
            </DisplayModeContainer>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<AddNavHeaderLayout />}>
                  <Route path="" element={<Home />} />
                  <Route path="/petsitter" element={<PetSitterHome />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route path="mypage" element={<Mypage />} />
                  <Route path="reservation" element={<Reservation />} />
                  <Route path="reservation/step2" element={<ReservationStepTwo />} />
                  <Route path="cares" element={<Cares />} />
                  <Route path="cares/:reservationId/review" element={<CreateReview />} />
                  <Route path="cares/:reservationId/journal" element={<CreateJournal />} />
                </Route>
                <Route path="/" element={<BackHeaderLayout />}>
                  <Route path="login" element={<Login />} />
                  <Route path="signup" element={<Signup />} />
                  <Route path="signup/branch" element={<OAuthBranch />} />
                  <Route path="mypage/edit" element={<EditUserProfile />} />
                  <Route path="mypage/register" element={<RegisterPet />} />
                  <Route path="mypage/:petId/edit" element={<EditPet />} />
                  <Route path="search" element={<Search />} />
                  <Route path="qna" element={<QnA />} />
                  <Route path="petsitters" element={<ViewPetsitters />} />
                  <Route path="reservation/step3" element={<ReservationStepThree />} />
                  <Route path="cares/journal/:journalId" element={<ViewJournal />} />
                  <Route path="petsitters/:petsitterId" element={<PetsitterViewDetails />} />
                  <Route path="petsitters/:memberId/schedule" element={<SitterSchedule />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Wrapper>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColors.primary};
`;

const DisplayModeContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0px 10px;
  justify-content: end;
  align-items: center;
`;
export default App;
