
const DEV = import.meta.env.DEV;
const BASE_URL = DEV ? 'public/' : '';
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

let SERVICES: Service[] = [];

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
            const URL = `${BASE_URL}data/services.txt`;
            let services: ServiceResponse;
            services = await readFile(URL);
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
            const URL = `${BASE_URL}data/slots.txt`;
            const slots: Slot[] | [] = await readFile(URL);
            res(slots.filter((s)=> s.serviceId === id));
        } catch (error) {
            console.error('Fetch file Error', error);
            res([]);
        }
    });
};


export { loadServices, loadSlots, getAppointments };
