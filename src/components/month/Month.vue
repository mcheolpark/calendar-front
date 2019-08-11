<template>
    <div v-if="isDataLoaded">
        <table id="calendar"  border="1" align="center" width="100%" height="500">
            <tr >
                <td align ="center"> <router-link :to="{ name: 'main', query: getRouterQueryObject(-1)}"> &lt; </router-link> </td>
                <td colspan="5" align ="center" id="calendarYM">{{getYear}}년 {{getMonth}}월</td>
                <td align ="center"> <router-link :to="{ name: 'main', query: getRouterQueryObject(1)}"> &gt; </router-link> </td>
            </tr>

            <tr>
                <td align="center">일</td>
                <td align="center">월</td>
                <td align="center">화</td>
                <td align="center">수</td>
                <td align="center">목</td>
                <td align="center">금</td>
                <td align="center">토</td>
            </tr>
            <tr v-for="(week, index) in weeks" :key="index">
                <day v-for="(date, dayIndex) in week" :key="dayIndex" :date="date" @clickData="clickData" :schedule="getSchedules(date)"></day>
            </tr>
        </table>
        <layer v-if="showLayer" @close="closeLayer" :writeData="writeData"></layer>
    </div>
</template>

<script>
import Calendar from '../base/Calendar.vue';
import Day from './Day.vue';
import Layer from '../layer/Layer.vue';

export default {
    name: 'Month',
    mixins: [Calendar],
    components: {
        Day,
        Layer
    },
    methods: {
        getRouterQueryObject(diff) {
            const updateDate = this.createDateDisplayMonth();
            updateDate.setMonth(updateDate.getMonth() + diff);

            return {
                year: updateDate.getFullYear(),
                month: updateDate.getMonth() + 1,
                day: updateDate.getDate()
            };
        }
    }
}
</script>
