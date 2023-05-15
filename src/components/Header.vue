<template>
  <div class="headerTop">
    <div class="left">
      <el-button
        @click="clickMenu"
        size="small"
        icon="el-icon-menu"
      ></el-button>
      <!-- 面包屑 -->
      <!-- :to="{ path: item.path }" -->
      <!-- 可优化 -->
      <el-breadcrumb separator="/">
          <el-breadcrumb-item 
          v-for="item in routeList" 
          :key="item.name" 
          :to="{ path: item.path }"
          >{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <img class="userImg" src="../assets/images/头像min.jpg" alt="" />
        </span> 
        <el-dropdown-menu  slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command='logout'>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <h2 style="text-align:center; color: #409eff">你尊的要退出吗？</h2>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">不 了</el-button>
        <el-button type="primary" @click="makesureOut">是 的</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import {mapState} from 'vuex' 
export default {
  name: "Header",
  data(){
    return {
      dialogVisible:false,
      isOut: false
    }
  },

  methods: {
    clickMenu() {
      this.$store.commit("ClickCollapse");
    },
    handleCommand(command){
      if (command == 'logout'){
        this.dialogVisible = true
        // 编写程序用，编完删
        this.makesureOut()
        // 编写程序用，编完删
        }
    },
    makesureOut(){
      this.dialogVisible = false
      Cookie.remove('token')
      Cookie.remove('menuData')
      // 删除之前添加的动态路由，也就是说更新到初始状态
      this.$router.push({path:'/login'})
      location.reload(true)
    }

  },
  computed: {
    ...mapState({routeList: state => state.Tab.routeList})
  }
};
</script>

<style lang='less' scoped>
.headerTop {
  display: flex;
  padding: 0 20px;
  
  align-items: center;
  justify-content: space-between;
  height: 60px;
  background-color: #38393c;

  .el-button {
    margin-right: 20px;
  }
  .left {
    display: flex;
    align-items: center;
    /deep/.el-breadcrumb__item {
          // 样式穿刺
      .el-breadcrumb__inner {
          &.is-link {
            color: #666;
            font-weight: normal;
          }
        }
      &:last-child {
        .el-breadcrumb__inner{
          &.is-link{
            color: #fff;
          }
        }
        }
    }

    }

  .right {
    .userImg {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>