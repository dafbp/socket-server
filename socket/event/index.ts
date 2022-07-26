import { Subject } from 'rxjs';

interface IPublicser {
    next?: (msg: any) => void;
    subscribe?: (msg: any) => any
}


class EventInternal {
    publiser: IPublicser

    constructor() {
        this.publiser = new Subject<number>()
    }

}
const EventInternalInstance = new EventInternal()
export default EventInternalInstance