import { cn } from "@/utils"
import { ReactNode } from "react"

interface MaxwidthWrapperProps {
    className?: string
    children: ReactNode
}

export const MaxWidthWrapper = ({className, children}: MaxwidthWrapperProps) => {
    return (
    <div className={cn("h-full mx-auto w-full max-w-screen-xl px-2.5 md:px-20", className)}>
        {children}
    </div>
    )
}