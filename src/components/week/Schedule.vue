<template>
    <div :style="getStyle()" style="overflow: hidden" @click.prevent="clicSchedule(schedule)" draggable="true" @dragstart="dragStart($event)">
        <div>{{schedule.start.getHours()}} ~ {{schedule.end.getHours()}}</div>
        <div>{{schedule.title}}</div>
    </div>
</template>
<script>
import {Events} from '../../const/const';
export default {
    name: 'Schedule',
    props: ['schedule'],
    data() {
        return {
            BOARD_MARGIN: 1
        }
    },
    methods: {
        getStyle() {
            if (this.$parent.$refs.calendar) {
                const calendar = this.$parent.$refs.calendar;
                const tableTd = this.$parent.$refs.timeTd;
                const {start, end} = this.schedule;

                const currentRow = calendar.rows[start.getHours() + 2];
                const currentCell =  currentRow.cells[start.getDay() + 1];

                const top = `${currentRow.offsetTop + this.BOARD_MARGIN}px`;
                const left = `${currentCell.offsetLeft + this.BOARD_MARGIN}px`;

                const width = `${tableTd.offsetWidth}px`;
                const height = `${tableTd.offsetHeight * (end.getHours() - start.getHours())}px`;


                return {
                    top: top,
                    left: left,
                    position: 'absolute',
                    height: height,
                    width: width,
                    backgroundColor: 'blue'
                };
            }

            return {};
        },
        clicSchedule(schedule) {
            this.$emit(Events.CLICK_DATA, schedule);
        },
        dragStart(event) {
            this.$emit(Events.DRAG_START_DATA, {event, schedule: this.schedule});
        }
    }
}
</script>