import { useQuery } from '@apollo/client';
import { Flex } from '@chakra-ui/react';

import { ALL_TODOS } from '../apollo/todos';

const TotalCount = () => {
  const { data } = useQuery(ALL_TODOS);

  return (
    <Flex justifyContent="center" borderTop="2px" mt="15px" pt="4px">
      {data?.todos && <b>Total todos: {data?.todos?.length}</b>}
    </Flex>
  );
};

export default TotalCount;
