import React, { useState, useEffect } from 'react';

import { loadServices, loadSlots, Service, Slot, Appointment, getAppointments } from '../services/services';

import BookingList from '../components/booking/BookingList/BookingList';
import Slots from '../components/booking/Slots/Slots';
import { Stepper, StepNumber } from '../components/stepper/Stepper';
import { Button } from 'react-bootstrap';
import Confirmation from '../components/booking/confirmation/Confirmation';

const BookingPage: React.FC<any> = () => {
    const aNull: Appointment = {
        slot: {
            date: '',
            availableTimeslots: []
        },
        service: {
            id: 0,
            name: ''
        }
    };

    const [services, setServices] = useState<Service[] | []>();
    const [slots, setSlots] = useState<Slot[] | any[]>([]);
    const [step, setStep] = useState<number>(1);

    // Selected
    const [service, setService] = useState<Service>();
    const [slot, setSlot] = useState<string>('');
    let [appointment, setAppointment] = useState<Appointment>(aNull);

    const nextStep = () => {
        const next = step + 1;
        if ( next <= 4) {
            setStep(next);
        }
    }

    const changeStep = (step: number) => {
        if ( step >= 1 ) {
            setStep(step);
        }
    }
    
    const previousStep = () => {
        const previous = step - 1;
        if ( previous >= 1) {
            setStep(previous);
        }
    }

    const checkStep = (): boolean => {
        let value = true;
        switch (step) {
            case 1:
                if (service) 
                    value = false;
                break;
            case 2:
                if (service && slot) 
                    value = false;
                break;
            case 3:
                if (service && slot) 
                    value = false;
                break;
            default:
                break;
        }
        return value;
    }

    const serviceHandler = (id: string) => {
        const service: Service | undefined = services?.filter( s => s.id === Number(id))[0];
        if (service) {
            setService(service);
            setAppointment(aNull);
            setSlot('');
        }
    }

    const slotHandler = (key: string) => {
        const [date, serviceId, slot ] = key.split('#');
        const service = services?.filter( s => s.id === Number(serviceId))[0];
        setSlot(key);
        appointment = {
            slot: {
                date,
                availableTimeslots: [slot]
            },
            service:  {
                id: Number(serviceId),
                name: service?.name ?? ''
            },
        }

        setAppointment(appointment);
    }

    const storeAppointment = (): void => {
        if (service && slot) {
            const appointments: Appointment[] | [] = getAppointments();
            appointments.push(appointment);
            localStorage.setItem('app_appointments', JSON.stringify(appointments));
            changeStep(StepNumber.done);
        }
    }


    useEffect(() => {
        try {
            loadServices().then((services) => {
                setServices(services);
            });

        } catch (error) {
            console.error('Error:', error);
        }
    }, []);

    useEffect(() => {
        if (service){
            loadSlots(service.id).then((s) => {
                setSlots(s);
            })
        }
    }, [service]);

    return (
        <>
            <div className='header'>
                <Stepper step={step}></Stepper>
            </div>
            <div className='body'>
                {step === 1 && 
                    <BookingList services={services} serviceSelected={serviceHandler} service={service}></BookingList>}
                {step === 2 && <Slots slots={slots} slotSelected={slotHandler} slot={slot}></Slots>}
                {step === 3 && <Confirmation appointment={appointment} service={service}></Confirmation>}
                {step === 4 && <p className='success'>Se ha confirmado su turno <span>{service?.name}</span> el día <span>{appointment.slot.date}</span> a las <span>{appointment.slot.availableTimeslots[0]}</span></p>}
                
            </div>
            <div className='footer'>
                {step !== StepNumber.done && <Button variant="secondary" onClick={()=>{previousStep()}} disabled={step === 1}>Anterior</Button>}
                {step < 3 && <Button variant="secondary" onClick={()=>{nextStep()}} disabled={checkStep()}>Siguiente</Button>}
                {step === 3 && <Button variant="secondary" onClick={()=>{storeAppointment()}} disabled={checkStep()}>Confirmar</Button>}
                
            </div>
        </>
    )
}

export default BookingPage;
