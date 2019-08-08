<template>
    <div style="position:relative">
        <table id="calendar"  border="3" align="center" width="100%" height="500">
            <tr >
                <td align ="center"><router-link :to="{ name: 'week', query: getQueryObject(-7)}"> < </router-link></td>
                <td colspan="6" align ="center" id="calendarYM">{{getYear}}년 {{getMonth}}월</td>
                <td align ="center"><router-link :to="{ name: 'week', query: getQueryObject(7)}"> > </router-link></td>
            </tr>

            <tr>
                <td align="center">시간</td>
                <td align="center" v-for="(day, index) in getCurrentWeek" :key="index">{{day}}일 ({{days[index]}})</td>
            </tr>
            <tr v-for="(hour, index) in hours" :key="index">
                <td><div>{{hour}}시</div></td>
                <td v-for="(day, index) in days" :key="index"><div></div></td>
            </tr>
        </table>

        <!-- 일정 노드추가 -->
        <!--<div style="position: absolute; height: 100px; width: 100px; background-color: blue">-->
        <!--</div>-->
    </div>
</template>

<script>
import Calendar from '../base/Calendar.vue';

export default {
    name: 'Week',
    mixins: [Calendar],
    watch: {
        '$route.query' (to, from) {
            this.initCalendar();
        }
    },
    data() {
        return {
            hours: [],
            days: ['일', '월', '화', '수', '목', '금', '토']
        }
    },
    methods: {
        getQueryObject(diff) {
            const updateDate = this.createDateDisplayMonth();
            updateDate.setDate(updateDate.getDate() + diff);

            return {
                year: updateDate.getFullYear(),
                month: updateDate.getMonth() + 1,
                day: updateDate.getDate()
            };
        }
    },
    created() {
        for (let i = 0; i < 24; i++) {
            this.hours[i] = i;
        }
    }
}
</script>