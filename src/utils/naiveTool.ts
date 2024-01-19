import { createDiscreteApi } from 'naive-ui'

const { message, loadingBar } = createDiscreteApi(['message', 'loadingBar'], {
  configProviderProps: {
    themeOverrides: {
      LoadingBar: {
        colorLoading: '#3880ff',
        height: '3px'
      }
    }
  }
})

export { message, loadingBar }
