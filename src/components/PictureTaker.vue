<template>
    <div class ="panel panel-default">
        this is the picture taker
        <video ref="video" id="video" autoplay></video> 
        <canvas ref="canvas" id="canvas"></canvas>
       
    </div>
    
</template>
<script>
export default {// is a vue object
    data()
    {
        return 
        {

        }
    },
    methods:
    {
        capture()
        {

        }
    },
    mounted()
    {
        this.video = this.$refs.video;   //document.getElementById("video"); //uses the video ID uptop
        this.canvas = this.$refs.canvas;
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(stream => {
            this.video.src = window.URL.createObjectURL(stream);//THIS IS A PROMISE
            this.video.play();
        });

    }
    
}
</script>

<style lang ="scss">

</style>

