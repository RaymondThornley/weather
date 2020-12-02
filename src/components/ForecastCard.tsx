import React from 'react';
import { Col, Row } from 'react-bootstrap';
import '../css/weatherDayCard.css';

type weatherDayCardProps = {
    isMetric: boolean,
    date: string,
    condition: string,
    conditionIcon: string,
    high: string,
    low: string
}

const ForecastCard = (props: weatherDayCardProps) => {
    return (
        <div className="weatherDayCardContainer">
            <div>{props.date}</div>
            <div>
                <img src={props.conditionIcon} alt="" />
            </div>
            <div className="weatherDayCardConditionText">{props.condition}</div>
            <Row>
                <Col>
                    <div>High:</div>
                    <div>{props.high} &deg;{props.isMetric ? "C" : "F"}</div>
                </Col>
                <Col>
                    <div>Low:</div>
                    <div>{props.low} &deg;{props.isMetric ? "C" : "F"}</div>
                </Col>
            </Row>
        </div>
    );
}

export default ForecastCard;
