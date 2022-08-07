import { observer } from 'mobx-react-lite'
import React from 'react'
import FilterPanel from '../components/FilterPanel/FilterPanel'
import TodoList from '../components/TodoList/TodoList'
import '../styles/global.scss'
import Button from '../ui/button/Button'
import todo from '../store/todo'
import MyToastContainer from '../ui/toast/MyToastContainer'

const IndexPage = observer(() => {
  return (
    <div className='indexPage'>
      <FilterPanel />
      <Button text='Добавить задачу' color='#000099' handleClick={() => todo.addTodo()}/>
      <TodoList />
      <MyToastContainer />
    </div>
  )
})

export default IndexPage