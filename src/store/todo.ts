import { makeAutoObservable, runInAction } from "mobx";
import { ITodo } from "../types/todo.type";
import { MyToast } from "../ui/toast/MyToast";
const uuid = require("uuid");

class Todo {
  todos: ITodo[] = [
    {
      id: '1', description: 'Сходить в магазин', isCompleted: false,
    },
    {
      id: '2', description: 'Записаться на прием к врачу', isCompleted: true,
    },
    {
      id: '3', description: 'Сходить в спортзал', isCompleted: false,
    },
    {
      id: '4', description: 'Купить подарок коту', isCompleted: false,
    },
    {
      id: '5', description: 'Сделать тз', isCompleted: false,
    }
  ]
  closedEditTodo: ITodo | null = null;
  openEditTodo: ITodo | null = null

  constructor() {
    makeAutoObservable(this)
  }

  filteredTodoCompleted() {
    return this.todos.filter(todo => todo.isCompleted)
  }

  filteredTodoUnfulfilled() {
    return this.todos.filter(todo => todo.isCompleted === false)
  }

  changeEditTodo(todo: ITodo | null) {
    this.closedEditTodo = this.openEditTodo
    return this.openEditTodo = todo
  }

  addTodo() {
    const defaultTodo: ITodo = {
      id: uuid.v4(),
      description: '',
      isCompleted: false
    }
    this.todos = [defaultTodo, ...this.todos]
    this.closedEditTodo = this.openEditTodo
    this.openEditTodo = defaultTodo
    MyToast('Добавление успешно', true)
  }

  deleteTodo(id: string) {
    this.todos = this.todos.filter(todo => todo.id !== id)
  }
}

export default new Todo();