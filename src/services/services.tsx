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
    date: Date;
    serviceId: string;
    availableTimeslots: string[];
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

const loadSlots = (): Promise<Slot | {}> => {
    return new Promise(async (res) => {
        try {
            const slot: Slot | {} = await readFile(LoadType.slots);
            SLOTS = slot;
            res(slot);
        } catch (error) {
            console.error('Fetch file Error', error);
            res({});
        }
    });
};


export { loadServices, loadSlots };
