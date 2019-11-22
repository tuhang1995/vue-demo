<template>
  <div>
    <video-player ref="playerObj"></video-player>
    <el-button @click="playVideo">播放视频</el-button>
  </div>
</template>

<script>
import VideoPlayer from '@/components/video'
export default {
  name: '',
  props: [''],
  data () {
    return {

    };
  },

  components: {
    VideoPlayer
  },

  computed: {},

  beforeMount () { },

  mounted () { },

  methods: {
    playVideo () {
      this.$refs['playerObj'].videoSrc = 'rtmp://58.200.131.2:1935/livetv/hunantv'
      this.$refs['playerObj'].playerOptions.sources[0].src = 'rtmp://58.200.131.2:1935/livetv/hunantv'
    },
  },

  watch: {}

}

</script>
<style lang='stylus' scoped></style>