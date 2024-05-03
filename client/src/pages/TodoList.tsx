import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TODOS } from '../graphql/queries';
import { CREATE_TODO } from '../graphql/mutations';
import TodoItem from '../components/TodoItem';

const TodoList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [title, setTitle] = useState('');
  const [createTodo] = useMutation(CREATE_TODO);
  const [filter, setFilter] = useState('all'); 

  const handleSubmit = () => {
    if (title.trim() === '') return;
    createTodo({
      variables: {
        title
      },
      refetchQueries: [{ query: GET_TODOS }]
    });
    setTitle('');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  let filteredTodos = data.todos;
  if (filter === 'completed') {
    filteredTodos = data.todos.filter((todo: any) => todo.completed);
  } else if (filter === 'uncompleted') {
    filteredTodos = data.todos.filter((todo: any) => !todo.completed);
  }

  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button type="submit">Add Todo</button>
      </form>
      <div>
        <button onClick={() => setFilter('all')}>All Todos</button>
        <button onClick={() => setFilter('completed')}>Completed Todos</button>
        <button onClick={() => setFilter('uncompleted')}>Uncompleted Todos</button>
      </div>
      {filteredTodos.map((todo: any) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

export default TodoList;
