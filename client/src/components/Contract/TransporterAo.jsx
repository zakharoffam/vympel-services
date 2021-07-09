import { useEffect, useState } from 'react';

import {
  Typography,
  Button,
  Box,
  LinearProgress,
} from '@material-ui/core';
 
import FilesUploader from './FileUploader';

export default function TransporterAo({ inn, prevStep, nextStep }) {
  const [allow, setAllow] = useState(false);
  const [requestStatus, setRequestStatus] = useState('idle');

  const [partnerDetails, setPartnerDetails] = useState({ message: null, files: [] });
  const [innCard, setInnCard] = useState({ message: null, files: [] });
  const [orrnCard, setOgrnCard] = useState({ message: null, files: [] });
  const [order, setOrder] = useState({ message: null, files: [] });
  const [charter, setCharter] = useState({ message: null, files: [] });
  

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
    for (let i = 0; i < orrnCard.files.length; i++) {
      formData.append(`Свидетельство ОГРН ${i + 1}`, orrnCard.files[i]);
    }
    for (let i = 0; i < order.files.length; i++) {
      formData.append(`Приказ о назначении ${i + 1}`, order.files[i]);
    }
    for (let i = 0; i < charter.files.length; i++) {
      formData.append(`Устав ${i + 1}`, charter.files[i]);
    }
    
    const res = await fetch(`http://${window.location.hostname}:8080/contract/${inn.value}`, {
      method: 'PUT',
      body: formData
    });

    const reqBody = await res.json();
    setRequestStatus(reqBody.result);
  };


  useEffect(function checkFields() {
    if (partnerDetails.files.length > 0 && innCard.files.length > 0 && orrnCard.files.length > 0 && order.files.length > 0 && charter.files.length > 0) {
      setAllow(true);
    } else {
      setAllow(false);
    }
  }, [partnerDetails, innCard, orrnCard, order, charter]);


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
          label="Свидетельство ОГРН"
          textHelper="Загрузите копию или фотографию свидетельства ОГРН партнера"
          required={true}
          multiple={false}
          store={orrnCard}
          setStore={setOgrnCard}
        />

        <FilesUploader
          label="Приказ"
          textHelper="Загрузите копию или фотографию приказа о назначении директора или права подписи"
          required={true}
          multiple={false}
          store={order}
          setStore={setOrder}
        />

        <FilesUploader
          label="Устав"
          textHelper="Загрузите копию или фотографию первой страницы Устава партнера"
          required={true}
          multiple={false}
          store={charter}
          setStore={setCharter}
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
