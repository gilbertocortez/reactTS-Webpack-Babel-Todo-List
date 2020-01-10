import React from 'react';
import TextField from '@material-ui/core/TextField';

const addForm = ({ saveTodo }) => {
  return (
    <form>
      <TextField variant="outlined" placeholder="Add todo" margin="normal" />
    </form>
  );
};

export default addForm;