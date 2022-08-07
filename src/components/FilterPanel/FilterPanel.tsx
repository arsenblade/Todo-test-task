import { FC, useState } from 'react'
import styles from './FilterPanel.module.scss'
import cn from 'classnames'
import filter from '../../store/filter'
import { observer } from 'mobx-react-lite'

const filterTypesText = [
  'Все', 'Выполненные', 'Невыполненные'
]


const FilterPanel:FC = observer( () => {
  const [value, setValue] = useState<string>('Все')

  const changeFilterType = (filterTypeText: string) => {
    setValue(filterTypeText)
    filter.changeFilterType(filterTypeText) 
  }

  return (
    <div className={styles.filterPanel}>
      {filterTypesText.map(filterTypeText =>       <button className={cn({
        [styles.activeButton]: value === filterTypeText 
      })}
      onClick={() => changeFilterType(filterTypeText)}
      key={filterTypeText}
      >{filterTypeText}</button>)}
    </div>
  )
})

export default FilterPanel