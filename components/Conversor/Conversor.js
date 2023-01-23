import { useState, useEffect } from 'react';
import axios from 'axios';

const Conversor = (props) => {
  
  const [input1Value, setInput1Value] = useState(1);
  const [input2Value, setInput2Value] = useState(props.cotacao);
  
  const [cotacao, setCotacao] = useState(props.cotacao)
  
  //Atualiza os inputs 
  function handleInput1Change(e) {
    setInput1Value(e.target.value)
    setInput2Value((e.target.value * cotacao).toFixed(2))
  }

  function handleInput2Change(e) {
    setInput2Value(e.target.value)
    setInput1Value((e.target.value / cotacao).toFixed(2))
  }
  
  function getFormattedDate() {
    var date = new Date();
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();
    return day + "/" + month + "/" + year;
  }
  const [data, setData] = useState(getFormattedDate)
  
  const [menuOptions, setOptions] = useState(props.currency);
  
  function selectChange(e) {
    setOptions(e.target.value);
  }
  
  const currencyPages = {
    USD: '/',
    CAD: '/dolar-canadense',
    AUD: '/dolar-australiano',
    HKD: '/dolar-hongkong',
    TWD: '/dolar-taiwanes',
    EUR: '/euro',
    GBP: '/libra',
    ARS: '/peso-argentino',
    MXN: '/peso-mexicano',
    CNY: '/yuan-chines',
    RUB: '/rublo-russo',
    CHF: '/franco-suico',
    JPY: '/iene-japones'
  };
  
  useEffect(() => {
    if (menuOptions != props.currency) {
       window.location.href = currencyPages[menuOptions];
    }
  }, [menuOptions])
  
  return (
    <article>
         <div className="h1_principal">
            <h1>Conversor de moedas</h1>
         </div>
         <div className="input_area">
           <div className="moedas_input">
              <div id="input_1" style={{border: '2px solid #a4a4a4', borderRight: 'none'}}>
                 <div className="input_1">
                    <div className="moeda_icon">
                       <img src={props.flag} width={30} alt="Bandeira"/>
                    </div>
                    <select id="currency_options" onChange={selectChange} value={props.currency}>
                       <option value="USD">Dólar americano</option>
                       <option value="CAD">Dólar canadense</option>
                       <option value="AUD">Dólar australiano</option>
                       <option value="HKD">Dólar de Hong Kong</option>
                       <option value="TWD">Dólar taiwanês</option>
                       <option value="EUR">Euro</option>
                       <option value="GBP">Libra</option>
                       <option value="ARS">Peso argentino</option>
                       <option value="MXN">Peso mexicano</option>
                       <option value="CNY">Yuan chinês</option>
                       <option value="JPY">Iene japonês</option>
                       <option value="RUB">Rublo russo</option>
                       <option value="CHF">Franco suíço</option>
                    </select>
                 </div>
                 <div className="input_div">
                    <input id="entrada_1" name={props.currency} type="number" value={input1Value} onChange={handleInput1Change} style={{border: '2px solid #A4A4A4', borderLeft: 'none'}}/>
                 </div>
              </div>
              <div id="input_2" style={{border: '2px solid #a4a4a4', borderRight: 'none'}}>
                 <div className="moeda_icon">
                    <img src='/flags/br.svg'  alt="Bandeira do Brasil"/>
                 </div>
                 <div className="input_div">
                    <input id="entrada_2" name={props.br} type="number" value={input2Value} onChange={handleInput2Change} style={{border: '2px solid #a4a4a4', borderLeft: 'none'}}/>
                 </div>
              </div>
              <div className="data">
                 <span id="data">{data}</span>
              </div>
            </div>
          </div>
          <style jsx>{`
          .h1_principal {
            max-width: 600px;
            display: flex;
            justify-content: center;
            margin: auto;
            margin-top: 20px;
            padding: 10px;
            flex-direction: column;
          } 
          
          h1 {
            text-align: center;
            font-weight: bold;
            font-family: 'Inter', sans-serif;
            color: #333333;
          }
          .input_area {
            max-width: 700px;
            margin: auto;
            padding: 10px;
            padding-top: 0px;
            padding-bottom: 0px;
          }
          
          .moedas_input {
            max-width: 700px;
            padding: 10px;
            margin: auto;
            display: flex;
            flex-direction: column;
            justify-content: right;
          }
          #input_1, #input_2 {
            max-width: 100%;
            height: 68px;
            margin-bottom: 18px;
            display: flex;
            border-radius: 8px;
            flex-direction: inline;
            background-color: white;
            padding-left: 5px;
            cursor: pointer;
          }
          #input_2 {
            align-items: center;
            margin-bottom: 8px;
          }
          #currency_options {
            outline: none;
            border: none;
            font-family: font-family: 'Inter', sans-serif;
            font-weight: bold;
            color: #5c5c61;
            background-color: transparent;
          }
          .moeda_icon {
            width: 52px;
            height: 40px;
            margin: 3px;
            display: flex;
            align-items: center;
          }
          .input_div {
            width: 100%;
            display: flex;
            justify-content: right;
            align-items: center;
          }
          input {
            width: 100%;
            height: 68px;
            text-align: right;
            padding-right: 8px;
            font-size: 40px;
            color: #5c5c61;
            outline: none;
            border-top-right-radius: 8px;
            border-bottom-right-radius: 8px;
            font-family: 'Inter', sans-serif;
            font-weight: bold;
          }
          .moeda_icon img {
            width: 52px;
            heigth: 45px;
          }
          .data {
            margin: auto;
            padding: 3px;
            display: flex;
            justify-content: center;
          }
          .data span {
            text-align: center;
            font-family: 'Inter', sans-serif;
            font-weight: normal;
            color: #5c5c61;
          }
        
       `}</style>
      </article>
  )  
} 

export default Conversor 