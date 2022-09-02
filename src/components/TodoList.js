import { useQuery } from '@apollo/client';
import { VStack, Flex, Spinner } from '@chakra-ui/react';

import TodoItem from './TodoItem';
import TotalCount from './TotalCount';
import { ALL_TODOS } from '../apollo/todos';

const TodoList = () => {
  const { loading, error, data } = useQuery(ALL_TODOS);
  
  if (loading) {
    return (
      <Flex justifyContent="center" paddingBlock="10px">
        <Spinner />
      </Flex>
    );
  }

  if (error) {
    return <h2>Error while fetching todos</h2>;
  }

  return (
    <>
    <VStack spacing={2} mt={4}>
      {data?.todos?.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
        />
      ))}
    </VStack>
    <TotalCount />
    </>
  );
};

export default TodoList;
