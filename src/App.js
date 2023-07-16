import { useState, useEffect } from 'react'
import './App.css'
import { PostItem } from './PostItem'
import { ref, onValue, push, update, remove } from 'firebase/database'
import { db } from './firebase'

function App() {
  const [data, setData] = useState({})
  const [task, setTask] = useState({ title: '', completed: false })

  useEffect(() => {
    const tasksDbRef = ref(db, `tasks`)

    return onValue(tasksDbRef, (snapshot) => {
      const loadedTasks = snapshot.val() || {}
      setData(loadedTasks)
    })
  }, [])

  let keys = Object.keys(data)

  const createTask = (payload) => {
    const tasksDbRef = ref(db, 'tasks')

    push(tasksDbRef, payload)

    setTask(() => [payload])
    setTask({ title: '' })
  }

  const updateTask = (id, changeValue) => {
    const updateDbRef = ref(db, `tasks/${id}`)

    update(updateDbRef, { title: changeValue })

    setTask(() => changeValue)
    setTask({ title: '', completed: false })
  }

  const updateChecked = (id, changeChecked) => {
    const updateDbRef = ref(db, `tasks/${id}`)

    update(updateDbRef, { completed: changeChecked })

    setTask(() => changeChecked)
    setTask({ ...task, completed: changeChecked })
  }

  const removeTask = (id) => {
    const removeDbRef = ref(db, `tasks/${id}`)

    remove(removeDbRef)
  }

  return (
    <div>
      <h1>Список задач</h1>
      {keys.length > 0 ? <></> : <p>Задач нет</p>}
      <ul>
        <div>
          {Object.entries(data).map(([key, { ...task }]) => (
            <PostItem
              key={key}
              {...task}
              updateTask={updateTask}
              removeTask={removeTask}
              updateChecked={updateChecked}
              id={key}
            />
          ))}
        </div>
      </ul>
      <form>
        <input
          type="text"
          autoFocus={true}
          placeholder="Название задачи"
          value={task.title}
          onChange={(e) => setTask({ title: e.target.value, completed: false })}
        />
        <button
          type="submit"
          disabled={!task.title}
          className="createTask"
          onClick={(e) => createTask({ ...task }, e.preventDefault())}
        >
          Создать задачу
        </button>
      </form>
    </div>
  )
}

export default App
