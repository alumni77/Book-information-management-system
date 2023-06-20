<template>
  <div>
    <h1 class="logo">
      <img src="./images/library.jpeg" alt="" width="342" height="120">
    </h1>
    <router-view></router-view>
    <div>
      <el-row class="tac">
        <el-col :span="3" class="fixed-menu">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @select="handleSelect"
            @open="handleOpen"
            @close="handleClose">
            <el-menu-item index="1">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-search"></i>
              <span slot="title">查询图书</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-s-promotion"></i>
              <span slot="title">预约记录</span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-chat-dot-square"></i>
              <span slot="title">交流社区</span>
            </el-menu-item>
            <el-menu-item index="7">
              <i class="el-icon-switch-button"></i>
              <span slot="title">退出账号</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="3">
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      size: ''
    };
  },
  methods: {
    handleClose() {

    },
    handleOpen() {

    },
    handleSelect(index) {
      if (index === '1') {
        this.$router.push('/home/introduce', () => {
        }, () => {
        });
        console.log('wo shi 1');
      } else if (index === '2') {
        this.$router.push('/home/search', () => {
        }, () => {
        });
        console.log('wo shi 2');
      } else if (index === '3') {
        this.$router.push('/home/reserve', () => {
        }, () => {
        });
        console.log('wo shi 3');
      } else if (index === '5') {
        this.$router.push('/home/remark', () => {
        }, () => {
        });
        console.log('wo shi 5');
      } else if (index === '7') {
        this.$router.push('/Login');
      }
    }
  }
}
</script>

<style>
.el-menu-vertical-demo {
  text-align: left;
}

.logo {
  margin-top: 0;
}

.fixed-menu {
  position: fixed;
  top: 175px;
  bottom: 0;
  left: 0;
  z-index: 999;
}

</style>
