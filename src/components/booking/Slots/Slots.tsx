import React, { useState, useEffect } from 'react';
import { Slot } from '../../../services/services';
import { Button } from 'react-bootstrap';
import './Slots.css';


interface SlotsProps {
    slots?: Slot[],
    slot?: string,
    slotSelected: (key: string) => void;
}

const Slots: React.FC<SlotsProps> = ({slots, slot, slotSelected}) => {
    const SLOTS: Slot[] = slots ?? [];
    let [selectedTime, setSelectedTime] = useState<string>('');


    const timeHandler = (key: string) => {
        if (key !== slot) {
            slotSelected(key);
        }
        setSelectedTime(key);
    }

    const slotButton = (date:string,id: string, time: string) => {
        const key = `${date}#${id}#${time}`;
        return (
            <Button variant='secondary' key={key} data-id={key} className={`${selectedTime === key && 'selected'}`} onClick={() => timeHandler(key)}>{time}</Button>
        )
    }

    const showSlot = (s: Slot) => {
        const serviceId = s.serviceId ? Number(s.serviceId) : 0;
        return (
            <div className='slots' key={s.date}>
                <span>{ s.date }</span>
                <div className='time-slots'>{ s.availableTimeslots.map((t) => slotButton(s.date, serviceId.toString(), t)) }</div>
            </div>
        )

    }

    useEffect(() => {
        if (slot) {
            timeHandler(slot);
        }
    }, [slot]);

    return (
        <>
            <h6>Próximos turnos disponibles</h6>
            {SLOTS?.map((s) => showSlot(s))}
        </>
    )
}

export default Slots;