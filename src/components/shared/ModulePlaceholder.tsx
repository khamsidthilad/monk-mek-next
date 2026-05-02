import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ModulePlaceholderProps = {
  title: string;
  description?: string;
};

export function ModulePlaceholder({
  title,
  description,
}: ModulePlaceholderProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl tracking-tight">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          {description ?? "This module is scaffolded and ready for CRUD wiring."}
        </p>
      </CardContent>
    </Card>
  );
}
