<template>
    <td @click.prevent="clickCell(date)" v-if="date.currentMonth">
        <div>{{date.day}}</div>
        <div style="height: 42px;overflow: hidden;">
            <div v-for="(item, index) in schedule" :key="index" @click.prevent="clicSchedule(item)">{{item.start.getHours()}}~{{item.end.getHours()}} {{item.title}}</div>
        </div>
    </td>
    <td v-else=""></td>
</template>
<script>
import {Events} from '../../const/const';
export default {
    name: 'Day',
    props: ['date', 'schedule'],
    methods: {
        clickCell(date) {
            this.$emit(Events.CLICK_DATA, {
                start: new Date(date.year, date.month - 1, date.day),
                end: new Date(date.year, date.month - 1, date.day),
                title: null
            });
        },
        clicSchedule(schedule) {
            this.$emit(Events.CLICK_DATA, schedule);
        }
    }
}
</script>