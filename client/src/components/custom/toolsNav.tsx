import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from '@/components/ui/tooltip'
import { MapPin } from 'lucide-react'
// import { useGetUserById } from '@/hooks/useGetUser'
import { UserDropdown } from './userDropdown'
import { Button } from '../ui/button'
// import { useGetRole } from '@/hooks/useGetRole'

type ToolsNavProps = {
    isPointToolOn: boolean
    setIsPointToolOn: React.Dispatch<React.SetStateAction<boolean>>
}

export function ToolsNav({ isPointToolOn, setIsPointToolOn }: ToolsNavProps) {
    // const { role } = useGetRole()
    // const { user } = useGetUserById()
    return (
        <aside className="z-50 w-full h-10 bg-muted/80 backdrop-blur-md">
            <nav className="flex items-center justify-between h-full px-4 py-4 border-b">
                <div className="flex items-center justify-center flex-grow gap-4">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <>
                                    {isPointToolOn ? (
                                        <Button
                                            variant="default"
                                            onClick={() =>
                                                setIsPointToolOn(
                                                    (prevState) => !prevState
                                                )
                                            }
                                        >
                                            <MapPin className="w-5 h-5" />
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="ghost"
                                            onClick={() =>
                                                setIsPointToolOn(
                                                    (prevState) => !prevState
                                                )
                                            }
                                        >
                                            <MapPin className="w-5 h-5" />
                                        </Button>
                                    )}
                                </>
                            </TooltipTrigger>
                            <TooltipContent side="right">Home</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className="flex-shrink-0">
                    <UserDropdown />
                </div>
            </nav>
        </aside>
    )
}
