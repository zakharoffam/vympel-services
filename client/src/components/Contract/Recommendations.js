import { useEffect, useState } from 'react';

import {
  Typography,
  TextField,
  Button,
  Box,
  LinearProgress,
  Divider,
} from '@material-ui/core';

import FilesUploader from './FileUploader';

export default function Recommendations({ inn, prevStep, nextStep }) {
  const [allow, setAllow] = useState(false);
  const [requestStatus, setRequestStatus] = useState('idle');

  const [name1, setName1] = useState({ message: null, value: '' });
  const [fio1, setFio1] = useState({ message: null, value: '' });
  const [tel1, setTel1] = useState({ message: null, value: '' });

  const [name2, setName2] = useState({ message: null, value: '' });
  const [fio2, setFio2] = useState({ message: null, value: '' });
  const [tel2, setTel2] = useState({ message: null, value: '' });

  const [name3, setName3] = useState({ message: null, value: '' });
  const [fio3, setFio3] = useState({ message: null, value: '' });
  const [tel3, setTel3] = useState({ message: null, value: '' });

  const [extraFiles, setExtraFiles] = useState({ message: null, files: [] });


  const submitForm = async (event) => {
    event.preventDefault();
    setAllow(false);
    setRequestStatus('loading');

    const formData = new FormData();
    formData.append('Рекомендация 1 название', name1.value);
    formData.append('Рекомендация 1 имя', fio1.value);
    formData.append('Рекомендация 1 телефон', tel1.value);
    formData.append('Рекомендация 2 название', name2.value);
    formData.append('Рекомендация 2 имя', fio2.value);
    formData.append('Рекомендация 2 телефон', tel2.value);
    formData.append('Рекомендация 3 название', name3.value);
    formData.append('Рекомендация 3 имя', fio3.value);
    formData.append('Рекомендация 3 телефон', tel3.value);
    formData.append('FINISH', 1);

    for (let i = 0; i < extraFiles.files.length; i++) {
      formData.append('Трудовой договор', extraFiles.files[i]);
    }

    const res = await fetch(`http://${window.location.hostname}:8080/contract/${inn.value}`, {
      method: 'PUT',
      body: formData
    });

    const reqBody = await res.json();
    setRequestStatus(reqBody.result);
  };


  useEffect(function checkFields() {
    if (name1.value.length > 1 && fio1.value.length > 1 && tel1.value.length > 1 && name2.value.length > 1 && fio2.value.length > 1 && tel2.value.length > 1) {
      setAllow(true);
    } else {
      setAllow(false);
    }
  }, [name1.value, fio1.value, tel1.value, name2.value, fio2.value, tel2.value]);


  useEffect(function next() {
    if (requestStatus === 'success') nextStep();
  }, [requestStatus, nextStep]);


  return (
    <Box>
      <form onSubmit={submitForm}>

        <Divider style={{ marginTop: 16, marginBottom: 16 }} />
        <Typography variant="body1"><b>Рекомендации 1</b></Typography>
        <TextField
          style={{ marginTop: 16 }}
          variant="outlined"
          fullWidth
          label="Название фирмы участника АТИ"
          type="text"
          required
          value={name1.value}
          error={name1.message}
          helperText={name1.message}
          onChange={(event) => {
            setName1({
              message: null,
              value: event.target.value
            });
          }}
        />

        <TextField
          style={{ marginTop: 16 }}
          variant="outlined"
          fullWidth
          label="ФИО контактного лица"
          type="text"
          required
          value={fio1.value}
          error={fio1.message}
          helperText={fio1.message}
          onChange={(event) => {
            setFio1({
              message: null,
              value: event.target.value
            });
          }}
        />

        <TextField
          style={{ marginTop: 16 }}
          variant="outlined"
          fullWidth
          label="Телефон контактного лица"
          type="text"
          required
          value={tel1.value}
          error={tel1.message}
          helperText={tel1.message}
          onChange={(event) => {
            setTel1({
              message: null,
              value: event.target.value
            });
          }}
        />

        <Divider style={{ marginTop: 16, marginBottom: 16 }} />
        <Typography variant="body1"><b>Рекомендации 2</b></Typography>
        <TextField
          style={{ marginTop: 16 }}
          variant="outlined"
          fullWidth
          label="Название фирмы участника АТИ"
          type="text"
          required
          value={name2.value}
          error={name2.message}
          helperText={name2.message}
          onChange={(event) => {
            setName2({
              message: null,
              value: event.target.value
            });
          }}
        />

        <TextField
          style={{ marginTop: 16 }}
          variant="outlined"
          fullWidth
          label="ФИО контактного лица"
          type="text"
          required
          value={fio2.value}
          error={fio2.message}
          helperText={fio2.message}
          onChange={(event) => {
            setFio2({
              message: null,
              value: event.target.value
            });
          }}
        />

        <TextField
          style={{ marginTop: 16 }}
          variant="outlined"
          fullWidth
          label="Телефон контактного лица"
          type="text"
          required
          value={tel2.value}
          error={tel2.message}
          helperText={tel2.message}
          onChange={(event) => {
            setTel2({
              message: null,
              value: event.target.value
            });
          }}
        />

        <Divider style={{ marginTop: 16, marginBottom: 16 }} />
        <Typography variant="body1"><b>Рекомендации 3</b></Typography>
        <TextField
          style={{ marginTop: 16 }}
          variant="outlined"
          fullWidth
          label="Название фирмы участника АТИ"
          type="text"
          value={name3.value}
          error={name3.message}
          helperText={name3.message}
          onChange={(event) => {
            setName3({
              message: null,
              value: event.target.value
            });
          }}
        />

        <TextField
          style={{ marginTop: 16 }}
          variant="outlined"
          fullWidth
          label="ФИО контактного лица"
          type="text"
          value={fio3.value}
          error={fio3.message}
          helperText={fio3.message}
          onChange={(event) => {
            setFio3({
              message: null,
              value: event.target.value
            });
          }}
        />

        <TextField
          style={{ marginTop: 16 }}
          variant="outlined"
          fullWidth
          label="Телефон контактного лица"
          type="text"
          value={tel3.value}
          error={tel3.message}
          helperText={tel3.message}
          onChange={(event) => {
            setTel3({
              message: null,
              value: event.target.value
            });
          }}
        />

        <FilesUploader
          label="Дополнительный файлы"
          textHelper="Можете загрузить дополнительные файлы при необходимости"
          required={false}
          multiple={true}
          store={extraFiles}
          setStore={setExtraFiles}
        />

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
