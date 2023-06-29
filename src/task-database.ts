import fs from 'node:fs/promises'
import path from 'node:path'
import { Task } from './domain/model/task'

const currentFilePath = path.resolve(__dirname)
const databasePath = path.resolve(currentFilePath, '..', 'data', 'db.json')

export class TaskDatabase {
  private tasks: Task[] = []

  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then((data) => {
        this.tasks = JSON.parse(data)
      })
      .catch(() => {
        this.persist()
      })
  }

  private persist() {
    fs.writeFile(databasePath, JSON.stringify(this.tasks))
  }

  public select(where?: (task: Task) => boolean) {
    const data = this.tasks ?? []

    if (where) {
      return data.filter(where)
    }

    return data
  }

  public insert(data: Task) {
    if (Array.isArray(this.tasks)) {
      this.tasks.push(data)
    } else {
      this.tasks = [data]
    }

    this.persist()
    return data
  }

  public update(id: string, data: Partial<Task>) {
    // const rowIndex: number = this.tasks.findIndex((task) => task.id === id)
    // if (rowIndex > -1) {
    //   this.tasks[rowIndex] =
    //   this.persist()
    // }
  }

  public delete(id: string): boolean {
    const rowIndex: number = this.tasks.findIndex((task) => task.id === id)
    if (rowIndex > -1) {
      this.tasks.splice(rowIndex, 1)
      this.persist()
      return true
    }

    return false
  }
}