import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import TodoModal from './TodoModal';

import { UPDATE_TODO, DELETE_TODO } from '../graphql/mutations';

const deleteTodoUpdateCache = (cache: any, { data: { deleteTodo } }: any) => {
    cache.modify({
      fields: {
        todos(existingTodos: any[], { readField }: any) {
          return existingTodos.filter((todoRef) => {
            return deleteTodo.id !== readField('id', todoRef);
          });
        },
      },
    });
  };

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface Props {
  todo: Todo;
}

const TodoItem: React.FC<Props> = ({ todo }) => {
  const [showModal, setShowModal] = useState(false);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO,{
    update: deleteTodoUpdateCache,
  });

  const handleUpdateTodo = (title: string) => {
    updateTodo({
      variables: {
        id: todo.id,
        title,
        completed: todo.completed
      }
    });
    setShowModal(false);
  };

  const handleToggleComplete = () => {
    updateTodo({
      variables: {
        id: todo.id,
        title: todo.title,
        completed: !todo.completed
      }
    });
  };

  const handleDeleteTodo = () => {
    deleteTodo({
      variables: {
        id: todo.id
      }
    });
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleComplete}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.title}
      </span>
      <button onClick={() => setShowModal(true)}>Edit</button>
      <button onClick={handleDeleteTodo}>Delete</button>
      {showModal && (
        <TodoModal
          todo={todo}
          showModal={showModal}
          setShowModal={setShowModal}
          handleUpdateTodo={handleUpdateTodo}
        />
      )}
    </div>
  );
}

export default TodoItem;
