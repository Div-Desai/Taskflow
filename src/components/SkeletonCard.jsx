export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700 animate-pulse">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
      <div className="h-3 bg-gray-100 dark:bg-gray-600 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-100 dark:bg-gray-600 rounded w-1/2"></div>
    </div>
  );
}
