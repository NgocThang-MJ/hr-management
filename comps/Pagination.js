import { useRouter } from "next/router";

import { Center, Flex } from "@chakra-ui/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@chakra-ui/icons";

const Pagination = (props) => {
  const router = useRouter();
  const { p, total, perPage, position, department } = props;
  const currentPage = parseInt(p);
  const pages = Math.ceil(total / perPage);
  const range = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );
  return (
    <Center>
      <Flex>
        <Center
          onClick={() => {
            router.push(
              `/?p=1${position ? `&position=${position}` : ""}${
                department ? `&department=${department}` : ""
              }`
            );
          }}
          cursor="pointer"
          w="2.2rem"
          h="2.2rem"
          borderRadius="0.5rem"
          _hover={{ border: "1px solid #909193" }}
          m="0 0.2rem"
        >
          1
        </Center>
        {/* Icon prev */}
        {currentPage > 4 && pages > 5 && (
          <Center
            onClick={() =>
              router.push(
                `/?p=${currentPage - 3}${
                  position ? `&position=${position}` : ""
                }${department ? `&department=${department}` : ""}`
              )
            }
            cursor="pointer"
            w="2.2rem"
            h="2.2rem"
            borderRadius="0.5rem"
            _hover={{ border: "1px solid #909193" }}
            m="0 0.2rem"
          >
            <ArrowLeftIcon />
          </Center>
        )}
        {range(
          currentPage >= 4 ? currentPage - 2 : 2,
          currentPage + 2 >= pages - 1 ? pages - 1 : currentPage + 2,
          1
        ).map((n) => (
          <Center
            onClick={() =>
              router.push(
                `/?p=${n}${position ? `&position=${position}` : ""}${
                  department ? `&department=${department}` : ""
                }`
              )
            }
            key={n}
            cursor="pointer"
            w="2.2rem"
            h="2.2rem"
            borderRadius="0.5rem"
            _hover={{ border: "1px solid #909193" }}
            m="0 0.2rem"
          >
            {n}
          </Center>
        ))}

        {/* Icon next */}
        {currentPage <= pages - 4 && pages > 5 && (
          <Center
            onClick={() =>
              router.push(
                `/?p=${currentPage + 3}${
                  position ? `&position=${position}` : ""
                }${department ? `&department=${department}` : ""}`
              )
            }
            cursor="pointer"
            w="2.2rem"
            h="2.2rem"
            borderRadius="0.5rem"
            _hover={{ border: "1px solid #909193" }}
            m="0 0.2rem"
          >
            <ArrowRightIcon />
          </Center>
        )}
        <Center
          onClick={() => {
            router.push(
              `/?p=${pages}${position ? `&position=${position}` : ""}${
                department ? `&department=${department}` : ""
              }`
            );
          }}
          cursor="pointer"
          w="2.2rem"
          h="2.2rem"
          borderRadius="0.5rem"
          _hover={{ border: "1px solid #909193" }}
          m="0 0.2rem"
        >
          {pages}
        </Center>
      </Flex>
    </Center>
  );
};

export default Pagination;
