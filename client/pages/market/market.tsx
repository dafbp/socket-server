import { socketAPI } from 'api';
import { MARKET_EVENT } from 'api/constants/socketConfig';
import { useEffect, useRef, useState } from 'react';
import glb_sv from 'global_service';

export default function Market() {
    const [price, setPrice] = useState(0)
    const ref = useRef(0)
    const [upDown, setUpDown] = useState(false)

    useEffect(() => {
        socketAPI.methodCall({
            method: 'auth',
            params: ['username', 'password'],
        });
        handleMarketData()
        return () => {};
    }, []);

    const handleMarketData = () => {
        glb_sv.eventMarket.subscribe((msg) => {
            if (msg.type === MARKET_EVENT.update_data) {
                glb_sv.marketData = msg.data.data;
                if (glb_sv.marketData.price > ref.current){
                    setUpDown(true)
                } else setUpDown(false)
                ref.current = glb_sv.marketData.price
                setPrice(glb_sv.marketData.price)
                // console.log("data", price > ref.current)
            }
        })
    }

    return (
        <>
        <div className='flex items-center justify-between'>
            <div className='flex'>
                <img className="coin-logo mr-1" src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png" style={{height: '30px'}}/>
                Bitcoin BTC
            </div>
            <div className='flex items-center'>
                <div className='mr-1'>{price}</div>
                {upDown? 
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.66663 12.5274V5.08078L11.92 8.33411C12.18 8.59411 12.6066 8.59411 12.8666 8.33411C13.1266 8.07411 13.1266 7.65411 12.8666 7.39411L8.47329 3.00078C8.34874 2.87594 8.17964 2.80579 8.00329 2.80579C7.82695 2.80579 7.65785 2.87594 7.53329 3.00078L3.13329 7.38744C2.87329 7.64744 2.87329 8.06744 3.13329 8.32744C3.39329 8.58744 3.81329 8.58744 4.07329 8.32744L7.33329 5.08078V12.5274C7.33329 12.8941 7.63329 13.1941 7.99996 13.1941C8.36663 13.1941 8.66663 12.8941 8.66663 12.5274Z" fill="#12DA35"></path></svg>
                : <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.33665 3.47245V10.9191L4.08332 7.66579C3.82332 7.40579 3.39665 7.40579 3.13665 7.66579C2.87665 7.92579 2.87665 8.34579 3.13665 8.60579L7.52998 12.9991C7.78998 13.2591 8.20998 13.2591 8.46998 12.9991L12.8633 8.60579C13.1233 8.34579 13.1233 7.92579 12.8633 7.66579C12.7388 7.54095 12.5697 7.4708 12.3933 7.4708C12.217 7.4708 12.0479 7.54095 11.9233 7.66579L8.66998 10.9191V3.47245C8.66998 3.10579 8.36998 2.80579 8.00332 2.80579C7.63665 2.80579 7.33665 3.10579 7.33665 3.47245Z" fill="#EF0210"></path></svg>
                }
            </div>
        </div>
            
        </>
    );
}
