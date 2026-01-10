import { ItemGroup } from "@/components/ui/item"
import TaskItem, { Task } from "./task-item"

export default function CallToActions({ tasks }: { tasks: Task[] }) {
    return (
        <div className="flex flex-col gap-6">
            <ItemGroup className="gap-4">
                {tasks.map((task) => (
                    <TaskItem task={task} />
                ))}
            </ItemGroup>
        </div>
    )
}
