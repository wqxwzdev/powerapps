<script setup lang="ts">
import { lightTheme, type GlobalThemeOverrides, dateJaJP, jaJP } from 'naive-ui'
const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#3880ff',
    primaryColorSuppl: '#3880ff',
    primaryColorHover: '#4c8dff',
    primaryColorPressed: '#4c8dff'
  },
  Layout: {
    colorEmbedded: '#f5f7f9'
  }
}
</script>

<template>
  <n-config-provider
    :date-locale="dateJaJP"
    :locale="jaJP"
    :theme="lightTheme"
    :theme-overrides="themeOverrides"
  >
    <router-view />
  </n-config-provider>
</template>

<style lang="scss" scoped></style>
