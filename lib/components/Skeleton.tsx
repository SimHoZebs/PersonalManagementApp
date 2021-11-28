export default function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-dark-300 w-full h-full ${className}`}
    ></div>
  );
}
