import { useEffect, useState } from 'react';

import {
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  img: {
    textAlign: 'center'
  },
}));


export default function Pers() {
  const classes = useStyles();
  
  const [text, setText] = useState('Загрузка...');

  useEffect(() => {
    fetch('../pers.txt')
      .then((response) => {
        response.text().then((data) => {
          setText(data);
        })
      })
      .catch((err) => {
        console.error(err);
      })
  });

  return (
    <div className={classes.root}>
      <p className={classes.img}>
        <img src="../logo.png" alt="logo" height="100" />
      </p>
      <TextField
        fullWidth
        multiline
        variant="filled"
        value={text}
      />
    </div>
  );
}
