class DateHelper {

    static convertClashDateToDateObject(dateString) {
        const year = parseInt(dateString.substring(0, 4));
        const month = parseInt(dateString.substring(4, 6)) - 1;
        const day = parseInt(dateString.substring(6, 8));
        const hour = parseInt(dateString.substring(9, 11));
        const minute = parseInt(dateString.substring(11, 13));
        const second = parseInt(dateString.substring(13, 15));

        const dateObject = new Date(Date.UTC(year, month, day, hour, minute, second));
        return dateObject;
    }

    static isLessThanXMinutesFromNow(futureDate, minutes) {
        const currentDate = new Date();
        const futureTime = futureDate.getTime();
        const threeMinutesFromNow = new Date(currentDate.getTime() + (minutes * 60 * 1000)).getTime();
        return futureTime < threeMinutesFromNow;
    }

    static subtractMinutesToDate(date, minutes) {
        if (!(date instanceof Date)) {
            throw new Error('Input must be a Date object');
        }
        const newDate = new Date(date);
        newDate.setMinutes(newDate.getMinutes() - minutes);
        return newDate;
    }

    static getDateSnakeFormmated(date = (new Date())) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
        const year = String(date.getFullYear()).slice(2);
        return `${day}_${month}_${year}`;
    }
}

module.exports = DateHelper