export interface Service {
    id: number;
    name: string;
    description: string;
    category: string;
}

export interface ServiceResponse {
    services: Service[];
}

export interface Slot {
    date: string;
    serviceId?: number;
    availableTimeslots: string[];
}

export interface Appointment {
    slot: Slot;
    service: {
        id: number,
        name: string,
    }
}

export enum LoadType {
    slots = 'src/services/data/slots.txt',
    services = 'src/services/data/services.txt'
}

let SERVICES: Service[] = [];
let SLOTS: Slot | {} = {};

const readFile = async (file: string): Promise<any> => {
    try {
        const data = await fetch(file).then(res => res.text());
        const result = JSON.parse(data);
        return result;
    } catch (error) {
        console.error('Fetch file ERROR', file, error);
        return {};
    }

}

const getAppointments = (): Appointment[] => {
    const appointments: Appointment[] = [];
    const local = localStorage.getItem('app_appointments');
    if (local) {
        const mysApp: Appointment[] = JSON.parse(local);
        appointments.push(...mysApp)
    }
    return appointments;
}

const loadServices = (): Promise<Service[]> => {
    return new Promise(async (res) => {
        try {
            let services: ServiceResponse;
            services = await readFile(LoadType.services);
            SERVICES = services.services;
            res(SERVICES);
        } catch (error) {
            console.error('Fetch file ERROR', error);
            res([]);
        }
    });
};

const loadSlots = (id: number): Promise<Slot[] | []> => {
    return new Promise(async (res) => {
        try {
            const slots: Slot[] | [] = await readFile(LoadType.slots);
            SLOTS = slots;
            res(slots.filter((s)=> s.serviceId === id));
        } catch (error) {
            console.error('Fetch file Error', error);
            res([]);
        }
    });
};


export { loadServices, loadSlots, getAppointments };
