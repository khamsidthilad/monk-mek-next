import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div>
      <section className="relative left-1/2 right-1/2 mx-[-50vw] min-h-svh w-screen px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col items-center justify-center gap-5">
          <Skeleton className="h-4 w-52" />
          <Skeleton className="h-14 w-full max-w-3xl" />
          <Skeleton className="h-6 w-full max-w-xl" />
          <div className="mt-2 flex w-full max-w-md gap-3">
            <Skeleton className="h-11 flex-1" />
            <Skeleton className="h-11 flex-1" />
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto w-full max-w-6xl space-y-10">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-72" />
            <Skeleton className="h-5 w-full max-w-xl" />
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-36 w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto w-full max-w-6xl space-y-6">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-3">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-10 w-80" />
            <Skeleton className="h-5 w-full max-w-xl" />
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.05fr_1.1fr]">
            <Skeleton className="aspect-5/4 w-full" />
            <div className="space-y-3">
              <Skeleton className="h-10 w-72" />
              <Skeleton className="h-5 w-64" />
              <Skeleton className="h-20 w-full" />
              <div className="grid grid-cols-3 gap-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="h-28 w-full" />
                ))}
              </div>
              <Skeleton className="h-11 w-full" />
            </div>
          </div>
          <Skeleton className="aspect-16/6 w-full" />
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto w-full max-w-6xl space-y-6">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-3">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-80" />
            <Skeleton className="h-5 w-full max-w-xl" />
          </div>
          <div className="mx-auto flex max-w-3xl gap-2">
            <Skeleton className="h-10 flex-1 rounded-full" />
            <Skeleton className="h-10 w-44 rounded-full" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-80 w-full rounded-lg" />
            ))}
          </div>
          <div className="mx-auto flex w-full justify-center">
            <Skeleton className="h-9 w-72" />
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto w-full max-w-6xl space-y-6">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-72" />
            <Skeleton className="h-5 w-full max-w-2xl" />
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <Skeleton className="aspect-5/5 w-full" />
            <Skeleton className="h-full min-h-88 w-full rounded-xl" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-32 w-full sm:h-36 lg:h-40" />
            ))}
          </div>
          <div className="mx-auto flex justify-center">
            <Skeleton className="h-2 w-20" />
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto w-full max-w-6xl space-y-5">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-3">
            <Skeleton className="h-12 w-80" />
            <Skeleton className="h-5 w-full max-w-2xl" />
          </div>
          <div className="mx-auto max-w-5xl space-y-4">
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>
        </div>
      </section>

      <section className="px-4 py-6 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-6xl space-y-5">
          <div className="mx-auto flex flex-col items-center gap-3">
            <Skeleton className="h-12 w-60" />
            <Skeleton className="h-10 w-full max-w-4xl" />
          </div>
          <div className="flex items-center justify-between gap-4">
            <Skeleton className="h-8 w-72" />
            <Skeleton className="h-8 w-52" />
          </div>
        </div>
      </section>
    </div>
  );
}
