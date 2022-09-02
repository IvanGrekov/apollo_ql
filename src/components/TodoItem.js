import { useMutation } from '@apollo/client';
import { Checkbox, Text, CloseButton, HStack } from '@chakra-ui/react';

import { REMOVE_TODO, UPDATE_TODO, ALL_TODOS } from '../apollo/todos';

const TodoItem = ({ id, title, completed, user }) => {
  const [removeTodo, { error: removingError }] = useMutation(REMOVE_TODO, {
      update(cache, { data: { todo: removingTodo } }) {
        // const { todos } = cache.readQuery({ query: ALL_TODOS });

        // cache.writeQuery({
        //   query: ALL_TODOS,
        //   data: {
        //     todos: todos.filter(({ id: todoId }) => todoId !== todo.id),
        //   }
        // })

        cache.modify({
          fields: {
            allTodos(currentTodos = [], { readField }) {
              return currentTodos.filter((currentTodo) => readField('id', currentTodo) !== removingTodo.id)
            }
          }
        })
      },
  });
  
  const [updateTodo, { error: updatingError }] = useMutation(UPDATE_TODO);

  const handleRemoveTodo = () => {
    removeTodo({
      variables: {
        id,
      },
      optimisticResponse: {
        todo: {
          id,
          __typename: 'Todo',
          title,
          completed,
          user,
        },
      },
    });
  };

  const handleUpdateTodo = () => {
    updateTodo({
      variables: {
        id,
        completed: !completed,
      },
      optimisticResponse: {
        todo: {
          id,
          __typename: 'Todo',
          title,
          user,
          completed: !completed,
        },
      },
    });
  };

  return (
    <>
      <HStack spacing={5}>
        <Checkbox isChecked={completed} onChange={handleUpdateTodo} />
        <Text>{title}</Text>
        {user?.name && <Text>{user.name}</Text>}
        <CloseButton onClick={handleRemoveTodo} />
      </HStack>

      {removingError && (
        <h3 style={{ color: 'red' }}>Error while removing todo</h3>
      )}

      {updatingError && (
        <h3 style={{ color: 'orange' }}>Error while updating todo</h3>
      )}
    </>
  );
};

export default TodoItem;
