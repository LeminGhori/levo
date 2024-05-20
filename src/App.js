import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Organization from "./page/Organization/Organization.jsx";
import ErrorPage from "./page/ErrorPage/ErrorPage.jsx";
import Layout from './page/Layout/Layout.jsx';
import TestReportsDetails from './page/TestReportsDetails/TestReportsDetails.jsx';
import TestReportsList from './page/TestReportsList/TestReportsList.jsx';
import React, { useState } from 'react';
export const ValueContext = React.createContext();
export const SetValueContext = React.createContext();
function App() {
  const [value, setvalue] = useState({
    organization: '',
    testReport: ''
  });
  return (
    <ValueContext.Provider value={value}>
      <SetValueContext.Provider value={setvalue}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Organization />} />
              <Route path="organization" element={<Organization />} />
              <Route path="test-reports-list" element={<TestReportsList />} />
              <Route path="test-reports-details" element={<TestReportsDetails />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SetValueContext.Provider>
    </ValueContext.Provider>
  );
}

export default App;
