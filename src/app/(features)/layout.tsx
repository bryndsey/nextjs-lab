import { NavigationDrawer } from "@/components/NavigationDrawer";
import { ThreeLayout } from "@/components/ThreeLayout";

export default function ExperiementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThreeLayout>
      <NavigationDrawer />
      {children}
    </ThreeLayout>
  );
}
