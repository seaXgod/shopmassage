<template>
  <el-container>
    <el-header class="header">
      <el-row>
        <el-col :span="22">
          <div class="grid-content bg-purple-light">
            <p class="home_name">电商后台管理系统</p>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <a href="#" @click.prevent="exit()">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside">
        <el-menu unique-opened default-active="1-1">
          <!-- 1 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <i class="el-icon-s-custom"></i>
                用户列表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 2 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-cooperation"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">
                <i class="el-icon-s-tools"></i>
                角色列表
              </el-menu-item>
              <el-menu-item index="2-2">
                <i class="el-icon-s-tools"></i>
                权限列表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 3 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">
                <i class="el-icon-menu"></i>
                商品列表
              </el-menu-item>
              <el-menu-item index="3-2">
                <i class="el-icon-menu"></i>
                分类参数
              </el-menu-item>
              <el-menu-item index="3-3">
                <i class="el-icon-menu"></i>
                商品分类
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 4 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">
                <i class="el-icon-s-claim"></i>
                订单列表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 5 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1">
                <i class="el-icon-s-marketing"></i>
                数据报表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="mian">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  //验证该页面是否存在localStorage
  beforeCreate() {
    if (!localStorage.getItem("token")) {
      this.$message.success("请先登录")
      //跳转
      this.$router.push({
        name: "login"
      })
    }
  },
  methods: {
    //退出
    exit() {
      if (!confirm("是否退出")) {
        return;
      }
      //清除localStorage
      localStorage.clear()
      this.$message({
          message: '退出成功',
          type: 'success'
        });
      this.$router.push({
        name:"login"
      })
    }
  }
};
</script>

<style>
.header {
  background-color: skyblue;
}
.aside {
  background-color: #fff;
  width: 200px;
  height: 566px;
  border-right: 1px solie #ccc;
}
.main {
  background-color: yellow;
}
.home_name {
  font-size: 30px;
  font-family: "宋体";
  margin-top: 14px;
  text-align: center;
}
.grid-content a {
  display: block;
  font-size: 22px;
  font-family: "宋体";
  margin-top: 14px;
}
</style>
