import { useEffect, useState } from 'react';

import {
  Typography,
  TextField,
  Button,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
  LinearProgress,
  Link,
} from '@material-ui/core';


export default function Partner({ logist, partnerType, setPartnerType, inn, setInn, nextStep }) {
  const [allow, setAllow] = useState(false);
  const [requestStatus, setRequestStatus] = useState('idle');
  
  const [name, setName] = useState({ message: null, value: '' });
  const [codeAti, setCodeAti] = useState({ message: null, value: '' });
  const [lenInn, setLetInn] = useState(12);
  const [check, setCheck] = useState(false);

  const submitForm = async (event) => {
    event.preventDefault();
    setAllow(false);
    setRequestStatus('loading');
    const formData = new FormData();
    formData.append('Логист', `${logist}`);
    formData.append('Название партнера', name.value);
    formData.append('Код АТИ', codeAti.value);
    formData.append('ИНН партнера', inn.value);
    formData.append('Форма собственности партнера', partnerType);

    const res = await fetch(`http://${window.location.hostname}:8080/contract/${inn.value}`, {
      method: 'PUT',
      body: formData,
    });

    const reqBody = await res.json();
    setRequestStatus(reqBody.result);
  };


  useEffect(function resetInn() {
    if (partnerType === 'ИП') setLetInn(12);
    else setLetInn(10);
    setInn({ message: null, value: '' });
  }, [partnerType, setLetInn, setInn]);


  useEffect(function checkInn() {
    if (inn.value.length > 0 && inn.value.length !== lenInn) {
      setInn({ message: `ИНН должен состоять из ${lenInn} цифр!`, value: inn.value });
    } else {
      setInn({ message: null, value: inn.value });
    }
  }, [inn.value, lenInn, setInn]);


  useEffect(function checkFields() {
    if (name.value.length > 1 && codeAti.value.length > 1 && inn.value.length === lenInn && check) {
      setAllow(true);
    } else {
      setAllow(false);
    }
  }, [name.value, codeAti.value, inn.value, lenInn, check]);


  useEffect(function next() {
    if (requestStatus === 'success') nextStep();
  }, [requestStatus, nextStep]);


  return (
    <Box>
      <form onSubmit={submitForm}>
        <FormControl component="fieldset" style={{ marginTop: 16 }}>
          <FormLabel component="legend">Форма собственности партнера</FormLabel>
          <RadioGroup aria-label="gender" name="gender1" value={partnerType} onChange={(event) => setPartnerType(event.target.value)}>
            <FormControlLabel value="ИП" control={<Radio />} label="ИП" />
            <FormControlLabel value="ООО или АО" control={<Radio />} label="ООО или АО" />
          </RadioGroup>
        </FormControl>

        <TextField
          style={{ marginTop: 16 }}
          variant="outlined"
          fullWidth
          label="Название партнера"
          type="text"
          required
          value={name.value}
          error={name.message}
          helperText={name.message}
          onChange={(event) => {
            setName({
              message: null,
              value: event.target.value
            });
          }}
        />

        <TextField
          style={{ marginTop: 16 }}
          variant="outlined"
          fullWidth
          label="Код АТИ"
          type="text"
          required
          value={codeAti.value}
          error={codeAti.message}
          helperText={codeAti.message}
          onChange={(event) => {
            setCodeAti({
              message: null,
              value: event.target.value
            });
          }}
        />

        <TextField
          style={{ marginTop: 16 }}
          variant="outlined"
          fullWidth
          label="ИНН"
          type="text"
          required
          value={inn.value}
          error={inn.message}
          helperText={inn.message}
          onChange={(event) => {
            setInn({
              message: null,
              value: event.target.value.replace(/\D/g, '').slice(0, lenInn)
            });
          }}
        />

        <Typography style={{ marginTop: 16 }} variant="body1">
          <Link href="/pers" target="_blank">Политика обработки персональных данных</Link>
        </Typography>

        <FormControlLabel
          control={
            <Checkbox
              checked={check}
              onChange={() => setCheck(check ? false : true)}
              name="checkedB"
              color="primary"
            />
          }
          label="Согласие на обработку персональных данных"
        />
        <br/>

        {requestStatus === 'loading' && (
          <Box style={{ marginTop: 16 }}>
            <LinearProgress />
            <Typography variant="body2">Отправка данных...</Typography>
          </Box>
        )}

        <Button
          type="submit"
          style={{ marginTop: 16 }}
          variant="contained"
          color="primary"
          disabled={!allow}
        >
          Далее
        </Button>

      </form>
    </Box>
  )
}
