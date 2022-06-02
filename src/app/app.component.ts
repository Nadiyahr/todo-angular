import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Todo } from './todo';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'To Do App';
  todos: Todo[] = [];
  done: number = 0;
  undon: number = 0;
  all: number = this.todos.length;
  id: number = 0;
  errorMessage: string = '';
  displayInput: boolean = false;
  showFiller = false;
  checked: number[] = []
  newTodo = new FormControl(
    '', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)
    ]
  );

  constructor(private _todosService: LocalStorageService) { }

  ngOnInit(): void {
    if (this._todosService.getTodos().length === 0){
      this.todos = this._todosService.getInitialData();
      this.updateCountOfTodos();
    }
    this.todos = this._todosService.getTodos();
    this.updateCountOfTodos();
  }

  updateCountOfTodos() {
    this.done = this.todos.filter(t => t.completed).length;
    this.undon = this.todos.filter(t => !t.completed).length;
    this.all = this.todos.length;
  }

  deletById(id: number) {
    const updateTodo = this.todos.filter(todo => todo.id !== id);

    this._todosService.setTodo(updateTodo);
    this.todos = this._todosService.getTodos();
    this.updateCountOfTodos();
  }

  filterByComplited(complited: boolean): void {
    this.todos = this._todosService.getTodos()
      .filter(todo => todo.completed === complited);
  }

  getAll() {
    this.todos = this._todosService.getTodos();
  }

  addNewTodo() {
    this.displayInput = true;
    this.updateCountOfTodos();
  }

  getChecked(id: number, checked: boolean) {
    if (checked) {
      this.checked.push(id)
    } else {
      this.checked = this.checked.filter(num => num !== id)
    }
  }

  onSubmit(e: Event) {
    if (this.newTodo.valid) {

      const newItem: Todo = {
        id: (+Math.max(...this.todos.map(t => t.id)) + 1),
        title: this.newTodo.value,
        completed: false,
      }

      const newTodos: Todo[] = [...this.todos, newItem];

      this._todosService.setTodo(newTodos);
      this.todos = this._todosService.getTodos();
      this.updateCountOfTodos();

    } else {
      e.preventDefault();

      if (this.newTodo.hasError('minlength')) {
        this.errorMessage = 'At least 5 digits';
      }
      if (this.newTodo.hasError('maxlength')) {
        this.errorMessage = 'Max 100 digits';
      }
      if (this.newTodo.hasError('required')) {
        this.errorMessage = 'Title of task is required';
      }
    }
  }
}
 