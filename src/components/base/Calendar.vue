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
            this.firstDate = new Date(this.displayMonth.getFullYear(),this.displayMonth.getMonth(), 1);      // 이번달의 첫번째날
            this.lastDate = new Date(this.displayMonth.getFullYear(),this.displayMonth.getMonth()+1, 0);   //이번달의 마지막날

            this.isDataLoaded = false;
            const response = await this.$axios.get('http://localhost:8080/schedule/2019/8');

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

                //this.weeks[week].push(startDate++);
                this.weeks[week].push({
                    day: startDate++,
                    month: renderMonth,
                    year: renderYear
                });
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
        /*
        let config = {
            headers: {'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'}
        };
        */
        this.initCalendar();
    }
}
</script>