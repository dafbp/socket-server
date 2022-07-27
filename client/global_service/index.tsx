import { Subject } from 'rxjs'

class globalService {
    eventMarket: Subject<{}>
    marketData: {}
    constructor() {
        this.eventMarket = new Subject()
        this.marketData = {}
    }
}
const glb_sv = new globalService()
export default glb_sv