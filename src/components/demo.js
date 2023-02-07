import React, { useState, useEffect } from 'react'

export default function ExchangeRate() {
  const currencies = ['VND', 'USD', 'JPY']
  const [Rates, fetchRates] = useState([]
  )
  const [fromCurrency, setFromCurrency] = useState('VND')
  const getData = () => {
    const toCurrencies = []
    currencies.forEach(currency => {
      currency !== fromCurrency && toCurrencies.push(currency)
    });
    console.log(...toCurrencies)
    toCurrencies.forEach(toCurrency => {
      fetch(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=JB0CO9EK9Y8NC1AJ`)
        .then((res) => res.json())
        .then((res) => {
          if (res.Note) {
            res.status = "error"
          }
          else {
            res['status'] = 'success'
          }
          fetchRates(prevRates => [...prevRates,res])

        })
        .catch(function (error) {
          console.log('Looks like there was a problem: \n', error);
        });
    });
  }
  console.log(Rates)
  useEffect(() => {
    getData()
    console.log(1)
    return ()=> {
      fetchRates([])
    }
  },[fromCurrency])
  return (
    <>
      <h2> Hế Lô Chị Cả</h2>
     {(() => {
      try{
        if (Rates[0]['status'] === 'success') {
          return (
            <>
            <h2>{Rates[0]["Realtime Currency Exchange Rate"]["3. To_Currency Code"]}</h2>
            <h2>{Rates[1]["Realtime Currency Exchange Rate"]["3. To_Currency Code"]}</h2>
            </>
          )  
        }
        else if(Rates[0]["status"]==="error"){
          return (
            <h2>error</h2>
          )
        }
         else {
          return (
            <h2>loading</h2>
          )
        }
      }catch (e){
        console.log(e.message);
    }
      })()}
    </>
  )
}