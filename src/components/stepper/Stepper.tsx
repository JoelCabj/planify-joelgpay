import React, { useState, useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

interface StepperProps {
    step: number;
}

enum Step {
    service = 'Seleccionar servicio',
    slot = 'Seleccionar horario',
    confirmation = 'Confirmar turno',
    done = 'Turno confirmado'
}

enum StepNumber {
    service = 1,
    slot = 2,
    confirmation = 3,
    done = 4
}
 
const Stepper: React.FC<StepperProps> = ({step}) => {
    const maxSteps = 4;
    
    const [title, setTitle] = useState('');
    const [percent, setPercent] = useState(100);

    const checkStep = (stepNumber: number) => {
        if (stepNumber >= 1 && stepNumber <= maxSteps) {
            setPercent(stepNumber / maxSteps * 100);
            changeTitle(stepNumber);
        } else {
            console.error('Paso inválido', stepNumber);
        }
    }
    
    const changeTitle = (stepNumber: number) => {
        let title = '';

        switch (stepNumber) {
            case StepNumber.service:
                title = Step.service;
                break;
            case StepNumber.slot:
                title = Step.slot;
                break;
            case StepNumber.confirmation:
                title = Step.confirmation;
                break;
            case StepNumber.done:
                title = Step.done;
                break;
            default:
                title = 'Erro al establecer el paso';
                break;
        }

        setTitle(title);
    }

    useEffect(() => {
        checkStep(step);
    }, [step]);

    return (
        <>
            <span>{title}</span>
            <ProgressBar now={percent} variant="info"></ProgressBar>
        </>
    );
};
 
export {Stepper, Step, StepNumber} ;
