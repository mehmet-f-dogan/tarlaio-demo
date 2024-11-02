"use client"

import { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css fil
import { getRandomNumber } from './server';

type Range = {
  startDate: Date
  endDate: Date
  key: string
}

type RangeArg = [Range] | undefined

export default function Home() {

  const [range, setRange] = useState<RangeArg>([{
    startDate: new Date(new Date().setHours(0, 0, 0, 0)), // Set time to 00:00:00
    endDate: new Date(new Date().setHours(0, 0, 0, 0)),   // Set time to 00:00:00
    key: "selection"
  }]);

  const [startNumber, setStartNumber] = useState<number | undefined>(undefined)
  const [endNumber, setEndNumber] = useState<number | undefined>(undefined)

  useEffect(() => {
    setStartNumber(undefined)

    setEndNumber(undefined)

    getRandomNumber(range?.[0].startDate.getTime()!).then((number) => {
      setStartNumber(number)
    })

    getRandomNumber(range?.[0].endDate.getTime()!).then((number) => {
      setEndNumber(number)
    })
  }, [range])

  function onChange(value: RangeArg) {
    setRange(value)
  }

  return (
    <main>
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
        Start Date Random Number: {startNumber}
      </h1>
      <h1>
        End Date: {range?.[0].endDate.toString()}
      </h1>
      <h1>
        End Date Random Number: {endNumber}
      </h1>
    </main>
  );
}
