import { BookOpen, CalendarDays } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePublicNotebooks } from '../hooks/useNotebooks';
import { ErrorState, LoadingState } from '../components/loaders/LoaderStates';

function PublicNotebooks() {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = usePublicNotebooks();

  console.log(data)

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
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-2">Public Notebooks</h1>
          <p className="text-zinc-400 text-sm">Discover and explore notebooks shared by the community.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                className="group h-full rounded-lg border border-zinc-700 bg-zinc-900 shadow-md transition-all duration-300 hover:border-zinc-500 hover:bg-zinc-800 hover:shadow-lg hover:-translate-y-1 cursor-pointer overflow-hidden"
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
                
                <div className="flex flex-col h-full p-4 sm:p-5">
                  {/* Owner Info */}
                  <div className="mb-4 flex items-center gap-2.5">
                    {ownerAvatar ? (
                      <img
                        src={ownerAvatar}
                        alt={ownerName}
                        className="h-8 w-8 rounded-full border border-zinc-700 object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full border border-zinc-700 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                        {ownerInitial}
                      </div>
                    )}
                    <span className="truncate text-xs font-medium text-zinc-300">{ownerName}</span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-lg sm:text-xl font-bold text-zinc-100 line-clamp-2 group-hover:text-white transition-colors">
                    {notebook.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-4 flex-grow text-xs sm:text-sm leading-relaxed text-zinc-400 line-clamp-3">
                    {notebook.description?.trim() || 'No description available.'}
                  </p>

                  {/* Footer */}
                  <div className="border-t border-zinc-700 pt-4 space-y-3">
                    <div className="flex items-center justify-between text-xs text-zinc-500">
                      <div className="flex items-center gap-1.5">
                        <CalendarDays size={14} />
                        <span>{createdDate}</span>
                      </div>
                      <span className="px-2 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-medium">
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
