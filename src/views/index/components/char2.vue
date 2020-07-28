<template>
  <div id="char2" ref="char2" class="charBox"></div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    this.initChar()
    this.drawChar()

    window.addEventListener('resize', () => {
      this.charLine.resize()
    })
  },

  methods: {
    drawChar() {
      this.charLine = this.$echarts.init(this.$refs.char2)
      this.charLine.setOption(this.options)
    },
    initChar() {
      this.options = {
        title: {
          text: '今日&昨日',
          left: '50%',
          textAlign: 'center',
        },
        backgroundColor: '#fff',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#ddd',
            },
          },
          backgroundColor: 'rgba(255,255,255,1)',
          padding: [5, 10],
          textStyle: {
            color: '#7588E4',
          },
          extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)',
        },
        legend: {
          right: 20,
          orient: 'vertical',
          data: ['今日', '昨日'],
        },
        xAxis: {
          type: 'category',
          data: [
            '00:00',
            '2:00',
            '4:00',
            '6:00',
            '8:00',
            '10:00',
            '12:00',
            '14:00',
            '16:00',
            '18:00',
            '20:00',
            '22:00',
          ],
          boundaryGap: false,
          splitLine: {
            show: true,
            interval: 'auto',
            lineStyle: {
              color: ['#D4DFF5'],
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: '#609ee9',
            },
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14,
            },
          },
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: ['#D4DFF5'],
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: '#609ee9',
            },
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14,
            },
          },
        },
        series: [
          {
            name: '今日',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: [
              '1200',
              '1400',
              '1008',
              '1411',
              '1026',
              '1288',
              '1300',
              '800',
              '1100',
              '1000',
              '1118',
              '1322',
            ],
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
                      color: 'rgba(199, 237, 250,0.5)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(199, 237, 250,0.2)',
                    },
                  ],
                  false
                ),
              },
            },
            itemStyle: {
              normal: {
                color: '#f7b851',
              },
            },
            lineStyle: {
              normal: {
                width: 3,
              },
            },
          },
          {
            name: '昨日',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: [
              '1200',
              '1400',
              '808',
              '811',
              '626',
              '488',
              '1600',
              '1100',
              '500',
              '300',
              '1998',
              '822',
            ],
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
                      color: 'rgba(216, 244, 247,1)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(216, 244, 247,1)',
                    },
                  ],
                  false
                ),
              },
            },
            itemStyle: {
              normal: {
                color: '#58c8da',
              },
            },
            lineStyle: {
              normal: {
                width: 3,
              },
            },
          },
        ],
      }
    },
  },
  computed: {
    isCollapse() {
      return this.$global.isCollapse
    },
  },
  watch: {
    isCollapse(newVal) {
      console.log(12)
      this.charLine.resize()
    },
  },
}
</script>

<style lang="stylus" scoped>
.charBox
  width calc(100% - 10px)
  height calc(100% - 10px)
</style>
