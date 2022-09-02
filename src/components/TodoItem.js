import { useMutation } from '@apollo/client';
import { Checkbox, Text, CloseButton, HStack, Spinner } from '@chakra-ui/react';

import { REMOVE_TODO, UPDATE_TODO, ALL_TODOS } from '../apollo/todos';

const TodoItem = ({ id, title, completed, user }) => {
  const [
    removeTodo,
    { loading: removingLoading, error: removingError },
  ] = useMutation(REMOVE_TODO, {
      update(cache, { data: { todo } }) {
        cache.modify({
          fields: {
            allTodos(currentTodos = []) {
              return currentTodos.filter(({ __ref: __refTodo }) => __refTodo !== `${todo.__typename}:${todo.id}`)
            }
          }
        })

        // const { todos } = cache.readQuery({ query: ALL_TODOS });

        // cache.writeQuery({
        //   query: ALL_TODOS,
        //   data: {
        //     todos: todos.filter(({ id: todoId }) => todoId !== todo.id),
        //   }
        // })
      },
  });
  
  const [updateTodo, { loading: updatingLoading, error: updatingError }] = useMutation(UPDATE_TODO);

  const handleRemoveTodo = () => {
    removeTodo({
      variables: {
        id,
      },
    });
  };

  const handleUpdateTodo = () => {
    updateTodo({
      variables: {
        id,
        completed: !completed,
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

      {(removingLoading || updatingLoading) && <Spinner />}

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
