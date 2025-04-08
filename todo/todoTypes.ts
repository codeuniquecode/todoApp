// in typescript, interface must be defined first in types file
export enum TodoStatus{
    pending='pending',
    finished='finished'
}
export interface iTodo{
    task:string,
    deadline:string,
    status:TodoStatus
}