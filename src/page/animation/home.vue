<template>
  <el-container :direction="vertical">
      <el-header height="">
          <el-row :gutter="20">
              <el-col :span="4" :offset="0" >LOGO 
                  <el-button type="primary" size="default" @click="test"></el-button>
                  
              </el-col>
              <el-col :span="12" :offset="0">2</el-col>
          </el-row>
          <el-carousel height="150px" type="default" direction="horizontal"
                   :initial-index="0" :autoplay="true" :interval="5000" :loop="true"
                   trigger="hover" indicator-position="outside" arrow="hover">
                   <el-carousel-item v-for="item in posters" :key="item.key" >

                       <el-image :src="imgSrc" fit="cover" ></el-image>
                   </el-carousel-item>
               </el-carousel>
          <!-- Header content -->
      </el-header>
      <el-container :direction="horizontal">
           <el-main height="">
               
                        <router-view></router-view>
               <el-breadcrumb separator-class="el-icon-arrow-right">
                   <el-breadcrumb-item :to="{ path: '', name: '' }">1</el-breadcrumb-item>
                   <el-breadcrumb-item :to="{ path: '', name: '' }">2</el-breadcrumb-item>
               </el-breadcrumb>
               
                  <!-- Main content -->
              </el-main>
              <el-footer height="">
                  <!-- Footer content -->
              </el-footer>
      </el-container>
  </el-container>
  
</template>

<script>
export default {
 data() {
    return {
        posters:[
            1, 2, 3, 4
        ],
    imgSrc:'https://th.wallhaven.cc/small/rd/rd6d2m.jpg'
    };
},
methods:{

test(){
    console.log("test")
 this.$router.push('/wallpaper');
                        // this.breadcrumbItems  = ['导航一']
},
            handleSelect(key, keyPath){
                switch(key){
                    case '1':
                        this.$router.push('/Page1');
                        this.breadcrumbItems  = ['导航一']
                        break;
                    case '2':
                        this.$router.push('/Page2')
                        this.breadcrumbItems  = ['导航二']
                        break;
                    case '3':
                        this.$router.push('/Page3')
                        this.breadcrumbItems  = ['导航三']
                        break;
                }
            },

        },
}
</script>

<style>
    .el-header{
        /* background-image: url(../../assets/r2y937.jpg); */
        background-color: #007CEF;
        color: white;
    }
</style>