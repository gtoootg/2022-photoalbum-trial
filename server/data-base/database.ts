import mysql from "mysql";


export class DataBase {
  private  createConnection:  mysql.Connection| null  = null

  constructor() {
    this.createConnectionWithCredential()
  }

  private createConnectionWithCredential(){
    this.createConnection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
    })
  }

  public getDataBaseConnection =()=>{
    return this.createConnection
  }
}