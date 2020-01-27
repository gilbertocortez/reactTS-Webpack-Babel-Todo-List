import React, { useState, useEffect } from 'react';
import ViewTodo from './ViewTodo';

interface todosInterface {
    todo: string,
    completed: boolean
}
interface listInterface {
    listName: string,
    display: boolean
}

const ToDoApp = ({list}: {list: listInterface}) => {
    const [todos, setTodos] = useState<todosInterface>([]);
    const [inputTodo, setInputTodo] = useState('');
    let retrievedTodosFromStorage = [{}];
    
    useEffect(() => {
        const jsonCode = JSON.stringify(todos);
        if (localStorage.getItem(list.listName) === null) {
            // Put the object into storage
            localStorage.setItem(list.listName, jsonCode);
            console.log("Clear data stored");
        } else {
            // Retrieve the object from storage
            let retrievedObject: any|string = localStorage.getItem(list.listName);
            if ( jsonCode == retrievedObject) {
                //console.log("Same data");
            } else {
                if (jsonCode != "[]" ) {localStorage.setItem(list.listName, jsonCode);}
                retrievedObject = localStorage.getItem(list.listName);
                updateTodosFromLocalStorage(retrievedObject);
            }
        }
        
    }, [todos]); 

    const updateTodosFromLocalStorage = (newTodosJson: string | any) => {
        //console.log(todos);
        const newTodos = JSON.parse(newTodosJson);
        //console.log(newTodos);
        setTodos(newTodos);
        console.log(todos);
    }

    const addToDo = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const newTodos = [ ...todos, {todo: inputTodo, completed: false } ];
        setTodos( newTodos );
    }

    const removeTodo = (index:number) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };
    
    const completeTodo = (index:number) => {
        const newTodos = [...todos];
        newTodos[index].completed = true;
        setTodos(newTodos);
    };
    
    return (
        <div className="todosContainer">
            <h1>First List: {list.listName} </h1>
            <form>
                <label htmlFor="toDo">
                    <input type="text" name="toDo" id="toDo" onChange={e => setInputTodo(e.target.value)}/>
                    <button onClick={addToDo}>Add to do</button>
                </label>
            </form>
            <div> 
                {
                    todos.map( 
                        (todo: todosInterface, index:number) => 
                            <ViewTodo 
                                todo={todo} 
                                index={index}
                                completeTodo={completeTodo}
                                removeTodo={removeTodo}
                            />
                    )
                }
            </div>
        </div>
    );
}

export default ToDoApp;