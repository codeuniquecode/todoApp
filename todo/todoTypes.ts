// in typescript, interface must be defined first in types file
export enum TodoStatus{
    pending='pending',
    completed='completed'
}
export interface iTodo{
    task:string,
    deadline:string,
    status:TodoStatus
}