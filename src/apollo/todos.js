import { gql } from '@apollo/client';

export const TODO_FIELDS = gql`
  fragment TodoFields on Todo {
    id
    title
    completed
    user: User {
      id
      name
    }
  }
`;

export const ALL_TODOS = gql`
  ${TODO_FIELDS}

  query AllTodos {
    todos: allTodos {
      ...TodoFields
    }
  }
`;

export const ADD_TODO = gql`
  ${TODO_FIELDS}

  mutation AddTodo($title: String!, $completed: Boolean!, $user_id: ID!) {
    todo: createTodo(title: $title, completed: $completed, user_id: $user_id) {
      ...TodoFields
    }
  }
`;

export const REMOVE_TODO = gql`
${TODO_FIELDS}

  mutation RemoveTodo($id: ID!) {
    todo: removeTodo(id: $id) {
      ...TodoFields
    }
  }
`;

export const UPDATE_TODO = gql`
${TODO_FIELDS}

  mutation UpdateTodo($id: ID!, $completed: Boolean) {
    todo: updateTodo(id: $id, completed: $completed) {
      ...TodoFields
    }
  }
`;
