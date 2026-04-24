import { LayoutGrid } from 'lucide-react';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-blue-600 text-white">
                <LayoutGrid className="size-5" />
            </div>
            <div className="ml-2 grid flex-1 text-left text-sm">
                <span className="mb-0 truncate leading-tight font-bold text-gray-900 dark:text-gray-100 text-lg">
                    PT HBAJ
                </span>
            </div>
        </>
    );
}
