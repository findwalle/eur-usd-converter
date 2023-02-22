import { useState, useEffect } from "react";

import Switch from './Switch';
import FxRate from './FxRate';
import HistoricalTable from "./HistoricalTable";

export default function Converter() {
    const [currentCurrency, setCurrency] = useState("EUR");
    const [initialCurrency, setInitialCurrency] = useState(0);
    const [fxRate, setFxRate] = useState(1.1);
    const [editFx, setEditFx] = useState(false);
    const [history, setHistory] = useState([[<tr>
        <th>Fx Rate</th>
        <th>Override</th>
        <th>Initial</th>
        <th>Converted</th>
    </tr>]]);

    // function to grab random value to change initial currency
    const random = () => {
        const change =  Math.floor(Math.random() * 10) - 5;
        if (change === 0) return random();
        return change / 100;
    }

    /// 3 second interval to add random value btwn -0.05 and 0.05 to initialValue
    useEffect(() => {
        // polling
        const interval = setInterval(() => {
            // need to convert to 2 decimal places using toFixed -> which converts to String, need to reconvert
            // to number
            const newValue = Number((initialCurrency + random()).toFixed(2))
            setInitialCurrency(newValue);
        }, 3000);

        return () => clearInterval(interval);
    }, [initialCurrency])

    // historical data add
    useEffect(() => {
        // console.log(history, editFx)
        const deepHistory = history.slice()
        const converted = Number(initialCurrency * fxRate)
        if (deepHistory.length >= 6) {
            deepHistory.splice(1, 1)
        }
        deepHistory.push([fxRate, String(editFx), 
            currentCurrency === "EUR" ? Number(initialCurrency).toFixed(2) + "€": converted.toFixed(2) + "$", 
            currentCurrency === "EUR" ? converted.toFixed(2) + "$ " : Number(initialCurrency).toFixed(2) + "€ "]
        )
        setHistory(deepHistory)
    }, [initialCurrency])

    // converter component allowing user to enter amt in EUR and display converted Value in USD
    return (
        <>
            <div id = "conversion-calculator">
                <FxRate fxRate = {fxRate} setFxRate = {setFxRate} editFx = {editFx} setEditFx = {setEditFx}/>
                <div id = "current-currency">{currentCurrency}</div>
                <input 
                    id = "currency-top" 
                    type = "number"
                    value = {currentCurrency === "EUR" ? initialCurrency: Number((initialCurrency * fxRate).toFixed(2))}
                    onChange = {(e) => {setInitialCurrency(Number(e.target.value))}}
                >
                </input>
                
                <input 
                    id = "currency-bottom" 
                    type = "number" 
                    value ={currentCurrency === "USD" ? initialCurrency : Number((initialCurrency * fxRate).toFixed(2))} 
                    readOnly = "true">
                </input>
                <Switch setCurrency = {setCurrency}/>
            </div>
            <HistoricalTable history = {history} />
        </>
    )
}