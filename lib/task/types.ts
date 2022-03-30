export type Status = "Planned" | "On going" | "Done";

export interface TaskDoc {
  title: string;
  status: Status;
};
