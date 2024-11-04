import mongoose from 'mongoose';

const RandomNumberSchema = new mongoose.Schema({
    number: { type: Number, required: true },
});

const RandomNumber = mongoose.model('RandomNumber', RandomNumberSchema);

const cache: Map<number, number> = new Map();

const NUMBER_AMOUNT = 20000;

function seededRandom(seed: number): number {
    // Simple linear congruential generator (LCG)
    const m = 19979; // a large prime number
    const a = 1664525; // LCG multiplier
    const c = 1013904223; // LCG increment

    // Update the seed using the LCG formula
    seed = (a * seed + c) % m;

    // Return the random number in the range 0 to 19999
    return Math.abs(seed % 20000);
}

export const insertRandomNumbers = async () => {
    const numbers = Array.from({ length: NUMBER_AMOUNT }, () => Math.floor(Math.random() * 100000));
    await RandomNumber.insertMany(numbers.map(num => ({ number: num })));
    console.log('Random numbers generated and stored in DB.');
};

export const getRandomNumbers = async (startTimestamp: number, endTimestamp: number): Promise<number[]> => {
    const startDate = new Date(startTimestamp);
    const endDate = new Date(endTimestamp);

    const msPerDay = 24 * 60 * 60 * 1000;
    const timeDifference = endDate.getTime() - startDate.getTime();
    const dayCount = Math.floor(timeDifference / msPerDay);
    
    const rangeSize = dayCount; 

    const startIndex = seededRandom(startTimestamp);

    const start = startIndex;

    const end = (start + rangeSize) % NUMBER_AMOUNT

    if(start > end){
        return (await getNumbers(start, NUMBER_AMOUNT - 1)).concat(await getNumbers(0, end))
    }

    return await getNumbers(start, end)
};

async function getNumbers(start: number, end: number){

    const results: number[] = [];

    for (let index = start; index <= end; index++) {
        if (cache.has(index)) {
            results.push(cache.get(index)!);
        } else {
            const numberValue = (await RandomNumber.find()).at(index)?.number!
            cache.set(index, numberValue);
            results.push(numberValue);
        }
    }

    return results;
}
