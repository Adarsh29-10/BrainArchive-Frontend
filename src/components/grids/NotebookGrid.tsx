import { BookOpen } from 'lucide-react';
import type { Notebook } from '../../types/notebook';
import NotebookCard from '../cards/NotebookCard';

interface NotebookGridProps {
  notebooks: Notebook[];
  onDeleteNotebook: (id: string) => void;
  onNotebookClick?: (notebook: Notebook) => void;
}

function NotebookGrid({ notebooks, onDeleteNotebook, onNotebookClick }: NotebookGridProps) {
  if (notebooks.length === 0) {
    return (
      <div className="text-center py-16 px-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
          <BookOpen size={40} className="text-gray-300" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-600 mb-2">No notebooks yet</h3>
        <p className="text-gray-500 text-lg">Create your first notebook to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {notebooks.map((notebook) => (
        <NotebookCard
          key={notebook.id}
          notebook={notebook}
          onDelete={onDeleteNotebook}
          onClick={() => onNotebookClick?.(notebook)}
        />
      ))}
    </div>
  );
}

export default NotebookGrid;
