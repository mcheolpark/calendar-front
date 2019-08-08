<script>
export default {
    name: 'Calendar',
    data() {
        return {
            today: new Date(),
            displayMonth: null,
            beforeMonth: null,
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
        initCalendar() {
            this.displayMonth = this.$route.query.month || this.today;
            console.log();

            console.log('buildCalendar');

            this.firstDate = new Date(this.displayMonth.getFullYear(),this.displayMonth.getMonth(), 1);      // 이번달의 첫번째날
            this.lastDate = new Date(this.displayMonth.getFullYear(),this.displayMonth.getMonth()+1, 0);   //이번달의 마지막날

            this.beforeMonth = new Date(this.displayMonth.getFullYear(),this.displayMonth.getMonth(), (this.firstDate.getDay() - 1) * -1);
            let cnt = 0;

            console.log(this.beforeMonth);
            console.log(this.firstDate);
            console.log(this.lastDate);

            for (let i=0; i < this.firstDate.getDay(); i++) {
                cnt++;
            }
        }
    },
    created() {
        this.initCalendar();
    }
}
</script>