import { NewTask } from './domain/DTOs/taks-dtos'
import { randomUUID } from 'crypto'
import { Task } from './domain/model/task'
import { TaskDatabase } from './repository'
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
]
