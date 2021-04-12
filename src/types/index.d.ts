declare module '*.scss' {

}

declare type ResponseContent <T> = {
  message: string,
  timestamp: number,
  result: T,
  code: number,
  _status: number,
  _headers: object,
}

declare type RootState = {
  user ?: any;
  common ?: any
}
