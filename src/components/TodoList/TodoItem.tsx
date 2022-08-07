import { FC, useEffect, useState } from 'react'
import { ITodo } from '../../types/todo.type'
import Button from '../../ui/button/Button'
import styles from './TodoList.module.scss'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import todoStore from '../../store/todo'
import { MyToast } from '../../ui/toast/MyToast'
import 'react-toastify/dist/ReactToastify.css'

interface TodoItemProps {
  todo: ITodo
}

const TodoItem:FC<TodoItemProps> = observer(({todo}) => {
  const [value, setValue] = useState(todo.description)
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted)
  const [isOpenEdit, setIsOpenEdit] = useState(todo.id === todoStore.openEditTodo?.id)

  useEffect(() => {
    if(todo.id === todoStore.closedEditTodo?.id) {
      setValue(todo.description)
      setIsCompleted(todo.isCompleted)
      setIsOpenEdit(false)
    }
  }, [todoStore.closedEditTodo])

  const changeEditTodo = () => {
    if(todo.id !== todoStore.openEditTodo?.id) {
      todoStore.changeEditTodo(todo)
      setIsOpenEdit(todo.id === todoStore.openEditTodo?.id)
    }
  }

  const saveChanges = () => {
    todo.isCompleted = isCompleted
    todo.description = value
    todoStore.changeEditTodo(null)
    setIsOpenEdit(false)
    MyToast('Сохранение прошло успешно', true)
  }

  return (
    <div className={cn(styles.todoItem, {
      [styles.todoCompleted]: todoStore.openEditTodo?.id === todo.id ? isCompleted === true  : todo.isCompleted === true,
      [styles.todoUnfulfilled]: todoStore.openEditTodo?.id === todo.id ? isCompleted === false : todo.isCompleted === false,
      [styles.todoEdit]: isOpenEdit
    })}
    onClick={changeEditTodo}
    >
      { isOpenEdit ? 
        <>
          <textarea 
            className={cn(styles.todoDescription, styles.todoDescriptionEdit)} 
            value={value} 
            onChange={(e) => setValue(e.target.value)}
            readOnly={false}
          />
          <div className={styles.btnContainer}>
            {!isCompleted && <Button text='Выполнить' color='#339900' handleClick={() => setIsCompleted(true)}/>}
            <Button text='Сохранить' handleClick={saveChanges}/>
            <Button text='Удалить' color='#CC0000' handleClick={() => todoStore.deleteTodo(todo.id)}/>
          </div>
        </>
      :
        <>
          <textarea className={styles.todoDescription} value={value} readOnly={true}/>
        </>
      }
    </div>
  )
})

export default TodoItem