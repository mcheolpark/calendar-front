<script>
export default {
    name: 'Calendar',
    data() {
        return {
            showLayer: false,
            writeData: null,
            today: new Date(),
            displayMonth: null,
            beforeStart: null,
            beforeEnd: null,
            firstDate: null,
            lastDate: null,
            currentWeek: null,
            weeks: [],
            isDataLoaded: false,
            schedules: []
        }
    },
    computed: {
        getYear() {
            return this.displayMonth && this.displayMonth.getFullYear();
        },
        getMonth() {
            return this.displayMonth && this.displayMonth.getMonth()+1;
        },
        getCurrentWeek() {
            return this.weeks[this.currentWeek];
        },
        getCurrentWeekSchedules() {
            if (!this.getCurrentWeek) {
                return [];
            }

            const currentWeek = this.getCurrentWeek.map(item => {
                const day = new Date(item.year, item.month -1, item.day);
                const nextDay = new Date(day);
                nextDay.setDate(nextDay.getDate() + 1);
                return {
                    day,
                    nextDay
                };
            });

            return this.schedules.filter(schedule => (
                currentWeek.find(data => {
                    return data.day <= schedule.start && schedule.end <= data.nextDay;
                })
            ));
        }
    },
    watch: {
        '$route.query' (to, from) {
            this.initCalendar();
        }
    },
    methods: {
        getSchedules(date) {
            if (date.month !== (this.displayMonth.getMonth() + 1)) {
                return null;
            }

            return this.schedules.filter(schedule => (
                    (schedule.start.getMonth() === this.displayMonth.getMonth()) &&
                    (schedule.start.getDate() <= date.day) &&
                    (schedule.end.getDate() >= date.day)
                ));
        },
        createDateDisplayMonth() {
            const {year, month, day} = this.$route.query;
            return new Date(
                Number(year || this.today.getFullYear()),
                month ? Number(month) -1 : this.today.getMonth(),
                Number(day || this.today.getDate())
            );
        },
        async initCalendar() {
            let startDate = 1;
            this.displayMonth = this.createDateDisplayMonth();
            this.firstDate = new Date(this.displayMonth.getFullYear(),this.displayMonth.getMonth(), 1);     // 첫번째날
            this.lastDate = new Date(this.displayMonth.getFullYear(),this.displayMonth.getMonth()+1, 0);    //  마지막날

            this.isDataLoaded = false;
            const response = await this.$axios.get(`http://localhost:8080/schedule/${this.displayMonth.getFullYear()}/${this.displayMonth.getMonth() + 1}`);

            if (response.status === 200) {
                this.schedules = response.data.values.map((schedule) => ({
                    id: schedule.id,
                    start: new Date(schedule.start),
                    end: new Date(schedule.end),
                    title: schedule.title
                }));
            }

            let beforeMonthDays = 0;
            let needBeforeMonthRender = false;
            let renderMonth = this.displayMonth.getMonth() + 1;
            let renderYear = this.displayMonth.getFullYear();

            if (this.firstDate.getDay() !== 0) {
                needBeforeMonthRender = true;
                this.beforeStart = new Date(this.displayMonth.getFullYear(),this.displayMonth.getMonth(), (this.firstDate.getDay() - 1) * -1);
                this.beforeEnd = new Date(this.beforeStart.getFullYear(),this.beforeStart.getMonth() + 1, 0);
                beforeMonthDays = this.beforeEnd.getDate() - (this.beforeStart.getDate() - 1);
                startDate = this.beforeStart.getDate();
                renderMonth = this.beforeStart.getMonth() + 1;
                renderYear = this.beforeStart.getFullYear();
            }

            let monthDays = this.lastDate.getDate() - (this.firstDate.getDate() - 1) + beforeMonthDays;
            let week = -1;

            for (let i = 0 ; i < monthDays; i++) {
                if (i % 7 === 0) {
                    week++;
                    this.weeks[week] = [];
                }

                if (needBeforeMonthRender && this.beforeEnd && this.beforeEnd.getDate() < startDate) {
                    startDate = 1;
                    renderMonth = this.displayMonth.getMonth() + 1;
                    renderYear = this.displayMonth.getFullYear();
                    needBeforeMonthRender = false;
                }

                if (!needBeforeMonthRender && startDate === this.displayMonth.getDate()) {
                    this.currentWeek = week;
                }

                this.weeks[week].push({
                    day: startDate++,
                    month: renderMonth,
                    year: renderYear,
                    currentMonth: !needBeforeMonthRender
                });
            }

            // 주간 달력에서 오류발생으로 인해서 임시 코드
            if (this.weeks[week].length < 7) {
                let nextMonth = new Date(this.lastDate);
                nextMonth.setDate(nextMonth.getDate() + 1);

                let start = 1;
                for (let i = this.weeks[week].length; i < 7; i++) {
                    this.weeks[week].push({
                        day: start++,
                        month: nextMonth.getMonth() + 1,
                        year: nextMonth.getFullYear(),
                        currentMonth: false
                    });
                }
            }

            this.isDataLoaded = true;
        },
        clickData(day) {
            this.writeData = day;
            this.showLayer = true;
        },
        closeLayer() {
            this.writeData = null;
            this.showLayer = false;
        }
    },
    created() {
        this.initCalendar();
    }
}
</script>
<style>
    table {table-layout: fixed}
</style>