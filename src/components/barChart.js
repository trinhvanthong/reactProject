import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale, //y
    Tooltip,
    Legend
} from 'chart.js'
ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale, //y
    Tooltip,
    Legend
)

export default function BarChart() {
    const currencies = ['VND', 'USD', 'CNY']
    const [Datas, fetchData] = useState([]
    )
    const [toCurrency, setToCurrency] = useState('VND')
    const fromCurrencies = []
    currencies.forEach(currency => {
        currency !== toCurrency && fromCurrencies.push(currency)
    });
    const getData = () => {
        const fromCurrencies = []
        currencies.forEach(currency => {
            currency !== toCurrency && fromCurrencies.push(currency)
        });
        console.log(...fromCurrencies)
        fromCurrencies.forEach(fromCurrency => {
            fetch(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=JB0CO9EK9Y8NC1AJ`)
                .then((res) => res.json())
                .then((res) => {
                    if (res.Note) {
                        res.status = "error"
                    }
                    else if (res['Error Message']) {
                        res.status = "error"
                    }
                    else {
                        res['status'] = 'success'
                    }
                    fetchData(prevRates => [...prevRates, res])

                })
                .catch(function (error) {
                    console.log('Looks like there was a problem: \n', error);
                });
        });
    }
    console.log(Datas)
    useEffect(() => {
        getData()
        console.log(1)
        return () => {
            fetchData([])
        }
    }, [toCurrency])
    const rates = []
    const askPrices = []
    const bidPrices = []
    try {
        Datas.forEach(dt => {
            rates.push(dt["Realtime Currency Exchange Rate"]["5. Exchange Rate"])
            askPrices.push(dt["Realtime Currency Exchange Rate"]["8. Bid Price"])
            bidPrices.push(dt["Realtime Currency Exchange Rate"]["9. Ask Price"])
        });
    } catch (error) {
        console.log(error)
    }
    const data = {
        labels: [...fromCurrencies],
        datasets: [
            {
                label: 'Exchange-Rate',
                data: [...rates],
                backgroundColor: 'blue',
                borderColor: 'black',
                borderWidth: 1
            },
            {
                label: 'Ask-Price',
                data: [...askPrices],
                backgroundColor: 'red',
                borderColor: 'black',
                borderWidth: 1
            },
            {
                label: 'Bid-Price',
                data: [...bidPrices],
                backgroundColor: 'green',
                borderColor: 'black',
                borderWidth: 1
            }
        ]
    }
    const options = {
    }
    return (
        <>
            <Bar
                data={data}
                options={options}
            ></Bar>
            <button onClick={() => setToCurrency('VND')}
                style={toCurrency === 'VND' ? {
                    color: '#fff',
                    backgroundColor: '#333'
                } : {}}>VND</button>
            <button onClick={() => setToCurrency('USD')}
                style={toCurrency === 'USD' ? {
                    color: '#fff',
                    backgroundColor: '#333'
                } : {}}>USD</button>
            <button onClick={() => setToCurrency('CNY')}
                style={toCurrency === 'CNY' ? {
                    color: '#fff',
                    backgroundColor: '#333'
                } : {}}>CNY</button>
        </>
    )
}