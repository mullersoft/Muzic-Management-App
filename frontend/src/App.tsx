import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Global } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles"; // Ensure @mui/material/styles is installed
import Home from "./components/UserHomePage/Home";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import { store } from "./store";
import globalStyles from "./styles/globalStyles";
import theme from "./styles/themes/theme";
import AdminDashboard from "./components/AdminHomePage/AdminDashboard";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
          <Footer />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};
export default App;
