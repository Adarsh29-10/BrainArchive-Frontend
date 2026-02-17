import { BookOpen, CalendarDays } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePublicNotebooks } from '../hooks/useNotebooks';
import { ErrorState, LoadingState } from '../components/loaders/LoaderStates';

function PublicNotebooks() {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = usePublicNotebooks();

  if (isLoading) return <LoadingState message="Loading public notebooks..." fullScreen={true} />;
  if (isError) return <ErrorState message={error?.message || 'Failed to load public notebooks'} />;

  if (!data || data.length === 0) {
    return (
      <div className="h-full bg-zinc-950 overflow-y-auto">
        <div className="px-6 sm:px-16 py-10 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-zinc-800 rounded-full mb-4">
            <BookOpen size={40} className="text-zinc-300" />
          </div>
          <h2 className="text-2xl font-semibold text-zinc-200 mb-2">No public notebooks yet</h2>
          <p className="text-zinc-400 text-sm">Public notebooks will appear here when available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-zinc-950 overflow-y-auto">
      <div className="px-6 sm:px-16 py-6">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100">Public Notebooks</h1>
          <p className="text-zinc-400 text-sm mt-1">Explore notebooks shared publicly.</p>
        </div>

        <div className="space-y-2">
          {data.map((notebook) => {
            const createdDate = new Date(notebook.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });

            return (
              <article
                key={notebook._id}
                className="w-full rounded-xl border border-zinc-600 bg-zinc-900 text-white shadow-sm transition-all duration-200 hover:border-zinc-400 hover:bg-zinc-800 cursor-pointer"
                onClick={() => navigate(`/public/nb/${notebook._id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(`/public/nb/${notebook._id}`);
                  }
                }}
              >
                <div className="flex items-center justify-between gap-3 p-4 sm:p-5">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="truncate text-2xl font-semibold text-zinc-100">{notebook.title}</h3>
                    </div>
                    <p className="line-clamp-2 text-xs leading-5 text-zinc-400 sm:text-sm">
                      {notebook.description?.trim() || 'No description available.'}
                    </p>
                    <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-zinc-500 sm:text-xs">
                      <CalendarDays size={13} />
                      <span>Created {createdDate}</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PublicNotebooks;
