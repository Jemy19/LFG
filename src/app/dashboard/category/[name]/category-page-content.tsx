"use client"

import { EventCategory } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { EmptyCategoryState } from "./empty-category-state"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { client } from "@/lib/client"

interface CategoryPageContentProps {
    hasEvents: boolean
    category: EventCategory
}

export const CategoryPageContent = ({hasEvents: initialHasEvents, category }: CategoryPageContentProps) => {
    const searchParams = useSearchParams()

    const [activeTab, setActiveTab] = useState<"today" | "week" | "month">("today")

    // https:localhost:3000/category/sale?page=5&limit=30
    const page = parseInt(searchParams.get("page") || "1", 10)
    const limit = parseInt(searchParams.get("limit") || "30", 10)

    const [pagination, setPagination] = useState({
        pageIndex: page - 1,
        pageSize: limit,
    })
    
    const { data: pollingData} = useQuery ({
        queryKey: ["category", category.name, "hasEvents"],
        initialData: { hasEvents: initialHasEvents },
    })

    if(!pollingData.hasEvents){
        return <EmptyCategoryState categoryName={category.name} />
    }

    const { data, isFetching} = useQuery({
        queryKey: [
            "events", 
            category.name, 
            pagination.pageIndex, 
            pagination.pageSize,
            activeTab,
        ],
        queryFn: async () => {
            const res = await client.category.getEventsByCategoryName.$get({
                name: category.name,
                page: pagination.pageIndex + 1,
                limit: pagination.pageSize,
                timeRange: activeTab,
            })

            return await res.json
        },
        refetchOnWindowFocus: false,
        enabled: pollingData.hasEvents,
    })

    return (
        <div className="space-y-6">

        </div>
    )
}