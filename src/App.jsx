import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import { SignUp } from './Pages/Auth/SighnUp';
import { LogIn } from './Pages/Auth/LogIn';
import { PatientProfile } from './Pages/Patient/PatientProfile';
import { EditProfile } from './components/EditProfile';
import { SavedServices } from './components/SavedServices';
import MyReviews from './components/MyReviews';
import { SideBarMobile } from "./components/SideBarMobile";
import { SignUpHospital } from './Pages/Auth/SignUpHospital';
import {DashBoard} from './Pages/Hospital/DashBoard'
import {MainSectionAtDashBoard } from "./components/MainSectionAtDashBoard";
import {EditHospitalProfile } from "./components/EditHospitalProfile";
      import MainLayout from "./layouts/MainLayout";
      import DashboardLayout from "./layouts/DashboardLayout";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/SignUp-Hospital"
          element={
            <MainLayout>
              <SignUpHospital />
            </MainLayout>
          }
        />
        <Route
          path="/SignUp"
          element={
            <MainLayout>
              <SignUp />
            </MainLayout>
          }
        />

        <Route
          path="/LogIn"
          element={
            <MainLayout>
              <LogIn />
            </MainLayout>
          }
        />
        <Route
          path="/PatientProfile"
          element={
            <MainLayout>
              <PatientProfile />
            </MainLayout>
          }
        >
          <Route
            index
            element={
              <MainLayout>
                <EditProfile />
              </MainLayout>
            }
          />
          <Route
            path="savedServices"
            element={
              <MainLayout>
                <SavedServices />
              </MainLayout>
            }
          />
          <Route
            path="myReviews"
            element={
              <MainLayout>
                <MyReviews />
              </MainLayout>
            }
          />
        </Route>
        <Route
          path="/Hospital-DashBoard"
          element={
            <DashboardLayout>
              <DashBoard />
            </DashboardLayout>
          }
        >
          <Route
            index
            element={
              <DashboardLayout>
              <MainSectionAtDashBoard/>
              </DashboardLayout>
            }
          />
          <Route
            path="update-profile"
            element={
              <DashboardLayout>
                <EditHospitalProfile/>
              </DashboardLayout>
            }
          />
          <Route
            path="reviews"
            element={
              <DashboardLayout>
                <MyReviews />
              </DashboardLayout>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;