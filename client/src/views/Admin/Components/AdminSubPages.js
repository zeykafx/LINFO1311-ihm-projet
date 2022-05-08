import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { adminLinks } from "../../NavBar/NavBar";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink } from "react-router-dom";

export default function AdminSubPages(props) {
  const location = useLocation();

  // finding the name of the element in the adminLinks array of objects with the link that is like location.pathname but with the first "/" removed
  const [currentAdminPage, setCurrentAdminPage] = useState("");
  useEffect(() => {
    setCurrentAdminPage(
      adminLinks.find((x) => x.link === location.pathname.replace("/", ""))
    );
  }, [location]);

  return (
    <Box>
      <Breadcrumb separator={<ChevronRightIcon color="gray.500" />} padding={2}>
        <BreadcrumbItem>
          <BreadcrumbLink as={ReactRouterLink} to="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink as={ReactRouterLink} to="/admin">
            Admin Panel
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink as={ReactRouterLink} to={location.pathname}>
            {currentAdminPage.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      {props.children}
    </Box>
  );
}
