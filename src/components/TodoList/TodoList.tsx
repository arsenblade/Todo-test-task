import TodoItem from './TodoItem'
import styles from './TodoList.module.scss'

import todoStore from '../../store/todo'
import filter from '../../store/filter'
import { observer } from 'mobx-react-lite'

const TodoList = observer(() => {

  return (
    <div className={styles.todoList}>
      {filter.currentFilterType === 'Все' && todoStore.todos.map((todo) => <TodoItem key={todo.id} todo={todo}/>)}
      {filter.currentFilterType === 'Выполненные' && todoStore.filteredTodoCompleted().map((todo) => <TodoItem key={todo.id} todo={todo}/>)}
      {filter.currentFilterType === 'Невыполненные' && todoStore.filteredTodoUnfulfilled().map((todo) => <TodoItem key={todo.id} todo={todo}/>)}
    </div>
  )
})

export default TodoList