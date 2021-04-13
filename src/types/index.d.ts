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
  tags ?: any
}

declare type Tagger = {
  name : string
  path : string
  cache : boolean
  close : boolean
}
