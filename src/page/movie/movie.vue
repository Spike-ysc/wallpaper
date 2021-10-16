<template>
  <div class="total-div">
    <div class="main-div">
      <el-col :span="8" class="main-left-div">
        <el-image :src="imgtest" fit="cover" class="poster-img" :lazy="true"></el-image>
        <div class="read-div">
          <el-button type="primary" @click="read()">开始阅读</el-button>
       
        </div>
      </el-col>
      <el-col :span="16" class="message-div">
        <div class="author-div"> <el-link class="author-a" :underline="false">{{book.author}}</el-link></div>
        <div class="name-div">{{book.name}}</div>
        <el-col :span="24" class="city-score-div">
          <div style="float: left;">
            <span style="padding-right: 20px;">国家：</span>
            <span>{{book.nationality}}</span>
          </div>
          <div style="float: right;">
            <span style="padding-right: 20px;">类型：</span>
            <span>{{book.type}}</span>
          </div>
        </el-col>
        <div class="book-msg-div">
          <span>{{book.introduction}}</span>
        </div>
      </el-col>

      <el-col :span="24" class="list-div"></el-col>
      <el-col :span="24" class="introduce-div container col-sm-12">
        <div class="row">
          <el-col :span="8" v-for="(o) in 3" :key="o">
            <div class="intro-list-div">
              <img src="" class="img-responsive" alt="Image" />
            </div>
            <div class="intro-list-msg-div">
              <p>Comics size</p>
              <p>120.4MB</p>
            </div>
          </el-col>
        </div>
        <p class="intro-msg-p">
          The crime boss Big Man has gathered a group called the Enforcers in order to strong arm all the
          other angs in New York to work for him. When the ohter mobsters refuse, they are beath into submissin by
          Ox, Montana and Fancy Dan, Meanwhile, Peter visits his Aunt May in the hospital and is told that she needs a blood transfusion
        </p>
        <p class="intro-more-p">READ MORE</p>
      </el-col>
      <div class="divider"></div>
    </div>
  </div>
</template>
<script>
// import {getBookMsg} from '@/http/api'
import config from '@/http/config'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'
export default {
  data() {
    return {
      book: {
          "name":"name",
          "author":"author",
          "nationality":"nationality",
          "type":"type",
          "introduction":"introduction",
      },
      imgBaseUrl: config.imgBaseUrl,
      imgtest: 'https://w.wallhaven.cc/full/kw/wallhaven-kwm2r6.jpg',
    };
  },
  mounted() {
    //   getBookMsg(this.$route.query.name).then(res => {
    //     console.log(res);
    //     this.book = res._embedded.books[0];
    //   })
  },
  components: {
    // "head-top": headerTop,
    // "foot-bottom": footerBottom
  },
  computed: {
    
  },
  methods: {
    read() {
      this.$router.push("/read");
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      window.pageYOffset = 0;
    }
    // async download(num){
    //   alert('the num is '+ num);
    // },
    // async read(num){
    //   this.$router.push('/book/'+num);
    // }
  }
};
</script>
<style scoped>
.total-div {
  padding: 0px;
  margin: 0px;
  background: #eeeeee;
}
.main-left-div {
  padding-left: 0px;
  padding-right: 0px;
}
.main-div {
  height: 2000px;
  background: white;
  padding: 0px;
  margin-top: 240px;
  box-shadow: 0 0 10px #88888844;
  position: relative;
  margin-bottom: 100px;
  width: 970px;
  margin-right: auto;
  margin-left: auto;
}
.poster-img {
  position: absolute;
  top: -200px;
  left: 50px;
  height: 350px;
  width: 230px;
  box-shadow: 0 0 10px #88888844;
  border-radius: 5px;
}
.read-div {
  margin-left: 50px;
  padding-top: 170px;
  float: left;
}
.read-div button {
  float: left;
  background: #1c88e3;
  color: white;
  width: 230px;
  height: 50px;
  letter-spacing: 3px;
  margin-right: 10px;
}

.read-div img {
  float: left;
  max-width: 20px;
  padding: 14px;
}

.message-div {
  float: left;
  position: relative;
  min-height: 1px;
  padding-right: 30px;
  margin-top: 30px;
  padding-left: 30px;
  line-height: 26px;
  letter-spacing: 0;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.87);
  overflow: auto;
  font-size: 14px;
  font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
  font-style: initial;
  text-align: left;
  text-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  text-transform: none;
}
.message-div > div {
  margin-bottom: 30px;
}
.author-a {
  font-size: 20px;
  font-weight: 300;
  color: #7b7b7b;
}
.name-div {
  font-size: 50px;
  font-weight: 100;
  color: black;
}
.city-score-div {
  padding-left: 0px;
  color: #a5a5a5;
}
.book-msg-div {
  font-size: 16px;
  color: #5a5a5a;
}
.list-div {
  height: 400px;
  background: white;
  width: 100%;
  box-shadow: inset 0px 10px 10px -10px #88888844,
    inset 0px -10px 10px -10px #88888844;
}

.introduce-div {
  padding: 60px;
}
.intro-list-div {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #d2dae0;
  float: left;
}
.intro-list-div img {
  max-width: 20px;
  max-height: 20px;
  padding: 14px;
}
.intro-list-msg-div {
  float: left;
  line-height: 18px;
  letter-spacing: 0;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.87);
  overflow: auto;
  font-size: 14px;
  font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
  font-style: initial;
  text-align: left;
  text-shadow: none;
  padding-left: 10px;
}
.intro-list-msg-div p:first-child {
  font-size: 18px;
}
.intro-list-msg-div p:last-child {
  font-size: 15px;
  color: #7d7d7d;
}
.intro-msg-p {
  position: relative;
  line-height: 20px;
  letter-spacing: 0;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.87);
  overflow: auto;
  font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
  font-style: initial;
  text-align: left;
  width: 100%;
  text-shadow: none;
  font-size: 16px;
  padding-top: 30px;
}
.intro-more-p {
  line-height: 20px;
  letter-spacing: 0;
  font-weight: 400;
  color: #4886ba;
  overflow: auto;
  font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
  font-style: initial;
  font-weight: bold;
  text-align: left;
  text-shadow: none;
  font-size: 16px;
  margin-top: 30px;
}
.divider {
  width: 100%;
  height: 1px;
  background: #ebebeb;
  float: left;
}
</style>