import { Injectable, OnInit } from '@angular/core';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private _userSevice: TodoService) { }

  getTodos(): Todo[] {
    return JSON.parse(localStorage.getItem('todos') || '[]')
  }

  setTodo(array: Todo[]): void {
    console.log(array)
    localStorage.setItem('todos', JSON.stringify(array))
  }

  getInitialData() {
    this._userSevice.getChunkTodo(0, 20)
       .subscribe(data => {
          this.setTodo(data)
        })
    return this.getTodos()
  }
}
