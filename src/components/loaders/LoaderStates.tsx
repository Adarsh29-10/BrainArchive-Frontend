import { Loader2, AlertCircle } from 'lucide-react';

interface LoaderProps {
  message?: string;
  fullScreen?: boolean;
}

export function LoadingState({ message = 'Loading...', fullScreen = true }: LoaderProps) {
  const baseClasses = 'flex items-center justify-center gap-3 h-screen';
  const containerClasses = fullScreen ? 'h-full w-full' : '';

  return (
    <div className={`${baseClasses} ${containerClasses} bg-zinc-950 text-white py-8`}>
      <Loader2 size={24} className="animate-spin text-pink-500" />
      <span className="text-sm font-medium text-zinc-300">{message}</span>
    </div>
  );
}

interface ErrorProps {
  message?: string;
  fullScreen?: boolean;
}

export function ErrorState({ message = 'Error loading data', fullScreen = true }: ErrorProps) {
  const baseClasses = 'flex items-center justify-center gap-3 rounded-lg bg-red-950/20 border border-red-900/50 p-4';
  const containerClasses = fullScreen ? 'h-full w-full' : 'w-full';

  return (
    <div className={`${baseClasses} ${containerClasses}`}>
      <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
      <span className="text-sm font-medium text-red-400">{message}</span>
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

interface AuthLoadingProps {
  fullScreen?: boolean;
}

export function AuthLoadingState({ fullScreen = true }: AuthLoadingProps) {
  return <LoadingState message="Authenticating..." fullScreen={fullScreen} />;
}
