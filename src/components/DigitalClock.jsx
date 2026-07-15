import React, { useState, useEffect } from 'react';
import '../styles/DigitalClock.css';

const DigitalClock = () => {
  const [times, setTimes] = useState({});

  const timeZones = [
    { name: 'New York', zone: 'America/New_York', flag: 'US' },
    { name: 'London', zone: 'Europe/London', flag: 'UK' },
    { name: 'Dubai', zone: 'Asia/Dubai', flag: 'AE' },
    { name: 'Bangkok', zone: 'Asia/Bangkok', flag: 'TH' },
    { name: 'Tokyo', zone: 'Asia/Tokyo', flag: 'JP' },
    { name: 'Sydney', zone: 'Australia/Sydney', flag: 'AU' },
    { name: 'Dhaka', zone: 'Asia/Dhaka', flag: 'BD' },
    { name: 'Singapore', zone: 'Asia/Singapore', flag: 'SG' },
    { name: 'Hong Kong', zone: 'Asia/Hong_Kong', flag: 'HK' },
    { name: 'Los Angeles', zone: 'America/Los_Angeles', flag: 'LA' },
    { name: 'Toronto', zone: 'America/Toronto', flag: 'CA' },
    { name: 'Sao Paulo', zone: 'America/Sao_Paulo', flag: 'BR' },
  ];

  useEffect(() => {
    const updateTime = () => {
      const newTimes = {};
      timeZones.forEach(tz => {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: tz.zone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });
        newTimes[tz.zone] = formatter.format(new Date());
      });
      setTimes(newTimes);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="digital-clock-container">
      <div className="clock-header">
        <h1>World Time Clock</h1>
        <p>Current time across different time zones</p>
      </div>

      <div className="clock-grid">
        {timeZones.map((tz) => (
          <div key={tz.zone} className="clock-card">
            <div className="clock-flag">{tz.flag}</div>
            <div className="clock-location">{tz.name}</div>
            <div className="clock-time">{times[tz.zone] || '00:00:00'}</div>
            <div className="clock-zone">UTC {getUTCOffset(tz.zone)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to get UTC offset
function getUTCOffset(timeZone) {
  const date = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const tzDate = new Date(
    `${parts[4].value}-${parts[0].value}-${parts[2].value}T${parts[6].value}:${parts[8].value}:${parts[10].value}Z`
  );
  const offset = (date - tzDate) / (1000 * 60 * 60);
  const sign = offset >= 0 ? '+' : '-';
  const hours = Math.abs(Math.floor(offset));
  const minutes = Math.abs((offset % 1) * 60);
  return `${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export default DigitalClock;
