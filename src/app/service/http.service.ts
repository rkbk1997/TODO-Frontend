import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url = 'http://localhost:3001'

  constructor(private http: HttpClient) { }

  save(payload: any) {
    const url = `${this.url}/api/create`
    return this.http.post(url, payload);
  }

  getTodoList() {
    const url = `${this.url}/api/todo/list`
    return this.http.get(url);
  }

  deleteRow(id: any) {
    const url = `${this.url}/api/delete`
    return this.http.post(url, {id});
  }

  getAllListByStatus(status: any) {
    const url = `${this.url}/api/findByStatus`
    return this.http.post(url, {status});
  }
}
