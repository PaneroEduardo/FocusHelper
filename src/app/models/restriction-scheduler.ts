import { Schedule } from "./schedule";

export interface RestrictionScheduler {
    active: boolean;
    schedules: Schedule[]
}
