<template>
    <td @click.prevent="clickCell(date)">
        <div>{{date.day}}</div>
        <div style="height: 42px;overflow: hidden;">
            <div v-for="(item, index) in schedule" :key="index" @click.prevent="clicSchedule(item)">{{item.start.getHours()}}~{{item.end.getHours()}} {{item.title}}</div>
        </div>
    </td>
</template>
<script>
export default {
    name: 'Day',
    props: ['date', 'schedule'],
    methods: {
        clickCell(date) {
            this.$emit('clickData', {
                start: new Date(date.year, date.month - 1, date.day),
                end: new Date(date.year, date.month - 1, date.day),
                title: null
            });
        },
        clicSchedule(schedule) {
            this.$emit('clickData', schedule);
        }
    }
}
</script>