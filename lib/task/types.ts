export type Status = "Planned" | "On going" | "Done";
export type Duration = "< 30 mins" | "~ 1 hr" | "~ 2 hrs" | "~ 4 hrs" | "> 4 hrs";

export interface SubTask {
  title: string;
  completed: boolean;
}


export interface TaskDoc {
  title: string;
  status: Status;
  startDate: string;
  dueDate: string;
  duration: Duration;
  subTasks: SubTask[];
};
