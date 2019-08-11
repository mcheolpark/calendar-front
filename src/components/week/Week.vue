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
                <td v-for="(data, index) in getCurrentWeek" :key="index" @click.prevent="clickCell(data, hour)" @drop="dragFinish($event)" @dragover.prevent :hour="hour" :weekDataIndex="index"><div></div></td>
            </tr>
        </table>

        <schedule v-for="(schedule, index) in getCurrentWeekSchedules" :key="index" :schedule="schedule" @clickData="clickData" @dragStartData="dragStart"></schedule>
        <layer v-if="showLayer" @close="closeLayer" :writeData="writeData"></layer>
    </div>
</template>

<script>
import Calendar from '../base/Calendar.vue';
import Schedule from './Schedule.vue';
import Layer from '../layer/Layer.vue';
import ScheduleService from '../../service/ScheduleService';

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
            days: ['일', '월', '화', '수', '목', '금', '토'],
            dragScheduleData: null                          //  현재 드래그 중인 데이타
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
        },
        dragStart(data) {
            console.log(data);
            const {event, schedule} = data;
            event.dataTransfer.setData("scheduleId", schedule.id);
            this.dragScheduleData = schedule;
        },
        async dragFinish(event) {
            const updateHour = event.srcElement.getAttribute('hour');
            const dropedWeekDataIndex = event.srcElement.getAttribute('weekDataIndex');
            const dropedWeekData = this.getCurrentWeek[dropedWeekDataIndex];
            const scheduleId = event.dataTransfer.getData("scheduleId");

            const {year, month, day} = dropedWeekData;

            const updateScheduleStartData = new Date(year, month - 1, day, updateHour);
            const updateScheduleEndData = new Date(updateScheduleStartData);
            const timeDiff = this.dragScheduleData.end.getHours() - this.dragScheduleData.start.getHours();
            updateScheduleEndData.setHours(updateScheduleEndData.getHours() + timeDiff);

            const params = {
                id: scheduleId,
                start : updateScheduleStartData.getTime(),
                end : updateScheduleEndData.getTime(),
                title : this.dragScheduleData.title
            };


            const response = await ScheduleService.save(this, params);
            response.status === 200 && window.location.reload();
        }
    },
    created() {
        for (let i = 0; i < 24; i++) {
            this.hours[i] = i;
        }
    }
}
</script>