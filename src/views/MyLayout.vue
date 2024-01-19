<template>
  <div class="layout">
    <my-header></my-header>
    <div class="content">
      <router-view v-slot="{ Component }">
        <keep-alive include="CarList">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;

  .content {
    flex: 1;
  }
}
</style>
