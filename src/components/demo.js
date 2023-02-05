import React, { useState, useEffect } from 'react'

export default function ExchangeRate() {
  const [Rate, fetchRate] = useState({
    'status': 'loadding'
  })
  const getData = () => {
    fetch('https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=JPY&to_currency=VND&apikey=JB0CO9EK9Y8NC1AJ')
      .then((res) => res.json())
      .then((res) => {

        if(res.Note){
          res.status="error"
        }
        else{
          res['status'] = 'success'
        }
        fetchRate(res)
      })
      .catch(function (error) {
        console.log('Looks like there was a problem: \n', error);
      });
  }
  useEffect(() => {
    getData()
  }, [])
  
  console.log(Rate)
  return (
    <>
      <h2> Hế Lô Chị Cả</h2>
      {(() => {
        if (Rate['status'] == 'success') {
          return (
            <h2>{Rate["Realtime Currency Exchange Rate"]["1. From_Currency Code"]}</h2>
          )  
        }
        else if(Rate["status"]=="error"){
          return (
            <h2>error</h2>
          )
        }
         else {
          return (
            <h2>loadding...</h2>
          )
        }
      })()}
    </>
  )
}