import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button, Checkbox, FormControl, FormControlLabel, FormLabel,
  InputAdornment, LinearProgress, Link, Radio, RadioGroup,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography
} from "@material-ui/core";
import { useParams } from "react-router-dom";

const useStyle = makeStyles(theme => ({
  root: {
    maxWidth: 800,
    width: '100%',
  },
  logo: {
    textAlign: 'center',
  },
  progress: {
    width: '100%',
  },
  field: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginRight: theme.spacing(2),
  },
  linearProgress: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
}));

/**
 * Парсер строки параметров
 * @param input window.location.search
 * @returns {{}}
 */
function parseParams(input) {
  if (typeof input !== 'string') return {};
  if (input[0] !== '?') return {};

  const params = {};
  input.slice(1).split('&').forEach(elem => {
    if (elem.split('=').length === 2) {
      params[elem.split('=')[0]] = elem.split('=')[1];
    }
  });
  return params;
}

/**
 * Компонент поля ввода
 * @param fieldName Имя поля
 * @param state Объект всех полей
 * @param setState Функция для изменения объекта всех полей
 * @returns {JSX.Element} Возвращает либо текстовое поле ввода, либо поле для загрузки файлов
 */
function Field({ fieldName, state, setState }) {
  const classes = useStyle();
  const acceptFile = '.pdf, .png, .bmp, .jpeg, .jpg, .gif, .doc, .docx, .txt, .ods, .odt, .xls, .xlsx';
  const maxSizeFile = 20971520;

  const handleFileOnChange = (event) => {
    const files = event.target.files;
    let err = false;
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > maxSizeFile) {
        setState({
          ...state,
          [fieldName]: {
            title: state[fieldName].title,
            value: files,
            display: state[fieldName].display,
            multiple: state[fieldName].multiple,
            description: state[fieldName].description,
            error: true,
            errorMessage: `Файл ${files[i].name} слишком большой. Размер файла не должен превышать 20 МБ!`,
          }
        });
        err = true;
        break;
      }
    }
    if (!err) {
      setState({
        ...state,
        [fieldName]: {
          title: state[fieldName].title,
          value: files,
          display: state[fieldName].display,
          multiple: state[fieldName].multiple,
          description: state[fieldName].description,
        }
      });
    }
  };
  const RenderFiles = ({ fileList }) => {
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

  if (typeof state[fieldName].value === 'string') {
    return (
      <Box>
        <TextField
          className={classes.field}
          fullWidth
          label={state[fieldName].title}
          value={state[fieldName].value}
          required={state[fieldName].required}
          error={state[fieldName].error}
          helperText={state[fieldName].error}
          onChange={event => {
            setState({
              ...state,
              [fieldName]: {
                title: state[fieldName].title,
                value: event.currentTarget.value,
                display: state[fieldName].display,
              }
            });
          }}
        />
      </Box>
    )
  } else if (typeof state[fieldName].value !== 'string') {
    return (
      <Box>
        <TextField
          className={classes.field}
          required={state.required}
          style={{ marginTop: 16 }}
          variant="outlined"
          fullWidth
          label={state[fieldName].title}
          multiline
          rows={state[fieldName].value.length > 3 ? state[fieldName].value.length : 3}
          error={state[fieldName].errorMessage}
          value={state[fieldName].value.length === 0 ? state[fieldName].description : ' '}
          helperText={state.message}
          InputProps={{
            startAdornment:
              <InputAdornment position="start">
                <input
                  style={{ display: 'none' }}
                  accept={acceptFile}
                  id={`contained-button-file-${state[fieldName].title}`}
                  multiple={state[fieldName].multiple}
                  type={'file'}
                  onChange={handleFileOnChange}
                />
                <label htmlFor={`contained-button-file-${state[fieldName].title}`}>
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
                <RenderFiles fileList={state[fieldName].value} />
              </InputAdornment>
          }}
        />
      </Box>
    )
  }
}

export default function Uploader() {
  const classes = useStyle();
  // Входящий параметр из URL-запроса
  const { logist } = useParams();
  // Все дополнительные параметры
  const params = parseParams(window.location.search);
  // Состояние выгрузки данных
  const [isSending, setIsSending] = useState(false);
  // Является ли данная форма формой по-умолчанию, т.е. отображаются все поля
  const isDefaultForm = !Object.keys(params).length;
  // Текущий шаг формы
  const [step, setStep] = useState(0);
  // Чек-бокс согласия на обработку персональных данных
  const [consentToPersonalDataProcessing, setConsentToPersonalDataProcessing] = useState(false);
  // Состояние всех полей
  const [fields, setFields] = useState({
    logist: { title: 'Логист', value: logist, display: isDefaultForm, required: true },
    partnerName: { title: 'Название партнера', value: JSON.parse(localStorage.getItem('partnerName')) ?? '', display: isDefaultForm, required: true },
    codeAti: { title: 'Код АТИ', value: JSON.parse(localStorage.getItem('codeAti')) ?? '', display: isDefaultForm, required: true },
    inn: { title: 'ИНН партнера', value: JSON.parse(localStorage.getItem('inn')) ?? '', display: isDefaultForm, required: true },
    ownershipType: { title: 'Форма собственности партнера', value: JSON.parse(localStorage.getItem('ownershipType')) ?? '', display: isDefaultForm, required: true },
    partnerRequisites: { title: 'Реквизиты партнера', value: FileList, display: isDefaultForm, multiple: true, description: 'Описание' },
    certificateInn: { title: 'Свидетельство ИНН', value: FileList, display: isDefaultForm, multiple: false, description: 'Описание' },
    ipPassport1: { title: 'Паспорт ИП (основная страница)', value: FileList, display: isDefaultForm, multiple: false, description: 'Описание' },
    ipPassport2: { title: 'Паспорт ИП (прописка)', value: FileList, display: isDefaultForm, multiple: false, description: 'Описание' },
    certificateOgrn: { title: 'Свидетельство ОГРН', value: FileList, display: isDefaultForm, multiple: false, description: 'Описание' },
    appointmentOrder: { title: 'Приказ о назначении', value: FileList, display: isDefaultForm, multiple: false, description: 'Описание' },
    charter: { title: 'Устав', value: FileList, display: isDefaultForm, multiple: false, description: 'Описание' },
    transportGosNumber: { title: 'Государственный номер ТС', value: '', display: isDefaultForm, required: true },
    transportPts: { title: 'ПТС или СРТС ТС', value: FileList, display: isDefaultForm, multiple: false, description: 'Описание' },
    trailerPts: { title: 'ПТС или СРТС прицепа', value: FileList, display: isDefaultForm, multiple: false, description: 'Описание' },
    vehicleRentalAgreement: { title: 'Договор аренды ТС', value: FileList, display: isDefaultForm, multiple: false, description: 'Описание' },
    driverName: { title: 'ФИО водителя', value: '', display: isDefaultForm, required: true },
    driverPhone: { title: 'Телефон водителя', value: '', display: isDefaultForm, required: true },
    driverPassportSerialNumber: { title: 'Серия и номер паспорта водителя', value: '', display: isDefaultForm, required: true },
    driverPassport1: { title: 'Паспорт водителя (основная страница)', value: FileList, display: isDefaultForm, multiple: false, description: 'Описание' },
    driverPassport2: { title: 'Паспорт водителя (прописка)', value: FileList, display: isDefaultForm, multiple: false, description: 'Описание' },
    driverLicence: { title: 'Водительское удостоверение', value: FileList, display: isDefaultForm, multiple: false, description: 'Описание' },
    driverEmploymentContract: { title: 'Трудовой договор', value: FileList, display: isDefaultForm, multiple: false, description: 'Описание' },
    recommendation1CompanyTitle: { title: 'Название компании', value: '', display: isDefaultForm, required: true },
    recommendation1ContactName: { title: 'Контактное лицо', value: '', display: isDefaultForm, required: true },
    recommendation1ContactPhone: { title: 'Телефон контактного лица', value: '', display: isDefaultForm, required: true },
    extraFiles: { title: 'Дополнительные файлы', value: FileList, display: isDefaultForm, multiple: false, description: 'Описание' },
    FINISH: { title: 'FINISH', value: '', display: isDefaultForm, },
  });
  // Список шагов формы
  const steps = [
    'Основные данные',
    'Данные перевозчика',
    'Документы на автомобиль',
    'Документы водителя',
    'Рекомендации',
    'Отправлено'
  ];

  /**
   * Отправка заполненных полей и перехода на следующий шаг
   * @param currentStep
   */
  const nextStepAndSubmitFields = (currentStep) => {
    setIsSending(true);
    let isFieldRequiredNotFull = false;
    const formData = new FormData();

    for (let key in fields) {
      if (fields[key].display && !fields[key].isSent) {
        if (typeof fields[key].value === 'string' && fields[key].value) {
          localStorage.setItem(key, JSON.stringify(fields[key].value));
          formData.append(fields[key].title, fields[key].value);
        } else if (fields[key].value instanceof FileList) {
          for (let i = 0; i < fields[key].value.length; i++) {
            formData.append(`${key}_${i + 1}-${fields[key].value.length}`, fields[key].value[i]);
          }
        }
      }
    }

    if (currentStep === 4) {
      formData.append('FINISH', String(1));
    }

    fetch(`http://${window.location.hostname}:8080/upload-form/${fields.inn.value}`, {
        method: 'PUT',
        body: formData,
      }
    ).then(() => {
      const nextStateFields = Object.assign(fields);
      for (let key in nextStateFields) {
        if (nextStateFields[key].value.length) {
          nextStateFields[key].isSent = true;
        }
      }
      setFields(nextStateFields);
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      if (!isFieldRequiredNotFull) {
        setStep(currentStep + 1);
      }
      setIsSending(false);
    });
  }

  useEffect(() => {
    if (!isDefaultForm) { // если форма не по-умолчанию
      Object.keys(params).forEach(key => { // перебираем все параметры
        const nextStateFields = Object.assign(fields);
        nextStateFields[key].display = true; // и отображаем поля по которым есть параметр
        if (Number(params[key]) !== 1) {
          nextStateFields[key].value = params[key]; // если параметр имеет значение, заполняем поле
        }
        setFields(nextStateFields);
      });
    }
  }, [isDefaultForm, params, fields]);

  useEffect(() => {
    console.log(fields);
  })

  return (
    <Box className={classes.root}>
      <Box className={classes.logo}>
        <img src="../logo.png" alt="logo" height={100}/>
        <Typography variant="h6">
          Форма для сбора документов перевозчика, при заключении договора с ТЭК "Вымпел"
        </Typography>
      </Box>

      <Stepper activeStep={step} orientation="vertical">
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {step === 0 && (
                <Box>
                  <br/>
                  <FormControl className={classes.field} component="fieldset">
                    <FormLabel component="legend">Форма собственности партнера</FormLabel>
                    <RadioGroup
                      value={fields.ownershipType.value}
                      onChange={event => {
                        setFields({
                          ...fields,
                          ownershipType: {
                            title: fields.ownershipType.title,
                            value: event.target.value,
                            display: fields.ownershipType.display,
                          }
                        })
                      }}
                    >
                      <FormControlLabel control={<Radio />} label="ИП" value="ИП"/>
                      <FormControlLabel control={<Radio />} label="ООО или АО" value="ООО или АО"/>
                    </RadioGroup>
                  </FormControl>
                  {fields.partnerName.display && <Field fieldName="partnerName" state={fields} setState={setFields}/>}
                  {fields.codeAti.display && <Field fieldName="codeAti" state={fields} setState={setFields}/>}
                  {fields.inn.display && <Field fieldName="inn" state={fields} setState={setFields}/>}
                  <Typography>
                    <Link href="/pers" target="_blank">Политика обработки персональных данных</Link>
                  </Typography>
                  <FormControlLabel
                    className={classes.field}
                    control={
                      <Checkbox
                        checked={consentToPersonalDataProcessing}
                        onChange={() => setConsentToPersonalDataProcessing(!consentToPersonalDataProcessing)}
                      />
                    }
                    label="Согласие на обработку персональных данных"
                  />
                </Box>
              )}
              {step === 1 && (
                <Box>
                  {fields.partnerRequisites.display && <Field fieldName="partnerRequisites" state={fields} setState={setFields}/>}
                  {fields.certificateInn.display && <Field fieldName="certificateInn" state={fields} setState={setFields}/>}
                  {fields.certificateOgrn.display && <Field fieldName="certificateOgrn" state={fields} setState={setFields}/>}
                  {fields.ownershipType.value === 'ИП' && (
                    <Box>
                      {fields.ipPassport1.display && <Field fieldName="ipPassport1" state={fields} setState={setFields}/>}
                      {fields.ipPassport2.display && <Field fieldName="ipPassport2" state={fields} setState={setFields}/>}
                    </Box>
                  )}
                  {fields.ownershipType.value === 'ООО или АО' && (
                    <Box>
                      {fields.appointmentOrder.display && <Field fieldName="appointmentOrder" state={fields} setState={setFields}/>}
                      {fields.charter.display && <Field fieldName="charter" state={fields} setState={setFields}/>}
                    </Box>
                  )}
                </Box>
              )}
              {step === 2 && (
                <Box>
                  {fields.transportGosNumber.display && <Field fieldName="transportGosNumber" state={fields} setState={setFields}/>}
                  {fields.transportPts.display && <Field fieldName="transportPts" state={fields} setState={setFields}/>}
                  {fields.trailerPts.display && <Field fieldName="trailerPts" state={fields} setState={setFields}/>}
                  {fields.vehicleRentalAgreement.display && <Field fieldName="vehicleRentalAgreement" state={fields} setState={setFields}/>}
                </Box>
              )}
              {step === 3 && (
                <Box>
                  {fields.driverName.display && <Field fieldName="driverName" state={fields} setState={setFields}/>}
                  {fields.driverPhone.display && <Field fieldName="driverPhone" state={fields} setState={setFields}/>}
                  {fields.driverPassportSerialNumber.display && <Field fieldName="driverPassportSerialNumber" state={fields} setState={setFields}/>}
                  {fields.driverPassport1.display && <Field fieldName="driverPassport1" state={fields} setState={setFields}/>}
                  {fields.driverPassport2.display && <Field fieldName="driverPassport2" state={fields} setState={setFields}/>}
                  {fields.driverLicence.display && <Field fieldName="driverLicence" state={fields} setState={setFields}/>}
                  {fields.driverEmploymentContract.display && <Field fieldName="driverEmploymentContract" state={fields} setState={setFields}/>}
                </Box>
              )}
              {step === 4 && (
                <Box>
                  {fields.recommendation1CompanyTitle.display && <Field fieldName="recommendation1CompanyTitle" state={fields} setState={setFields}/>}
                  {fields.recommendation1ContactName.display && <Field fieldName="recommendation1ContactName" state={fields} setState={setFields}/>}
                  {fields.recommendation1ContactPhone.display && <Field fieldName="recommendation1ContactPhone" state={fields} setState={setFields}/>}
                  {fields.extraFiles.display && <Field fieldName="extraFiles" state={fields} setState={setFields}/>}
                </Box>
              )}
              {step === 5 && (
                <Box>
                  <Typography>
                    Благодарим Вас за заполнение формы.
                  </Typography>
                  <Typography>
                    Приглашаем перевозчиков к работе на постоянной основе.
                  </Typography>
                  <Typography>
                    Перейти на сайт <Link href="http://www.tekvympel.ru/" target="_blank">ТЭК "Вымпел"</Link>
                  </Typography>
                </Box>
              )}

              {step !== steps.length - 1 && (
                <Button
                  className={classes.button}
                  variant={'contained'}
                  color={'primary'}
                  disabled={!(consentToPersonalDataProcessing && fields.ownershipType.value)}
                  onClick={() => nextStepAndSubmitFields(step)}
                >
                  Далее
                </Button>
              )}

              {isSending && <LinearProgress className={classes.linearProgress} color="primary" />}
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}