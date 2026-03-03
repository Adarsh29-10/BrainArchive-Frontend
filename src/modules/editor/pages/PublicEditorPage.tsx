import { useState } from 'react';
import { Check, Heart, LinkIcon, UserCircle2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import BlockRenderer from '../components/blocks/BlockRenderer';
import { useGetPublicNotebookById } from '../hooks/useEditor';
import { NotebookErrorState, NotebookLoadingState } from '../../../shared/ui/LoaderStates';
import type { Block } from '../types';

type PublicNotebookDetails = {
  title: string;
  description?: string;
  blocks?: Block[];
  createdAt?: string | Date;
  userId: {
    _id: string,
    name: string,
    picture: string
  }
};

function PublicEditorPage() {
  const { notebookId } = useParams<{ notebookId: string | undefined }>();
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const { data, isPending, isError } = useGetPublicNotebookById(notebookId);

  if (isPending) return <NotebookLoadingState />;
  if (isError || !data) return <NotebookErrorState />;

  const notebook = data as PublicNotebookDetails;
  const ownerName = notebook.userId?.name?.trim() || 'Unknown author';
  const ownerAvatar = notebook.userId?.picture || null;
  // const ownerId = notebook.userId._id;

  const createdAtLabel = (() => {
    if (!notebook.createdAt) return 'Unknown date';
    const date = new Date(notebook.createdAt);
    if (Number.isNaN(date.getTime())) return 'Unknown date';
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: 'numeric',
      year: 'numeric',
    });
  })();

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleLike = async () => {
      setLiked(prev => !prev);
  };

  return (
    <div className="relative h-full min-h-0 overflow-x-hidden bg-zinc-950">
      {/* ── sticky header ── */}
      <header className="shrink border-b border-zinc-800 bg-green-900/15 backdrop-blur-md">
        <div className="px-5 py-4 sm:px-6 sm:py-5">
          
          <div className='flex items-baseline gap-6'>
            <h1 className="text-lg sm:text-2xl font-bold leading-tight text-zinc-100 ">
              {notebook.title}
            </h1>

            <div className="text-xs text-zinc-400">
              <span>{createdAtLabel}</span>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-700/60 bg-zinc-800/60 px-2.5 py-1 text-xs text-zinc-200">
              {ownerAvatar ? (
                <img
                  src={ownerAvatar}
                  alt={ownerName}
                  className="h-5 w-5 rounded-full border border-zinc-700 object-cover"
                />
              ) : (
                <UserCircle2 className="h-4 w-4 text-zinc-400" />
              )}
              <span className="max-w-20 truncate sm:max-w-48">
                {ownerName}
              </span>
            </div>

            <button
              onClick={handleShare}
              title={copied ? 'Link copied!' : 'Copy link to share'}
              className="shrink-0 rounded-lg border border-blue-700 bg-blue-800/20 p-1.5 px-2 text-zinc-400 transition-all hover:border-zinc-600 hover:bg-zinc-700/80 hover:text-zinc-200 active:scale-95"
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-400" />
              ) : (
                <LinkIcon className="h-4 w-4 text-blue-600" />
              )}
            </button>

            <button
              onClick={handleLike}
              title={liked ? 'Liked' : 'Click to like'}
              className="shrink-0 rounded-lg border border-zinc-700 bg-red-800/20 p-1.5 px-2 text-zinc-400 transition-all hover:border-zinc-600 hover:bg-zinc-700/80 hover:text-zinc-200 active:scale-95"
            >
              {liked ? (
                <Heart className="h-5 w-5 text-red-500 fill-red-500" />
              ) : (
                <Heart className="h-5 w-5 text-red-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── content ── */}
      <main className="min-h-0 overflow-y-auto px-5 py-4 pb-24 sm:px-6">
        {(notebook.blocks as Block[] | undefined)?.map((block, index) => (
          <BlockRenderer
            key={block._id ?? `public-block-${index}`}
            block={block}
            onChange={() => {}}
            autoFocus={null}
            setFocusedBlockId={() => {}}
            moveBlockFocus={() => {}}
            readOnly
          />
        ))}
      </main>

      <footer className="sticky bottom-2 pointer-events-none inset-x-0 z-50 p-2 sm:p-3">
        <div className="pointer-events-auto mx-auto flex max-w-4xl items-center justify-between gap-2 rounded-lg border border-zinc-800 bg-zinc-900/90 px-3 py-2 shadow-2xl shadow-black/40 backdrop-blur-md sm:gap-4 sm:rounded-xl sm:px-5 sm:py-2.5">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="hidden text-base sm:inline">📖</span>
            <p className="text-xs leading-tight text-zinc-400 sm:text-sm">
              <span className="font-medium text-zinc-200">BrainArchive</span>
              <span className="mx-1 hidden text-zinc-600 sm:inline">·</span>
              <br className="sm:hidden" />
              <span>Create your own free notebook</span>
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex shrink-0 items-center gap-1 rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-md hover:shadow-blue-500/20 sm:px-4 sm:py-2 sm:text-sm"
          >
            Get Started
            <span className="hidden sm:inline">→</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default PublicEditorPage;
