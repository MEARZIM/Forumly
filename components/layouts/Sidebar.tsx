'use client'

import * as React from "react"
import { ChevronDown, Home, Rocket, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useSidebar } from "@/hooks/use-sidebar"


export const Sidebar = () => {

    const sidebar = useSidebar();

    return (
        <div>


            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 h-screen w-64 bg-inherit dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 ${sidebar.isOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0 lg:static`}
            >
                <ScrollArea className="h-full">
                    <div className="p-4 space-y-4">
                        <div className="space-y-1">
                            <Button variant="sidebarButton" className="w-full justify-start">
                                <Home className="mr-2 h-4 w-4" />
                                Home
                            </Button>
                            <Button variant="sidebarButton" className="w-full justify-start">
                                <Rocket className="mr-2 h-4 w-4" />
                                Popular
                            </Button>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="mb-2 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                                Recent
                            </h3>
                            <Button variant="sidebarButton" className="w-full justify-start">
                                <Avatar className="w-4 h-4 mr-2">
                                    <AvatarImage src="/placeholder.svg" alt="r/BollyBlindsNGossip" />
                                    <AvatarFallback>BB</AvatarFallback>
                                </Avatar>
                                r/BollyBlindsNGossip
                            </Button>
                        </div>

                        <Collapsible>
                            <CollapsibleTrigger asChild>
                                <Button variant="sidebarButton" className="w-full justify-between">
                                    <span className="flex items-center">
                                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                                            Topics
                                        </span>
                                    </span>
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="space-y-1">
                                <Button variant="sidebarButton" className="w-full justify-start pl-6">
                                    Internet Culture (Viral)
                                </Button>
                                <Button variant="sidebarButton" className="w-full justify-start pl-6">
                                    Games
                                </Button>
                                <Button variant="sidebarButton" className="w-full justify-start pl-6">
                                    Q&As
                                </Button>
                                <Button variant="sidebarButton" className="w-full justify-start pl-6">
                                    Technology
                                </Button>
                                <Button variant="sidebarButton" className="w-full justify-start pl-6">
                                    Pop Culture
                                </Button>
                                <Button variant="sidebarButton" className="w-full justify-start pl-6">
                                    Movies & TV
                                </Button>
                            </CollapsibleContent>
                        </Collapsible>

                        <Button variant="sidebarButton" className="w-full justify-start text-sm">
                            See more
                        </Button>

                        <Separator />

                        <Collapsible>
                            <CollapsibleTrigger asChild>
                                <Button variant="sidebarButton" className="w-full justify-between">
                                    <span className="flex items-center">
                                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                                            Resources
                                        </span>
                                    </span>
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="space-y-1">
                                <Button variant="sidebarButton" className="w-full justify-start pl-6">
                                    About Forumly
                                </Button>
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                </ScrollArea>
            </aside>

            {/* Background overlay for mobile */}
            {sidebar.isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
                    onClick={sidebar.onClose}
                ></div>
            )}
        </div>
    )
}


