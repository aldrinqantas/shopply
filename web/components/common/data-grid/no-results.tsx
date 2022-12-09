import React from 'react';
import { Center, Icon, Text, Stack } from '@chakra-ui/react';
import { AiOutlineInbox } from 'react-icons/ai';

export default function NoResults() {
  return (
    <Center p={4}>
      <Stack>
        <Center>
          <Icon as={AiOutlineInbox} boxSize={12} color="subtle" />
        </Center>

        <Text color="subtle">No Data</Text>
      </Stack>
    </Center>
  );
}
