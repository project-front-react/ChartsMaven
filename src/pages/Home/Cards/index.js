import React from 'react'
import './Cards.scss';
import { Col, Row } from 'react-bootstrap';
import { BASE_URL } from '../../../utils/Constants';

export default function Cards({ latestUpdates }) {
    return (
        <div className='card-grid'>
            <Row>
                {latestUpdates?.length > 0 && latestUpdates.map((item, index) => (
                    <Col lg={4} md={6} sm={6} xs={12} className='colCard'>
                        <div className='card-item' key={index}>
                            <div className='image-wrapper'>
                                <img src={`${BASE_URL}${item.image}`} id="imgPre" alt='employee' />
                            </div>
                            <div className='card-title'>
                                <h2 dangerouslySetInnerHTML={{ __html: item?.title }}></h2>
                            </div>
                        </div></Col>
                ))}
            </Row>
        </div>
    )
}
