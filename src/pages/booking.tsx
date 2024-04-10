import React, { useState, useEffect } from 'react';

import { loadServices, loadSlots, Service, Slot } from '../services/services';

import BookingList from '../components/booking/BookingList/BookingList';
import { Stepper } from '../components/stepper/Stepper';
import { Button } from 'react-bootstrap';

const BookingPage: React.FC<any> = () => {
    const [services, setServices] = useState<Service[] | []>();
    const [slots, setSlot] = useState<Slot | {}>();
    const [step, setStep] = useState<number>(1);

    const nextStep = () => {
        const next = step + 1;
        if ( next <= 4) {
            setStep(next);
        }
    }
    
    const previousStep = () => {
        const previous = step - 1;
        if ( previous >= 1) {
            setStep(previous);
        }
    }


    useEffect(() => {
        try {
            loadServices().then((services) => {
                setServices(services);
            });

            loadSlots().then((slots) => {
                setSlot(slots);
            })

        } catch (error) {
            console.error('Error:', error);
        }
    }, []);

    return (
        <>
            <div className='header'>
                <Stepper step={step}></Stepper>
            </div>
            <div className='body'>
                <BookingList services={services} slots={slots}></BookingList>
            </div>
            <div className='footer'>
                <Button variant="secondary" onClick={()=>{previousStep()}} disabled={step === 1}>Anterior</Button>
                <Button variant="secondary" onClick={()=>{nextStep()}} disabled={step === 4}>Siguiente</Button>
            </div>
        </>
    )
}

export default BookingPage;
