import date from '../util/date';

function trainDecorator(target) {
    target.prototype.covertToMonthAnDay = function() {
        let eDate;
        const { fmtimeps, totimeps, usedtimeps } = this.props.data;

        Storage.load({ key: 'bDate' }).then((bDate) => {
            const usedDayNum = Math.floor(usedtimeps / 60 / 24);
            // 判断所花时间是否小于一天

            eDate = bDate;

            if (usedDayNum < 1 && totimeps < fmtimeps) { 
                eDate = Number(new Date(bDate)) + 8.64e7;
            }

            if (usedDayNum >= 1) {
                eDate = Number(new Date(bDate)) + usedDayNum * 8.64e7;
            }

            this.setState({
                bDate: date.covertToMonthAndDay(bDate),
                eDate: date.covertToMonthAndDay(eDate) // 到站时间
            });
        });
    };
    
    return target;
}

export default trainDecorator;
