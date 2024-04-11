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

        return (
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <div className="ms-2 me-auto">
                <div className="fw-bold">{a.service.name}</div>
                {a.slot.date} - {a.slot.availableTimeslots[0] ?? '--'}
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
