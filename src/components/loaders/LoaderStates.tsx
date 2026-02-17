import { Loader2, AlertCircle } from 'lucide-react';

interface LoaderProps {
  message?: string;
  fullScreen?: boolean;
}

export function LoadingState({ message = 'Loading...', fullScreen = true }: LoaderProps) {
  const baseClasses = fullScreen 
    ? 'flex items-center justify-center gap-3 w-full min-h-screen'
    : 'flex items-center justify-center gap-3 w-full py-8';

  return (
    <div className={`${baseClasses} bg-zinc-950 text-white`}>
      <Loader2 size={24} className="animate-spin text-pink-500 flex-shrink-0" />
      <span className="text-sm font-medium text-zinc-300">{message}</span>
    </div>
  );
}

interface ErrorProps {
  message?: string;
  fullScreen?: boolean;
}

export function ErrorState({ message = 'Error loading data', fullScreen = false }: ErrorProps) {
  const containerClasses = fullScreen 
    ? 'flex items-center justify-center w-full min-h-screen'
    : 'w-full';
    
  const baseClasses = 'flex items-center justify-center gap-3 rounded-lg bg-red-950/20 border border-red-900/50 p-4';

  return (
    <div className={`${containerClasses}`}>
      <div className={baseClasses}>
        <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
        <span className="text-sm font-medium text-red-400">{message}</span>
      </div>
    </div>
  );
}

interface NotebookLoadingProps {
  fullScreen?: boolean;
}

export function NotebookLoadingState({ fullScreen = true }: NotebookLoadingProps) {
  return <LoadingState message="Loading your notebook..." fullScreen={fullScreen} />;
}

interface NotebookErrorProps {
  fullScreen?: boolean;
}

export function NotebookErrorState({ fullScreen = true }: NotebookErrorProps) {
  return <ErrorState message="Error loading notebook" fullScreen={fullScreen} />;
}
