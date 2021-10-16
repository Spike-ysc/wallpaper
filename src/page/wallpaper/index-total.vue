<template>
  <el-container>
    <el-header height="120px">
      <el-row :gutter="20">
        <el-col class="icon-div" :span="4" :offset="0">
          <el-link class="home-link" :underline="false" @click="homePage">
            Wallpaper
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
          <div style="float:right">
          <el-button class="type-btn"  icon="el-icon-upload" circle></el-button>
          <el-button class="type-btn"  icon="el-icon-user" circle></el-button>
          </div>
        </el-col>
      </el-row>

       <el-divider></el-divider>

      <el-row :gutter="20" >
        <el-col :span="12" :offset="6"
          :xl="12"
          :lg="{span:12, offset:6}"
          :md="{span:16, offset:4}"
          :sm="{span:18, offset:3}"
          :xs="{span:20, offset:2}">
          <div class="type-select-div">
            <el-checkbox-group v-model="purity" >
              <el-checkbox-button
                v-for="purity in puritys"
                :label="purity"
                :key="purity"
                >{{ purity }}</el-checkbox-button
              >
            </el-checkbox-group>
          </div>
            <div class="type-select-div" >
            <el-checkbox-group v-model="categoryCheck">
              <el-checkbox-button
                v-for="category in categories"
                :label="category"
                :key="category"
                >{{ category }}</el-checkbox-button
              >
            </el-checkbox-group>
          </div>

          <el-button class="type-btn" type="primary" @click="typeChange"  icon="el-icon-refresh" circle></el-button>
        </el-col>
        
      </el-row>
    </el-header>

    <el-main height="">
      <el-row class="main-row" :gutter="20">
        <el-col
          class="main-col"
          :xl="4"
          :lg="6"
          :md="8"
          :sm="12"
          :xs="12"
          :offset="0"
          v-for="(wallpaper, index) in wallpapers"
          :key="index"
        >
          <div class="block block-div">
            <el-image
              class="wallpaper-img"
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
            <div class="msg-div">
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
    <el-footer height="">
        <p>Design by Vue + Spring Boot + Element-ui</p>
        <p>Copyright &copy; 2021 YSC</p>
        <!-- Footer content -->
    </el-footer>
    
  </el-container>
</template>

<script>
import {
  getWallpaperByType,
  getWallpaperByTags,
} from "@/http/api";

export default {
  data() {
    return {
      wallpapers: [],
      imgurl: "https://th.wallhaven.cc/small/",
      totalElements: 0,
      size: 24,
      currentPage: 1,
      puritys: ["SFW", "Sketchy", "NSFW"],
      purity: ["SFW"],
      categoryCheck: ["动漫"],
      categories: ["普通", "动漫", "人物"],
      category: ["Anime"],
      categoryDict: { 普通: "General", 动漫: "Anime", 人物: "People" },
      tags: "",
      pageType: 0,
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
          this.purity.join(','),
          this.category.join(','),
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
          this.purity.join(','),
          this.category.join(','),
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
  margin-top: 120px;
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
  width: 300px;
  height: 200px;
  object-fit: cover;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  cursor: pointer;
}
.block-div {
  position: relative;
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
  height: 130px;
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
.el-divider{
    margin: 8px 0;
}
.type-select-div{
    float: left;
    margin-right: 20px;
}
.type-btn{
    float: left;
}
.el-footer{
    background-color: #f7fbfd;
    width: 100%;
    padding: 40px 100px;
}
</style>