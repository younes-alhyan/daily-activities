import { ChevronLeft, User } from "lucide-react";
import { Button } from "@/client/components/button";
import { Card, CardTitle, CardAction } from "@/client/components/card";

interface TopBarProps {
  goBack: () => void;
}

export function TopBar({ goBack }: TopBarProps) {
  return (
    <Card className="w-full flex-row items-center p-4 border border-border">
      <CardAction>
        <Button
          variant="ghost"
          size="icon"
          onClick={goBack}
          className="rounded-md"
        >
          <ChevronLeft size={20} />
        </Button>
      </CardAction>
      <CardTitle className="flex items-center gap-2 text-2xl font-bold text-text-primary">
        <User className="text-accent-blue" />
        User Profile
      </CardTitle>
    </Card>
  );
}
