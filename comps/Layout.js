import Header from "./Header";
import Sidebar from "./Sidebar";

import { Grid, GridItem } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <Grid templateColumns="repeat(12, 1fr)" templateRows="3.5rem 1fr" h="100vh">
      <Sidebar />
      <Header />
      <GridItem colStart={3} colEnd={-1} rowStart={2} rowEnd={-1}>
        {children}
      </GridItem>
    </Grid>
  );
};

export default Layout;
