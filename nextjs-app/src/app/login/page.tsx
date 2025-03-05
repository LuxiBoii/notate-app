import { LoginForm } from "@/components/login-form";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function LoginPage() {
    return (
    <>
        <div className="absolute right-4 top-4">
            <ModeToggle/>
        </div>
        <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <LoginForm />
            </div>
        </div>
    </>
  )
}

