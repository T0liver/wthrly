const dayMap: { [key: number]: string } = {
    0: "Sndy",
    1: "Mndy",
    2: "Tsdy",
    3: "Wdnsdy",
    4: "Thrsdy",
    5: "Frdy",
    6: "Strdy",
};

export function getDayName(date: Date): string {
    const today = new Date();
    if (date.getDay() === today.getDay()){
        return "Tdy";
    } else if (date.getDay() === (today.getDay() + 1) % 7){
        return "Tmrw";
    }
    return dayMap[date.getDay()];
}