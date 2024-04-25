import { Container, Flex, Text } from "@mantine/core";
import classes from "./HomePage.module.css";

export default function HomePage() {
  const defaultSectionProps = { mih: "100%", p: "md", style: { flex: 1 } };

  return (
    <Container w="100%" h="100vh" p={0} fluid>
      <Flex
        mih="100%"
        direction={{ base: "column", sm: "row" }}
        justify="space-between"
      >
        <Flex {...defaultSectionProps} className={classes.section}>
          <Text>Problem here</Text>
        </Flex>
        <Flex {...defaultSectionProps} style={{ flex: 1 }}>
          <Text>Code here</Text>
        </Flex>
      </Flex>
    </Container>
  );
}
