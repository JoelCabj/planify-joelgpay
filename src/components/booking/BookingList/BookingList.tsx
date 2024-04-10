import React, { MouseEvent, useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { Service } from "../../../services/services";

import './BookingList.css'
import { Button } from 'react-bootstrap';

interface BookListProps {
    services: Service[] | [] | undefined;
    serviceSelected: (id: string) => void;
    service: Service | undefined
}

interface ButtonServiceProps extends HTMLButtonElement {
    'data-id': string;
}

interface ButtonEvent extends MouseEvent<HTMLButtonElement> {
    target: ButtonServiceProps,
}

const BookingList: React.FC<BookListProps> = ({services, service, serviceSelected}) => {
    let CATEGORIES: string[] = [];
    const SERVICES: Service[] = services ?? [];
    const [selected, setSelected] = useState<Service>();

    const categories = SERVICES.map( s => s.category);
    CATEGORIES = categories.filter((c,i ) => categories.indexOf(c) === i);

    const chooseService = (event: ButtonEvent): void => {
        const id = event.target.getAttribute('data-id');
        if (id) {
            serviceSelected(id);
        }
    };

    useEffect(() => {
        if (service) {
            setSelected(service);
        }
    }, [service]);


    const renderService = (service: Service) => {
        return (
            <div className='accordion-service' key={service.id}>
                <span>{ service.name } </span>
                <p>{ service.description } </p>
                <Button variant="secondary" onClick={chooseService} data-id={service.id} disabled={selected?.id === service.id}>
                    {selected?.id === service.id ? 'Seleccionado' : 'Seleccionar'}
                </Button>
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