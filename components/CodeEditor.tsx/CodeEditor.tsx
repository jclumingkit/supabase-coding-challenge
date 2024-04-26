"use client";

import {
  Box,
  Button,
  Code,
  Divider,
  Flex,
  Paper,
  ScrollArea,
  Stack,
  Textarea,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { createSupabaseBrowserClient } from "../../utils/supabase/client";

const correct_answer_list = [
  {
    question_id: "123",
    question_expected_response: "6",
  },
];

export default function CodeEditor() {
  const supabaseClient = createSupabaseBrowserClient();

  const [userCode, setUserCode] = useState("");
  const [output, setOutput] = useState<string | null>(null);

  const handleExecuteUserCode = async () => {
    try {
      // Dynamically create a function with user-provided code
      const executeCode = new Function(
        "supabaseClient",
        `return async (supabaseClient) => { ${userCode} }`
      );

      const asyncUserFunction = executeCode(supabaseClient);
      const codeResponse = await asyncUserFunction(supabaseClient);

      setOutput(codeResponse);
    } catch (error) {
      console.error("Error executing user code:", error);
      notifications.show({
        message: `${error as string}`,
        color: "red",
      });
    }
  };

  const handleSubmitCode = async () => {
    try {
      await handleExecuteUserCode();

      const outputIsCorrect =
        output?.toString() ===
        correct_answer_list[0].question_expected_response.toString();

      if (outputIsCorrect) {
        notifications.show({
          message: `Correct! You may now proceed to the next question.`,
          color: "green",
        });
      } else {
        throw Error;
      }
    } catch (error) {
      notifications.show({
        message: `Incorrect response.`,
        color: "red",
      });
    }
  };

  return (
    <Flex
      direction="column"
      miw={{ md: 520 }}
      w="100%"
      h="100%"
      justify="space-between"
      gap="sm"
    >
      <Stack gap={12}>
        <Textarea
          value={userCode}
          onChange={(e) => setUserCode(e.currentTarget.value)}
          w="100%"
          styles={{
            input: {
              height: 300,
            },
          }}
          placeholder="Write your code here"
        />
        <Flex gap="sm" justify="flex-end">
          <Button
            w={120}
            variant="default"
            onClick={() => handleExecuteUserCode()}
          >
            Run
          </Button>
          <Button w={120} variant="filled" onClick={() => handleSubmitCode()}>
            Submit
          </Button>
        </Flex>
      </Stack>
      <Divider label="Output" labelPosition="center" />
      <Box h="100%" style={{ flex: 1 }}>
        {output && (
          <ScrollArea h={420}>
            <Paper radius="sm" withBorder>
              <Code h="100%" block>
                {JSON.stringify(output, null, 2)}
              </Code>
            </Paper>
          </ScrollArea>
        )}
      </Box>
    </Flex>
  );
}
