import React, { useState } from 'react';
import './Todo.css';
import ToDoApp from './components/Todo';

interface listInterface {
    listName: string,
    display: boolean
}

const App: React.FC = () => {
    const [lists, setLists] = useState<listInterface>([]);
    const [inputListName, setInputListName] = useState('');

    const addList = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const newList = [ ...lists, { listName: inputListName, display: false }]
        setLists(newList);
    };

    const loadList = (i: number) => {
        const newList = [ ...lists ];
        newList.forEach( (list: listInterface, index:number) => {
            if (list.display == true) {
                list.display = false;
            }
        })
        newList[i].display = true;
        setLists(newList);
    }

    return (
        <div className="container"> 
            <h1>To Do App</h1>
            <p>Create a list:</p>
            <form>
                <label htmlFor="list">
                    <input type="text" name="list" id="list" onChange={e => setInputListName(e.target.value)}/>
                    <button onClick={addList}>Create List</button>
                </label>
            </form>
            
            <div className="listsContainer">
                {
                    lists.map( (list: listInterface, index:number) => 
                        (<button onClick={() => loadList(index)}>{list.listName}</button>)
                    )
                }
                {
                    lists.map( (list: listInterface, index:number) => {
                        if (list.display == true) {
                            return <ToDoApp list={list} /> 
                            console.log("List " + list.listName + " ordered");
                        }
                    })
                }
            </div>
        </div>
    );
}

export default App;