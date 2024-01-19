<template>
  <div>
    <div class="px-4 py-3" style="overflow-y: auto">
      <n-card
        :header-style="{ padding: '6px 24px' }"
        :content-style="{ paddingBottom: 0 }"
        size="small"
      >
        <template #header>
          <div class="flex items-center font-size-13px">
            <i class="i-mdi-magnify font-size-16px" style="color: #3880ff"></i>
            <div>クイック検索</div>
          </div>
        </template>
        <template #header-extra>
          <n-space>
            <n-button size="small" type="primary" @click="getList" :disabled="loading"
              >検索</n-button
            >
            <n-button size="small" :disabled="loading" @click="reset">クリア</n-button>
          </n-space>
        </template>
        <n-divider style="margin-top: 0" />
        <n-form
          ref="formRef"
          inline
          :label-width="80"
          :model="formModel"
          label-placement="left"
          :disabled="loading"
          size="small"
        >
          <n-grid x-gap="12" :cols="6">
            <n-gi>
              <n-form-item label="車両区分" path="item1">
                <n-select :options="options1" clearable v-model:value="formModel.item1" />
              </n-form-item>
            </n-gi>
            <n-gi>
              <n-form-item label="用途" path="item2">
                <n-select :options="options2" clearable v-model:value="formModel.item2" />
              </n-form-item>
            </n-gi>
            <n-gi>
              <n-form-item label="店舗/部署" path="item3">
                <n-select
                  :options="[{ label: '', value: '' }]"
                  clearable
                  v-model:value="formModel.item3"
                />
              </n-form-item>
            </n-gi>
            <n-gi>
              <n-form-item path="item17">
                <n-select
                  :options="[{ label: '', value: '' }]"
                  clearable
                  v-model:value="formModel.item17"
                />
              </n-form-item>
            </n-gi>
            <n-gi>
              <n-form-item label="車名" path="item4">
                <n-select :options="options4" clearable v-model:value="formModel.item4" />
              </n-form-item>
            </n-gi>
            <n-gi>
              <n-form-item label="年式" path="item6">
                <n-select
                  :options="[{ label: '', value: '' }]"
                  clearable
                  v-model:value="formModel.item6"
                />
              </n-form-item>
            </n-gi>
            <n-gi span="2">
              <n-grid x-gap="12" :cols="5">
                <n-gi span="2">
                  <n-form-item label="登録番号" path="item5">
                    <n-select
                      :options="[{ label: '', value: '' }]"
                      clearable
                      v-model:value="formModel.item5"
                    />
                  </n-form-item>
                </n-gi>
                <n-gi>
                  <n-form-item path="item18">
                    <n-input clearable v-model:value="formModel.item18" />
                  </n-form-item>
                </n-gi>
                <n-gi>
                  <n-form-item path="item19">
                    <n-input clearable v-model:value="formModel.item19" />
                  </n-form-item>
                </n-gi>
                <n-gi>
                  <n-form-item path="item20">
                    <n-input clearable v-model:value="formModel.item20" />
                  </n-form-item>
                </n-gi>
              </n-grid>
            </n-gi>
            <n-gi>
              <n-form-item label="排気量" path="item7">
                <n-input clearable v-model:value="formModel.item7" />
              </n-form-item>
            </n-gi>
            <n-gi>
              <n-form-item label="グレード" path="item8">
                <n-select
                  clearable
                  :options="[{ label: '', value: '' }]"
                  v-model:value="formModel.item8"
                />
              </n-form-item>
            </n-gi>
            <n-gi>
              <n-form-item label="外板色" path="item9">
                <n-select
                  clearable
                  :options="[{ label: '', value: '' }]"
                  v-model:value="formModel.item9"
                />
              </n-form-item>
            </n-gi>
            <n-gi>
              <n-form-item label="点検" path="item13">
                <n-select
                  clearable
                  :options="[{ label: '', value: '' }]"
                  v-model:value="formModel.item13"
                />
              </n-form-item>
            </n-gi>
          </n-grid>
        </n-form>
      </n-card>
      <n-card
        class="mt-4"
        :header-style="{ padding: '4px 24px' }"
        :content-style="{ paddingBottom: 0 }"
      >
        <template #header>
          <div class="flex items-center font-size-13px">
            <i class="i-mdi-clipboard-text-search-outline" style="color: #3880ff"></i>
            <div class="ml-2px">検索結果</div>
            <p class="font-size-8px ml-1 color-#4a4a4a">
              (※他店舗の展示車については、予約はできませんが他店舗訪問前に必ず現車の有無をご確認ください。)
            </p>
          </div>
        </template>
        <template #header-extra>
          <n-space>
            <n-button
              size="small"
              type="primary"
              text
              style="display: flex; align-items: center"
              @click="getList"
              :disabled="loading"
            >
              <template #icon>
                <i class="i-mdi-refresh"></i>
              </template>
            </n-button>
            <!-- <n-button size="small">重置</n-button> -->
          </n-space>
        </template>
        <n-divider style="margin-top: 0" />
        <!-- :style="{ height: tableMaxHeight + 'px' }"
          flex-height -->
        <n-data-table
          :columns="columns"
          :data="listData"
          :loading="loading"
          ref="tableRef"
          :row-props="rowProps"
          :single-line="false"
          size="small"
          :min-height="100"
          :max-height="tableMaxHeight"
        />
        <div class="flex justify-end my-2">
          <n-pagination
            :display-order="['quick-jumper', 'pages', 'size-picker']"
            :page="page.pageNum"
            :page-size="page.pageSize"
            :item-count="total"
            show-quick-jumper
            show-size-picker
            :page-sizes="[10, 20, 30, 40]"
            :on-update:page="didPageNumChange"
            :on-update:page-size="didPageSizeChange"
            :disabled="loading"
            size="small"
          />
        </div>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { type DataTableColumns } from 'naive-ui'
import { getCarList } from '@/api/car'
import { useRouter } from 'vue-router'

const router = useRouter()
const tableMaxHeight = computed(() => {
  return Math.max(100, window.innerHeight - 410)
})
const initModel = JSON.stringify({
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
const formModel = ref(JSON.parse(initModel))
const options1 = [
  { label: '', value: '' },
  { label: 'サービス代車', value: 'サービス代車' },
  { label: '社用車', value: '社用車' },
  { label: '試乗車', value: '試乗車' },
  { label: '試乗車(わ)', value: '試乗車(わ)' }
]
const options2 = [
  { label: '', value: '' },
  { label: 'サービス代車', value: 'サービス代車' },
  { label: 'レンタカー', value: 'レンタカー' },
  { label: '店長車', value: '店長車' },
  { label: '試乗車', value: '試乗車' }
]
const options4 = [
  { label: '', value: '' },
  { label: 'カローラダーリングHV', value: 'カローラダーリングHV' },
  { label: 'クラウンHV', value: 'クラウンHV' },
  { label: 'ハイエースバン', value: 'ハイエースバン' },
  { label: 'プリウス', value: 'プリウス' },
  { label: 'ヤリス', value: 'ヤリス' }
]
const columns: DataTableColumns = [
  {
    title: '車両区分',
    key: 'item1',
    width: 120,
    fixed: 'left',
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '用途',
    key: 'item2',
    width: 120,
    fixed: 'left',
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '店舗/部署',
    key: 'item3',
    width: 100,
    fixed: 'left',
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '車名',
    key: 'item4',
    width: 140,
    fixed: 'left',
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '登録番号',
    key: 'item5',
    width: 130,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '年式',
    key: 'item6',
    width: 100,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '排気量',
    key: 'item7',
    width: 80,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: 'グレード',
    key: 'item8',
    width: 140,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '外板色',
    key: 'item9',
    width: 140,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '型式',
    key: 'item10',
    width: 150,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: 'フレームNO',
    key: 'item11',
    width: 100,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '車検満了日',
    key: 'item12',
    width: 100,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '点検',
    key: 'item13',
    width: 60,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '表示区分',
    key: 'item14',
    width: 80,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '減車予定日',
    key: 'item15',
    width: 100,
    ellipsis: {
      tooltip: true
    }
  }
]

const formRef = ref()
const tableRef = ref()
const page = ref({
  pageNum: 1,
  pageSize: 10
})
const listData = ref([])
const total = ref(0)
const loading = ref(false)
function getList() {
  loading.value = true
  getCarList(Object.assign({}, formModel.value, page.value))
    .then((rs) => {
      if (rs.data) {
        listData.value = rs.data.list
        total.value = rs.data.total
        tableRef.value.scrollTo({ top: 0 })
      }
    })
    .finally(() => {
      loading.value = false
    })
}

function reset() {
  page.value.pageNum = 1
  formModel.value = JSON.parse(initModel)
  getList()
}

function didPageNumChange(pageNum: number) {
  page.value.pageNum = pageNum
  getList()
}

function didPageSizeChange(pageSize: number) {
  page.value.pageNum = 1
  page.value.pageSize = pageSize
  getList()
}

function rowProps(rowData: any) {
  return {
    onDblclick: () => {
      router.push({ name: 'CarDetail', state: { ...rowData } })
    }
  }
}

onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped></style>
