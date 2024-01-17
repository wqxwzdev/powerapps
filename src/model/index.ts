export interface ApiResType<D> {
  body?: D
  extension?: any
  data?: any
  message: string
  header: ApiResHeaderType
}

interface ApiResHeaderType {
  code: number
  message: string
  name: string
  traceId: string
}
