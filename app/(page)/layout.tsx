import { DaysProvider } from "@/app/(page)/contexts/DaysContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DaysProvider>{children}</DaysProvider>;
}
