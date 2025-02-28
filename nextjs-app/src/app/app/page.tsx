import { ModeToggle } from "@/components/ui/mode-toggle"

import { Description } from "@radix-ui/react-alert-dialog"

import CenterInput from "@/components/center-input"

export default function App(){
    return(
        <div className="p-2">
            <div className="h-dvh w-dvw flex justify-center items-center">
                <CenterInput></CenterInput>
            </div>

            <div className="fixed right-0 top-0 m-2">
                <ModeToggle />
            </div>
        </div>
    )
}