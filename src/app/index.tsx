import React, { Component } from "react";
import { HashRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import AppRoutes from "./routes";
import AppLayout from "./layouts/AppLayout";
import Theme from "./components/Theme";

class App extends Component {
  render() {
    return (
      <Theme >
        <CssBaseline />
        <HashRouter>
          <AppLayout>
            <AppRoutes />
          </AppLayout>
        </HashRouter>
      </Theme>
    );
  }
}
export default App;
