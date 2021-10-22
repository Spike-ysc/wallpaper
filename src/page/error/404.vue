<template>
<el-container :direction="vertical">
  <el-header height="">
     <el-link class="home-link" :underline="false" @click="homePage">
            Wallpaper
          </el-link>
  </el-header>
  <el-container :direction="horizontal">
    
  <div class="main">
      <!-- <div class="progressive">
       <img class="preview" v-progressive="src" :src="preview" />
      </div> -->
      <img width="40%" src="../../assets/404.svg"/><br>
      <el-button type="primary" size="default" @click="homePage">返回首页</el-button>
      
  </div>
  </el-container>
</el-container>

</template>

<script>
export default {
  data() {
    return {
        src: 'https://w.wallhaven.cc/full/9m/wallhaven-9mmqm1.png',
        preview: 'https://th.wallhaven.cc/small/9m/9mmqm1.jpg',
        imgs: [
      	  {
	        src: 'https://w.wallhaven.cc/full/8o/wallhaven-8oozo1.jpg',
	        preview: 'https://th.wallhaven.cc/small/8o/8oozo1.jpg'
	      },
	      {
	        src: 'https://w.wallhaven.cc/full/9m/wallhaven-9mmqm1.png',
	        preview: 'https://th.wallhaven.cc/small/9m/9mmqm1.jpg'
	      }
    	]
    };
  },
  methods: {
homePage(){
  
      this.$router.push(`/`) ;
}
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
.main {
//   background: #FFFFFF;
// //   height: 100%;
//   position: absolute;
//   top: 0px;
//   left: 0px;
//   width: 100%;
//   overflow: hidden;
margin: 0 Auto;
}
.el-header{
  padding: 16px;
}
.home-link {
  float: left;
  font-size: 20px;
  user-select: none;
}

</style>