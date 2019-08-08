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
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>1</td>
                <td>2</td>
                <td>3</td>
            </tr>
        </table>
    </div>
</template>

<script>
import Calendar from '../base/Calendar.vue';

export default {
    name: 'Month',
    mixins: [Calendar]
}
</script>