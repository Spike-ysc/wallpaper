<template>
    <el-container>
      <el-main height="">
        <el-row class="main-row" :gutter="20" >
        <el-col class="main-col" :span="4" :offset="0"  v-for="(movie) in movies" :key="movie">
            <el-image :src="src"  :fit="none" lazy>
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          <div>
            {{movie.name}}
          </div>
        </el-col>
        <el-col :span="12" :offset="0">1</el-col>
      </el-row>
      </el-main>
      
      
    </el-container>
</template>

<script>
import {getBook, getMovie} from "@/http/api"
import config from '@/http/config'
export default {
data() {
    return {
     movies:[],
     src: 'http://img3.cache.netease.com/photo/0003/2012-06-23/84MTU7FH51HH0003.jpg'
    };
  },
  mounted() {
    getMovie(11, 20).then(res => {
      this.movies = res._embedded.doubans
      console.log(res)
    })
  },
}
</script>

<style scoped lang="scss">
.body {
  padding: 0px;
  margin: 0px;
}
el-main{
  min-height: 400px;
}
.main-row{
   margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
}
.main-col{
   margin-bottom: 20px;
   height: 300px;
   
  
}
.main-col el-image{
  width: 100px;
  height: 100%;
  object-fit:cover;
   box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
</style>