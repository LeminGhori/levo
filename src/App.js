import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Organization from "./page/Organization/Organization.jsx";
import ErrorPage from "./page/ErrorPage/ErrorPage.jsx";
import Layout from './page/Layout/Layout.jsx';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Organization />} />
          <Route path="organization" element={<Organization />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
