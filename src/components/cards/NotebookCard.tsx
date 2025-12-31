import { Trash2, BookOpen } from 'lucide-react';
import type { Notebook } from '../../types/notebook';

interface NotebookCardProps {
  notebook: Notebook;
  onClick?: () => void;
}

function NotebookCard({ notebook, onClick }: NotebookCardProps) {


  return (
    <div
      onClick={onClick}
      className="group bg-white py-5 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-pink-300 cursor-pointer"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="p-3 bg-pink-100 rounded-lg group-hover:bg-pink-200 transition-colors flex-shrink-0">
              <BookOpen size={24} className="text-pink-600" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xl font-bold text-gray-900 truncate group-hover:text-pink-600 transition-colors">
                {notebook.title} 
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {notebook.description}
              </p>
            </div>
          </div>

          {/* Delete Button */}
          <button
            // onClick={}
            className="p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-100 text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 flex-shrink-0 ml-2"
            aria-label="Delete notebook"
          >
            <Trash2 size={20} />
          </button>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Created {new Date(notebook.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      
    </div>
  );
}

export default NotebookCard;
