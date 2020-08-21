export function dateAgo(date) {
    let left = new Date(date).getTime();
    let rigth = Date.now();
    let v = rigth - left;

    let days = Math.floor(v / (24 * 60 * 60 * 1000));
    if(days > 0) {
        return days + ' дня назад';
    }
    let hours = Math.floor(v / (60 * 60 * 1000));
    if(hours > 0) {
        return hours + ' час назад';
    }
    let minutes = Math.floor(v / (60 * 1000));
    if(minutes > 0) {
        return minutes + ' минуту назад';
    }
    return 'Только что'
}
