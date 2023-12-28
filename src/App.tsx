import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";

import "./App.css";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { ErrorModal } from "./components/ErrorModal/ErrorModal";
import { IdbProvider } from "./providers/Idb.provider";
import { LocalFilesProvider } from "./providers/LocalFiles.provider";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {},
});

function App() {
  return (
    <IdbProvider>
      <LocalFilesProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Dashboard />

          <ErrorModal />
        </ThemeProvider>
      </LocalFilesProvider>
    </IdbProvider>
  );
}

export default App;
