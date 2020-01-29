import React, { useState, useEffect } from 'react';
import './Todo.css';
import ToDoApp from './components/Todo';

interface listInterface {
    listName: string,
    display: boolean
}

const App: React.FC = () => {
    const [lists, setLists] = useState<listInterface>([]);
    const [inputListName, setInputListName] = useState('');
    
    // Work on deleting lists, can get current from 
    //console.log(JSON.stringify(localStorage));

    const addList = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // Prevent defaul behavior, do not submit to a new page
        e.preventDefault();
        const newList = [ ...lists, { listName: inputListName, display: false }]
        setLists(newList);
    };

    const deleteList = (i: number) => {
        // Duplicate lists prop to a new const
        const newList = [ ...lists ];
        
        // Check to see if list is stored on local storage
        if (localStorage.getItem(newList[i].listName) != null) {
            localStorage.removeItem(newList[i].listName);
            //console.log("List " + newList[i].listName + " removed")
        }

        // Remove current list from newList
        newList.splice( i, 1 );
        // Set newList to lists props
        setLists(newList);
        
    }

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
    
    useEffect(() => {
        const localStorageLists = JSON.stringify(localStorage);
        const localStorageListsObj = JSON.parse(localStorageLists);
        //console.log(localStorageListsObj)

        const listsEntries = Object.entries(localStorageListsObj);
        let newList = [ ...lists ];
        listsEntries.map( (listEntry, index) => {
            if (listEntry[0] == "loglevel:webpack-dev-server") { }
            else newList.push({ listName: listEntry[0], display: false })
        });

        const listsPropsString = JSON.stringify(lists);
        setLists(newList);
        console.log(newList)
        console.log(lists)
    }, []);


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
                        (
                            <div>
                                List Name: {list.listName} 
                                <button onClick={() => loadList(index)}>View</button>
                                <button onClick={() => deleteList(index)}>Delete</button>
                            </div>
                        
                        )
                    )
                } {
                    lists.reduce(
                        (filteredLists: Array<JSX.Element>, list: listInterface) => {
                            if (list.display) {
                                filteredLists.push(<ToDoApp list={list} />);
                            }
                            return filteredLists
                        }
                        , []
                    )
                }
            </div>
        </div>
    );
}

export default App;