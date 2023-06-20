<template>
  <div class="auth-page">
    <el-card class="auth-card">
      <h1>图书信息管理中心</h1>
      <el-tabs v-model="activeTab" type="border-card">
        <el-tab-pane label="登录" name="login">
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="80px" class="auth-form">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login" :loading="loginLoading" class="auth-btn">登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
          <el-form ref="registerForm" :model="registerForm" :rules="registerRules" label-width="80px" class="auth-form">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="registerForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="registerForm.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input type="password" v-model="registerForm.confirmPassword"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="register" :loading="registerLoading" class="auth-btn">注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div class="auth-footer">
        <span>{{ activeTab === 'login' ? '没有账号？' : '已有账号？' }}</span>
        <el-button type="text" @click="toggleTab" class="auth-switch-btn">{{
            activeTab === 'login' ? '注册' : '登录'
          }}
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'login',
      loginForm: {username: '', password: ''},
      registerForm: {username: '', password: '', confirmPassword: ''},
      loginLoading: false,
      registerLoading: false,
      loginRules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
      },
      registerRules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        confirmPassword: [
          {required: true, message: '请再次输入密码', trigger: 'blur'},
          {validator: this.validateConfirmPassword, trigger: 'blur'},
        ],
      },
      users: [],
      currentUser: null,
    };
  },
  mounted() {
    const username = localStorage.getItem('username');
    if (username) {
      this.currentUser = username;
    }
  },
  methods: {
    async login() {
      this.loginLoading = true;
      try {
        console.log('login', this.loginForm);
        const user = this.users.find(
          (item) =>
            item.username === this.loginForm.username && item.password === this.loginForm.password
        );
        if (!user) {
          throw new Error('用户名或密码错误，请重新输入');
        }

        this.$router.push('/home/introduce');
        localStorage.setItem('username', this.loginForm.username);
        this.currentUser = this.loginForm.username;
      } catch (error) {
        console.log(error);
        this.$message.error(error.message);
      } finally {
        this.loginLoading = false;
      }
    },
    async register() {
      this.registerLoading = true;
      try {
        console.log('register', this.registerForm);

        const newUser = {
          username: this.registerForm.username,
          password: this.registerForm.password,
        };
        this.users.push(newUser);
        this.$message.success('注册成功，请登录');

        this.activeTab = 'login';
      } catch (error) {
        console.log(error);
        this.$message.error('注册失败，请检查输入信息是否正确');
      } finally {
        this.registerLoading = false;
      }
    },
    toggleTab() {
      this.activeTab = this.activeTab === 'login' ? 'register' : 'login';
    },
    validateConfirmPassword(rule, value, callback) {
      if (value !== this.registerForm.password) {
        callback(new Error('两次输入的密码不一致'));
      } else {
        callback();
      }
    },
  },
};
</script>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.auth-card {
  width: 400px;
  padding: 20px;
}

.auth-form {
  max-width: 300px;
  margin: 0 auto;
}

.auth-footer {
  text-align: center;
  margin-top: 20px;
}

.auth-btn {
  margin-left: 35px;
  display: block;
}

.auth-switch-btn {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
