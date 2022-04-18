   
import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Card, Row, Col, Input } from 'antd';
import Loader from './Loader';

import { useGetCryptosQuery } from '../services/cryptoApi';


const Cryptocurrencies = ({ simplified }) => {
    const count = simplified ? 12 : 100;
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState();
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
      setCryptos(cryptosList?.data?.coins);
      
  
      const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));
  
      setCryptos(filteredData);
    }, [cryptosList, searchTerm]);

    if (isFetching) return <Loader />
    
  return (
    <>
    {!simplified && 
    <>
    <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
          <h2>Click on one to get more information!</h2>
    </>
      }
    <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          > 
              <Card onClick={() => window.open(`${currency.coinrankingUrl}`)} key={currency.uuid} rel="noopener noreferrer"
                title={`${currency.rank}. ${currency.name}`}
                extra={<img alt="crypto-base" className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: ${millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
              </Card>
          </Col>
        ))}
      </Row>
    </>
    )
}

export default Cryptocurrencies