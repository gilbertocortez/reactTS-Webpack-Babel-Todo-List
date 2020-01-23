import React from 'react';

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

export default ViewTodo;