import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import TestPage from "./pages/TestPage";
import TestResults from "./pages/TestResultsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserProvider } from "./components/UserContext";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { createGlobalStyle } from "styled-components";
import ResultsListPage from "./pages/ResultsListPage";

const GlobalStyle = createGlobalStyle`
 * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }
`;


const App = () => {
  return (
    <UserProvider>
        <GlobalStyle />
        <BrowserRouter>
          <Navbar className="navbar" />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<Home />} />
            <Route
              path="/test"
              element={
                <ProtectedRoute>
                  <TestPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/results"
              element={
                <ProtectedRoute>
                  <TestResults />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resultslist"
              element={
                <ProtectedRoute>
                  <ResultsListPage />
                </ProtectedRoute>
              }
            />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
    </UserProvider>
  );
};

export default App;
