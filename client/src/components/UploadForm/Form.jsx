import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box, Button,
  Checkbox,
  FormControl, FormControlLabel,
  Link,
  Step, StepContent, StepLabel, Stepper,
  TextField,
  Typography,
  FormLabel,
  RadioGroup, Radio
} from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    width: '100%',
  },
  logo: {
    textAlign: 'center',
  },
  formControl: {
    marginBottom: theme.spacing(2),
  },
  uniField: {
    marginBottom: theme.spacing(2),
  },
  buttonPrev: {
    marginRight: theme.spacing(2),
  }
}));


export default function Form() {
  const classes = useStyle();
  const strSearch = String(window.location.search);

  const [step, setStep] = useState(0);
  const steps = ['Основные данные', 'Перевозчик'];

  const [logist, setLogist] = useState({
    title: 'Логист',
    name: 'logist',
    step: 0,
    value: '',
    required: true,
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  });
  const [partnerName, setPartnerName] = useState({
    title: 'Название партнера',
    name: 'partnerName',
    step: 0,
    value: '',
    required: true,
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  });
  const [codeAti, setCodeAti] = useState({
    title: 'Код АТИ',
    name: 'codeAti',
    step: 0,
    value: '',
    required: true,
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  });
  const [inn, setInn] = useState({
    title: 'ИНН партнера',
    name: 'inn',
    step: 0,
    value: '',
    required: true,
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  });
  const [ownershipType, setOwnershipType] = useState({
    title: 'Форма собственности партнера',
    name: 'ownershipType',
    step: 0,
    value: 'ИП',
    required: true,
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  });
  const [partnerRequisites, setPartnerRequisites] = useState({
    title: 'Реквизиты партнера',
    name: 'partnerRequisites',
    step: 1,
    value: null,
    required: true,
    multiple: true,
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  });
  const [certificateInn, setCertificateInn] = useState({
    title: 'Свидетельство ИНН',
    name: 'certificateInn',
    step: 1,
    value: null,
    required: true,
    multiple: false,
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  });
  const [consentToPersonalDataProcessing, setConsentToPersonalDataProcessing] = useState(false);
  const [ipPassport1, setIpPassport1] = useState({
    title: 'Паспорт (основная страница)',
    name: 'ipPassport1',
    step: 1,
    value: null,
    required: true,
    multiple: false,
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  });
  const [ipPassport2, setIpPassport2] = useState({
    title: 'Паспорт (прописка)',
    name: 'ipPassport2',
    step: 1,
    value: null,
    required: true,
    multiple: false,
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  });
  const [certificateOgrn, setCertificateOgrn] = useState({
    title: 'Свидетельство ОГРН',
    name: 'certificateOgrn',
    step: 1,
    value: null,
    required: true,
    multiple: false,
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  });
  const [appointmentOrder, setAppointmentOrder] = useState({
    title: 'Приказ о назначении',
    name: 'appointmentOrder',
    step: 1,
    value: null,
    required: true,
    multiple: false,
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  });
  const [charter, setCharter] = useState({
    title: 'Устав',
    name: 'charter',
    step: 1,
    value: null,
    required: true,
    multiple: true,
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  });



  useEffect(function initFields() {
    if (strSearch.length) {
      // TODO: Здесь будут обрабатываться входящие параметры запроса
    }
  }, [strSearch.length]);



  function nextStep(currentStep) {
    setStep(step + 1);
  }

  function prevStep(currentStep) {
    setStep(step - 1);
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.logo}>
        <img src={'../logo.png'} alt={'logo'} height={100} />
        <Typography variant={'h6'}>
          Форма загрузки документов для заключения договора с ТЭК "Вымпел"
        </Typography>
      </Box>
      <Stepper activeStep={step} orientation={'vertical'}>
        {steps.map((currentStep) => (
          <Step key={currentStep.index + currentStep}>
            <StepLabel>{currentStep}</StepLabel>
            <StepContent>
              <Box>
                {step === 0 && (
                  <Box>
                    <FormControl component="fieldset" style={{ marginTop: 16 }}>
                      <FormLabel component="legend">Форма собственности партнера</FormLabel>
                      <RadioGroup
                        aria-label="gender"
                        name="gender1"
                        value={ownershipType.value}
                        onChange={(event) => {
                          setInn({...inn, value: ''});
                          setOwnershipType({...ownershipType, value: event.target.value});
                        }}
                      >
                        <FormControlLabel value="ИП" control={<Radio />} label="ИП" />
                        <FormControlLabel value="ООО или АО" control={<Radio />} label="ООО или АО" />
                      </RadioGroup>
                    </FormControl>
                    <TextField
                      className={classes.uniField}
                      variant={'outlined'}
                      fullWidth
                      label={logist.title}
                      type={'text'}
                      required={logist.required}
                      value={logist.value}
                      error={logist.error}
                      helperText={logist.errorMessage}
                      onChange={(event) => {
                        setLogist({...logist, value: event.target.value});
                      }}
                    />
                    <TextField
                      className={classes.uniField}
                      variant={'outlined'}
                      fullWidth
                      label={partnerName.title}
                      type={'text'}
                      required={partnerName.required}
                      value={partnerName.value}
                      error={partnerName.error}
                      helperText={partnerName.errorMessage}
                      onChange={(event) => {
                        setPartnerName({...partnerName, value: event.target.value});
                      }}
                    />
                    <TextField
                      className={classes.uniField}
                      variant={'outlined'}
                      fullWidth
                      label={codeAti.title}
                      type={'text'}
                      required={codeAti.required}
                      value={codeAti.value}
                      error={codeAti.error}
                      helperText={codeAti.errorMessage}
                      onChange={(event) => {
                        setCodeAti({...codeAti, value: event.target.value});
                      }}
                    />
                    <TextField
                      className={classes.uniField}
                      variant={'outlined'}
                      fullWidth
                      label={inn.title}
                      type={'text'}
                      required={inn.required}
                      value={inn.value}
                      error={inn.error}
                      helperText={inn.errorMessage}
                      onChange={(event) => {
                        const maxChar = ownershipType.value === 'ИП' ? 12 : 10;
                        const value = event.target.value.replace(/\D/g, '').slice(0, maxChar);
                        setInn({...inn, value: value});
                      }}
                    />
                    <Box className={classes.uniField}>
                      <Link
                        href={'/pers'}
                        target={'_blank'}
                      >
                        <Typography>
                          Политика обработки персональных данных
                        </Typography>
                      </Link>
                    </Box>
                    <Box className={classes.uniField}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={consentToPersonalDataProcessing}
                            onChange={() => setConsentToPersonalDataProcessing(
                              !consentToPersonalDataProcessing
                            )}
                            name={'checkedB'}
                            color={'primary'}
                          />
                        }
                        label={'Согласие на обработку персональных данных'}
                      />
                    </Box>
                  </Box>
                )}
                {step === 1 && (
                  <Box>

                  </Box>
                )}



                {step !== 0 && (
                  <Button
                    className={classes.buttonPrev}
                    variant={'contained'}
                    color={'primary'}
                    onClick={() => prevStep(step)}
                  >
                    Назад
                  </Button>
                )}

                {step !== steps.length - 1 && (
                  <Button
                    variant={'contained'}
                    color={'primary'}
                    disabled={!consentToPersonalDataProcessing}
                    onClick={() => nextStep(step)}
                  >
                    Далее
                  </Button>
                )}

              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>

    </Box>
  )
}