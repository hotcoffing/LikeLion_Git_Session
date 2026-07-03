import { useCallback } from 'react'

const CATEGORIES = ['전체', '전자기기', '도서', '문구류']

function CategoryFilter({ selected, onSelect }) {
  const memoziedOnSelect = useCallback((category) => {
    onSelect(category)
  }, [onSelect])

  return (
    <div className="category-filter">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          className={selected === category ? 'active' : ''}
          onClick={() => memoziedOnSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter