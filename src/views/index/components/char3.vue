<template>
  <div id="char3" ref="char3" class="charBox"></div>
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
      this.charLine = this.$echarts.init(this.$refs.char3)
      this.charLine.setOption(this.options)
    },
    initChar() {
      var scaleData = [
        {
          name: '工程建设',
          value: 10,
        },
        {
          name: '产权交易',
          value: 20,
        },
        {
          name: '土地交易',
          value: 20,
        },
        {
          name: '其他交易',
          value: 27,
        },
        {
          name: '政府采购',
          value: 23,
        },
      ]
      var rich = {
        white: {
          color: '#8160131',
          align: 'center',
          padding: [5, 0],
        },
      }
      var placeHolderStyle = {
        normal: {
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          color: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgba(0, 0, 0, 0)',
          borderWidth: 0,
        },
      }
      var data = []
      for (var i = 0; i < scaleData.length; i++) {
        data.push(
          {
            value: scaleData[i].value,
            name: scaleData[i].name,
            itemStyle: {
              normal: {
                borderWidth: 5,
                shadowBlur: 30,
                borderColor: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  1,
                  1,
                  [
                    {
                      offset: 0,
                      color: '#7777eb',
                    },
                    {
                      offset: 1,
                      color: '#70ffac',
                    },
                  ]
                ),
                shadowColor: 'rgba(142, 152, 241, 0.6)',
              },
            },
          },
          {
            value: 4,
            name: '',
            itemStyle: placeHolderStyle,
          }
        )
      }
      var seriesObj = [
        {
          name: '',
          type: 'pie',
          clockWise: false,
          radius: [65, 70],
          hoverAnimation: false,
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'outside',
                color: '#666',
                formatter: function(params) {
                  var percent = 0
                  var total = 0
                  for (var i = 0; i < scaleData.length; i++) {
                    total += scaleData[i].value
                  }
                  percent = ((params.value / total) * 100).toFixed(0)
                  if (params.name !== '') {
                    return params.name + '\n{white|' + '占比' + percent + '%}'
                  } else {
                    return ''
                  }
                },
                rich: rich,
              },
              labelLine: {
                show: false,
              },
            },
          },
          data: data,
        },
      ]
      this.options = {
        tooltip: {
          show: false,
        },
        legend: {
          show: false,
        },
        toolbox: {
          show: false,
        },
        series: seriesObj,
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
.charBox
  width 100%
  height calc(100% - 20px)
</style>
