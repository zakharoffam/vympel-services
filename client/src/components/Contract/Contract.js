import { useState } from 'react';

import {
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Link,
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
  const steps = ['Основые данные', 'Данные перевозчика', 'Документы на автомобиль', 'Документы водителя', 'Рекомендации'];

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
          <Typography>Спасибо за уделенное время.</Typography>
          <Link href="http://www.tekvympel.ru/" target="_blank">Перейти на сайт ТЭК "Вымпел"</Link>
        </Paper>
      )}
    </div>
  );
}
