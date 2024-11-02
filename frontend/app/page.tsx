"use client"

import { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css fil
//import { getRandomNumber } from './server';
import LoginForm from './login';
import { useAuth } from './auth';
import { getRandomNumbers } from './server';

type Range = {
  startDate: Date
  endDate: Date
  key: string
}

type RangeArg = [Range] | undefined

export default function Home() {

  const { token } = useAuth();

  const [range, setRange] = useState<RangeArg>([{
    startDate: new Date(new Date().setHours(0, 0, 0, 0)), // Set time to 00:00:00
    endDate: new Date(new Date().setHours(0, 0, 0, 0)),   // Set time to 00:00:00
    key: "selection"
  }]);

  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [data, setData] = useState<any>(null); // Loading state

  function onChange(value: RangeArg) {
    setRange(value)
  }

  const fetchRandomNumber = async () => {
    setLoading(true);
    try {
      setData( await getRandomNumbers(token!))
    } catch (error) {
      console.error('Error fetching random number:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <main>
      {
        !token ? 
        <LoginForm/> :
        <>
          <DateRange onChange={(val) => {
            const newRange: RangeArg = [
              {
                endDate: val[range![0].key].endDate!,
                startDate: val[range![0].key].startDate!,
                key: "selection"
              }
            ]
            onChange(newRange)
          }
          } ranges={range} />
          <h1>
            Start Date: {range?.[0].startDate.toString()}
          </h1>
          <h1>
            End Date: {range?.[0].endDate.toString()}
          </h1>

          <button onClick={fetchRandomNumber} disabled={loading}>
            {loading ? 'Loading...' : 'Get Random Number'}
          </button>

          {data !== null && data}

        </>
      }
    </main>
  );
}
