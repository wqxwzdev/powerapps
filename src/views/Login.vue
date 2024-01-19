<template>
  <div class="flex h-100vh">
    <div class="login-bg flex-1"></div>
    <div class="w-500px flex flex-items-center flex-col justify-center">
      <h1>社有車管理システム</h1>
      <n-form
        ref="formRef"
        :label-width="80"
        :model="formModel"
        style="width: 250px; margin-top: 20px"
        :show-label="false"
      >
        <n-form-item path="account">
          <n-input v-model:value="formModel.account">
            <template #prefix>
              <i class="i-mdi-account color-#3880ff"></i>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item path="password">
          <n-input type="password" v-model:value="formModel.password" show-password-on="mousedown">
            <template #prefix>
              <i class="i-mdi-lock color-#3880ff"></i>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item>
          <n-button type="primary" block @click="doLogin"> 登入 </n-button>
        </n-form-item>
      </n-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from '@/utils/naiveTool'

const formModel = ref({ account: 'admin', password: '456123' })
const router = useRouter()

function doLogin() {
  if (formModel.value.account == 'admin' && formModel.value.password == '456123') {
    sessionStorage.setItem('login', '1')
    message.success('登录成功！')
    router.replace('/')
  } else {
    message.error('用户名或密码错误！')
  }
}
</script>

<style lang="scss" scoped>
.login-bg {
  background-image: url('../assets/login.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
