<template>
    <div>
      <!-- <Tags/> -->
      <!-- <h1>我是主页</h1> -->
      <el-container>
        <el-aside width="auto"> <Aside /> </el-aside>
        <el-container>
          <el-header> <Header /> </el-header>
          
          <el-main>
            <Tags/>
            <router-view></router-view>
            </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script>
import Tags from '../components/Tags.vue'
import Aside from "../components/Aside.vue";
import Header from "../components/Header.vue";
export default {
  name: "Main",
  components:{Tags, Aside, Header}
};
</script>

<style>
</style>