import { Container, Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";

import "./App.css";
import { ErrorModal } from "./components/ErrorModal/ErrorModal";
import { Explorer } from "./components/Explorer/Explorer";
import { FileModal } from "./components/FileModal/FileModal";
import { LocalFilesProvider } from "./providers/LocalFiles.provider";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <LocalFilesProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="App">
          <Container>
            <Grid container mt={2}>
              <Explorer />
            </Grid>
          </Container>
        </div>
        <FileModal />
        <ErrorModal />
      </ThemeProvider>
    </LocalFilesProvider>
  );
}

export default App;
