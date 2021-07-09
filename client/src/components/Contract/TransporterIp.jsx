import { useEffect, useState } from 'react';

import {
  Typography,
  Button,
  Box,
  LinearProgress,
} from '@material-ui/core';
 
import FilesUploader from './FileUploader';

export default function TransporterIp({ inn, prevStep, nextStep }) {
  const [allow, setAllow] = useState(false);
  const [requestStatus, setRequestStatus] = useState('idle');

  const [partnerDetails, setPartnerDetails] = useState({ message: null, files: [] });
  const [innCard, setInnCard] = useState({ message: null, files: [] });
  const [passport1, setPassport1] = useState({ message: null, files: [] });
  const [passport2, setPassport2] = useState({ message: null, files: [] });
  
  const submitForm = async (event) => {
    event.preventDefault();
    
    setAllow(false);
    setRequestStatus('loading');

    const formData = new FormData();

    for (let i = 0; i < partnerDetails.files.length; i++) {
      formData.append(`Реквизиты партнера ${i + 1}`, partnerDetails.files[i]);
    }
    for (let i = 0; i < innCard.files.length; i++) {
      formData.append(`Свидетельство ИНН ${i + 1}`, innCard.files[i]);
    }
    for (let i = 0; i < passport1.files.length; i++) {
      formData.append(`Паспорт (основная) ${i + 1}`, passport1.files[i]);
    }
    for (let i = 0; i < passport2.files.length; i++) {
      formData.append(`Паспорт (прописка) ${i + 1}`, passport2.files[i]);
    }
    
    const res = await fetch(`http://${window.location.hostname}:8080/contract/${inn.value}`, {
      method: 'PUT',
      body: formData
    });

    const reqBody = await res.json();
    setRequestStatus(reqBody.result);
  };

  useEffect(function checkFields() {
    if (partnerDetails.files.length > 0 && innCard.files.length > 0 && passport1.files.length > 0 && passport2.files.length > 0 ) {
      setAllow(true);
    } else {
      setAllow(false);
    }
  }, [partnerDetails, innCard, passport1, passport2]);

  useEffect(function next() {
    if (requestStatus === 'success') nextStep();
  }, [requestStatus, nextStep]);


  return (
    <Box>
      <form onSubmit={submitForm}>
        <FilesUploader
          label="Реквизиты партрнера"
          textHelper="Загрузите карту партнера"
          required={true}
          multiple={false}
          store={partnerDetails}
          setStore={setPartnerDetails}
        />

        <FilesUploader
          label="Свидетельство ИНН"
          textHelper="Загрузите копию или фотографию свидетельства ИНН партнера"
          required={true}
          multiple={false}
          store={innCard}
          setStore={setInnCard}
        />

        <FilesUploader
          label="Паспорт (первая страница)"
          textHelper="Загрузите копию или фотографию первой страницы паспорта партнера"
          required={true}
          multiple={false}
          store={passport1}
          setStore={setPassport1}
        />

        <FilesUploader
          label="Паспорт (страница прописки)"
          textHelper="Загрузите копию или фотографию страницы прописки паспорта партнера"
          required={true}
          multiple={false}
          store={passport2}
          setStore={setPassport2}
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
