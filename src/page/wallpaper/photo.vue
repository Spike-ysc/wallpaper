<template>
  <div class="main">
    <el-container>
      <!-- <el-header height="">
             <h1>head</h1>
          </el-header> -->
      <el-container>
        <el-container style="height: 100%">
          <el-main height="" class="left">
            <div>
              <el-image
                class="img"
                v-progressive="src"
                :src="img"
                :fit="imgFit"
                layz
                :preview-src-list="srcList"
              >
              
                <div slot="placeholder" class="image-slot">
                  <i class="el-icon-loading loading icon-style" ></i>
              </div>
                <div slot="error" class="image-slot">
                  <i class="el-icon-loading loading icon-style" ></i>
                </div>
              </el-image>
            </div>
          </el-main>
        </el-container>
        <el-aside>
          <p class="title">Tags</p>
          <div class="div-box">
            <div v-for="(tag, index) in tags" :key="index">
              <div class="div-tag">
                <el-link
                  class="box-link"
                  :underline="false"
                  @click="homePage(tag)"
                  >{{ tag }}</el-link
                >
              </div>
            </div>
            <div style="clear: both"></div>
          </div>
          <p class="title">Colors</p>
          <div class="div-box">
            <div v-for="(color, index) in colors" :key="index">
              <div class="div-tag" v-bind:style="{ background: color }">
                <el-link
                  class="box-link"
                  :underline="false"
                  @click="homePage"
                  >{{ color }}</el-link
                >
              </div>
            </div>
            <div style="clear: both"></div>
          </div>
          <div>
            <!-- <el-tag type="danger" size="normal"  effect="dark" ></el-tag> -->
            <!--                       
                      <el-tag 
                      effect="dark"
                        v-for="tag in tags"
                        :key="tag.name"
                        :type="danger">
                        {{tag.name}}
                        </el-tag> -->
          </div>
          <div>
            <p class="msg-title">Type</p>
            <p class="msg-content">{{ wallpaper.imgType }}</p>
          </div>
          <div style="clear: both"></div>
          <el-divider class="divider"></el-divider>
          <div>
            <p class="msg-title">imgSize</p>
            <p class="msg-content">{{ wallpaper.imgSize }}</p>
          </div>
          <div style="clear: both"></div>
          <el-divider class="divider"></el-divider>
          <div>
            <p class="msg-title">storageSize</p>
            <p class="msg-content">{{ wallpaper.storageSize }}</p>
          </div>
          <div style="clear: both"></div>
          <el-divider class="divider"></el-divider>
          <div>
            <p class="msg-title">uploadTime</p>
            <p class="msg-content">{{ wallpaper.uploadTime }}</p>
          </div>
          <div style="clear: both"></div>
          <el-divider class="divider"></el-divider>

          <el-button
            class="download"
            type="primary"
            size="default"
            download="img"
            @click="download"
            >下载原图</el-button
          >
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getWallpaperByID } from "@/http/api";
import axios from "axios";
export default {
  data() {
    return {
      img: "",
      imgKey: this.$route.params.id,
      tags: [],
      colors: [],
      wallpaper: "",
      type: "",
      size: "",
      imgFit: "contain",
      srcList: [],
    };
  },
  methods: {
    loadImg() {
      getWallpaperByID(this.imgKey).then((res) => {
        this.wallpaper = res;
        this.img = this.wallpaper.imgUrl;
        this.srcList = [this.img];
        this.tags = this.wallpaper.tags.split(",");
        this.tags.pop();
        var colorStr = "," + this.wallpaper.colors;
        colorStr = colorStr.replace(/,/g, ",#");
        this.colors = colorStr.split(",");
        this.colors.pop();
        this.colors.shift();
        this.size = this.wallpaper.imgSize;
      });
    },
    homePage(data) {
      this.$router.push({
        name: "wallpaper-demo",
        params: {
          tag: data,
        },
      });
    },
    download() {
      console.log("下载图片");
      let vm = this;
      // const img_a = document.createElement('img-a')
      // img_a.href = this.img
      // img_a.download = this.wallpaper.imgKey
      // img_a.click()

      // var a = document.createElement('a')
      // a.download = '二维码'
      // a.href = this.img
      // a.click()

      //实例化一个img对象
      const img = new Image();
      //设置img的图片路径
      img.src = this.img;
      //设置跨域解决
      img.setAttribute("crossOrigin", "Anonymous");
      //img加载完后处理
      img.onload = function () {
        //创建一个canvas对象
        const canvas = document.createElement("canvas");
        //把图片的宽度设为canves的宽度
        canvas.width = img.width;
        //把图片的高度设为canves的高度
        canvas.height = img.height;
        //创建一个2d画布
        const ctx = canvas.getContext("2d");
        // 将img中的内容画到画布上
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        // 将画布内容转换为base64
        let base64 = canvas.toDataURL();
        // 创建a链接
        const a = document.createElement("a");
        a.href = base64;
        a.download = vm.wallpaper.imgKey;
        // 触发a链接点击事件，浏览器开始下载文件
        a.click();
      };

      //   function downloadByAxios(url,name){
      // axios({
      // 	//设置图片路径
      // 	url:url,
      // 	//设置请求方法为get请求
      // 	method:'get',
      // 	//设置相应类型为blob
      // 	responseType: 'blob'
      // }).then(
      // 	//得到的是一个blob对象
      // 	res => {
      // 		let url = window.URL.createObjectURL(res.data)
      //         const a = document.createElement('a');
      //          a.href = url
      //          a.download = name
      //          a.click()
      // 	}
      // )
    },
  },
  mounted() {
    this.loadImg();
  },
};
</script>

<style scoped lang="scss">
.main {
  background: #1f2023;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  overflow: hidden;
}
.image-slot {
  width: 100%;
  height: 100%;
  background: #545864;
}
.icon-style{
  color: white;
  background: transparent;
  font-size: 18px;
}
.msg-title {
  color: #5a5b5d;
  font-size: 0.8em;
  margin: 8px 4px;
  float: left;
}
.msg-content {
  color: #ffffff;
  float: right;
  font-size: 0.8em;
  margin: 8px 4px;
}
.el-aside {
  padding-right: 16px;
}
.div-box {
  width: 100%;
  border-radius: 3px;
  min-height: 30px;
  background: #2d2f35;
  display: block;
  padding: 8px;
}
.div-tag {
  float: left;
  padding: 4px 8px;
  background: #545864;
  border-radius: 2px;
  color: white;
  margin-right: 4px;
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 200;
}

.box-link {
  color: white;
  user-select: none;
}
.title {
  color: white;
}
.divider {
  margin: 0;
  background-color: #282a2e;
}
.download {
  margin: 24px 0;
  width: 250px;
}


</style>