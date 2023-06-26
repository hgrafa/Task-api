export interface NewTask {
  title: string
  description: string
}

export interface TaskUpdate {
  title?: string
  description?: string
  completed_at?: Date
}
