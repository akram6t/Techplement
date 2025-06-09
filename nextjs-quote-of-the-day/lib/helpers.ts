import { v4 as uuid } from 'uuid';

export const getUniqueDateKey = () => {
    const now = new Date();
    return now.toISOString().slice(0, 10); // "YYYY-MM-DD"
}


export function getSecondsUntilMidnight(): number {
    const now = new Date();
    const midnight = new Date();
  
    midnight.setHours(24, 0, 0, 0); // Set time to 00:00 of next day
    const seconds = Math.floor((midnight.getTime() - now.getTime()) / 1000);
  
    return seconds;
  }
  

  export function generateUniqeId(): string {
    return uuid().replaceAll("-", "").slice(1, 16).toString();
  }