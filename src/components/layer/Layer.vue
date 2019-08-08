<template>
    <div class="dim-layer">
        <div class="dimBg"></div>
        <div id="layer2" class="pop-layer">
            <div class="pop-container">
                <div class="pop-conts">
                    <p class="ctxt mb20">Thank you.<br>
                        Your registration was submitted successfully.<br>
                        Selected invitees will be notified by e-mail on JANUARY 24th.<br><br>
                        Hope to see you soon!
                    </p>

                    <div class="btn-r">
                        <a href="#" class="btn-layerClose" @click.prevent="$emit('close');">Close</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'layer',
    props: ['writeData'],
    created() {
        console.log(this.writeData);
    }
}
</script>
<style>
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