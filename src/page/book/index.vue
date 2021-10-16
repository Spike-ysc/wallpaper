<template>
  <el-container style="background:#F3E7DD">
    <el-header>
      <el-row :gutter="20">
        <el-col class="icon-div" :span="4" :offset="0">
          <el-link class="home-link" :underline="false" @click="homePage">
            Books
          </el-link>
        </el-col>
        <el-col :span="16" :offset="0">
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
        <el-col class="type-div" :span="4" :offset="0">
          <div style="float:right">
          <el-button class="type-btn"  icon="el-icon-upload" circle></el-button>
          <el-button class="type-btn"  icon="el-icon-user" circle></el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>

    <el-main height="">
      <el-row class="main-row" :gutter="20">
        <el-col
          class="main-col"
          :lg="6"
          :xl="4"
          :xs="12"
          :sm="12"
          :md="8"
          :offset="0"
          v-for="(wallpaper, index) in wallpapers"
          :key="index"
        >
          <div class="block block-div">
              
            <el-image
              class="wallpaper-img"
               fit="cover"
              @click="openImg(wallpaper.imgUrl)"
              :src="
                imgurl +
                wallpaper.imgKey.substring(0, 2) +
                '/' +
                wallpaper.imgKey +
                '.jpg'
              "
              lazy
            >
            </el-image>
          </div>

          <div>
              <p> <el-link type="primary" :underline="false" href="" target="_blank">{{ wallpaper.imgKey }}</el-link></p>
              <p> <el-link type="primary" :underline="false" href="" target="_blank">{{ wallpaper.imgKey }}</el-link></p>
              <el-rate
  v-model="bookScore"
  disabled
  show-score
  text-color="#ff9900">
</el-rate>
              
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
  </el-container>
</template>

<script>
import {
  getWallpaper,
  getWallpaperByType,
  getWallpaperByTypeOrderTime,
  getWallpaperByTags,
} from "@/http/api";
import config from "@/http/config";

export default {
  data() {
    return {
      wallpapers: [],
      imgurl: "https://th.wallhaven.cc/small/",
      totalElements: 0,
      size: 24,
      currentPage: 1,
      purity: "SFW",
      categoryCheck: ["动漫"],
      categories: ["普通", "动漫", "人物"],
      category: ["Anime"],
      categoryDict: { 普通: "General", 动漫: "Anime", 人物: "People" },
      tags: "",
      pageType: 0,
      bookScore:3.1
    };
  },
  methods: {
    openImg(imgUrl){
      window.open(imgUrl, '_blank')
    },
    homePage() {
      this.tags = "";
      this.categoryCheck = ["动漫"];
      this.category = ["Anime"];
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
        getWallpaperByType(
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
  border-radius: 5px;
  width: 200px;
  height: 300px;
  object-fit: cover;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  cursor: pointer;
}
.block-div {
  position: relative;
}

.el-header {
  z-index: 2;
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
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
<style lang="scss">
.el-input__inner{
    background: #F5F7FA;
    border-width: 0;

}
.el-input-group__append{
    border-width: 0;
}
.type-btn{
    border-width: 0;
}
.type-btn i{
    font-size: 18px;
}

</style>