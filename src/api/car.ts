import http from '@/utils/http'

export function getCarList(data: any) {
  return http.request({
    url: '/demo/list',
    data
  })
}
