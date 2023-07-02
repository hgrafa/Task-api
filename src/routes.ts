import { NewTask } from './domain/DTOs/taks-dtos'
import { randomUUID } from 'crypto'
import { Task } from './domain/model/task'
import { TaskDatabase } from './task-database'
import { Path } from './utils/path'
import { Route } from './utils/route'

const taskDatabase = new TaskDatabase()

export const routes: Route[] = [
  {
    method: 'GET',
    path: Path.of('tasks'),
    handler: (req, res) => {
      const tasks = taskDatabase.select()

      return res
        .setHeader('Content-Type', 'application/json')
        .end(JSON.stringify(tasks))
    },
  },
  {
    method: 'POST',
    path: Path.of('tasks'),
    handler: (req, res) => {
      const { title, description }: NewTask = req.body

      const task: Task = {
        id: randomUUID(),
        title,
        description,
        created_at: new Date(),
        updated_at: new Date(),
      }

      taskDatabase.insert(task)
      return res.writeHead(201).end()
    },
  },
  {
    method: 'PUT',
    path: Path.of('tasks', ':id'),
    handler: (req, res) => {
      // const { title, description }: TaskUpdate = req.body
      // const taskUpdate: TaskUpdate = { title, description }
      // taskDatabase.update(taskUpdate)
      return res.writeHead(201).end()
    },
  },
  {
    method: 'PATCH',
    path: Path.of('tasks', ':id', 'complete'),
    handler: (req, res) => {
      if (!req.params?.has('id')) res.writeHead(406).end()

      const id = req.params?.get('id')
      if (!id) res.writeHead(406).end()

      const task = taskDatabase.selectById(id!)
      const isAlreadyCompleted = task ? !!task.completed_at : false

      if (isAlreadyCompleted) return res.writeHead(405).end()

      const taskCompleteUpdate: Partial<Task> = { completed_at: new Date() }
      const isUpdated = taskDatabase.update(id!, taskCompleteUpdate)

      return res.writeHead(isUpdated ? 202 : 404).end()
    },
  },
  {
    method: 'DELETE',
    path: Path.of('tasks', ':id'),
    handler: (req, res) => {
      if (!req.params?.has('id')) res.writeHead(406).end()

      const id = req.params!.get('id')
      if (!id) res.writeHead(406).end()

      const isDeleted = taskDatabase.delete(id!)
      return res.writeHead(isDeleted ? 204 : 406).end()
    },
  },
]
