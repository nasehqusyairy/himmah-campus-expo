import { Appearance, useAppearance } from '@/hooks/use-appearance';
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';
import { Monitor, Moon, Sun } from 'lucide-react';

export default function AppearanceToggleTab() {
    const { appearance, updateAppearance } = useAppearance();

    return (
        <Tabs
            value={appearance}
            onValueChange={(value) =>
                updateAppearance(value as Appearance)
            }
        >
            <TabsList>
                <TabsTrigger value="light">
                    <Sun className="h-4 w-4" />
                    <span className="ml-1.5 text-sm">Light</span>
                </TabsTrigger>

                <TabsTrigger value="dark">
                    <Moon className="h-4 w-4" />
                    <span className="ml-1.5 text-sm">Dark</span>
                </TabsTrigger>

                <TabsTrigger value="system">
                    <Monitor className="h-4 w-4" />
                    <span className="ml-1.5 text-sm">System</span>
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
}
