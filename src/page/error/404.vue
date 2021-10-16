<template>
  <div class="main">
      <div class="progressive">
       <img class="preview" v-progressive="src" :src="preview" />
      </div>
      <!-- <div class="progressive" v-for="(item,index) in imgs" :key="index">
      <img class="preview" v-progressive="item.src" :src="item.preview" />
    </div> -->
  </div>
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
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
.main {
  background: #1f2023;
//   height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  overflow: hidden;
}

</style>