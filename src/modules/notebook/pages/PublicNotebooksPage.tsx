import { BookOpen, CalendarDays } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePublicNotebooks } from '../hooks/useNotebooks';
import { ErrorState, LoadingState } from '../../../shared/ui/LoaderStates';

function PublicNotebooks() {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = usePublicNotebooks();

  if (isLoading) return <LoadingState message="Loading public notebooks..." fullScreen={true} />;
  if (isError) return <ErrorState message={error?.message || 'Failed to load public notebooks'} />;

  if (!data || data.length === 0) {
    return (
      <div className="h-full bg-zinc-950 overflow-y-auto">
        <div className="px-6 py-14 text-center sm:px-16">
          <div className="mb-5 inline-flex h-20 w-20 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900">
            <BookOpen size={40} className="text-zinc-300" />
          </div>
          <h2 className="mb-2 text-2xl font-semibold text-zinc-100">No public notebooks yet</h2>
          <p className="text-sm text-zinc-400">Published notebooks will appear here once creators start sharing.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-zinc-950 overflow-y-auto">
      <div className="px-6 py-6 sm:px-16">
        <div className="mb-10 border-b border-zinc-800 pb-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">Community Library</p>
          <h1 className="mb-2 text-3xl font-bold text-zinc-100 sm:text-4xl">Explore public notebooks</h1>
          <p className="max-w-2xl text-sm text-zinc-400">Read notes shared by the BrainArchive community and open any notebook in a clean read-only view.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.map((notebook) => {
            const createdDate = new Date(notebook.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });
            const ownerName = notebook.ownerName || 'Unknown user';
            const ownerAvatar = notebook.ownerPicture || null;
            const ownerInitial = ownerName.charAt(0).toUpperCase();
            const blockCount = notebook.blocks?.length || 0;

            return (
              <article
                key={notebook._id}
                className="group h-full cursor-pointer overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/90 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-700/70 hover:bg-zinc-900 hover:shadow-lg hover:shadow-black/30"
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
                
                <div className="flex h-full flex-col p-4 sm:p-5">
                  {/* Owner Info */}
                  <div className="mb-4 flex items-center gap-2.5 border-b border-zinc-800/80 pb-3">
                    {ownerAvatar ? (
                      <img
                        src={ownerAvatar}
                        alt={ownerName}
                        className="h-8 w-8 rounded-full border border-zinc-700 object-cover"
                      />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700 bg-gradient-to-br from-emerald-500 to-green-700 text-xs font-bold text-white">
                        {ownerInitial}
                      </div>
                    )}
                    <span className="truncate text-xs font-medium text-zinc-300">{ownerName}</span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 line-clamp-2 text-lg font-bold text-zinc-100 transition-colors group-hover:text-emerald-200 sm:text-xl">
                    {notebook.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-4 flex-grow line-clamp-3 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                    {notebook.description?.trim() || 'No description available.'}
                  </p>

                  {/* Footer */}
                  <div className="space-y-3 border-t border-zinc-800 pt-4">
                    <div className="flex items-center justify-between text-xs text-zinc-500">
                      <div className="flex items-center gap-1.5">
                        <CalendarDays size={14} />
                        <span>{createdDate}</span>
                      </div>
                      <span className="rounded-full border border-zinc-700 bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-300">
                        {blockCount} {blockCount === 1 ? 'item' : 'items'}
                      </span>
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
