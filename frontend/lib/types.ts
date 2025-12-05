export type Task = {
  id?: number;
  name: string;
  cleaning_area_id: number;
  do_at: string;
  done_at?: string | null;
  memo?: string;
  status: string;
  user_id: number;
};

