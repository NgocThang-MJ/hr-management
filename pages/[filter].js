import { useRouter } from "next/router";

import { Box } from "@chakra-ui/react";

const Staffs = () => {
  const router = useRouter();
  const { filter } = router.query;
  console.log(router.query);
  return <Box>{filter}</Box>;
};

export default Staffs;
