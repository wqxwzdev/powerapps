<template>
  <div class="py-8px px-12px" style="height: calc(100vh - 80px); overflow-y: auto">
    <n-card :header-style="{ padding: '8px 24px' }">
      <template #header>
        <div class="desc-title">車両明細</div>
      </template>
      <n-divider style="margin-top: 0" />
      <n-descriptions
        label-placement="left"
        bordered
        size="small"
        label-style="width: 100px"
        content-style="width: 200px"
      >
        <n-descriptions-item label="車区分">{{ carDetail.item1 }}</n-descriptions-item>
        <n-descriptions-item label="用途">{{ carDetail.item2 }}</n-descriptions-item>
        <n-descriptions-item label="表示区分">{{ carDetail.item14 }}</n-descriptions-item>
        <n-descriptions-item label="車名">{{ carDetail.item4 }}</n-descriptions-item>
        <n-descriptions-item label="グレード">{{ carDetail.item8 }}</n-descriptions-item>
        <n-descriptions-item label="型式">{{ carDetail.item10 }}</n-descriptions-item>
        <n-descriptions-item label="外板色">{{ carDetail.item9 }}</n-descriptions-item>
        <n-descriptions-item label="内装色"></n-descriptions-item>
        <n-descriptions-item label="驅動"></n-descriptions-item>
        <n-descriptions-item label="登録番号">{{ carDetail.item5 }}</n-descriptions-item>
        <n-descriptions-item label="フレームNO">{{ carDetail.item11 }}</n-descriptions-item>
        <n-descriptions-item label="排气量">{{ carDetail.item7 }}</n-descriptions-item>
        <n-descriptions-item label="登録日"></n-descriptions-item>
        <n-descriptions-item label="車検満了日">{{ carDetail.item12 }}</n-descriptions-item>
        <n-descriptions-item label="最新点検入庫日"></n-descriptions-item>
        <n-descriptions-item label="減車予定日">{{ carDetail.item15 }}</n-descriptions-item>
        <n-descriptions-item label="減車日"></n-descriptions-item>
        <n-descriptions-item label=""></n-descriptions-item>
        <n-descriptions-item label="メモ" span="3"></n-descriptions-item>
      </n-descriptions>
    </n-card>
    <div class="m-2"></div>
    <n-card :header-style="{ padding: '8px 24px' }">
      <template #header>
        <div class="desc-title">オプション</div>
      </template>
      <n-divider style="margin-top: 0" />
      <n-data-table
        :columns="columns"
        :data="tableData"
        ref="tableRef"
        max-height="200px"
        :single-line="false"
      />
    </n-card>
    <div class="m-2"></div>
    <n-card :header-style="{ padding: '8px 24px' }">
      <template #header>
        <div class="desc-title">管理情報</div>
      </template>
      <n-divider style="margin-top: 0" />
      <n-descriptions
        label-placement="left"
        bordered
        size="small"
        label-style="width: 100px"
        content-style="width: 200px"
      >
        <n-descriptions-item label="車両ステータス"
          ><n-radio-group name="radiogroup" v-model:value="radioVal" readonly>
            <n-space>
              <n-radio v-for="opt in option1" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </n-radio>
            </n-space>
          </n-radio-group></n-descriptions-item
        >
        <n-descriptions-item label="删除日"></n-descriptions-item>
        <n-descriptions-item label="ガソリン残量">50%</n-descriptions-item>
        <n-descriptions-item label="配置店鋪" span="2">
          <n-space
            ><n-select v-model:value="selVal1" :options="option2" class="w-120px" />
            <n-select v-model:value="selVal2" :options="option3" class="w-180px"
          /></n-space>
        </n-descriptions-item>
        <n-descriptions-item label="管理担当">渡路 清志</n-descriptions-item>
        <n-descriptions-item label="配置店鋪住所" span="2">江东区龟户7-36-13</n-descriptions-item>
        <n-descriptions-item label="電話番号">03-3685-1181</n-descriptions-item>
        <n-descriptions-item label="点検"
          ><span class="color-red">車検実施時期です。</span></n-descriptions-item
        >
      </n-descriptions>
    </n-card>
    <div class="m-2"></div>
    <n-card :header-style="{ padding: '8px 24px' }">
      <template #header>
        <div class="desc-title">車両履歷</div>
      </template>
      <n-divider style="margin-top: 0" />
      <n-data-table
        :columns="columns2"
        :data="tableData2"
        ref="tableRef2"
        max-height="200px"
        :single-line="false"
      />
    </n-card>
    <div class="flex justify-center mt-4">
      <n-space>
        <n-button type="primary">予約</n-button>
        <!-- <n-button>更新</n-button> -->
        <n-button @click="back">キャンセル</n-button>
      </n-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { type DataTableColumns } from 'naive-ui'
import { ref, onMounted } from 'vue'

const option1 = [
  { label: '現有車', value: 1 },
  { label: '減車済', value: 2 }
]
const option2 = [{ label: '卜09工統', value: 1 }]
const option3 = [{ label: '21B:亀戸店', value: 1 }]

const radioVal = ref(1)
const selVal1 = ref(1)
const selVal2 = ref(1)

const carDetail = ref<Record<string, any>>({
  item1: null,
  item2: null,
  item3: null,
  item4: null,
  item5: null,
  item6: null,
  item7: '',
  item8: null,
  item9: null,
  item10: '',
  item11: '',
  item12: '',
  item13: null,
  item14: '',
  item15: '',
  item16: '',
  item17: null,
  item18: '',
  item19: '',
  item20: ''
})
const router = useRouter()

const columns: DataTableColumns = [
  { title: '品番', key: 'no' },
  { title: '名称', key: 'name' }
]

const columns2: DataTableColumns = [
  { title: '更新年月日', key: 'date', width: 120 },
  { title: '車区分', key: 'dist', width: 120 },
  { title: '用途', key: 'purpose', width: 120 },
  { title: '店舗コード', key: 'dlrCode', width: 120 },
  { title: '店舗', key: 'dlrName', width: 200 },
  { title: 'メモ', key: 'memo' }
]

const tableData = [
  { no: '34K', name: 'インテリジェントクリアランスソナー→シヤクロストラフィックオートブレーキ' },
  { no: '38C', name: 'パノラミックピューモニター' },
  {
    no: '47B',
    name: 'カイテキオンネツシート(ウンテンセキ·ジョシュセキンディンドウランバーサポート(ウンテンセキ)ナノイー'
  },
  { no: '55B', name: 'カンレイチショウ' }
]

const tableData2 = [
  {
    date: '2020/04/01',
    dist: '試乗車(わ)',
    purpose: '試乗車',
    dlrCode: '21B',
    dlrName: '亀戸店',
    memo: ''
  },
  {
    date: '2018/03/30',
    dist: '試乗車(わ)',
    purpose: '店長車',
    dlrCode: '21B',
    dlrName: '亀戸店',
    memo: ''
  },
  {
    date: '2018/03/16',
    dist: '試乗車(わ)',
    purpose: '未設定',
    dlrCode: '21B',
    dlrName: '亀戸店',
    memo: ''
  }
]

function back() {
  router.back()
}

onMounted(() => {
  for (const key in carDetail.value) {
    if (Object.prototype.hasOwnProperty.call(carDetail.value, key)) {
      carDetail.value[key] = history.state[key] ?? null
    }
  }
})
</script>

<style lang="scss" scoped>
.desc-title {
  position: relative;
  font-size: 14px;
  font-weight: bold;
  padding-left: 6px;
  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 5px;
    width: 3px;
    height: 12px;
    background: #415fac;
    border-radius: 2px;
  }
}
</style>
