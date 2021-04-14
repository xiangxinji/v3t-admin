export type UserFormData = {
  username : string
  password : string
}

export type UserInfoData ={
  username: string,
  password: string,
  nickName: string,
  createTime: string,
  roles: Array<string>,
  perms: Array<string>
}
