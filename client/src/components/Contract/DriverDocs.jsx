import { useEffect, useState } from 'react';

import {
  Typography,
  TextField,
  Button,
  Box,
  LinearProgress,
} from '@material-ui/core';
 
import FilesUploader from './FileUploader';

export default function DriverDocs({ inn, prevStep, nextStep }) {
  const [allow, setAllow] = useState(false);
  const [requestStatus, setRequestStatus] = useState('idle');

  const [numberPass, setNumberPass] = useState({ message: null, value: '' });
  const [pass1, setPass1] = useState({ message: null, files: [] });
  const [pass2, setPass2] = useState({ message: null, files: [] });
  const [driverOrder, setDriverOrder] = useState({ message: null, files: [] });
  const [order, setOrder] = useState({ message: null, files: [] });
  

  const submitForm = async (event) => {
    event.preventDefault();
    
    setAllow(false);
    setRequestStatus('loading');

    const formData = new FormData();
    formData.append(`Серия и номер паспорта водителя`, numberPass.value);

    for (let i = 0; i < pass1.files.length; i++) {
      formData.append(`Паспорт водителя (первая страница) ${i + 1}`, pass1.files[i]);
    }
    for (let i = 0; i < pass2.files.length; i++) {
      formData.append(`Паспорт водителя (прописка) ${i + 1}`, pass2.files[i]);
    }
    for (let i = 0; i < driverOrder.files.length; i++) {
      formData.append(`Водительское удостоверение ${i + 1}`, driverOrder.files[i]);
    }
    for (let i = 0; i < order.files.length; i++) {
      formData.append(`Трудовой договор ${i + 1}`, order.files[i]);
    }
    
    const res = await fetch(`http://${window.location.hostname}:8080/contract/${inn.value}`, {
      method: 'PUT',
      body: formData
    });

    const reqBody = await res.json();
    setRequestStatus(reqBody.result);
  };


  useEffect(function checkFields() {
    if (numberPass.value.length > 5 && pass1.files.length > 0 && pass2.files.length > 0 && driverOrder.files.length > 0)  {
      setAllow(true);
    } else {
      setAllow(false);
    }
  }, [numberPass, pass1, pass2, driverOrder]);


  useEffect(function next() {
    if (requestStatus === 'success') nextStep();
  }, [requestStatus, nextStep]);


  return (
    <Box>
      <form onSubmit={submitForm}>

        <TextField
          style={{ marginTop: 16 }}
          variant="outlined"
          fullWidth
          label="Серия и номер паспорта"
          type="text"
          required
          value={numberPass.value}
          error={numberPass.message}
          helperText={numberPass.message}
          onChange={(event) => {
            setNumberPass({
              message: null,
              value: event.target.value
            });
          }}
        />

        <FilesUploader
          label="Паспорт водителя (первая страница)"
          textHelper="Загрузите копию первой страницы паспорт водителя"
          required={true}
          multiple={false}
          store={pass1}
          setStore={setPass1}
        />

        <FilesUploader
          label="Паспорт водителя (прописка)"
          textHelper="Загрузите копию страницы прописки паспорта водителя"
          required={true}
          multiple={false}
          store={pass2}
          setStore={setPass2}
        />

        <FilesUploader
          label="Водительское удостоверение"
          textHelper="Загрузите копию водительского удостоверения"
          required={true}
          multiple={true}
          store={driverOrder}
          setStore={setDriverOrder}
        />

        <FilesUploader
          label="Трудовой договор"
          textHelper="Загрузите копию трудового договора водитель, если есть."
          required={false}
          multiple={true}
          store={order}
          setStore={setOrder}
        />

        {requestStatus === 'loading' && (
          <Box style={{ marginTop: 16 }}>
            <LinearProgress />
            <Typography variant="body2">Отправка данных...</Typography>
          </Box>
        )}

        {/* <Button
          style={{ marginTop: 16, marginRight: 16 }}
          variant="contained"
          color="default"
          onClick={prevStep}
        >
          Назад
        </Button> */}

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
