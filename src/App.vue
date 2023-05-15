<template>
  <div>
    <!-- <el-container>
      <el-aside width="auto"> <Aside /> </el-aside>
      <el-container>
        <el-header> <Header /> </el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Aside from "./components/Aside.vue";
import Header from "./components/Header.vue";
export default {
  name: "App",
  components: {
    Aside,
    Header,
  },
};
</script>

<style lang='less'>
html,
body,
p {
  padding: 0;
  margin: 0;
}
.el-header {
  padding: 0 !important;
}
</style>
