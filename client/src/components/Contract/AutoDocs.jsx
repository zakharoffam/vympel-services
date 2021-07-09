import { useEffect, useState } from 'react';

import {
  Typography,
  TextField,
  Button,
  Box,
  LinearProgress,
} from '@material-ui/core';
 
import FilesUploader from './FileUploader';

export default function AutoDocs({ inn, prevStep, nextStep }) {
  const [allow, setAllow] = useState(false);
  const [requestStatus, setRequestStatus] = useState('idle');

  const [number, setNumber] = useState({ message: null, value: '' });
  const [ptsAuto, setPtsAuto] = useState({ message: null, files: [] });
  const [ptsPric, setPtsPric] = useState({ message: null, files: [] });
  const [lease, setLease] = useState({ message: null, files: [] });
  

  const submitForm = async (event) => {
    event.preventDefault();
    
    setAllow(false);
    setRequestStatus('loading');

    const formData = new FormData();
    formData.append('Гос. номер ТС', number.value);

    for (let i = 0; i < ptsAuto.files.length; i++) {
      formData.append(`ПТС или СРТС ТС ${i + 1}`, ptsAuto.files[i]);
    }
    for (let i = 0; i < ptsPric.files.length; i++) {
      formData.append(`ПТС или СРТС прицепа ${i + 1}`, ptsPric.files[i]);
    }
    for (let i = 0; i < lease.files.length; i++) {
      formData.append(`Договор аренды ТС ${i + 1}`, lease.files[i]);
    }
    
    const res = await fetch(`http://${window.location.hostname}:8080/contract/${inn.value}`, {
      method: 'PUT',
      body: formData
    });

    const reqBody = await res.json();
    setRequestStatus(reqBody.result);
  };


  useEffect(function checkFields() {
    if (number.value.length > 5 && ptsAuto.files.length > 0) {
      setAllow(true);
    } else {
      setAllow(false);
    }
  }, [number, ptsAuto]);


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
          label="Гос. номер ТС"
          type="text"
          required
          value={number.value}
          error={number.message}
          helperText={number.message}
          onChange={(event) => {
            setNumber({
              message: null,
              value: event.target.value
            });
          }}
        />

        <FilesUploader
          label="ПТС или СРТС ТС"
          textHelper="Загрузите ПТС или СРТС ТС"
          required={true}
          multiple={true}
          store={ptsAuto}
          setStore={setPtsAuto}
        />

        <FilesUploader
          label="ПТС или СРТС прицепа"
          textHelper="Загрузите копию ПТС или СРТС прицепа, если он есть."
          required={false}
          multiple={true}
          store={ptsPric}
          setStore={setPtsPric}
        />

        <FilesUploader
          label="Договор аренды ТС"
          textHelper="Загрузите копию договора аренды ТС"
          required={false}
          multiple={true}
          store={lease}
          setStore={setLease}
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
