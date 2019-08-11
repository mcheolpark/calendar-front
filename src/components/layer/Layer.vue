<template>
    <div class="dim-layer">
        <div class="dimBg"></div>
        <div id="layer2" class="pop-layer">
            <div class="pop-container">
                <div class="pop-conts">
                    <input type="text" placeholder="일정 제목" v-model="schedule.title"/>
                    <div>
                        <datepicker v-model="schedule.start"></datepicker>
                        <select v-model="startTime" class="select-box">
                            <option v-for="(hour, index) in hours" :key="index">{{hour}}</option>
                        </select>

                        <span class="margin-right"></span>

                        <datepicker v-model="schedule.end"></datepicker>
                        <select v-model="endTime" class="select-box">
                            <option v-for="(hour, index) in hours" :key="index">{{hour}}</option>
                        </select>
                    </div>

                    <div class="btn-r">
                        <a href="#" class="btn-layerClose" @click.prevent="$emit('close');">취소</a>
                        <a href="#" class="btn-layerClose" @click.prevent="deleteData()">삭제</a>
                        <a href="#" class="btn-layerClose" @click.prevent="save()">저장</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Datepicker from 'vuejs-datepicker';
import ScheduleService from '../../service/ScheduleService';

export default {
    name: 'layer',
    props: ['writeData'],
    components: {
        Datepicker
    },
    data() {
        return {
            schedule: {
                start: null,
                end: null,
                title: null
            },
            hours: [],
            startTime: 0,
            endTime: 1
        }
    },
    methods: {
        async save() {
            const {start, end} = this.schedule;
            start.setHours(this.startTime);
            end.setHours(this.endTime);

            const params = {
                id: this.schedule.id,
                start : this.schedule.start.getTime(),
                end : this.schedule.end.getTime(),
                title : this.schedule.title
            };

            const response = await ScheduleService.save(this, params);
            response.status === 200 && window.location.reload();
        },
        async deleteData() {
            const response = await ScheduleService.delete(this, this.schedule.id);
            response.status === 200 && window.location.reload();
        }
    },
    created() {
        this.schedule = {...this.writeData}
        this.startTime = (this.writeData.start && this.writeData.start.getHours()) || new Date().getHours();
        this.endTime = (this.writeData.end && this.writeData.end.getHours()) || new Date().getHours() + 1;

        for (let i = 0; i <= 24; i++) {
            this.hours[i] = i;
        }

    }
}
</script>
<style>
    .select-box {
        width: 100px;
    }
    .margin-right {
        margin-right: 20px;
    }

    .pop-layer .pop-container {
        padding: 20px 25px;
    }

    .pop-layer p.ctxt {
        color: #666;
        line-height: 25px;
    }

    .pop-layer .btn-r {
        width: 100%;
        margin: 10px 0 20px;
        padding-top: 10px;
        border-top: 1px solid #DDD;
        text-align: right;
    }

    .pop-layer {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 410px;
        height: auto;
        background-color: #fff;
        border: 5px solid #3571B5;
        z-index: 10;
    }

    .dim-layer {
        position: fixed;
        _position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
    }

    .dim-layer .dimBg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: .5;
        filter: alpha(opacity=50);
    }

    .dim-layer .pop-layer {
        display: block;
    }

    a.btn-layerClose {
        display: inline-block;
        height: 25px;
        padding: 0 14px 0;
        border: 1px solid #304a8a;
        background-color: #3f5a9d;
        font-size: 13px;
        color: #fff;
        line-height: 25px;
    }

    a.btn-layerClose:hover {
        border: 1px solid #091940;
        background-color: #1f326a;
        color: #fff;
    }
</style>