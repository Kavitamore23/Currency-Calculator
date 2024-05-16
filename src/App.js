import { useEffect, useState } from 'react';
import './App.css'; 
import axios from 'axios';
function App()
{
  
  const[exchangeRates,setExchangeRates]=useState({});
  const[amount,setAmount]=useState([]);
  const[fromCurrency,setFromCurrency] = useState('USD');
  const[toCurrency,setToCurrency] = useState('INR');
  const[convertedAmount,setConvertedAmount] =useState(null);


  useEffect(() => {
    // Fetch exchange rates from a free API (replace with your preferred API)
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
     
    axios.get(apiUrl)
      .then(response => {
        setExchangeRates(response.data.rates);
        console.log(response.data.rates);
      })
      .catch(error => {
        console.error('Error fetching exchange rates:', error);
      });
  }, [fromCurrency]);   
    
  useEffect(()=>{
    const conversionRate = exchangeRates[toCurrency];
    if(conversionRate)
    {
      const converted = amount * conversionRate;
      setConvertedAmount(converted.toFixed(2));
    }
  },[amount,fromCurrency,toCurrency,exchangeRates]);

    const handleChange =(e) =>{
      const {name,value} = e.target;
      switch(name){
         case 'amount':
         setAmount(value);
         break;

          case 'fromCurrency':
          setFromCurrency(value);
          break;

          case 'toCurrency':
          setToCurrency(value);
          break;

          default:
            break;
      }
    };

  

    {/*}
  let [currencys,setCurrencys] = useState("");
  useEffect(()=>{
    fetch(https://api.fastforex.io/fetch-all?api_key=350b591383-845f383cc5-sdf491)
      .then((response)=>response.json())
      .then((data)=>{
      setCurrencys(data);
      console.log(data);
    )
  })*/}


  return (
    <div className="card"> 
      <div className="header"> 
       <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7GPfEc4J_LYGZKTIqESmI-_IFGCcaaaoShw&s" height="50px" width="60px"></img> 
        <h1> Currency Converter</h1>
      </div> 
      <div className="currency_exchage">
      <br></br>
         <div className="input_container"> 
         
           <lable className="input_lable">Amount:</lable> 
           <input type='number' name='amount' onChange={handleChange} value={amount} className='input_field'  ></input>  
        </div>
        <br></br>

           <lable className= 'input_lable'>Convert From:</lable>
           
             <select name="fromCurrency" values={fromCurrency} className="input_field"onChange={handleChange}>  
                {
                  Object.keys(exchangeRates).map(currency =>(
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))
                }
              </select>
           
             <lable className= 'input_lable'>Convert To:</lable>
             <select name="toCurrency" values={toCurrency} className="input_field"onChange={handleChange}>  
                {Object.keys(exchangeRates).map(currency => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                  ))
                }
              </select>
             
              <br></br>
             </div> 
            
              <div className='output'>
                 <h2>converted amount: <b>{convertedAmount}</b></h2>
              </div>
              
    </div>
   
     
    
  );
}




export default App;