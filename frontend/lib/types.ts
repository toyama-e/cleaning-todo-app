export type Task = {
  id: number;
  name: string;
  cleaning_area_id: number;
  do_at: string | null;
  done_at: string | null;
  memo: string | null;
  status: string | null;
  user_id: number;
};
