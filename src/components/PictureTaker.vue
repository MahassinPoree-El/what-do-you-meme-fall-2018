<template>
    <div class ="panel panel-default">
        this is the picture taker
        <video ref="video" id="video" autoplay></video> 
        <PicturePicker :pictures = "captures"></PicturePicker>
        <canvas ref="canvas" id="canvas"></canvas>
       
    </div>
    
</template>
<script>
export default {// is a vue object
    data()
    {
        return 
        {
            captures: []

        }
    },
    methods:
    {
        capture() //for animation
        {
            this.canvas.getContext("2d").drawImage(this.video, 0, 0, 640, 480);
            this.captures.push({
                
                id: this.captures.length,
                picture: this.canvas.toDataURL("image/png")
            });
        }
    },
    mounted()
    {
        this.video = this.$refs.video;   //document.getElementById("video"); //uses the video ID uptop
        this.canvas = this.$refs.canvas;
        this.conext2d = this.canvas.getContext("2d");

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

