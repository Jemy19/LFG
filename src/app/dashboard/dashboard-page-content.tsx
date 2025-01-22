"use client"

import { LoadingSpinner } from "@/components/loading-spinner"
import { client } from "@/lib/client"
import { useQuery } from "@tanstack/react-query"

export const DashboardPageContent = () => {
    // userQuery is used to fetch data better than useEffect
    const { data: categories, isPending: isEventCategoriesLoading } = useQuery({
        queryKey: ["user-event-categories"],
        queryFn: async () => {
            // fetch data from the server "client" d ko pa knows "category" router name 
            // sa index.ts "getEventCategories" is a function in routers category-router.ts
            const res = await client.category.getEventCategories.$get()
            const {categories} = await res.json()
            return categories
        }
    })
    if (isEventCategoriesLoading) {
        return (
            <div className="flex items-center justify-center flex-1 h-full w-full">
                <LoadingSpinner/>
            </div>
        )
    }

    if(!categories || categories.length === 0) {
        return (
            <div>Empty State</div>
        )
        
    }

    return ( 
        <ul className="grid max-w-6xl grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {categories.map((category) => (
                <li key={category.id} className="relative group z-10 transition-all duration-200 hover:-translate-y-0.5">
                    <div className="absolute z-0 inset-px rounder-lg bg-white"/>
                    <div className="pointer-events-note z-0 absolute inset-px rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-md ring-1 ring-black/5">
                        <div className="relative p-6 z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="size-12 rounded-full" 
                                    style={{
                                        backgroundColor: category.color ? `#${category.color.toString(16).padStart(6, "0")}` 
                                        : "#f3f4f6",
                                    }}>
                                    {category.name}
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}