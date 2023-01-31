import Head  from 'next/head';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import Conversor from 'components/Conversor/Conversor';
import Chart30days from 'components/Chart/Chart';
import axios from 'axios';

//Pegar a cotação da moeda e passa como props
export async function getStaticProps() {
 
    const code = 'AUD'
    
    //Pega a cotação da moeda
    const apiLink = `https://economia.awesomeapi.com.br/json/last/${code}-BRL`
    let cotacao = 0;
    await axios.get(apiLink)
    .then(response => {
      const resJson = response.data
      const strForNum = parseFloat(resJson[code+'BRL'].bid)
      cotacao = strForNum.toFixed(2)
    })
    .catch(err => {
      console.log(err)
    });
    
    //Pega as ultimas cotações da moeda e passa para o componente Chart
    const last30day = `https://economia.awesomeapi.com.br/json/daily/${code}-BRL/30`
    let bid30days = {
      bid: [],
      timestamp: []
    };
    
    await axios.get(last30day)
    .then(response => {
      const res30days = response.data
      for (let i = 0; i < 30; i++) {
        bid30days.bid.push(res30days[i].bid)
        bid30days.timestamp.push(res30days[i].timestamp)
      }
    })
    .catch(err => {
      console.log(err)
    });

  return {
    props: {
      cotacao,
      code,
      bid30days,
    },
    revalidate: 3600,
  };
}

export default function Home(props) {
  
  return (
      <>
        <Head>
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"/>
          <meta name="description" content="Cotação atualizada do dólar australiano hoje em relação ao real. Conversor de moedas e gráfico do dólar australiano nos últimos dias."/>
          <meta name="keywords" content="Dólar australiano, Conversor, Cotação, Real, Câmbio, Hoje, Preço" />
          <title>Dólar Australiano Hoje: Converter para Real, Cotação Atualizada e Gráfico.</title>
          
          <meta property="og:title" content="moedashoje.com" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="http://dolaragora.com/" />
          <meta property="og:image" content="http://ia.media-imdb.com/rock.jpg" />
          <meta property="og:description" content="A group of U.S. Marines, under command of a renegade general, take over Alcatraz and threaten San Francisco Bay with biological weapons." />
          
        </Head>
        <Header />
        <div className='container_principal'>
          <Conversor cotacao={props.cotacao} currency={props.code} br={'BRL'} flag={'/flags/au.svg'} />
          <Chart30days currency={props.code} last30days={props.bid30days} />
        </div>
        <main>
          <h2>Cotação do dólar australiano hoje</h2>
          <p>A cotação do dólar australiano hoje é de R$ {props.cotacao} reais. Isso significa que para comprar 1 dólar australiano, é necessário pagar R$ {props.cotacao} reais. A cotação do dólar australiano pode variar diariamente devido a diversos fatores econômicos e políticos.</p>
          <h2>Sobre o dólar australiano</h2>
          <p>O dólar australiano é a moeda oficial da Austrália e é utilizado em todo o território australiano. Ele é emitido e controlado pelo Banco da Austrália e é considerado uma das moedas mais estáveis e fortes do mundo. A economia australiana é altamente dependente das exportações de recursos naturais, o que pode afetar o valor do dólar australiano em relação às outras moedas.</p>
          <h2>Converter dólar australiano para real</h2>
          <p>A ferramenta online X-MOEDAS oferece a possibilidade de converter dólar australiano para real. Para fazer a conversão, basta inserir a quantidade desejada de dólares australianos e a ferramenta calculará automaticamente o valor equivalente em reais, de acordo com a cotação atual. Essa ferramenta é útil para quem viaja para a Austrália ou precisa realizar transações comerciais com o país, pois permite saber quanto dinheiro será necessário e ajuda a planejar as finanças.</p>
          
          <style jsx>{`
            main {
              max-width: 700px;
              padding: 20px;
              margin: auto;
              margin-bottom: 100px;
            }
            
            main h2, h3 {
              font-family: 'Inter', sans-serif;
              font-size: 22px;
              margin-bottom: 30px;
              margin-top: 30px;
              color: #333333;
            }
            
            main p {
              font-family: 'Inter', sans-serif;
              font-weight: normal;
              font-size: 17px;
              line-height: 1.5;
              color: #333333;
            }
          `}</style>
          
        </main>
        <Footer/>
      </>
  )
}
