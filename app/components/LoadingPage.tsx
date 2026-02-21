import { Loader2 } from "lucide-react";

export default function LoadingPage() {
    return <div className="min-h-screen w-full bg-primary text-text-primary flex items-center justify-center px-4"><Loader2 className="animate-spin" size={24} /></div>;
}