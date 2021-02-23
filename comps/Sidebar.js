import NextLink from "next/link";

import { Box, Center, GridItem, Link } from "@chakra-ui/react";

const Sidebar = () => {
  return (
    <>
      <GridItem colSpan={2} bg="#007EFA">
        <Center h="100%" fontSize="2rem" color="white">
          HR
        </Center>
      </GridItem>
      <GridItem rowStart={2} colSpan={2} bg="#18202E" color="white" h="100%">
        <Box>
          <NextLink href="/" passHref>
            <Link _hover={{ textDecor: "none" }} _focus={{ boxShadow: "none" }}>
              <Box p="1rem 2rem">Staff</Box>
            </Link>
          </NextLink>
        </Box>
      </GridItem>
    </>
  );
};

export default Sidebar;
