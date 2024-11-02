"use server"

let cache: Map<number, number> = new Map();

export async function getRandomNumber(timestamp: number) {
    if (cache.has(timestamp)) {
        return cache.get(timestamp)!;
    } else {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const randomNumber = Math.floor(Math.random() * 100);
        cache.set(timestamp, randomNumber)
        return randomNumber;
    }
}
