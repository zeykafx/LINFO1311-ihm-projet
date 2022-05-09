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

export default function AccountPage({ accountType }) {
  return (
    <>
      {accountType === "editor" ? <Text p={2} fontSize={"xl"} color={"red.500"}>You are an editor, you cannot do edits on this page.</Text> : <></>}
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
              You can edit all the accounts from this page.
            </Text>
            <AdminAccountsViewer />
          </TabPanel>

          {/* create TV SHOWS TAB */}
          <TabPanel>
            <Heading>Create Accounts</Heading>
            <Text>
              You can create new administrator or editor accounts from this
              page.
            </Text>
            <AdminCreateAccountForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
