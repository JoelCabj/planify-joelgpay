import React, { useEffect, useState } from 'react';
import { Appointment, getAppointments } from '../services/services';
import { ListGroup } from 'react-bootstrap';

const AppointmentPage: React.FC<any> = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    useEffect(() => {
        const myAppointments = getAppointments();
        setAppointments(myAppointments);
    }, []);

    const renderItem = (a: Appointment) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        const {slot, service} = a;
        const time = slot.availableTimeslots[0];
        const key = `${slot.date}#${service.id}#${time}`;
        const date = new Date(slot.date).toLocaleDateString('es-AR', options);
        return (
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
                key={key}
            >
                <div className="ms-2 me-auto">
                <div className="fw-bold">{service.name}</div>
                El {date} a las {time ?? '--'}
                </div>
            </ListGroup.Item>
        )
    }
    return (
        <div className='appointments'>
            <h5>Turnos</h5>
            <ListGroup as="ol">
                {appointments.map( a => renderItem(a))}
            </ListGroup>
        </div>
    )
}

export default AppointmentPage;
