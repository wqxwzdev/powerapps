<template>
  <div class="header-bg">
    <div class="logo border-right">社有車管理システム</div>
    <n-dropdown trigger="click" :options="options" :show-arrow="true" @select="handleSelect">
      <div class="top border-right">
        <div>Top</div>
        <i class="i-mdi-chevron-down font-size-20px"></i>
      </div>
    </n-dropdown>
    <div class="label">サイトマップ</div>
    <div class="right">
      <n-dropdown trigger="click" :options="options2" :show-arrow="true" @select="handleSelect">
        <div class="user border-right">
          <div>富水 浩通</div>
          <i class="i-mdi-chevron-down font-size-20px"></i>
        </div>
      </n-dropdown>
      <!-- <div class="help border-right"></div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
const options = [{ label: 'Top', key: 'top' }]
const options2 = [{ label: '富水 浩通', key: '富水 浩通' }]

function handleSelect(_selKey, selOpt) {
  console.log(selOpt)
}
</script>

<style lang="scss" scoped>
.header-bg {
  width: 100%;
  height: 60px;
  background-color: #da9fc0;
  display: flex;
  align-items: stretch;
  color: white;

  .logo {
    width: 200px;
    text-align: center;
    line-height: 60px;
  }

  .top {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;
  }

  .label {
    width: 120px;
    line-height: 60px;
    padding: 0 12px;
  }

  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;

    .user {
      display: flex;
      align-items: center;
      padding: 0 12px;
      cursor: pointer;
    }

    .help {
      width: 60px;
    }
  }

  .border-right {
    border-right: 1px solid white;
  }
}
</style>
