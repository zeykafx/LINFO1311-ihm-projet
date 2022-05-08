import {
  Stack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";

import AdminAccountsViewer from "../../components/viewer/AdminAccountsViewer";
import AdminCreateAccountForm from "../../components/form/AdminCreateAccountForm";

export default function AccountPage() {
  return (
    <Tabs isFitted variant="enclosed" m={1}>
      <TabList mb="1em">
        <Tab>Edit accounts</Tab>
        <Tab>Create Accounts</Tab>
      </TabList>

      <TabPanels>
        {/* Create movie TAB*/}
        <TabPanel>
          <Heading>Edit accounts</Heading>
          <Text>
            You can edit all the accounts from this page, only if you are an administrator.
          </Text>
          <AdminAccountsViewer />
        </TabPanel>

        {/* create TV SHOWS TAB */}
        <TabPanel>
          <Heading>Create Accounts</Heading>
          <Text>
            You can create new administrator or editor accounts from this page, only if you are an administrator.
          </Text>
          <AdminCreateAccountForm />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
