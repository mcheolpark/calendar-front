<script>
export default {
    name: 'Calendar',
    data() {
        return {
            today: new Date(),
            displayMonth: null,
            beforeStart: null,
            beforeEnd: null,
            firstDate: null,
            lastDate: null,
            weeks: []
        }
    },
    computed: {
        getYear() {
            return this.displayMonth && this.displayMonth.getFullYear();
        },
        getMonth() {
            return this.displayMonth && this.displayMonth.getMonth()+1;
        },

    },
    methods: {
        createDateDisplayMonth() {
            const {year, month, day} = this.$route.query;
            return new Date(
                Number(year || this.today.getFullYear()),
                month ? Number(month) -1 : this.today.getMonth(),
                Number(day || this.today.getDate())
            );
        },
        initCalendar() {
            let startDate = 1;
            this.displayMonth = this.createDateDisplayMonth();
            this.firstDate = new Date(this.displayMonth.getFullYear(),this.displayMonth.getMonth(), 1);      // 이번달의 첫번째날
            this.lastDate = new Date(this.displayMonth.getFullYear(),this.displayMonth.getMonth()+1, 0);   //이번달의 마지막날

            let beforeMonthDays = 0;
            let needBeforeMonthRender = false;

            if (this.firstDate.getDay() !== 0) {
                needBeforeMonthRender = true;
                this.beforeStart = new Date(this.displayMonth.getFullYear(),this.displayMonth.getMonth(), (this.firstDate.getDay() - 1) * -1);
                this.beforeEnd = new Date(this.beforeStart.getFullYear(),this.beforeStart.getMonth() + 1, 0);
                beforeMonthDays = this.beforeEnd.getDate() - (this.beforeStart.getDate() - 1);
                startDate = this.beforeStart.getDate();
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
                    needBeforeMonthRender = false;
                }


                this.weeks[week].push(startDate++);
            }
        }
    },
    created() {
        this.initCalendar();
    }
}
</script>