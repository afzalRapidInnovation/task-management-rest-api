export interface Task {
  id: string;
  title: string;
  description: string;
  finishedBy: string;
  status: TaskStatus;
}
export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PORGRESS = 'IN_PORGRESS',
  DONE = 'DONE',
}
