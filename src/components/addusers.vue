<template>
  <div>
    添加
  </div>
</template>

<script>
export default {
  created(){
    this.shouquan();
  },
  methods:{
    //授权
    shouquan(){
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    }
  }
}
</script>

<style>

</style>
