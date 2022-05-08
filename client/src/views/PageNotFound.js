import React from "react";
import {
  Container,
  Icon,
  Stack,
  Flex,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";

export default function PageNotFound() {
  return (
    <Flex align={"center"} justify={"center"} h={"100vh"} w={"full"}>
      <Stack
        bg={useColorModeValue("gray.50", "gray.900")}
        rounded={"xl"}
        p={8}
        spacing={6}
        maxW={"lg"}
        align={"center"}
        textAlign={"center"}
      >
        <Stack spacing={2}>
          <Heading>404: Page not found</Heading>
          <Text>
            This page was not found. You may have mistyped the address or the
            page may have moved.
          </Text>
        </Stack>
        <Flex>
          <Link
            href={"/"}
            _hover={{
              textDecoration: "none",
            }}
          >
            <Button
              colorScheme={"blackAlpha"}
              rounded={"full"}
              bg={"blackAlpha.400"}
              _hover={{ bg: "blackAlpha.500", textDecoration: "none" }}
            >
              Get back to the home page
            </Button>
          </Link>
        </Flex>
      </Stack>
    </Flex>
  );
}
