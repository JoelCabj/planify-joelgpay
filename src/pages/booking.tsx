import React, { useState, useEffect } from 'react';

import { loadServices, loadSlots, Service, Slot } from '../services/services';

import BookingList from '../components/booking/BookingList/BookingList';

const BookingPage: React.FC<any> = () => {
    const [services, setServices] = useState<Service[] | []>();
    const [slots, setSlot] = useState<Slot | {}>();

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
                <span>Header</span>
            </div>
            <div className='body'>
                <BookingList services={services} slots={slots}></BookingList>
            </div>
            <div className='footer'>
                <span>Footer</span>
            </div>
        </>
    )
}

export default BookingPage;
