import { useDispatch } from "react-redux";
import { handleSearch } from "../util/slices/searchSlice";

import {
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const Header = () => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(handleSearch(e.target.value));
  };
  return (
    <GridItem
      colStart={3}
      colEnd={-1}
      borderBottom="1px solid black"
      display="flex"
      alignItems="center"
    >
      <InputGroup w="40%">
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="#B3B5B9" />}
        />
        <Input
          type="text"
          placeholder="Search name"
          border="none"
          // _focus="none"
          onChange={handleChange}
        />
      </InputGroup>
    </GridItem>
  );
};

export default Header;
