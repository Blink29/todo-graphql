import './App.css'
import { ApolloProvider } from '@apollo/client'
import {client} from './apolloClient'
import TodoList from './pages/TodoList';


function App() {

  return (
    <ApolloProvider client={client}>
      <div>
        <h1>Todo List</h1>
        <TodoList />
      </div>
    </ApolloProvider>
  );
  
}

export default App
