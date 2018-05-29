module.exports = {
    startDate: new Date(),
    calendar: [],
    init(startDate) {
        if (this.calendar.length > 0) {
            return this.calendar;
        }
        this.startDate = startDate ? startDate : this.startDate;
        this.createCalendar();

        return this.calendar;
    },
    createCalendar() {
        const startYear = this.startDate.getFullYear(); // 获取开始年份
        const startMonth = this.startDate.getMonth() + 1; // 获取开始月份

        for (let i = 0; i <= 2; i++) {
            let year = startYear,
            month = startMonth + i;
            if(month > 12) {
                year = year !== startYear || year + 1;
                month = month - 12;
            }

            this.calendar[i] = {
                year,
                month,
                dayList: this.createDayList(year, month)
            };;
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
        const num = dayNumofMonth + weekofFirstDay;
        const total = Math.ceil(num / 7) * 7; // 所需单元格总数 

        let day = 0;
        
        for( let i=0; i< total; i++ ){
            if(i < weekofFirstDay ) {
                dayList[i] = null;
            } else if(i < num) {
                day += 1;
                dayList[i] = day;
            } else {
                dayList[i] = null;
            }
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
