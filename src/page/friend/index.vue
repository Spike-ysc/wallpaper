<template>
  <div id="container"></div>
</template>

<script>
import AMap from "AMap"
let map
export default {
  data() {
    return {
    };
  },
  mounted() {
    this.MapInit();
    this.MarkerInit()
  },
  methods: {
      MapInit () {
        let _this = this;
            map = new AMap.Map("container", {
            center: [105.397428, 35.90923],
            mapStyle: "amap://styles/7ac6dea6d7eedbdc4ef00b4f117936bc", //设置地图的显示样式
            resizeEnable: true,
            zoom: 5
        });
        
      },
      MarkerInit(){

           var text = new AMap.Text({
        text:'纯文本标记',
        anchor:'center', // 设置文本标记锚点
        draggable:true,
        cursor:'pointer',
        angle:10,
        style:{
            'padding': '.75rem 1.25rem',
            'margin-bottom': '1rem',
            'border-radius': '.25rem',
            'background-color': 'white',
            'width': '15rem',
            'border-width': 0,
            'box-shadow': '0 2px 6px 0 rgba(114, 124, 245, .5)',
            'text-align': 'center',
            'font-size': '20px',
            'color': 'blue'
        },
        position: [116.396923,39.918203]
    });

    text.setMap(map);
          
        //   var marker = new AMap.Marker({
        //     position: new AMap.LngLat(116.39, 39.9),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        //     title: '北京'
        // });
        // map.add(marker);
      }
  },
};
</script>

<style>
#container {
    position:absolute;
   margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
}
</style>