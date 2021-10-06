<template>
  <!-- Home页面是把公共部分提出来的模板页面,包括了头部,侧边栏和页面主体部分(Index.vue) -->
  <el-container>
    <!-- 侧边栏 -->
    <el-aside width="200px">
      <SideMenu></SideMenu>
    </el-aside>
    <!-- 页面头部信息栏 -->
    <el-container>
      <el-header>
        <strong>NewAim 后台管理系统</strong>
        <div class="header-avatar">
          <el-avatar size="medium" :src="userInfo.avatar"></el-avatar>
          <el-dropdown>
						<span class="el-dropdown-link">
						{{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link :to="{name: 'UserCenter'}">个人中心</router-link>
              </el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-link href="https://newaim.com" target="_blank">官网</el-link>
          <el-link href="#" target="_blank">eBay</el-link>
        </div>
      </el-header>

      <!-- 页面主体部分(Index.vue) -->
      <el-main>
        <Tabs></Tabs>
        <div style="margin: 0 15px;">
          <router-view/>
        </div>
      </el-main>

    </el-container>
  </el-container>
</template>

<script>
  import SideMenu from "./inc/SideMenu";
  import Tabs from "./inc/Tabs";
  export default {
    name: "Home",
    components: {
      SideMenu, Tabs
    },
    data() {
      return {
        userInfo: {
          id: "",
          username: "",
          avatar: ""
        }
      }
    },
    created() { //init
      this.getUserInfo()
    },
    methods: {
      getUserInfo() {
        this.$axios.get("/sys/userInfo").then(res => {
          this.userInfo = res.data.data
        })
      },
      logout() {
        this.$axios.post("/logout").then(res => {
          console.log('logout:'+res)
          localStorage.clear()
          sessionStorage.clear()
          this.$store.commit("resetState")
          this.$router.push("/login")
        })
      }
    }
  }
</script>

<style scoped>
.el-container {
  padding: 0;
  margin: 0;
  height: 100%;
}

.header-avatar {
  float: right;
  width: 210px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.el-dropdown-link {
  cursor: pointer;
}

.el-header {
  background-color: #17B3A3;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  line-height: 200px;
  height: 90vh;
}

.el-main {
  color: #333;
  padding: 0;
}

a {
  text-decoration: none;
}
</style>