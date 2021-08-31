import { useState } from 'react';

import {
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Link,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Partner from './Partner';
import TransporterIp from './TransporterIp';
import TransporterAo from './TransporterAo';
import AutoDocs from './AutoDocs';
import DriverDocs from './DriverDocs';
import Recommendations from './Recommendations';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  img: {
    textAlign: 'center'
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));


export default function Contract() {
  const { logist } = useParams();

  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Основные данные', 'Данные перевозчика', 'Документы на автомобиль', 'Документы водителя', 'Рекомендации'];

  const [partnerType, setPartnerType] = useState('ИП');
  const [inn, setInn] = useState({ message: null, value: ''});

  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };

  
  return (
    <div className={classes.root}>
      <Box className={classes.img}>
        <img src="../logo.png" alt="logo" height="100" />
        <Typography variant="h6">
          Форма для сбора документов перевозчика, при заключении договора с ТЭК "Вымпел"
        </Typography>
      </Box>

      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {activeStep === 0 && 
                <Partner
                  logist={logist}
                  partnerType={partnerType}
                  setPartnerType={setPartnerType}
                  inn={inn}
                  setInn={setInn}
                  nextStep={nextStep} />
              }

              {activeStep === 1 && partnerType === 'ИП' && 
                <TransporterIp
                  inn={inn}
                  prevStep={prevStep}
                  nextStep={nextStep}
                />
              }

              {activeStep === 1 && partnerType !== 'ИП' && 
                <TransporterAo
                  inn={inn}
                  prevStep={prevStep}
                  nextStep={nextStep}
                />
              }

              {activeStep === 2 && 
                <AutoDocs
                  inn={inn}
                  prevStep={prevStep}
                  nextStep={nextStep}
                />
              }
              
              {activeStep === 3 && 
                <DriverDocs
                  inn={inn}
                  prevStep={prevStep}
                  nextStep={nextStep}
                />
              }

              {activeStep === 4 && 
                <Recommendations
                  inn={inn}
                  prevStep={prevStep}
                  nextStep={nextStep}
                />
              }
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>
            Благодарим Вас за заполнение формы. 
            Приглашаем Перевозчиков к работе на постоянной основе.
            Перейти на сайт <Link href="http://www.tekvympel.ru/" target="_blank">ТЭК "Вымпел"</Link>
          </Typography>
        </Paper>
      )}
    </div>
  );
}
