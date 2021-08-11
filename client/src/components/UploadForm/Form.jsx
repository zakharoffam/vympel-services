import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Step, StepContent, StepLabel, Stepper, Typography } from '@material-ui/core';
import { fieldsList } from "./fields";

const useStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  logo: {
    textAlign: 'center',
  },
}));


export default function Form() {
  const classes = useStyle();
  const strSearch = String(window.location.search);

  const [fields, setFields] = useState([]);
  const [step, setStep] = useState(0);
  const [steps, setSteps] = useState([
    {step: 0, stepTitle: 'Основные данные', stepDescription: null},
    {step: 1, stepTitle: 'Перевозчик', stepDescription: null}
  ]);


  useEffect(function initFields() {
    if (strSearch.length > 0) {
      setFields(fieldsList);
    }
  }, [strSearch.length]);


  function nextStep() {
    setStep(step + 1);
  }

  function prevStep() {
    setStep(step - 1);
  }

  function generateField(field) {

    return (
      <Box>
        <Typography>{field.title}</Typography>
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
          <Step key={currentStep.step + currentStep.stepTitle}>
            <StepLabel>{currentStep.stepTitle}</StepLabel>
            <StepContent>
              {fields.filter((field) => field.step === currentStep.step).map((field) => generateField(field))}

              <Button
                type={'submit'}
                variant={'contained'}
                color={'primary'}
                onClick={prevStep}
              >
                Назад
              </Button>

              <Button
                type={'submit'}
                variant={'contained'}
                color={'primary'}
                onClick={nextStep}
              >
                Далее
              </Button>
            </StepContent>
          </Step>
        ))}
      </Stepper>

    </Box>
  )
}