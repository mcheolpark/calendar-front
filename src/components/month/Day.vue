<template>
    <td @click.prevent="clickCell"><div>{{day}}</div></td>
</template>
<script>
export default {
    name: 'Day',
    props: ['day'],
    methods: {
        clickCell() {
            this.$emit('clickData', this.day);
        }
    }
}
</script>