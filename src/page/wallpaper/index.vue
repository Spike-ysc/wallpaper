<template>
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col class="icon-div hidden-xs-only" :span="4" :offset="0">
          <el-link class="home-link" :underline="false" @click="homePage">
            Wallpaper
          </el-link>
        </el-col>
        <el-col :lg="12" :xl="12" :md="12" :sm="12" :xs="24" :offset="0">
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
        <el-col class="type-div hidden-xs-only" :span="8" :offset="0">
          <div>
            <el-checkbox-group v-model="categoryCheck" @change="typeChange">
              <el-checkbox-button
                v-for="category in categories"
                :label="category"
                :key="category"
                >{{ category }}</el-checkbox-button
              >
            </el-checkbox-group>
          </div>
        </el-col>
      </el-row>
    </el-header>

    <el-main v-bind:style="{ minHeight: Height + 'px' }">
      <el-row
        class="main-row"
        v-bind:style="{ minHeight: imgHeight + 'px' }"
        :gutter="20"
      >
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
              @click="openImg(wallpaper.imgKey)"
              :src="
                imgurl +
                wallpaper.imgKey.substring(0, 2) +
                '/' +
                wallpaper.imgKey +
                '.jpg'
              "
              lazy
            >
              <div slot="placeholder" class="image-slot">
                <!-- 加载中<span class="dot">...</span> -->
              </div>
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <div class="msg-div hidden-xs-only">
              <div class="size-div" onselectstart="return false;">
                {{ wallpaper.imgSize }} - {{ wallpaper.storageSize }}
              </div>
            </div>
          </div>

          <!-- <div>
            {{ wallpaper.imgKey }}
          </div> -->
        </el-col>
      </el-row>
      <el-pagination
        class="hidden-xs-only"
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
      <el-pagination
        small
        class="small-pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="24"
        :page-sizes="[24, 48, 72, 96, 120]"
        background
        :current-page="currentPage"
        layout="prev, pager, next"
        :total="totalElements"
        v-if="totalElements != 0">
      </el-pagination>
    </el-main>
    <el-footer height="">
      <div class="footer-div">
        <p class="foot-msg">
          参考链接：
          <el-link href="https://wallhaven.cc/" type="primary"
            >Wallhaven</el-link
          >
          &nbsp;
          <el-link href="https://element.eleme.cn/#/zh-CN" type="primary"
            >Element</el-link
          >
        </p>
        <p class="foot-msg">
          © 2021 ysc ·
          <el-link href="https://beian.miit.gov.cn/" type="primary"
            >豫ICP备19031816号-1</el-link>
        </p>
        <p class="foot-msg">
          本网页内容均来自互联网，对任何法律问题及风险不承担任何责任
        </p>
      </div>
    </el-footer>

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
import NProgress from 'nprogress';
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
      categoryCheck: ["普通","动漫"],
      categories: ["普通", "动漫", "人物"],
      category: ["General","Anime"],
      categoryDict: { 普通: "General", 动漫: "Anime", 人物: "People" },
      tags: "",
      pageType: 0,
      Height: 0,
      imgHeight: 0,
      isPhoneHidden: false,
      pageSmall: true,
    };
  },

  methods: {
    openImg(imgKey) {
      let url = this.$router.resolve(`/photo/${imgKey}`);
      window.open(url.href, "_blank");
    },
    homePage() {
      this.tags = "";
      this.categoryCheck = ["普通","动漫"];
      this.category = ["General","Anime"];
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
        NProgress.start();
      if (this.pageType == 0) {
        getWallpaperByType(
          this.purity,
          this.category.join(","),
          this.currentPage - 1,
          this.size
        ).then((res) => {
          if (res.status === -404) {
            this.$message({
              message: "服务器异常,图片无法正常加载",
              type: "warning",
            });
          }
          this.wallpapers = res._embedded.wallpapers;
          this.totalElements = res.page.totalElements;
          window.scroll(0, 0);
          console.log(res);
          NProgress.done()
        });
      } else if (this.pageType == 1) {
        document.title = this.tags+"-搜索";
        getWallpaperByTags(
          this.tags,
          this.purity,
          this.category.join(","),
          this.currentPage - 1,
          this.size
        ).then((res) => {
          if (res.status === -404) {
            this.$message({
              message: "服务器异常,图片无法正常加载",
              type: "warning",
            });
          }
          this.wallpapers = res._embedded.wallpapers;
          this.totalElements = res.page.totalElements;
          window.scroll(0, 0);
          console.log(res);
          NProgress.done()
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
    //动态设置内容高度 让footer始终居底   header+footer的高度是100
    this.Height = document.documentElement.clientHeight - 230;
    this.imgHeight = document.documentElement.clientHeight - 335;
    var width = document.documentElement.clientWidth;
    console.log(width); //监听浏览器窗口变化
    window.onresize = () => {
      this.Height = document.documentElement.clientHeight - 230;
      this.imgHeight = document.documentElement.clientHeight - 335;
      var width = document.documentElement.clientWidth;
      console.log(width);
    };
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
  // min-width: 720px;
  &:last-child {
    margin-bottom: 0;
  }
}
.main-col {
  margin-bottom: 20px;
}
.image-slot {
  position: relative;
  background: #f3e7dd;
  width: 100%;
  height: 0;
  padding-top: 67%;
}
.wallpaper-img {
  border-radius: 3px;
  width: 100%;
  //   height: 200px;
  object-fit: cover;
  //   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  // border-radius: 5px;
  // width: 300px;
  // height: 200px;
  // object-fit: cover;
  // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  // cursor: pointer;
}
.block-div {
  position: relative;
}
el-pagination {
  min-height: 32px;
}
.el-footer {
  padding: 0px;
}

.footer-div {
  background-color: #f4f4f4;
  padding-top: 40px;
  padding-bottom: 40px;
  height: 89px;
  color: #888;
  border-top: 1px solid #e5e5e5;
  display: block;
}
.foot-msg {
  font-weight: 500;
  font-size: 14px;
}

.msg-div {
  position: absolute;
  display: inline-block;
  width: 100%;
  overflow: hidden;
  bottom: 5px;
  left: 0;
}
.size-div {
  width: 300px;
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
  width: 80%;
  max-width: 400px;
}
@media only screen and (max-width: 767px) {
.input-with-select {
  width: 90%;
}
}
@media only screen and (min-width: 767px) {
.small-pagination {
  display:none!important
}
}
</style>