

export interface GetUserResponse {
  id:number
  username:string
  password:string
  email:string
  roles:{id:number, name:"USER"|"ADMIN"}[]
}