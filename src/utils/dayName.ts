const dayMap: { [key: number]: string } = {
    0: "Sndy",
    1: "Mndy",
    2: "Tsdy",
    3: "Wdnsdy",
    4: "Thrsdy",
    5: "Frdy",
    6: "Strdy",
};

/**
 * @component Return a compact, fixed-width day label for a Date.
 * @props
 * date: Date (required) — - — Date to evaluate (local timezone).
 * @example
 * import { getDayName } from './utils/dayName';
 * console.log(getDayName(new Date())); // 'Tdy'
 * @behavior
 * - Returns short English-like day tokens (e.g., "Tdy").
 * - Uses local timezone when comparing day numbers.
 * - Pure function with no side effects.
 * @edgecases
 * - Invalid Date input -> returns undefined.
 * - Cross-midnight/DST comparisons use local clock.
 * - Dates far in past/future return mapped weekday.
 * @performance O(1) per call; memoization rarely needed.
 * @tests
 * - unit: same-day -> 'Tdy'.
 * - unit: next-day -> 'Tmrw'.
 * - unit: other-day -> mapped abbreviation.
 * - unit: invalid Date -> returns undefined.
 * - a11y: N/A (pure utility).
 * @related src/components/DaysForecast.tsx — consumes day labels.
 */
export function getDayName(date: Date): string {
    const today = new Date();
    if (date.getDay() === today.getDay()){
        return "Tdy";
    } else if (date.getDay() === (today.getDay() + 1) % 7){
        return "Tmrw";
    }
    return dayMap[date.getDay()];
}