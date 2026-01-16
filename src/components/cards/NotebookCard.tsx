import { Trash2, BookOpen, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Notebook } from '../../types/notebook';

interface NotebookCardProps {
  notebook: Notebook;
  onDeleteClick: (notebook: Notebook) => void;
  onUpdateClick: (notebook: Notebook) => void;
}

function NotebookCard({ notebook, onDeleteClick, onUpdateClick}: NotebookCardProps) {
  const navigate = useNavigate();
  
  return (
    <div className="group w-full bg-zinc-950 text-white rounded-lg border border-gray-700 hover:border-pink-400 hover:bg-zinc-800 transition-all duration-200 cursor-pointer overflow-hidden">
      {/* Main clickable row */}
      <div 
        className="flex items-center justify-between px-4 py-3 hover:bg-gray-800/50 transition-colors"
        onClick={() => navigate(`/nb/${notebook._id}`)}
      >
        {/* Left section: Icon + Content */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Icon */}
          <div className="p-2 bg-gradient-to-br from-pink-900 to-pink-800 rounded-lg group-hover:from-pink-800 group-hover:to-pink-700 transition-all flex-shrink-0">
            <BookOpen size={20} className="text-pink-400" />
          </div>

          {/* Title, Description, Date */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-white truncate transition-colors">
                {notebook.title}
              </h3>
              <span className="text-xs text-zinc-500 flex-shrink-0">
                {new Date(notebook.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-xs text-zinc-400 truncate mt-0.5">
              {notebook.description || 'No description'}
            </p>
          </div>
        </div>

        {/* Right section: Action links */}
        <div className="flex items-center gap-4 flex-shrink-0 ml-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpdateClick(notebook)
            }}
            className="text-zinc-400 hover:text-blue-400 transition-colors text-xs font-medium flex items-center gap-1 hover:underline"
            aria-label="Edit notebook"
          >
            <Edit size={14} />
            <span>Edit</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick(notebook)
            }}
            className="text-zinc-400 hover:text-red-400 transition-colors text-xs font-medium flex items-center gap-1 hover:underline"
            aria-label="Delete notebook"
          >
            <Trash2 size={14} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotebookCard;
