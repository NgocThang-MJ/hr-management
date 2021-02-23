import "../public/global.css";
import Layout from "../comps/Layout";

import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import store from "../util/store";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
