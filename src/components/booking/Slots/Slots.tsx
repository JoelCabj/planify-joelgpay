import React, { useState, useEffect } from 'react';
import { Appointment, Slot } from '../../../services/services';
import { Button } from 'react-bootstrap';
import { getAppointments } from "../../../services/services";
import './Slots.css';


interface SlotsProps {
    slots?: Slot[],
    slot?: string,
    slotSelected: (key: string) => void;
}

const Slots: React.FC<SlotsProps> = ({slots, slot, slotSelected}) => {
    const SLOTS: Slot[] = slots ?? [];
    let [selectedTime, setSelectedTime] = useState<string>('');
    let [localAppointments, setLocalAppointments] = useState<Appointment[] | []>([]);


    const timeHandler = (key: string) => {
        if (key !== slot) {
            slotSelected(key);
        }
        setSelectedTime(key);
    }

    const slotButton = (date:string,id: string, time: string) => {
        let disabled = false;
        const key = `${date}#${id}#${time}`;
        const reserved: string[] = localAppointments
            .filter( a => a.service.id === Number(id)).map( i => i?.slot?.availableTimeslots[0] ?? '00')
        if (reserved.length > 0) {
            disabled = reserved.indexOf(time) >= 0;
        }
        return (
            <Button variant='secondary' key={key} data-id={key} className={`${selectedTime === key && 'selected'}`} onClick={() => timeHandler(key)} disabled={disabled}>{time}</Button>
        )
    }

    const showSlot = (s: Slot) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };

        const date = new Date(s.date).toLocaleDateString('es-Ar', options);
        const serviceId = s.serviceId ? Number(s.serviceId) : 0;
        return (
            <div className='slots' key={s.date}>
                <span>{ date }</span>
                <div className='time-slots'>{ s.availableTimeslots.map((t) => slotButton(s.date, serviceId.toString(), t)) }</div>
            </div>
        )

    }

    useEffect(() => {
        if (slot) {
            timeHandler(slot);
        }
    }, [slot]);

    useEffect(() => {
        const appointments = getAppointments();
        setLocalAppointments(appointments);
    }, []);

    return (
        <>
            <h6>Próximos turnos disponibles</h6>
            {SLOTS?.map((s) => showSlot(s))}
        </>
    )
}

export default Slots;