export const timeFormatDay = (time) => {
    
    const isoString = time;
    const date = new Date(isoString);

    const options = {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
    };
    const formattedTimeDay = new Intl.DateTimeFormat("en-US", options).format(date);
    return formattedTimeDay;
}

export const timeFormatSecond = (time) => {
    
    const isoString = time;
    const date = new Date(isoString);

    const options = {
    timeZone: "Asia/Ho_Chi_Minh",
    // year: "numeric",
    // month: "2-digit",
    // day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
    };
    const formattedTimeSecond = new Intl.DateTimeFormat("en-US", options).format(date);
    return formattedTimeSecond;
}