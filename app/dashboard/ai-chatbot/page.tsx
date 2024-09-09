import {
    CornerDownLeft,
    Mic,
    Paperclip,
} from 'lucide-react'

import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import { Label } from '../../../components/ui/label'
import { Textarea } from '../../../components/ui/textarea'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from '../../../components/ui/tooltip'
import Dashboard from '@/components/HOC/Dashboard'

const page = () => {
    return (
        <Dashboard>
        <TooltipProvider>
            <div className="flex h-screen w-full flex-col">
                <header className="bg-background sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b px-4">
                    <h1 className="text-xl font-semibold">Chat</h1>
                </header>
                <main className="flex flex-1 flex-col gap-4 overflow-auto p-4">
                    <div className="bg-muted/50 relative flex h-full min-h-[50vh] flex-col rounded-xl p-4">
                        <Badge variant="outline" className="absolute right-3 top-3">
                            Chat
                        </Badge>

                        {/* Dummy Messages */}
                        <div className="flex flex-col gap-3">
                            {/* Left side message */}
                            <div className="self-start bg-muted p-3 rounded-lg max-w-xs">
                                <p className="text-sm">This is a message from the left side.</p>
                            </div>

                            {/* Right side message */}
                            <div className="self-end bg-primary text-primary-foreground p-3 rounded-lg max-w-xs">
                                <p className="text-sm">This is a message from the right side.</p>
                            </div>
                        </div>

                        <div className="flex-1" />

                        {/* Chat input box */}
                        <form
                            className="bg-background focus-within:ring-ring relative overflow-hidden rounded-lg border focus-within:ring-1"
                        >
                            <Label htmlFor="message" className="sr-only">
                                Message
                            </Label>
                            <Textarea
                                id="message"
                                placeholder="Type your message here..."
                                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                            />
                            <div className="flex items-center p-3 pt-0">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <Paperclip className="size-4" />
                                            <span className="sr-only">Attach file</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="top">Attach File</TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <Mic className="size-4" />
                                            <span className="sr-only">Use Microphone</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="top">Use Microphone</TooltipContent>
                                </Tooltip>
                                <Button type="submit" size="sm" className="ml-auto gap-1.5">
                                    Send Message
                                    <CornerDownLeft className="size-3.5" />
                                </Button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </TooltipProvider>
        </Dashboard>
    )
}

export default page
