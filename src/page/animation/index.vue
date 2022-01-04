<template>
  <el-container>
    <el-header>
     
      <el-row :gutter="20">
        <el-col class="icon-div" :span="4" :offset="0">
          <el-link class="home-link" :underline="false" @click="homePage">
              Animation
          </el-link>
        </el-col>
        <el-col :span="12" :offset="0">
          <div style="margin-top: 10px">
            <el-input
              placeholder="请输入内容"
              v-model="tags"
              @keyup.enter.native="search"
              class="input-with-select"
            >
              <el-button
                slot="append"
                type="primary"
                size="default"
                @click="search"
                icon="el-icon-search"
              ></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col class="type-div" :span="8" :offset="0">
         
        </el-col>
      </el-row>
    </el-header>

    <el-main height="">
      
       <!-- <el-carousel indicator-position="outside">
    <el-carousel-item v-for="item in 4" :key="item">
      
      <h3>{{ item }}</h3>
    </el-carousel-item>
  </el-carousel> -->
  <el-carousel height="150px" type="default" direction="horizontal"
    :initial-index="0" :autoplay="true" :interval="3000" :loop="true"
    trigger="hover" indicator-position="outside" arrow="hover">
    <el-carousel-item v-for="item in items" :key="item.key" >
      <el-image :src="item.url" fit="fill" :lazy="true"></el-image>
      <!-- content -->
      <!-- <h3>{{item.title}}</h3> -->
    </el-carousel-item>
  </el-carousel>
  
      <h1>Animation</h1>
      <el-row class="main-row" :gutter="20">
        <el-col
          class="main-col"
          :xl="2"
          :lg="4"
          :md="6"
          :sm="8"
          :xs="8"
          :offset="0"
          v-for="(animation, index) in animations"
          :key="index"
        >
          <div class="block block-div">
            <el-image
              class="wallpaper-img"
              :fit="imgFit"
              :src="baseImg+animation.douban+'.jpg'"
              lazy
            >
            </el-image>
            <!-- <div class="msg-div">
              <div class="size-div" onselectstart="return false;">
                {{ animation.title }}
              </div>
            </div> -->
          </div>

          <div class="title-div">
            <div class="name-div">

            {{ animation.title }}
            </div> 
            <div class="rate-div">
              <i class="el-icon-star-off"> {{animation.rate}}</i>
             
            </div>
          </div>
        </el-col>
      </el-row>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="24"
        :page-sizes="[24, 48, 72, 96, 120]"
        background
        :current-page="currentPage"
        :pager-count="11"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalElements"
        v-if="totalElements != 0"
      >
      </el-pagination>
    </el-main>
    <!-- <el-backtop :target="page-component__scroll" :right="20" :bottom="40"></el-backtop> -->
    
<!-- <script src="/static/js/charming.min.js" ></script> -->
<!-- <style scoped src='../../assets/css/demo.css'></style> -->
  </el-container>
</template>

<script>
// import {myfun} from '../js/anime.min.js'
import {
  getAnimations,
  getWallpaperByTags,
} from "@/http/api";

export default {
  data() {
    return {
      animations: [],
      totalElements: 0,
      size: 24,
      currentPage: 1,
      tags: "",
      pageType: 0,
      baseImg: 'http://localhost:8081/poster/',
      imgFit: "contain",
      items:[
        {url:'http://localhost:8081/poster/1291560.jpg',title:'1'},
        {url:'http://localhost:8081/poster/1291560.jpg',title:'2'},
        {url:'http://localhost:8081/poster/1291560.jpg',title:'3'},
        {url:'http://localhost:8081/poster/1291560.jpg',title:'4'},
      ]
    };
  },
  methods: {
    openImg(imgUrl){
      window.open(imgUrl, '_blank')
    },
    homePage() {
      this.tags = "";
      this.currentPage = 1;
      this.setContextData("currentPage", this.currentPage);
      this.pageType = 0;
      this.loadWallpaper();
    },
    search() {
      this.pageType = 1;
      this.currentPage = 1;
      this.setContextData("currentPage", this.currentPage);
      this.loadWallpaper();
    },
    typeChange() {
      this.category.length = 0;
      this.categoryCheck.forEach((category) => {
        this.category.push(this.categoryDict[category]);
      });
      this.currentPage = 1;
      this.setContextData("currentPage", this.currentPage);
      this.loadWallpaper();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val;
      this.loadWallpaper();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.setContextData("currentPage", this.currentPage);
      this.loadWallpaper();
    },
    loadWallpaper() {
      if (this.pageType == 0) {
        getAnimations(
          this.currentPage - 1,
          this.size
        ).then((res) => {
          this.animations = res._embedded.animations;
          this.totalElements = res.page.totalElements;
          window.scroll(0, 0);
          console.log(res);
        });
      } else if (this.pageType == 1) {
        getWallpaperByTags(
          this.tags,
          this.purity,
          this.category.join(","),
          this.currentPage - 1,
          this.size
        ).then((res) => {
          this.wallpapers = res._embedded.wallpapers;
          this.totalElements = res.page.totalElements;
          window.scroll(0, 0);
          console.log(res);
        });
      }
    },
    //给sessionStorage存值
    setContextData: function (key, value) {
      if (typeof value == "string") {
        sessionStorage.setItem(key, value);
      } else {
        sessionStorage.setItem(key, JSON.stringify(value));
      }
    },
    // 从sessionStorage取值
    getContextData: function (key) {
      const str = sessionStorage.getItem(key);
      if (typeof str == "string") {
        try {
          return JSON.parse(str);
        } catch (e) {
          return str;
        }
      }
      return;
    },
    // ————————————————
    // 版权声明：本文为CSDN博主「StephenO_o」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
    // 原文链接：https://blog.csdn.net/StephenO_o/article/details/84234916
  },
  mounted() {
    this.loadWallpaper();
  },
  created: function () {
    console.log("created...");
    this.currentPage = this.getContextData("currentPage");

    console.log("created..." + this.currentPage);
  },
};
</script>


<style scoped lang="scss">
.body {
  padding: 0px;
  margin: 0px;
}
.el-main {
  min-height: 400px;
  margin-top: 60px;
}
.main-row {
  margin-bottom: 20px;
  min-width: 720px;
  &:last-child {
    margin-bottom: 0;
  }
}
.main-col {
  margin-bottom: 20px;
}
.wallpaper-img {
  
  border-radius: 3px;
  position: relative;
  height: 100%;
  
  object-fit: contain;
  // width: 100%;
  //   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  // border-radius: 5px;
  // width: 140px;
  // height: 200px;
  // object-fit: cover;
  // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  // cursor: pointer;
}
.block-div {
  position: relative;
  width: 100%;
  height: 320px;
  overflow: hidden;
}

.msg-div {
  position: absolute;
  display: inline-block;
  width: 100%;
  overflow: hidden;
  bottom: 5px;
  left: 0;
}
.title-div{
  margin: 0 auto;
  color: black;
  padding: 8px;
}
.name-div{
  float: left;
  font-weight: bold;
  font-size: 16px;
}
.rate-div{
  float: right;
  font-size: 14px;
}
.size-div {
  width: 140px;
  margin: 0 auto;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background: #00000049;
  color: white;
  padding-top: 5px;
  opacity: 0;
  // display: none;
}
@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes hide {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.block-div:hover .size-div {
  // display:inline-block
  animation: show 0.5s;
  animation-fill-mode: forwards;
}
.el-header {
  z-index: 2;
  position: fixed;
  width: 100%;
  background: white;
  // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.icon-div {
  padding: 15px 10px;
}
.home-link {
  font-size: 20px;
  user-select: none;
}
.type-div {
  padding: 10px;
}
.input-with-select {
  width: 400px;
}
</style>