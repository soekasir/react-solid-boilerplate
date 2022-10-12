export interface CreateActivityDto {
  title: string,
}

export interface ActivityDto extends CreateActivityDto {
  id: number,
  created_at: string,
}
