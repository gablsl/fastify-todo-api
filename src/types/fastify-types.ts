export interface CreateTodoBody {
  title: string;
  id: number | undefined | string;
}

export interface UpdateTodoBody {
  completed: boolean;
}

export interface TodoParams {
  id: string;
}
