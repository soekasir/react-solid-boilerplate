export enum Priority{
  VeryHigh="very-high",
  High="high",
  Medium="medium",
  Low="low",
  VeryLow="very-low",
}

export interface CreateTodoDto{
  activity_group_id : number,
  title : string,
  priority : Priority,
}

export interface TodoDto extends CreateTodoDto{
  id : number,
  is_active : number,
  created_at : string,
}