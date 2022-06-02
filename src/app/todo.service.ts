import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './todo';

const base_url = 'https://jsonplaceholder.typicode.com/todos'

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private _http: HttpClient) { }

  getChunkTodo(from: number, to: number): Observable<Todo[]> {
    return this._http.get<Todo[]>(`${base_url}?_start=${from}&_limit=${to}`);
  }
}
