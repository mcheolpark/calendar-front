<template>
    <div :style="getStyle()" style="overflow: hidden">
        <div>{{schedule.start.getHours()}} ~ {{schedule.end.getHours()}}</div>
        <div>{{schedule.title}}</div>
    </div>
</template>
<script>
export default {
    name: 'Schedule',
    props: ['schedule'],
    data() {
        return {
            BOARD_MARGIN: 6
        }
    },
    methods: {
        getStyle() {
            console.log(this.schedule);
            console.log(this.$parent.$refs.timeTd);
            const tableTd = this.$parent.$refs.timeTd;
            const {start, end} = this.schedule;

            const top = `${(tableTd.offsetHeight * (start.getHours() + 1 + 2)) + this.BOARD_MARGIN}px`;
            const left = `${tableTd.offsetWidth * (1 + start.getDay()) + this.BOARD_MARGIN}px`;

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
    }
}
</script>