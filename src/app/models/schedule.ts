import { DaysOfWeek } from "./days-of-week.enum";
import { HourPeriod } from "./hour-period";

export interface Schedule {
    days: DaysOfWeek[],
    hourPeriods: HourPeriod[]
}
