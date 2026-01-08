import { Trash2, BookOpen, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Notebook } from '../../types/notebook';
import { useGetNotebookById } from '../../hooks/useNotebooks';

interface NotebookCardProps {
  notebook: Notebook;
  onDeleteClick: (notebook: Notebook) => void;
  onUpdateClick: (notebook: Notebook) => void;
}

function NotebookCard({ notebook, onDeleteClick, onUpdateClick}: NotebookCardProps) {
  const navigate = useNavigate();
  
  return (
    <div className="group bg-white rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-200 hover:border-pink-300 cursor-pointer"
    >
      <div 
        className="p-6" 
        onClick={()=> navigate(`/nb/${notebook._id}`)}>

        {/* title and description */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="p-3 bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg group-hover:from-pink-200 group-hover:to-pink-300 transition-all flex-shrink-0">
              <BookOpen size={24} className="text-pink-600" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-pink-600 transition-colors">
                {notebook.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {notebook.description}
              </p>
            </div>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
          <span>Created {new Date(notebook.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

        {/* Action Buttons */}
      <div className="flex gap-2 pt-4 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-6">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onUpdateClick(notebook)
          }}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 active:scale-95"
          aria-label="Edit notebook"
        >
          <Edit size={18} />
          <span className="text-sm">Edit</span>
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDeleteClick(notebook)
          }}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 active:scale-95"
          aria-label="Delete notebook"
        >
          <Trash2 size={18} />
          <span className="text-sm">Delete</span>
        </button>
      </div>
      

      
    </div>
  );
}

export default NotebookCard;
