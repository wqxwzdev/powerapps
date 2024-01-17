import http from '@/utils/http'

export function getCarList(data) {
  return http.request({
    url: '/demo/list',
    data
  })
}
