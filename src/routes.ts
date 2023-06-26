import { ServerResponse } from 'http'
import { Request } from './utils/request'
import { NewTask } from './domain/DTOs/taks-dtos'
import { randomUUID } from 'crypto'
import { Task } from './domain/model/task'
import { TaskDatabase } from './repository'

interface Route {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: string
  handler: (req: Request, res: ServerResponse) => ServerResponse
}

const taskDatabase = new TaskDatabase()

export const routes: Route[] = [
  {
    method: 'GET',
    path: '/tasks',
    handler: (req, res) => {
      const tasks = taskDatabase.select()

      return res
        .setHeader('Content-Type', 'application/json')
        .end(JSON.stringify(tasks))
    },
  },
  {
    method: 'POST',
    path: '/tasks',
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
