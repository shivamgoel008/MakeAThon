import React from "react";
import {ThemeProvider} from "@rneui/themed";
import {appTheme} from "./assets/theme/Theme";
import {Provider} from "react-redux";
import {reduxStore} from "./redux/ReduxStore";
import {Layout} from "./routing/Layout";
// import {SafeAreaProvider} from "react-native-safe-area-context";

export const App: React.FC = (): JSX.Element => {
  return (
    <React.Fragment>
      {/* <SafeAreaProvider> */}
      <Provider store={reduxStore}>
        <ThemeProvider theme={appTheme}>
          <Layout />
        </ThemeProvider>
      </Provider>
      {/* </SafeAreaProvider> */}
    </React.Fragment>
  );
};
