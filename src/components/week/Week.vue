<template>
    <div style="position:relative">
        <table id="calendar" ref="calendar" border="1" align="center" width="100%" height="500">
            <tr >
                <td align ="center"><router-link :to="{ name: 'week', query: getRouterQueryObject(-7)}"> < </router-link></td>
                <td colspan="6" align ="center" id="calendarYM">{{getYear}}년 {{getMonth}}월</td>
                <td align ="center"><router-link :to="{ name: 'week', query: getRouterQueryObject(7)}"> > </router-link></td>
            </tr>

            <tr>
                <td align="center" ref="timeTd">시간</td>
                <td align="center" v-for="(data, index) in getCurrentWeek" :key="index">{{data.day}}일 ({{days[index]}})</td>
            </tr>
            <tr v-for="(hour, index) in hours" :key="index">
                <td><div>{{hour}}시</div></td>
                <td v-for="(data, index) in getCurrentWeek" :key="index" @click.prevent="clickCell(data, hour)"><div></div></td>
            </tr>
        </table>

        <schedule v-for="(schedule, index) in getCurrentWeekSchedules" :key="index" :schedule="schedule" @clickData="clickData"></schedule>
        <layer v-if="showLayer" @close="closeLayer" :writeData="writeData"></layer>
    </div>
</template>

<script>
import Calendar from '../base/Calendar.vue';
import Schedule from './Schedule.vue';
import Layer from '../layer/Layer.vue';

export default {
    name: 'Week',
    mixins: [Calendar],
    components: {
        Layer,
        Schedule
    },
    data() {
        return {
            hours: [],
            days: ['일', '월', '화', '수', '목', '금', '토']
        }
    },
    methods: {
        getRouterQueryObject(diff) {
            const updateDate = this.createDateDisplayMonth();
            updateDate.setDate(updateDate.getDate() + diff);
            return {
                year: updateDate.getFullYear(),
                month: updateDate.getMonth() + 1,
                day: updateDate.getDate()
            };
        },
        clickCell(date, hour) {
            this.clickData({
                start: new Date(date.year, date.month - 1, date.day, hour),
                end: new Date(date.year, date.month - 1, date.day, hour + 1),
                title: null
            });
        }
    },
    created() {
        for (let i = 0; i < 24; i++) {
            this.hours[i] = i;
        }
    }
}
</script>