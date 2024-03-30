    import {Task} from "./task.model";

    export class dbTaskModel{
        public HomeTask: Array<Task> = [];
        public TodayTask: Array<Task> = [];
        public WorkTask: Array<Task> = [];
        public userId: number = -1;
        public id?: number;
    }

