import { useEffect, useRef, useState } from 'react';
import { Trash2, Edit, Globe, Lock, CalendarDays, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Notebook } from '../../types/notebook';

interface NotebookCardProps {
  notebook: Notebook;
  onDeleteClick: (notebook: Notebook) => void;
  onUpdateClick: (notebook: Notebook) => void;
}

function NotebookCard({ notebook, onDeleteClick, onUpdateClick }: NotebookCardProps) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const createdDate = new Date(notebook.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOpen = () => {
    navigate(`/nb/${notebook._id}`);
  };

  return (
    <article className="group w-full rounded-xl border border-zinc-600 bg-zinc-900 text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-400 hover:bg-zinc-800 hover:shadow-lg hover:shadow-zinc-900/40">
      <div className="flex items-start justify-between gap-3 p-4 sm:gap-4 sm:p-5">
        <div
          className="flex min-w-0 flex-1 cursor-pointer items-start"
          onClick={handleOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleOpen();
            }
          }}
          aria-label={`Open notebook ${notebook.title}`}
        >
          <div className="min-w-0 flex-1 pr-1">
            <div className="mb-1.5 flex items-center gap-2.5">
              <h3 className="truncate text-lg font-semibold leading-tight text-zinc-100 sm:text-xl">
                {notebook.title}
              </h3>

              <span className="mt-0.5 text-zinc-300">
                {notebook.isPublic ? <Globe size={16} /> : <Lock size={16} />}
              </span>
            </div>
            <p className="line-clamp-2 text-xs leading-5 text-zinc-400 sm:text-sm">
              {notebook.description?.trim() || ' '}
            </p>
            <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-zinc-500 sm:mt-3 sm:text-xs">
              <CalendarDays size={13} />
              <span>Created {createdDate}</span>
            </div>
          </div>
        </div>

        <div ref={menuRef} className="relative flex shrink-0 items-start">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen((prev) => !prev);
            }}
            className="rounded-lg border border-zinc-600 bg-zinc-800 p-1.5 text-zinc-300 transition hover:border-zinc-400 hover:bg-zinc-700 hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500/60"
            aria-label="Open notebook actions"
            aria-expanded={isMenuOpen}
          >
            <MoreVertical size={16} />
          </button>

          {isMenuOpen && (
            <div className="absolute right-8 top-0 z-20 sm:w-36 rounded-lg border border-zinc-600 bg-zinc-900 p-1 shadow-xl">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(false);
                  onUpdateClick(notebook);
                }}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs text-zinc-200 transition hover:bg-zinc-800 hover:text-blue-300"
              >
                <Edit size={14} />
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(false);
                  onDeleteClick(notebook);
                }}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs text-zinc-200 transition hover:bg-zinc-800 hover:text-red-300"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default NotebookCard;
