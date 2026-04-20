import React from 'react';
import { AirPollutionData } from '../../types/Weather';
import { getAQILevel, getAQIColor, roundToOneDecimal } from '../../utils/weatherStyles';
import './AirPollution.css';

interface AirPollutionProps {
    pollution: AirPollutionData;
}

const AirPollution: React.FC<AirPollutionProps> = ({ pollution }) => {
    const currentPollution = pollution.list[0];
    const aqiLevel = getAQILevel(currentPollution.main.aqi);
    const aqiColor = getAQIColor(currentPollution.main.aqi);

    return (
        <div className="air-pollution">
            <h3 className="pollution-title">Air Quality</h3>
            <div className="aqi-display">
                <div className="aqi-value" style={{ color: aqiColor }}>
                    {currentPollution.main.aqi}
                </div>
                <div className="aqi-label" style={{ color: aqiColor }}>
                    {aqiLevel}
                </div>
            </div>
            <div className="pollution-details">
                <div className="pollution-item">
                    <span className="pollution-label">PM2.5</span>
                    <span className="pollution-value">{roundToOneDecimal(currentPollution.components.pm2_5)} μg/m³</span>
                </div>
                <div className="pollution-item">
                    <span className="pollution-label">PM10</span>
                    <span className="pollution-value">{roundToOneDecimal(currentPollution.components.pm10)} μg/m³</span>
                </div>
                <div className="pollution-item">
                    <span className="pollution-label">O₃</span>
                    <span className="pollution-value">{roundToOneDecimal(currentPollution.components.o3)} μg/m³</span>
                </div>
                <div className="pollution-item">
                    <span className="pollution-label">NO₂</span>
                    <span className="pollution-value">{roundToOneDecimal(currentPollution.components.no2)} μg/m³</span>
                </div>
            </div>
        </div>
    );
};

export default AirPollution;