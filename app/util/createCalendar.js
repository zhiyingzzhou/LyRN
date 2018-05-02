module.exports = {
    startDate: new Date(),
    endDate: '',
    month: '',
    year: '',
    calendar: [],
    init(startDate, endDate) {
        if (this.calendar.length > 0) {
            return this.calendar;
        }
        this.startDate = startDate ? startDate : this.startDate;
        this.endDate = endDate && endDate !== '' ? endDate : new Date(Number(this.startDate) + 5356.8e6);
        this.year = this.startDate.getFullYear();
        this.month = this.startDate.getMonth() + 1;
        this.createCalendar();

        return this.calendar;
    },
    createCalendar() {
        const endYear = this.endDate.getFullYear(); // 获取结束年份
        const endMonth = this.endDate.getMonth() + 1; // 获取结束月份
        const monthNum = (endYear - this.year) * 12 + endMonth - this.month;

        for (let i = 0; i <= monthNum; i++) {
            const idx = this.month + i;
            const month = idx - Math.floor((idx - 1) / 12) * 12;
            const year = Math.floor((idx - 1) / 12) + this.year;
            const monthObj = {
                year: '',
                month: '',
                dayList: []
            };

            monthObj.year = year;
            monthObj.month = month;
            monthObj.dayList = this.createDayList(year, month);
            this.calendar.push(monthObj);
        }
    },

    /**
     * 获取当月的日历数组
     * @param {number} year 
     * @param {number} month 
     * @return {array} 
     */
    
    createDayList(year, month) {
        const dayList = [];
        const dayNumofMonth = this.getDayNum(year, month); // 获取当前月份的总天数
        const weekofFirstDay = new Date(year, month - 1, 1).getDay(); // 获取当前月的第一天是星期几
        const total = dayNumofMonth + weekofFirstDay;
        const rest = 7 * Math.ceil(total / 7) - total;

        for (let i = 0; i < weekofFirstDay; i++) {
            dayList.push(null);
        }
        for (let i = 1; i <= dayNumofMonth; i++) {
            dayList.push(i);
        }

        for (let i = 0; i < rest; i++) {
            dayList.push(null);
        }

        return dayList;
    },

    /**
     * 获取当月的总天数
     * @param {number} year 要获取总天数所在的年份
     * @param {number} month 要获取总天数所在的月份
     * @return {number} 返回当月的总天数
     */

    getDayNum(year, month) {
        const dayOfMonth = [
            31,
            28,
            31,
            30,
            31,
            30,
            31,
            31,
            30,
            31,
            30,
            31
        ];
        // 判断是否为闰年,闰年2月份有29天

        if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
            dayOfMonth[1] = 29;
        }

        return dayOfMonth[month - 1];
    }

};
