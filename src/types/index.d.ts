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
  componentName : string
}

declare type PageResult <T> = {
  totalElements : number
  size : number
  current : number
  content : Array<T>
}

declare type Pagination = {
  current : number
  size : number
}

declare module 'deepclone' {
  export default function (data : Array | Object):Array | Object;
}
