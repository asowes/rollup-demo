import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
// import { extendTheme } from "@chakra-ui/react";
import { Provider as ReduxProvider } from "react-redux";
import { combineReducers } from "@reduxjs/toolkit";

import { reducers, store } from "@asow/rollup-demo/redux";
// import { theme } from "../ui";

interface AppProps {
  Component: any;
  extraReducer: { [name: string]: {} };
}

const App = (props: AppProps) => {
  // const _theme = extendTheme({ ...theme });

  const { Component, extraReducer } = props;
  const _reducers = combineReducers({
    ...reducers,
    ...extraReducer,
  });

  store.replaceReducer(_reducers);

  return (
    <React.Fragment>
      <ChakraProvider
      // theme={_theme}
      >
        <ReduxProvider store={store}>
          <Component />
        </ReduxProvider>
      </ChakraProvider>
    </React.Fragment>
  );
};

export default App;
