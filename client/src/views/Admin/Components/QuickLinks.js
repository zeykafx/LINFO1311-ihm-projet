import {
  Heading,
  VStack,
  UnorderedList,
  ListItem,
  Divider,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Card } from "../Admin";
import {Link as ReactRouterLink} from "react-router-dom"

function ListLinkItem(props) {
  return (
    <ListItem>
      <Link
        as={ReactRouterLink}
        px={2}
        py={1}
        rounded={"md"}
        _hover={{
          textDecoration: "none",
          bg: useColorModeValue("gray.200", "gray.700"),
        }}
        to={props.link}
      >
        {props.children}
      </Link>
    </ListItem>
  );
}

export default function QuickLinks() {
  return (
    <Card>
      <Heading size="md">Quick links:</Heading>
      <VStack>
        <UnorderedList>
          <ListLinkItem link="/">Home Page</ListLinkItem>
          <Divider />
          <ListLinkItem link="/admin">Admin Panel</ListLinkItem>
          <ListLinkItem link="/admin/edit-movies-shows">Edit Movies and TV Shows Page</ListLinkItem>
          <ListLinkItem link="/admin/create-movies-shows">Create Movies and TV Shows page</ListLinkItem>
          <ListLinkItem link="/admin/accounts-settings">Account Management Page</ListLinkItem>
          <ListLinkItem link="/admin/bio-editor">Edit the biography found on the home page</ListLinkItem>
        </UnorderedList>
      </VStack>
    </Card>
  );
}
