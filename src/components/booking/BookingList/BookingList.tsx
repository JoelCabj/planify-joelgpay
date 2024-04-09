import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { Service, Slot } from "../../../services/services";

import './BookingList.css'
import { Button } from 'react-bootstrap';

interface NavBarProps {
    services: Service[] | [] | undefined;
    slots: Slot | {} | undefined;
}

const BookingList: React.FC<NavBarProps> = (props) => {
    let CATEGORIES: string[] = [];
    const SERVICES: Service[] = props.services ?? [];
    const SLOTS: Slot = props.slots ?? {};

    const categories = SERVICES.map( s => s.category);
    CATEGORIES = categories.filter((c,i ) => categories.indexOf(c) === i);

    const renderService = (service: Service) => {
        return (
            <div className='accordion-service' key={service.id}>
                <span>{ service.name } </span>
                <p>{ service.description } </p>
                <Button variant="secondary">Seleccionar</Button>
            </div>
        )
    }

    const renderItem = (category: string, index: number) => {
        const services = SERVICES.filter( s => s.category === category);
        return (
            <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header><span>{ category }</span></Accordion.Header>
                <Accordion.Body>
                    {services.map(serv => renderService(serv))}
                </Accordion.Body>
            </Accordion.Item>
        )
    }
    
    return (
        <>
            <h4>Categorias</h4>
            <Accordion>
                {CATEGORIES.map((cat, i) => renderItem(cat, i))}
            </Accordion>
        </>
    );
};

export default BookingList;