import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, FormControl, Input, Flex, Spinner } from '@chakra-ui/react';

import { ADD_TODO, ALL_TODOS } from '../apollo/todos';

const AddTodo = () => {
  const [
    addTodo,
    { loading, error },
  ] = useMutation(ADD_TODO, {
    // refetchQueries: [
    //   { query: ALL_TODOS },
    // ],

    update(cache, { data: { todo } }) {
      const { todos } = cache.readQuery({ query: ALL_TODOS });

      cache.writeQuery({
        query: ALL_TODOS,
        data: {
          todos: [...todos, todo],
        }
      })
    },
  });
  const [text, setText] = useState('');

  const handleAddTodo = async () => {
    if (text.trim().length) {
      try {
        const { data } = await addTodo({
          variables: {
            title: text,
            completed: false,
            user_id: '1',
          },
        });

        if (data) {
          setText('');
        }
      } catch (e) {
        console.warn('Error while adding todo', e);
      }
    }
  };

  const handleKey = (event) => {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <>
      <FormControl display="flex" gap="4" mt={6}>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKey}
        />
        <Button onClick={handleAddTodo}>Add todo</Button>
      </FormControl>

      {error && <h2 style={{ color: 'red' }}>Error while adding todo</h2>}

      {loading && (
        <Flex justifyContent="center" paddingTop="20px" paddingBottom="10px">
          <Spinner />
        </Flex>
      )}
    </>
  );
};

export default AddTodo;
