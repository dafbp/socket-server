/**
 * Cache data market
 */

import EventInternalInstance from "../../../socket/event"

export let MarketDataCache: {
    [key: string]: {
        ohlcv: { '1DAY': {}; '12HRS': {}; '1HRS': {} }
        trade: {}
}} = {}

EventInternalInstance.publiser.subscribe(({ type, data: parseData }) => {
        if (!MarketDataCache[parseData.symbol_id]) {
            MarketDataCache[parseData.symbol_id] = new MarketSymbolInfo()
        }
        if (parseData.type === 'trade') {
            MarketDataCache[parseData.symbol_id]['trade'] = parseData
        }
        if (parseData.type === 'ohlcv') {
            if (parseData.period_id === '1DAY') {
                MarketDataCache[parseData.symbol_id]['ohlcv']['1DAY'] = parseData
            }
            if (parseData.period_id === '12HRS') {
                MarketDataCache[parseData.symbol_id]['ohlcv']['12HRS'] = parseData
            }
            if (parseData.period_id === '1HRS') {
                MarketDataCache[parseData.symbol_id]['ohlcv']['1HRS'] = parseData
            }
        }
})

class MarketSymbolInfo {
    ohlcv: { '1DAY': {}; '12HRS': {}; '1HRS': {} }
    trade: {};

    constructor() {
        this.trade = {}
        this.ohlcv = {
            '1DAY': {},
            '12HRS': {},
            '1HRS': {},
        }
    }
}
