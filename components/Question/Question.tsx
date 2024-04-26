import { Flex, FlexProps, Stack, Text } from "@mantine/core";

type Props = {
  flexProps: FlexProps;
};

export default function Question({ flexProps }: Props) {
  return (
    <Flex {...flexProps}>
      <Stack>
        <Text>
          A store manager wants to know the total products they have in their
          inventory. Create a function that returns the total count of products
          in product_table.
        </Text>
        <Text c="red">
          Important: Use the `supabaseClient` instance in your queries.
        </Text>
      </Stack>
    </Flex>
  );
}
