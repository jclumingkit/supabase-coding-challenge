"use client";

import { Container, Flex, Stack, Text } from "@mantine/core";
import CodeEditor from "../CodeEditor.tsx/CodeEditor";
import classes from "./HomePage.module.css";

export default function HomePage() {
  const defaultSectionProps = { mih: "100%", p: "md", style: { flex: 1 } };

  return (
    <Container w="100%" h={`calc(100vh - 60px)`} p={0} fluid>
      <Flex
        mih="100%"
        direction={{ base: "column", sm: "row" }}
        justify="space-between"
      >
        <Flex {...defaultSectionProps} className={classes.section}>
          <Stack>
            <Text>
              A store manager wants to know the total products they have in
              their inventory. Create a function that returns the total count of
              products in product_table.
            </Text>
            <Text c="red">
              Important: Use the `supabaseClient` instance in your queries.
            </Text>
          </Stack>
        </Flex>
        <Flex {...defaultSectionProps} style={{ flex: 1 }}>
          <CodeEditor />
        </Flex>
      </Flex>
    </Container>
  );
}
