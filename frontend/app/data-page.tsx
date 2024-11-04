"use client"

import { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css fil
//import { getRandomNumber } from './server';
import { useAuth } from './auth-context';
import { getRandomNumbers } from './server';
import RandomLineChart from './random-number-line-chart';

type Range = {
  startDate: Date
  endDate: Date
  key: string
}

type RangeArg = [Range] | undefined

export default function DataPage() {

  const { token } = useAuth();

  const [range, setRange] = useState<RangeArg>([{
    startDate: new Date(new Date().setHours(0, 0, 0, 0)), // Set time to 00:00:00
    endDate: new Date(new Date().setHours(0, 0, 0, 0)),   // Set time to 00:00:00
    key: "selection"
  }]);

  const [lastActivity, setActivity] = useState<Date>(new Date()); // Loading state
  function updateActivity(){
    setActivity(new Date())
  }

  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [data, setData] = useState<number[]>([]); // Loading state

  function onRangeChange(value: RangeArg) {
    setRange(value)
    updateActivity();
  }

  const fetchRandomNumber = async () => {
    updateActivity()
    setLoading(true);
    try {
      setData( await getRandomNumbers(range![0].startDate.valueOf(), range![0].endDate.valueOf(), token!))
    } catch (error) {
      console.error('Error fetching random number:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomNumber()
  }, [])

  return (
    <main>
          <h1>
            Last Activity: {lastActivity.toString()}
          </h1>
          <DateRange onChange={(val) => {
            const newRange: RangeArg = [
              {
                endDate: val[range![0].key].endDate!,
                startDate: val[range![0].key].startDate!,
                key: "selection"
              }
            ]
            onRangeChange(newRange)
          }
          } ranges={range} />
          <h1>
            Start Date: {range?.[0].startDate.toString()}
          </h1>
          <h1>
            End Date: {range?.[0].endDate.toString()}
          </h1>

          <button onClick={fetchRandomNumber} disabled={loading}>
            {loading ? 'Loading...' : 'Get Random Numbers'}
          </button>

          {data !== null && <>
            <RandomLineChart data={data} />
          </>}

      
    </main>
  );
}
