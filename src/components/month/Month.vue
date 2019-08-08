<template>
    <div>
        <table id="calendar"  border="3" align="center" width="100%" height="500">
            <tr >
                <td align ="center"> <label><</label> </td>
                <td colspan="5" align ="center" id="calendarYM">{{getYear}}년 {{getMonth}}월</td>
                <td align ="center"> <label>></label> </td>
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
                <day v-for="(day, dayIndex) in week" :key="dayIndex" :day="day" @clickData="clickData"></day>
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
    }
}
</script>