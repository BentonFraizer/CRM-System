import { TABS } from '@/helpers/helpers.js'

export const getTasks = async (status = TABS.all.status) => {
  try {
    const response = await fetch(`https://easydev.club/api/v1/todos?filter=${status}`)
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.error(error)
  }
}

export const createTask = async (newTaskData) => {
  try {
    await fetch('https://easydev.club/api/v1/todos', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(newTaskData),
    })
  } catch (error) {
    console.error(error)
  }
}

export const updateTask = async (taskDataToSend) => {
  const { id, isDone, title } = taskDataToSend
  try {
    await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ title, isDone }),
    })
  } catch (error) {
    console.error(error)
  }
}

export const deleteTask = async (id) => {
  try {
    await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
      },
    })
  } catch (error) {
    console.error(error)
  }
}
