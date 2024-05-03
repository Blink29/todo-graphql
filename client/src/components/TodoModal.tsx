import React, { useState } from 'react';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface Props {
  todo: Todo;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateTodo: (title: string) => void;
}

const TodoModal: React.FC<Props> = ({ todo, showModal, setShowModal, handleUpdateTodo }) => {
  const [title, setTitle] = useState(todo.title);

  const handleSubmit = () => {
    handleUpdateTodo(title);
  };

  return (
    <div>
      <div>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={() => setShowModal(false)}>Cancel</button>
      </div>
    </div>
  );
}

export default TodoModal;
