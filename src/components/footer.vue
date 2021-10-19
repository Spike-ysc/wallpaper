<template>
    <div class="foot-div" style="background:#F3E7DD">
        <h1>footer</h1>
    </div>
</template>
<script>

  export default {
    name: 'AppFooter',
    data(){
      return {
        index: 0
      }
    }
  }
</script>
<style lang="scss" scoped>
.foot-div{
  background-color: #f4f4f4;
  padding-top: 40px;
  padding-bottom: 40px;
  height: 89px;
  color: #888;
  border-top: 1px solid #e5e5e5;
  display: block;
}
</style>
