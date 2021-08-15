import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box, Button,
  Checkbox,
  FormControl, FormControlLabel,
  InputAdornment,
  Link,
  Step, StepContent, StepLabel, Stepper,
  TextField,
  Typography,
  FormLabel,
  RadioGroup, Radio, LinearProgress
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
  },
  progressBar: {
    width: 300,
  },
}));


export default function Form() {
  const classes = useStyle();
  const strSearch = String(window.location.search);
  const [isDefaultForm, setIsDefaultForm] = useState(true);

  const [step, setStep] = useState(0);
  const steps = [
    'Основные данные',
    'Данные перевозчика',
    'Документы на автомобиль',
    'Документы водителя',
    'Рекомендации',
    'Отправлено'
  ];

  const [logist, setLogist] = useState({
    title: 'Логист',
    name: 'logist',
    need: false,
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
    need: false,
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
    need: false,
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
    need: false,
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
    need: false,
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
    need: false,
    description: 'Загрузите карту партнера или реквизиты',
    step: 1,
    value: [],
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
    need: false,
    description: 'Загрузите копию свидетельства ИНН партнера',
    step: 1,
    value: [],
    required: true,
    multiple: false,
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  });
  const [consentToPersonalDataProcessing, setConsentToPersonalDataProcessing] = useState(false);
  const [ipPassport1, setIpPassport1] = useState({
    title: 'Паспорт ИП (основная страница)',
    name: 'ipPassport1',
    need: false,
    description: 'Загрузите копию основной страницы паспорт ИП',
    step: 1,
    value: [],
    required: true,
    multiple: false,
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  });
  const [ipPassport2, setIpPassport2] = useState({
    title: 'Паспорт ИП (прописка)',
    name: 'ipPassport2',
    need: false,
    description: 'Загрузите копию страницы с пропиской паспорт ИП',
    step: 1,
    value: [],
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
    need: false,
    description: 'Загрузите копию страницы с пропиской паспорт ИП',
    step: 1,
    value: [],
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
    need: false,
    description: 'Загрузите копию страницы с пропиской паспорт ИП',
    step: 1,
    value: [],
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
    need: false,
    description: 'Загрузите копию страницы с пропиской паспорт ИП',
    step: 1,
    value: [],
    required: true,
    multiple: true,
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  });
  const [transportGosNumber, setTransportGosNumber] = useState({
    title: 'Государственный номер ТС',
    name: 'transportGosNumber',
    need: false,
    step: 2,
    value: '',
    required: true,
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  });
  const [transportPts, setTransportPts] = useState({
    title: 'ПТС или СРТС ТС',
    name: 'transportPts',
    need: false,
    description: 'Загрузите копию ПТС или СРТС ТС',
    step: 2,
    value: [],
    required: true,
    multiple: true,
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  });
  const [trailerPts, setTrailerPts] = useState({
    title: 'ПТС или СРТС прицепа',
    name: 'trailerPts',
    need: false,
    description: 'Загрузите копию ПТС или СРТС прицепа',
    step: 2,
    value: [],
    required: true,
    multiple: true,
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  });
  const [vehicleRentalAgreement, setVehicleRentalAgreement] = useState({
    title: 'Договор аренды ТС',
    name: 'vehicleRentalAgreement',
    need: false,
    description: 'Загрузите копию договора аренды ТС',
    step: 2,
    value: [],
    required: true,
    multiple: true,
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  });
  const [driverName, setDriverName] = useState({
    title: 'ФИО водителя',
    name: 'driverName',
    need: false,
    step: 3,
    value: '',
    required: true,
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  });
  const [driverPhone, setDriverPhone] = useState({
    title: 'Телефон водителя',
    name: 'driverTelNumber',
    need: false,
    step: 3,
    value: '',
    required: true,
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  });
  const [driverPassportSerialNumber, setDriverPassportSerialNumber] = useState({
    title: 'Серия и номер паспорта водителя',
    name: 'driverPassportSerialNumber',
    need: false,
    step: 3,
    value: '',
    required: true,
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  });
  const [driverPassport1, setDriverPassport1] = useState({
    title: 'Паспорт водителя (основная страница)',
    name: 'driverPassport1',
    need: false,
    description: 'Загрузите копию основной страницы паспорта водителя',
    step: 3,
    value: [],
    required: true,
    multiple: false,
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  });
  const [driverPassport2, setDriverPassport2] = useState({
    title: 'Паспорт водителя (прописка)',
    name: 'driverPassport2',
    need: false,
    description: 'Загрузите копию страницы с пропиской паспорта водителя',
    step: 3,
    value: [],
    required: true,
    multiple: false,
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  });
  const [driverLicence, setDriverLicence] = useState({
    title: 'Водительское удостоверение',
    name: 'driverLicence',
    need: false,
    description: 'Загрузите водительское удостоверение',
    step: 3,
    value: [],
    required: true,
    multiple: true,
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  });
  const [driverEmploymentContract, setDriverEmploymentContract] = useState({
    title: 'Трудовой договор',
    name: 'driverEmploymentContract',
    need: false,
    description: 'Загрузите трудовой договор',
    step: 3,
    value: [],
    required: true,
    multiple: true,
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  });
  const [recommendation1CompanyTitle, setRecommendation1CompanyTitle] = useState({
    title: 'Название компании',
    name: 'recommendation1Title',
    need: false,
    step: 4,
    value: '',
    required: true,
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  });
  const [recommendation1ContactName, setRecommendation1ContactName] = useState({
    title: 'Контактное лицо',
    name: 'recommendation1ContactName',
    need: false,
    step: 4,
    value: '',
    required: true,
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  });
  const [recommendation1ContactPhone, setRecommendation1ContactPhone] = useState({
    title: 'Телефон контактного лица',
    name: 'recommendation1ContactPhone',
    need: false,
    step: 4,
    value: '',
    required: true,
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  });
  const [extraFiles, setExtraFiles] = useState({
    title: 'Дополнительные файлы',
    name: 'extraFiles',
    need: false,
    description: 'Вы можете загрузить до 10 дополнительных файла',
    step: 4,
    value: [],
    required: true,
    multiple: true,
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  });



  useEffect(function initFields() {
    if (typeof strSearch === 'string') {
      const arr = strSearch.slice(1).split('&');
      if (Array.isArray(arr) && arr.length) {
        const params = {
          isDefaultForm: true,
          partnerName: false,
          codeAti: false,
          ownershipType: false,
          partnerRequisites: false,
          certificateInn: false,
          ipPassport1: false,
          ipPassport2: false,
          certificateOgrn: false,
          appointmentOrder: false,
          charter: false,
          transportGosNumber: false,
          transportPts: false,
          trailerPts: false,
          vehicleRentalAgreement: false,
          driverName: false,
          driverPhone: false,
          driverPassportSerialNumber: false,
          driverPassport1: false,
          driverPassport2: false,
          driverLicence: false,
          driverEmploymentContract: false,
          recommendation1CompanyTitle: false,
          recommendation1ContactName: false,
          recommendation1ContactPhone: false,
          extraFiles: false
        };
        for (let item of arr) {
          params[item.split('=')[0]] = isNaN(item.split('=')[1])
            ? item.split('=')[1]
            : Number(item.split('=')[1]);
        }
        if (!params.isDefaultForm) {
          setIsDefaultForm(false);
        }
        if (params.logist) {
          setLogist({...logist, value: params.logist});
        }
        if (params.partnerName) {
          setPartnerName({...partnerName, need: true});
        }
        if (params.codeAti) {
          setCodeAti({...codeAti, need: true});
        }
        if (params.inn) {
          setInn({...inn, need: true});
        }
        if (params.ownershipType) {
          setOwnershipType({...ownershipType, need: true});
        }
        if (params.partnerRequisites) {
          setPartnerRequisites({...partnerRequisites, need: true});
        }
        if (params.certificateInn) {
          setCertificateInn({...certificateInn, need: true});
        }
        if (params.ipPassport1) {
          setIpPassport1({...ipPassport1, need: true});
        }
        if (params.ipPassport2) {
          setIpPassport2({...ipPassport2, need: true});
        }
        if (params.certificateOgrn) {
          setCertificateOgrn({...certificateOgrn, need: true});
        }
        if (params.appointmentOrder) {
          setAppointmentOrder({...appointmentOrder, need: true});
        }
        if (params.charter) {
          setCharter({...charter, need: true});
        }
        if (params.transportGosNumber) {
          setTransportGosNumber({...transportGosNumber, need: true});
        }
        if (params.transportPts) {
          setTransportPts({...transportPts, need: true});
        }
        if (params.trailerPts) {
          setTrailerPts({...trailerPts, need: true});
        }
        if (params.vehicleRentalAgreement) {
          setVehicleRentalAgreement({...vehicleRentalAgreement, need: true});
        }
        if (params.driverName) {
          setDriverName({...driverName, need: true});
        }
        if (params.driverPhone) {
          setDriverPhone({...driverPhone, need: true});
        }
        if (params.driverPassportSerialNumber) {
          setDriverPassportSerialNumber({...driverPassportSerialNumber, need: true});
        }
        if (params.driverPassport1) {
          setDriverPassport1({...driverPassport1, need: true});
        }
        if (params.driverPassport2) {
          setDriverPassport2({...driverPassport2, need: true});
        }
        if (params.driverLicence) {
          setDriverLicence({...driverLicence, need: true});
        }
        if (params.driverEmploymentContract) {
          setDriverEmploymentContract({...driverEmploymentContract, need: true});
        }
        if (params.recommendation1CompanyTitle) {
          setRecommendation1CompanyTitle({...recommendation1CompanyTitle, need: true});
        }
        if (params.recommendation1ContactName) {
          setRecommendation1ContactName({...recommendation1ContactName, need: true});
        }
        if (params.recommendation1ContactPhone) {
          setRecommendation1ContactPhone({...recommendation1ContactPhone, need: true});
        }
        if (params.extraFiles) {
          setExtraFiles({...extraFiles, need: true});
        }
      }
    }
  }, [
    strSearch, logist, partnerName, codeAti,
    inn, ownershipType, partnerRequisites, certificateInn,
    ipPassport1, ipPassport2, certificateOgrn, appointmentOrder,
    charter, transportGosNumber, transportPts, trailerPts,
    vehicleRentalAgreement, driverName, driverPhone, driverPassportSerialNumber,
    driverPassport1, driverPassport2, driverLicence, driverEmploymentContract,
    recommendation1CompanyTitle, recommendation1ContactName,
    recommendation1ContactPhone, extraFiles
  ]);



  function nextStep(currentStep) {
    setStep(step + 1);
  }

  function prevStep(currentStep) {
    setStep(step - 1);
  }

  function FilesUploader({ field, setField }) {
    const acceptFile = '.pdf, .png, .bmp, .jpeg, .jpg, .gif, .doc, .docx, .txt, .ods, .odt, .xls, .xlsx';
    const maxSizeFile = 20971520;
    const handleOnChange = (event) => {
      const files = event.target.files;
      let err = false;
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > maxSizeFile) {
          setField({
            ...field,
            error: true,
            errorMessage: `Файл ${files[i].name} слишком большой. Размер файла не должен превышать 20 МБ!`,
            value: field.value,
          });
          err = true;
          break;
        }
      }
      if (!err) {
        setField({
          ...field,
          error: false,
          errorMessage: null,
          value: files,
        });
      }
    };
    const renderFiles = (fileList) => {
      let arr = [];
      for (let i = 0; i < fileList.length; i++) {
        arr.push(fileList[i]);
      }
      return (
        <Box>
          {arr.map(file =>
            <Box>
              <Typography>{file.name}</Typography>
            </Box>
          )}
        </Box>
      )
    }
    return (
      <Box>
        <TextField
          required={field.required}
          style={{ marginTop: 16 }}
          variant="outlined"
          fullWidth
          label={field.title}
          multiline
          rows={field.value.length > 3 ? field.value.length : 3}
          error={field.errorMessage}
          value={field.value.length === 0 ? field.description : ' '}
          helperText={field.message}
          InputProps={{
            startAdornment:
              <InputAdornment position="start">
                <input
                  style={{ display: 'none' }}
                  accept={acceptFile}
                  id={`contained-button-file-${field.title}`}
                  multiple={field.multiple}
                  type={'file'}
                  onChange={handleOnChange}
                />
                <label htmlFor={`contained-button-file-${field.title}`}>
                  <Button
                    variant={'contained'}
                    color={'secondary'}
                    component={'span'}
                  >
                    Загрузить
                  </Button>
                </label>
              </InputAdornment>,
            endAdornment:
              <InputAdornment position="end">
                {renderFiles(field.value)}
                {field.sending && <LinearProgress className={classes.progressBar} />}
              </InputAdornment>
          }}
        />
      </Box>
    )
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
                    {(isDefaultForm || ownershipType.need) && (
                      <Box className={classes.uniField}>
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
                      </Box>
                    )}

                    {(isDefaultForm || logist.need) && (
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
                    )}

                    {(isDefaultForm || partnerName.need) && (
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
                    )}

                    {(isDefaultForm || codeAti.need) && (
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
                    )}

                    {(isDefaultForm || inn.need) && (
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
                    )}

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
                    {(isDefaultForm || partnerRequisites.need) && (
                      <Box className={classes.uniField}>
                        <FilesUploader field={partnerRequisites} setField={setPartnerRequisites} />
                      </Box>
                    )}

                    {(isDefaultForm || certificateInn.need) && (
                      <Box className={classes.uniField}>
                        <FilesUploader field={certificateInn} setField={setCertificateInn} />
                      </Box>
                    )}

                    {(isDefaultForm || certificateOgrn.need) && (
                      <Box className={classes.uniField}>
                        <FilesUploader field={certificateOgrn} setField={setCertificateOgrn} />
                      </Box>
                    )}

                    {(isDefaultForm || ownershipType.need) && ownershipType.value === 'ИП' && (
                      <Box>
                        {(isDefaultForm || ipPassport1.need) && (
                          <Box className={classes.uniField}>
                            <FilesUploader field={ipPassport1} setField={setIpPassport1} />
                          </Box>
                        )}

                        {(isDefaultForm || ipPassport2.need) && (
                          <Box className={classes.uniField}>
                            <FilesUploader field={ipPassport2} setField={setIpPassport2} />
                          </Box>
                        )}
                      </Box>
                    )}

                    {(isDefaultForm || ownershipType.need) && ownershipType.value !== 'ИП' && (
                      <Box>
                        {(isDefaultForm || appointmentOrder.need) && (
                          <Box className={classes.uniField}>
                            <FilesUploader field={appointmentOrder} setField={setAppointmentOrder} />
                          </Box>
                        )}

                        {(isDefaultForm || charter.need) && (
                          <Box className={classes.uniField}>
                            <FilesUploader field={charter} setField={setCharter} />
                          </Box>
                        )}
                      </Box>
                    )}
                  </Box>
                )}

                {step === 2 && (
                  <Box>
                    <TextField
                      className={classes.uniField}
                      variant={'outlined'}
                      fullWidth
                      label={transportGosNumber.title}
                      type={'text'}
                      required={transportGosNumber.required}
                      value={transportGosNumber.value}
                      error={transportGosNumber.error}
                      helperText={transportGosNumber.errorMessage}
                      onChange={(event) => {
                        setTransportGosNumber({...transportGosNumber, value: event.target.value});
                      }}
                    />
                    <Box className={classes.uniField}>
                      <FilesUploader field={transportPts} setField={setTransportPts} />
                    </Box>
                    <Box className={classes.uniField}>
                      <FilesUploader field={trailerPts} setField={setTrailerPts} />
                    </Box>
                    <Box className={classes.uniField}>
                      <FilesUploader field={vehicleRentalAgreement} setField={setVehicleRentalAgreement} />
                    </Box>
                  </Box>
                )}
                {step === 3 && (
                  <Box>
                    <TextField
                      className={classes.uniField}
                      variant={'outlined'}
                      fullWidth
                      label={driverName.title}
                      type={'text'}
                      required={driverName.required}
                      value={driverName.value}
                      error={driverName.error}
                      helperText={driverName.errorMessage}
                      onChange={(event) => {
                        setDriverName({...driverName, value: event.target.value});
                      }}
                    />
                    <TextField
                      className={classes.uniField}
                      variant={'outlined'}
                      fullWidth
                      label={driverPhone.title}
                      type={'text'}
                      required={driverPhone.required}
                      value={driverPhone.value}
                      error={driverPhone.error}
                      helperText={driverPhone.errorMessage}
                      onChange={(event) => {
                        setDriverPhone({...driverPhone, value: event.target.value});
                      }}
                    />
                    <TextField
                      className={classes.uniField}
                      variant={'outlined'}
                      fullWidth
                      label={driverPassportSerialNumber.title}
                      type={'text'}
                      required={driverPassportSerialNumber.required}
                      value={driverPassportSerialNumber.value}
                      error={driverPassportSerialNumber.error}
                      helperText={driverPassportSerialNumber.errorMessage}
                      onChange={(event) => {
                        setDriverPassportSerialNumber({...driverPassportSerialNumber, value: event.target.value});
                      }}
                    />
                    <Box className={classes.uniField}>
                      <FilesUploader field={driverPassport1} setField={setDriverPassport1} />
                    </Box>
                    <Box className={classes.uniField}>
                      <FilesUploader field={driverPassport2} setField={setDriverPassport2} />
                    </Box>
                    <Box className={classes.uniField}>
                      <FilesUploader field={driverLicence} setField={setDriverLicence} />
                    </Box>
                    <Box className={classes.uniField}>
                      <FilesUploader field={driverEmploymentContract} setField={setDriverEmploymentContract} />
                    </Box>
                  </Box>
                )}
                {step === 4 && (
                  <Box>
                    <TextField
                      className={classes.uniField}
                      variant={'outlined'}
                      fullWidth
                      label={recommendation1CompanyTitle.title}
                      type={'text'}
                      required={recommendation1CompanyTitle.required}
                      value={recommendation1CompanyTitle.value}
                      error={recommendation1CompanyTitle.error}
                      helperText={recommendation1CompanyTitle.errorMessage}
                      onChange={(event) => {
                        setRecommendation1CompanyTitle({...recommendation1CompanyTitle, value: event.target.value});
                      }}
                    />
                    <TextField
                      className={classes.uniField}
                      variant={'outlined'}
                      fullWidth
                      label={recommendation1ContactName.title}
                      type={'text'}
                      required={recommendation1ContactName.required}
                      value={recommendation1ContactName.value}
                      error={recommendation1ContactName.error}
                      helperText={recommendation1ContactName.errorMessage}
                      onChange={(event) => {
                        setRecommendation1ContactName({...recommendation1ContactName, value: event.target.value});
                      }}
                    />
                    <TextField
                      className={classes.uniField}
                      variant={'outlined'}
                      fullWidth
                      label={recommendation1ContactPhone.title}
                      type={'text'}
                      required={recommendation1ContactPhone.required}
                      value={recommendation1ContactPhone.value}
                      error={recommendation1ContactPhone.error}
                      helperText={recommendation1ContactPhone.errorMessage}
                      onChange={(event) => {
                        setRecommendation1ContactPhone({...recommendation1ContactPhone, value: event.target.value});
                      }}
                    />
                    <Box className={classes.uniField}>
                      <FilesUploader field={extraFiles} setField={setExtraFiles} />
                    </Box>
                  </Box>
                )}
                {step === 5 && (
                  <Box>
                    <Typography>Готово!</Typography>
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