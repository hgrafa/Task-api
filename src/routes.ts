import { NewTask, TaskUpdate } from './domain/DTOs/taks-dtos'
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
      const { title, description }: TaskUpdate = req.body
      const taskUpdate: TaskUpdate = { title, description }
      // taskDatabase.update(taskUpdate)
      return res.writeHead(201).end()
    },
  },
  {
    method: 'PATCH',
    path: Path.of('tasks', ':id', 'complete'),
    handler: (req, res) => {
      if(!req.params?.has('id')) 
        res.writeHead(406).end()
        
      const id = req.params?.get('id')
        
      if(!id)
        res.writeHead(406).end()

      let tasksFounded = taskDatabase.select((task) => {
        return task.id === id
      })

        const task: Task = tasksFounded[0] ?? ({} as Task)
        return res
          .writeHead(task ? )
          // TODO finish return restful status and content complemted

      // taskDatabase.update(taskUpdate)
      return res.writeHead(201).end()
    },
  },
  {
    method: 'DELETE',
    path: Path.of('tasks', ':id'),
    handler: (req, res) => {
      const idParam = req.params?.find(({ key }) => {
        return key === 'id'
      })

      let deleted = false

      if (idParam) {
        deleted = taskDatabase.delete(idParam.value)
      }

      return res.writeHead(deleted ? 204 : 406).end()
    },
  },
]
