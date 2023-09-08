import { NewTask } from './domain/dto/taks-dtos'
import { randomUUID } from 'crypto'
import { Task } from './domain/model/task'
import { TaskDatabase } from './task-database'
import { Path } from './utils/path'
import { Route } from './utils/route'
import { IncomingMessage, ServerResponse } from 'http'
import { httpGet, restController } from './utils/http-methods'

const taskDatabase = new TaskDatabase()

// TODO : handle with query parameters
// const a = req.queryParams

class BaseController {
  
}

@restController
export class TaskController extends BaseController {
  @httpGet('/tasks')
  static getTasks(req: Request, res: ServerResponse<IncomingMessage>) {
    const tasks = taskDatabase.select()
    return tasks
  }
}

// export const routes: Route[] = [
//   {
//     method: 'GET',
//     path: Path.of('tasks'),
//     handler: (req, res) => {
//       const tasks = taskDatabase.select()

//       return res
//         .setHeader('Content-Type', 'application/json')
//         .end(JSON.stringify(tasks))
//     },
//   },
//   {
//     method: 'GET',
//     path: Path.of('tasks', ':id'),
//     handler: (req, res) => {
//       if (!req.params?.has('id')) res.writeHead(406).end()

//       const id = req.params?.get('id')
//       if (!id) res.writeHead(406).end()

//       const task = taskDatabase.selectById(id!)

//       return !task
//         ? res.writeHead(404).end()
//         : res
//             .setHeader('Content-Type', 'application/json')
//             .end(JSON.stringify(task))
//     },
//   },
//   {
//     method: 'POST',
//     path: Path.of('tasks'),
//     handler: (req, res) => {
//       const { title, description }: NewTask = req.body

//       const task: Task = {
//         id: randomUUID(),
//         title,
//         description,
//         created_at: new Date(),
//         updated_at: new Date(),
//       }

//       taskDatabase.insert(task)
//       return res.writeHead(201).end()
//     },
//   },
//   {
//     method: 'PUT',
//     path: Path.of('tasks', ':id'),
//     handler: (req, res) => {
//       if (!req.params?.has('id')) res.writeHead(406).end()

//       const id = req.params?.get('id')
//       if (!id) res.writeHead(406).end()

//       const { title, description }: Partial<Task> = req.body
//       const partialTask = { title, description }
//       const partialTaskOnlyDefined = Object.fromEntries(
//         Object.entries(partialTask).filter(([_, value]) => value !== undefined),
//       )

//       const isUpdated = taskDatabase.update(id!, partialTaskOnlyDefined)

//       return res.writeHead(isUpdated ? 202 : 404).end()
//     },
//   },
//   {
//     method: 'PATCH',
//     path: Path.of('tasks', ':id', 'complete'),
//     handler: (req, res) => {
//       if (!req.params?.has('id')) res.writeHead(406).end()

//       const id = req.params?.get('id')
//       if (!id) res.writeHead(406).end()

//       const task = taskDatabase.selectById(id!)
//       const isAlreadyCompleted = task ? !!task.completed_at : false

//       if (isAlreadyCompleted) return res.writeHead(405).end()

//       const taskCompleteUpdate: Partial<Task> = { completed_at: new Date() }
//       const isUpdated = taskDatabase.update(id!, taskCompleteUpdate)

//       return res.writeHead(isUpdated ? 202 : 404).end()
//     },
//   },
//   {
//     method: 'DELETE',
//     path: Path.of('tasks', ':id'),
//     handler: (req, res) => {
//       if (!req.params?.has('id')) res.writeHead(406).end()

//       const id = req.params!.get('id')
//       if (!id) res.writeHead(406).end()

//       const isDeleted = taskDatabase.delete(id!)
//       return res.writeHead(isDeleted ? 204 : 406).end()
//     },
//   },
// ]
