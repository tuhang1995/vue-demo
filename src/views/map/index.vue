<template>
  <div class="mapbox" style="height:100%;text-align: center;">
    <div id="map"></div>
    <div class="clickBox">
      <!-- Clickable label for Vienna -->
      <div id="marker" title="Marker">
        <el-row style="margin-bottom:10px">
          <el-button @click.native="drwaPoint" size="mini" type="primary"
            >画点</el-button
          >
          <el-button @click.native="getPointer" size="mini" type="primary"
            >撒点</el-button
          >

          <el-button @click.native="getGuiji" size="mini" type="primary"
            >轨迹</el-button
          >
          <el-button @click.native="removeGeo" size="mini" type="primary"
            >清除图层</el-button
          >
          <el-button @click.native="removeGuiji" size="mini" type="primary"
            >清除轨迹</el-button
          >
          <el-button @click.native="clearPoint" size="mini" type="primary"
            >清除撒点</el-button
          >
        </el-row>
        <el-row>
          <el-button @click.native="getlayers" size="mini" type="primary"
            >绘制图层</el-button
          >
          <el-button @click.native="getGeoJson" size="mini" type="primary"
            >绘制geoJson图层</el-button
          >
          <el-button @click.native="drawPolygon" size="mini" type="primary"
            >画多边形</el-button
          >
          <el-button @click.native="clearAll" size="mini" type="primary"
            >清除多边形</el-button
          >
        </el-row>
      </div>
      <!-- Popup -->
      <div id="popup" title="点位详情"></div>
    </div>
  </div>
</template>

<script>
//import '@/lib/mapbox/mapbox.js'//引入地图轨迹
import 'leaflet-ant-path/dist/leaflet-ant-path'
//引入动态motion
import 'leaflet.motion/dist/leaflet.motion.js'
//自定义方法
import api from '@/api/map.js'
import Songjiang from '@/lib/songjiang.json'
import 'leaflet.smooth_marker_bouncing/leaflet.smoothmarkerbouncing.js'
export default {
  name: '',
  props: [''],
  data() {
    return {
      mapApi: null,
      clearArr: [],
      pointArr: [],
      gPath: null,
      getJson: null,
      polygon: null,
    }
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {
    this.getMap()
    this.initMap()
  },

  methods: {
    // 画多边形
    onClick(e) {},
    drawPolygon() {
      let points = []

      this.polygon = new this.$L.Polygon(points)
      this.mapApi.addLayer(this.polygon)

      //this.clearArr.push(arr)
      //
      this.mapApi.on('mousedown', (e) => {
        points.push([e.latlng.lat, e.latlng.lng])
      })
      this.mapApi.on('mousemove', (event) => {
        this.polygon.setLatLngs([
          ...points,
          [event.latlng.lat, event.latlng.lng],
        ])
      })
      this.mapApi.on('dblclick', () => {
        if (points.length) {
          this.mapApi.off('mousemove')
          console.log(points)
          points = []
        }
      })
    },
    clearAll() {
      this.mapApi.removeLayer(this.polygon)
    },
    // 绘制geo地图
    getGeoJson() {
      // 修改地图中心
      this.mapApi.setView([30.96452966877634, 121.14347973360415], 12)
      // 清除geo地图
      if (this.getJson) {
        this.mapApi.removeLayer(this.getJson)
      }

      var myStyle = {
        color: '#ff7800',
        weight: 2,
        opacity: 0.65,
      }
      let that = this
      this.getJson = this.$L
        .geoJSON(Songjiang, {
          // 点击地图的弹出
          onEachFeature: function(feature, layer) {
            if (feature.properties) {
              layer.bindPopup(feature.properties.name)
            }
          },
          // 设置样式
          style: myStyle,
        })
        .addTo(this.mapApi)
    },
    // 绘制图层
    getlayers() {
      var polygon = this.$L
        .polygon([
          [31.262299, 121.434891],
          [31.254705, 121.433586],
          [31.252668, 121.435897],
        ])
        .addTo(this.mapApi)
      polygon.bindPopup('I am a polygon.')
    },
    getMap() {
      // api.getMap().then((res) => {
      //   if (res.status == 0) {
      //     this.pointArr = res.result.data
      //     this.getPointer()
      //   }
      // })
      this.pointArr = [
        {
          site_name: '站点1',
          count: 102,
          site_x: 31.262299,
          site_y: 121.434891,
        },
        {
          site_name: '站点2',
          count: 102,
          site_x: 31.254705,
          site_y: 121.431585,
        },
        {
          site_name: '站点3',
          count: 102,
          site_x: 31.262855,
          site_y: 121.433586,
        },
        {
          site_name: '站点4',
          count: 102,
          site_x: 31.252668,
          site_y: 121.435897,
        },
      ]
    },
    drwaPoint() {
      // this.$L.circle(
      //   [36.136569, 120.421856],
      //   {
      //     color: '#FF0000',
      //     fillColor: '#FF0000',
      //     radius: 10,
      //     fillOpacity: 1
      //   }).addTo(this.mapApi)
      var greenIcon = this.$L.icon({
        iconUrl: require('@/assets/normal.png'),

        iconSize: [25, 25],
      })
      let arr = this.$L
        .marker([31.262299, 121.434891], { icon: greenIcon })
        .bounce()
        .addTo(this.mapApi)
      this.clearArr.push(arr)
      console.log('this.clearArr: ', this.clearArr)
    },
    // 清除图层
    removeGeo() {
      if (this.getJson) {
        console.log('this.getJson: ', this.getJson)
        this.mapApi.removeLayer(this.getJson)
      }
    },
    moveGuiji() {
      // if (this.gPath) {
      //   this.mapApi.removeLayer(this.gPath)
      // }
      // var longLatList = [
      //   [36.136569, 120.421856],
      //   [36.107765, 120.360196],
      //   [36.156038, 120.479204]
      // ] //经纬度数组
      // var antPath = this.$L.polyline.antPath
      // this.gPath = antPath(longLatList, {
      //   paused: false, //暂停  初始化状态
      //   reverse: false, //方向反转
      //   delay: 3000, //延迟，数值越大效果越缓慢
      //   dashArray: [10, 20], //间隔样式
      //   weight: 3, //线宽
      //   opacity: 0.5, //透明度
      //   color: 'red' //颜色
      //   //"pulseColor": "#FFFFFF"　　//块颜色
      // })
      // this.gPath.addTo(this.mapApi)
      // this.mapApi.fitBounds(this.gPath.getBounds())

      this.opts = {
        icon: null,
        enableRotation: true, //允许小车旋转
      }
      //移动到当前点的索引

      var latlngs = [
        [36.136569, 120.421856],
        [36.107765, 120.360196],
        [36.156038, 120.479204],
        [36.113772, 120.338852],
        [36.155746, 120.396057],
      ]
      this.pathLen = latlngs
      this.$L
        .polyline(
          latlngs,
          {
            color: 'red',
          },
          {
            auto: true,
            duration: 3000,
            easing: this.$L.Motion.Ease.linear,
          },
          {
            removeOnEnd: true,
          }
        )
        .addTo(this.mapApi)
      // setTimeout(() => {
      //   this.start()
      // }, 200)
    },

    //轨迹信息
    getGuiji() {
      this.mapApi.setView([31.262299, 121.434891], 14)
      if (this.gPath != null) {
        this.removeGuiji()
      }
      //icon可以使用图标icon: this.$L.divIcon({  html: "<i class=' el-icon-pear' aria-hidden='true'></i>"
      var carIcon = this.$L.icon({
        iconUrl: require('@/assets/car.png'),
        iconSize: [25.1, 35],
      })
      // 绘制起始点
      var greenIcon = this.$L.icon({
        iconUrl: require('@/assets/normal.png'),

        iconSize: [25, 25],
      })
      let arr = this.$L
        .marker([31.262299, 121.434891], { icon: greenIcon })
        .bindPopup(`<div class='marker-map'>  起点 </div>`)
        .addTo(this.mapApi)
      this.clearArr.push(arr)

      this.gPath = this.$L.motion
        .polyline(
          [
            [31.262299, 121.434891],
            [31.254705, 121.431585],
            [31.262855, 121.428638],
            [31.252668, 121.435897],
            [31.245629, 121.444808],
          ],
          {
            color: 'red',
          },
          {
            auto: true,
            duration: 5000, //持续时间
            easing: this.$L.Motion.Ease.linear,
          },
          {
            removeOnEnd: false,
            icon: carIcon,
          }
        )
        .addTo(this.mapApi)
    },
    //清除撒点
    clearPoint() {
      let myGroup = this.$L.layerGroup(this.clearArr)
      this.mapApi.addLayer(myGroup)
      myGroup.clearLayers()
    },
    removeGuiji() {
      if (this.gPath != null) {
        this.mapApi.removeLayer(this.gPath)
      } else {
        this.$message({
          type: 'warning',
          message: '没有轨迹可以清除',
        })
      }
    },
    //撒点
    getPointer() {
      this.clearPoint()
      var greenIcon = this.$L.icon({
        iconUrl: require('@/assets/error.png'),
        iconSize: [32, 35], //宽度  高度
      })
      let normalArr = [],
        markerArr = []
      this.pointArr.forEach((item) => {
        item.point = (item.site_x + ',' + item.site_y).split(',')
        if (item.count > 0) {
          normalArr.push(item)
        } else {
          markerArr.push(item)
        }
      })
      let arr = [],
        err = []
      for (let i = 0; i < normalArr.length; i++) {
        arr = new this.$L.marker(normalArr[i].point)
          .addTo(this.mapApi)
          .bounce()
          .bindPopup(
            `<div class='marker-map'> 站点名称：${
              normalArr[i].site_name
            }<br> 采集数：${normalArr[i].count}</div>`
          )
        this.clearArr.push(arr)
      }
      // for (let i = 0; i < markerArr.length; i++) {
      //   err = new this.$L.marker(markerArr[i].point, { icon: greenIcon })
      //     .addTo(this.mapApi)
      //     .bounce()
      //     .bindPopup(`<div class='marker-map'>设备故障</div>`)
      //   this.clearArr.push(err)
      // }
    },

    initMap() {
      //,120.427318,36.136861青岛  //121.452282,31.238466 上海
      var gisPoint = [parseFloat('31.238466 '), parseFloat('121.452282')]
      var mapCenter = gisPoint
      if (true) {
        this.mapApi = new this.$L.Map('map', {
          center: mapCenter,
          zoom: 14,
        })
        //添加地图图层
        //图层切换按钮
        var amap = this.$L.tileLayer.wms(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            layers: 'amap',
            format: 'image/png',
          }
        )

        amap.addTo(this.mapApi)
      }
    },
  },

  watch: {},
}
</script>
<style lang="stylus" scoped>
.mapbox
  position relative
#map
  width 100%
  position absolute
  top 0px
  bottom 0px
  left 0px
  z-index 10
.my-div-icon
  font-size 8px
  /* background:red; */
  width 200px !important
  color #aa3300
  top -35px
  left -50px
  font-weight bold
.clickBox
  position absolute
  right 10px
  z-index 100
  top 20px
</style>
