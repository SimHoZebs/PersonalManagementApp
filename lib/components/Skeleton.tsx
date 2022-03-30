export default function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`bg-dark-300 h-full w-full animate-pulse ${className}`}
    ></div>
  );
}
