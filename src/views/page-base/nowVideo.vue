<template>
  <div class="main">
    <div id="myChart"
         :style="{ width: '800px', height: '600px' }"></div>
  </div>
</template>

<script>
import JSON from '@/lib/songjiang.json'
//import '@/lib/shanghai.js'
export default {
  name: '',
  props: [''],
  data () {
    return {
      selectData: [],
    }
  },

  components: {},

  computed: {},

  beforeMount () { },

  mounted () {
    // this.initChar()
    this.demo()
  },

  methods: {
    demo () {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      this.$echarts.registerMap('songjiang', JSON)

      var geoCoordMap = {
        叶榭镇: [121.30142211914061, 30.935801658201385],
        九亭: [121.31858825683592, 31.11761871756099],
        九里亭: [121.31240844726562, 31.15405797549081],
        车墩镇: [121.27738952636719, 30.981141277396976],
        方松街道: [121.20597839355467, 31.038226771949258],
        泖港镇: [121.15447998046875, 30.9393353886492],
        佘山镇: [121.1743927001953, 31.090574094954192],
        石湖荡镇: [121.13662719726562,
          30.979963897240086],
        泗泾镇: [121.24889373779295,
          31.11673694918262],
        新浜镇: [121.06040954589844, 30.927555779179652],
        新桥镇: [121.31515502929686,
          31.067638926703026],
        永丰街道: [121.21559143066406, 30.98585065275817],
        岳阳街道: [121.22451782226561, 31.01174806181128],
        中山街道: [121.26091003417969,
          31.038815104128687],
        洞泾镇: [121.24923706054688, 31.083517709507184],
        荣东: [121.31669998168947,
          31.032343250213046],
        荣东东: [121.2729263305664,
          31.01616169124602],
        小昆山: [121.11087799072266,
          31.0294013530289],
        荣东西: [121.15585327148438,
          31.031166502244197],
        广富林: [121.19190216064453,
          31.068227077060858],
        大学城: [121.19524955749512,
          31.052051616965418],
        城中: [121.22674942016602,
          31.10850671598723]
      }
      var data = [
        { name: '九亭', value: 199, selected: true },
        { name: '九里亭', value: 19, selected: true },
        { name: '车墩镇', value: 10, selected: true },
        { name: '方松街道', value: 29 },
        { name: '泖港镇', value: 69 },
        { name: '佘山镇', value: 52 },
        { name: '石湖荡镇', value: 160 },
        { name: '泗泾镇', value: 132 },
        { name: '新浜镇', value: 1 },
        { name: '新桥镇', value: 99 },
        { name: '叶榭镇', value: 39 },
        { name: '永丰街道', value: 59 },
        { name: '岳阳街道', value: 39 },
        { name: '中山街道', value: 29 },
        { name: '洞泾镇', value: 129 },
        { name: '荣东', value: 19 },
        { name: '荣东东', value: 19 },
        { name: '小昆山', value: 100 },
        { name: '荣东西', value: 120 },
        { name: '广富林', value: 110 },
        {
          name: "大学城", value: 10
        },
        {
          name: "城中", value: 20
        }
      ]

      var convertData = function (data) {
        var res = []
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name]
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
            })
          }
        }
        return res
      }
      let option = {
        backgroundColor: '#020933',
        // dataRange: {
        //   show: false,
        //   x: 'left',
        //   y: 'bottom',
        //   splitList: [
        //     { start: 5, end: 100000, color: '#2B91B7' }, //当值为5时，区域背景
        //   ],
        // },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            if (typeof params.value[2] == 'undefined') {
              return params.name + ' : ' + params.value
            } else {
              return params.name + ' : ' + params.value[2]
            }
          },
        },
        visualMap: {
          show: false,
          min: 0,
          max: 500,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'], // 文本，默认为数值文本
          calculable: true,
          seriesIndex: [1],
          inRange: {
            color: ['transparent'],
          },
        },
        geo: {
          show: true,
          map: 'songjiang',
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          selectedMode: true,
          roam: true,
          itemStyle: {
            normal: {
              areaColor: 'transparent',
              borderColor: '#3fdaff',
              borderWidth: 1,
              shadowColor: 'rgba(63, 218, 255, 0.5)',
              shadowBlur: 30,
            },
            emphasis: {
              areaColor: '#2B91B7',
            },
          },
        },
        series: [
          {
            name: 'credit_pm2.5',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: function (val) {
              return 10
            },
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false,
              },
              emphasis: {
                show: true,
              },
            },
            itemStyle: {
              normal: {
                color: '#fff',
              },
            },
          },
          {
            type: 'map',
            map: 'songjiang',
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: '#fff',
                },
              },
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#031525',
                borderColor: '#3B5077',
              },
              emphasis: {
                areaColor: '#2B91B7',
              },
            },
            animation: false,
            data: data,
          },
          {
            name: '点',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin',
            //红色的点
            symbolSize: function (val) {
              return 40
            },
            label: {
              normal: {
                show: true,
                formatter: function (params) {
                  return params.value[2]
                },
                textStyle: {
                  color: '#fff',
                  fontSize: 9,
                },
              },
            },
            itemStyle: {
              normal: {
                color: '#F62157', //标志颜色
              },
            },
            zlevel: 6,
            data: convertData(data),
          },
          {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: function (val) {
              return 10
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke',
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true,
              },
            },
            itemStyle: {
              normal: {
                color: '#05C3F9',
                shadowBlur: 10,
                shadowColor: '#05C3F9',
              },
            },
            zlevel: 1,
          },
        ],
      }

      myChart.setOption(option)
      myChart.on('click', (params) => {
        this.selectData.push(params.name)
        console.log(Array.from(new Set(this.selectData)))
      })
    },
    char () {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      this.$echarts.registerMap('songjiang', JSON)

      var geoCoordMap = {
        叶榭镇: [121.30142211914061, 30.935801658201385],
        九亭: [121.31858825683592, 31.11761871756099],
        九里亭: [121.31240844726562, 31.15405797549081],
        车墩镇: [121.27738952636719, 30.981141277396976],
        方松街道: [121.20597839355467, 31.038226771949258],
        泖港镇: [121.15447998046875, 30.9393353886492],
        佘山镇: [121.1743927001953, 31.090574094954192],
        石湖荡镇: [121.13937377929688, 31.018809770791552],
        泗泾镇: [121.26640319824219, 31.124672569676118],
        新浜镇: [121.06040954589844, 30.927555779179652],
        新桥镇: [121.32545471191406, 31.079401242700747],
        永丰街道: [121.21559143066406, 30.98585065275817],
        岳阳街道: [121.22451782226561, 31.01174806181128],
        中山街道: [121.26434326171875, 31.030578122807324],
        洞泾镇: [121.24923706054688, 31.083517709507184],
      }
      var data = [
        { name: '九亭', value: 199, selected: true },
        { name: '九里亭', value: 19, selected: true },
        { name: '车墩镇', value: 10 },
        { name: '方松街道', value: 29 },
        { name: '泖港镇', value: 69 },
        { name: '佘山镇', value: 52 },
        { name: '石湖荡镇', value: 160 },
        { name: '泗泾镇', value: 132 },
        { name: '新浜镇', value: 1 },
        { name: '新桥镇', value: 99 },
        { name: '叶榭镇', value: 39 },
        { name: '永丰街道', value: 59 },
        { name: '岳阳街道', value: 39 },
        { name: '中山街道', value: 29 },
        { name: '洞泾镇', value: 129 },
      ]

      var convertData = function (data) {
        var res = []
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name]
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
            })
          }
        }
        return res
      }
      let option = {
        backgroundColor: '#404a59',
        title: {},
        geo: {
          show: true,
          map: 'songjiang',
          label: {
            //显示文字的
            normal: {
              show: true,
              textStyle: {
                color: '#fff',
              },
            },
            emphasis: {
              show: false,
            },
          },
          selectedMode: true,
          roam: false,
          itemStyle: {
            normal: {
              borderColor: '#3fdaff',
              borderWidth: 2,
              shadowColor: 'rgba(63, 218, 255, 0.5)',
              shadowBlur: 30,
            },
            emphasis: {
              areaColor: '#2B91B7', //鼠标移入的颜色
            },
          },
        },
        visualMap: {
          show: false,
          left: 'right',
          categories: ['1'],
          inRange: {
            color: ['#f46d43'], //填充色
          },
          text: ['High', 'Low'], // 文本，默认为数值文本
          calculable: true,
        },
        series: [
          {
            type: 'map',
            map: 'songjiang',
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: '#fff',
                },
              },
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#031525',
                borderColor: '#3B5077',
              },
              emphasis: {
                areaColor: '#2B91B7',
              },
            },
            animation: false,
            data: data,
          },
        ],
      }

      myChart.setOption(option)
      myChart.on('click', function (params) {
        for (var i = 0; i < data.length; i++) {
          data[i].value = '0'
          if (params.name == data[i].name) {
            data[i].value = '1'
          }
        }
        myChart.setOption(option)
      })
    },
    initChar () {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      //  var uploadedDataURL = "../lib/jinshan.json";
      // myChart.showLoading();
      this.$echarts.registerMap('songjiang', JSON)
      // var uploadedDataURL = "/asset/get/s/data-1482818963027-Hko9SKJrg.json";

      // myChart.showLoading();
      // $.get(uploadedDataURL, function (chinaJson) {
      //  echarts.registerMap('北京', chinaJson);
      //  myChart.hideLoading();
      myChart.setOption({
        // visualMap: {
        //   min: 10,
        //   max: 200,
        //   text: ['High', 'Low'],
        //   realtime: false,
        //   calculable: true,
        //   inRange: {
        //     color: ['#efb15c', ' #ff5d1a', '#479cee']
        //   }
        // },

        geo: {
          show: true,
          map: 'songjiang',
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#031525',
              // borderColor: 'red', //线的颜色
            },
            emphasis: {
              areaColor: '#2B91B7', //鼠标移入颜色
            },
          },
        },
        series: [
          {
            type: 'map',
            map: 'songjiang',
            selectedMode: 'single',
            // itemStyle: {
            //   normal: {
            //     label: {
            //       show: true,
            //       textStyle: {

            //         color: '#fff'   //静态字体的颜色
            //       }
            //     }
            //   },
            //   emphasis: {
            //     label: {
            //       show: true,

            //     }
            //   }
            // },
            //地图边框颜色
            itemStyle: {
              normal: {
                borderColor: '#cacaca',
                borderWidth: 1,
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff', //静态字体的颜色
                  },
                },
              },
              emphasis: {
                label: {
                  show: true,
                },
              },
            },
            data: [
              { name: '九里亭', value: 0 },
              { name: '九亭', value: 199 },
              { name: '车墩镇', value: 0 },
              { name: '方松街道', value: 29 },
              { name: '泖港镇', value: 69 },
              { name: '佘山镇', value: 52 },
              { name: '石湖荡镇', value: 160 },
              { name: '泗泾镇', value: 132 },
              { name: '新浜镇', value: 0 },
              { name: '新桥镇', value: 99 },
              { name: '叶榭镇', value: 39 },
              { name: '永丰街道', value: 59 },
              { name: '岳阳街道', value: 39 },
              { name: '中山街道', value: 29 },
              { name: '洞泾镇', value: 129 },
            ],
          },
        ],
      })
      // });
    },
  },

  watch: {},
}
</script>
<style lang="stylus" scoped>
.main
  width 100%
  height 100%
</style>
