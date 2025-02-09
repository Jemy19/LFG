import { Card } from "@/components/ui/card"
import { client } from "@/lib/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const DashboardEmptyState = () => {
    const queryClient = useQueryClient()

    // for when for example a user deletes all of there categories it will instantly push this
    const { mutate: insertQuickstartCategories} = useMutation({
        mutationFn: async () => {
            await client.category.insertQuickStartCategories.$post()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["user-event-categories"]})
        },
    })

    return (
        <Card className="flex flex-col items-center justify-center rounded-2xl flex-1 text-center p-6">
            <div className="flex justify-center w-full">
                <img src="brand-asset-wave.png" alt="No categories" className="size-48 -mt-24"/>
            </div>

            <h1 className="mt-2 text-xl/8 font-medium tracking-light text-gray-900">
                No Event Catagories Yet
            </h1>
            <p className="text-sm/6 text-gray-600 max-w-prose mt-2 mb-8">
                Start traking events by creating your first category.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">

            </div>
        </Card>
    )
}