import React, { useState, useEffect } from 'react';
import { Appointment, Service } from '../../../services/services';
import './Confirmation.css';


interface SlotsProps {
    appointment: Appointment,
    service: Service | undefined
}

const Confirmation: React.FC<SlotsProps> = ({appointment, service}) => {

    const [name, setName] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [slot, setSlot] = useState<string>('');


    useEffect(() => {
        if (appointment) {
            setDate(appointment.slot.date);
            setSlot(appointment.slot.availableTimeslots[0] ?? '');
        }
    }, [appointment])

    useEffect(() => {
        if (service) {
            setName(service.name);
        }
    }, [service])

    return (
        <div className='appointments'>
            <p>Servicio: <span>{name}</span></p>
            <p>Fecha: <span>{date} {slot}</span></p>
        </div>
    )
}

export default Confirmation;
