import { router } from "@inertiajs/react";
import { Button } from "./ui/button";
import { redirect } from "@/routes/auth/google";

export default function GoogleAuthButton() {
    return (
        <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            asChild
        >
            <a href={redirect().url}>
                <svg width="18" height="18" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.14 0 5.97 1.08 8.19 2.86l6.1-6.1C34.52 2.36 29.62 0 24 0 14.64 0 6.62 5.38 2.69 13.22l7.38 5.73C11.78 13.3 17.43 9.5 24 9.5z" />
                    <path fill="#4285F4" d="M46.1 24.5c0-1.64-.15-3.22-.43-4.74H24v9.01h12.41c-.53 2.85-2.12 5.27-4.5 6.9l6.9 5.36C43.92 36.38 46.1 30.96 46.1 24.5z" />
                    <path fill="#FBBC05" d="M10.07 28.95A14.5 14.5 0 0 1 9.5 24c0-1.72.3-3.38.57-4.95l-7.38-5.73A23.9 23.9 0 0 0 0 24c0 3.92.94 7.63 2.69 10.78l7.38-5.83z" />
                    <path fill="#34A853" d="M24 48c6.48 0 11.92-2.14 15.89-5.82l-6.9-5.36c-1.92 1.29-4.37 2.05-8.99 2.05-6.57 0-12.22-3.8-14.93-9.3l-7.38 5.83C6.62 42.62 14.64 48 24 48z" />
                </svg>
                Log in dengan Google
            </a>
        </Button>

    )
}