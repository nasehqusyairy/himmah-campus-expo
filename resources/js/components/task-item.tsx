import { Link } from "@inertiajs/react";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "./ui/item";
import { Button } from "./ui/button";

export type Task = {
    title: string
    description: string
    url: string
}

export default function TaskItem({ task: { description, title, url } }: { task: Task }) {
    return (
        <Item variant="outline" role="listitem">
            <ItemContent>
                <ItemTitle className="line-clamp-1">
                    {title}
                </ItemTitle>
                <ItemDescription>{description}</ItemDescription>
            </ItemContent>
            <ItemActions className="flex-none text-center">
                <Button size={"sm"} asChild>
                    <Link href={url} className="no-underline!">
                        Pergi
                    </Link>
                </Button>
            </ItemActions>
        </Item>
    )
}