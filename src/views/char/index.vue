<template>
  <div class="main">
    <div id="mychar" ref="mychar"></div>
  </div>
</template>

<script>
export default {
  name: '',
  props: [''],
  data() {
    return {
      options: {},
      charLine: '',
    }
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {
    this.initChar()
    this.drawChar()

    window.onresize = () => {
      console.log(345)
      this.charLine.resize() // 多个图表，第一个图表
    }
  },

  methods: {
    drawChar() {
      this.charLine = this.$echarts.init(this.$refs.mychar)
      this.charLine.setOption(this.options)
    },
    initChar() {
      this.options = {
        tooltip: {
          trigger: 'axis',
        },
        grid: {
          right: 10,
          left: 50,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false, //从0开始
            data: ['1', '2', '3', '4', '5', '6'],
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false, //y轴刻度线
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#fff',
              },
            },
            nameTextStyle: {
              color: '#fff',
            },
            splitArea: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            boundaryGap: [0, '50%'],
            type: 'value',
            splitLine: {
              show: false,
            },
            axisTick: {
              //y轴刻度线
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#fff',
              },
            },
            nameTextStyle: {
              color: '#fff',
            },
            splitArea: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: '课时',
            type: 'line',
            data: [23, 60, 100, 36, 23, 65],
            markPoint: {
              data: [{ type: 'max' }],
              itemStyle: {
                color: '#ffb20c',
                borderColor: '#000',
                borderWidth: 0,
                borderType: 'solid',
              },
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(0,255,228,0.3)',
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(0,112,238,0.1)',
                    },
                  ],
                  false
                ),
                // shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10,
              },
            },
            lineStyle: {
              normal: {
                width: 3,
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: '#00ffe4', // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#0070ee', // 100% 处的颜色
                    },
                  ],
                  false
                ),
                shadowColor: 'rgba(72,216,191, 0.3)',
                shadowBlur: 5,
                shadowOffsetY: 5,
              },
            },
            itemStyle: {
              normal: {
                color: '#fff',
                borderWidth: 5,
                /*shadowColor: 'rgba(72,216,191, 0.3)',
                      shadowBlur: 100,*/
                borderColor: '#fff',
              },
            },
            smooth: true,
          },
        ],
      }
      // this.carBelongEcharts.setOption(option,true);
    },
  },

  watch: {},
}
</script>
<style lang="stylus" scoped>
.main
  width 100%
  height 100%
  text-center()
  background-color #0F1741
  #mychar
    width 50%
    height 50%
</style>
