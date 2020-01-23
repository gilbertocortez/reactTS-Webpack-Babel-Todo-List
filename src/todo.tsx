import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './Todo.css';

const ViewTodo = ({todo, index}: { todo: string; index: number;}) => { 
    return(
        <div className="todo">
            <p className="todoItem">
                {todo} |
                <button> X </button> 
                <button> Completed </button>
            </p>
        </div>
    );
}

const ToDoApp: React.FC = () => {
    interface todosInterface {
        todo: string
    }
    const [todos, setTodos] = useState<todosInterface>([]);
    const [inputTodo, setInputTodo] = useState('');

    const addToDo = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const newTodos = [ ...todos, {todo: inputTodo} ];
        setTodos( newTodos );
    }

    return (
        <div>
            <h1>Your To Do list</h1>
            <form>
                <label htmlFor="toDo">
                    <input type="text" name="toDo" id="toDo" onChange={e => setInputTodo(e.target.value)}/>
                    <button onClick={addToDo}>Add to do</button>
                </label>
            </form>
            <div>{todos.map( (todo: todosInterface, index:number) => <ViewTodo todo={todo.todo} index={index}/>)}</div>
        </div>
    );
}

ReactDOM.render(<ToDoApp />, document.getElementById('root'));