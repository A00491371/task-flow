export interface Task {
    id?: number;
    description: string;
    deadline: string;
    createdAt: Date;
    isCompleted: boolean;
}
