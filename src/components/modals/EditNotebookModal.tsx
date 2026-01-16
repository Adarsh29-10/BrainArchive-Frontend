import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useUpdateNotebook } from '../../hooks/useNotebooks';
import type { Notebook } from '../../types/notebook';

interface EditNotebookModalProps {
  notebook: Notebook | null;
  onClose: () => void;
}

function EditNotebookModal({ notebook, onClose }: EditNotebookModalProps) {
  const editNotebookMutation = useUpdateNotebook();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState('');

  useEffect(() => {
    if (notebook) {
      requestAnimationFrame(() => {
        setTitle(notebook.title || '');
        setDescription(notebook.description || '');
        setTitleError('');
      });
    }
  }, [notebook]);

  if (!notebook) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setTitleError('Title is required');
      return;
    }

    setTitleError('');

    editNotebookMutation.mutate(
      {
        notebookId: notebook._id,
        title,
        description,
      },
      {
        onSuccess: () => onClose(),
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      <div className="relative w-full max-w-md mx-6 bg-zinc-950 rounded-2xl shadow-2xl animate-fadeIn border border-zinc-800">
        <div className="flex justify-between items-center p-6 border-b border-zinc-800">
          <h2 className="text-2xl font-bold text-white">Edit Notebook</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-600"
          >
            <X size={24} className="text-zinc-400 hover:text-zinc-200" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-zinc-100 mb-2">
              Notebook Title
            </label>
            <input
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (titleError) setTitleError('');
              }}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-600/50 bg-zinc-900 text-white placeholder-zinc-500 ${
                titleError
                  ? 'border-red-600 bg-red-950/20'
                  : 'border-zinc-700 hover:border-zinc-600'
              }`}
              placeholder="Notebook title..."
            />
            {titleError && <p className="text-red-400 text-sm mt-2 font-medium">{titleError}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-zinc-100 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-zinc-700 hover:border-zinc-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-600/50 resize-none bg-zinc-900 text-white placeholder-zinc-500"
              placeholder="Notebook description..."
              rows={4}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={editNotebookMutation.isPending}
              className="flex-1 px-4 py-3 rounded-lg border-2 border-zinc-700 text-zinc-200 font-semibold hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-600 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={editNotebookMutation.isPending}
              className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-pink-600 to-pink-500 text-white font-semibold hover:from-pink-500 hover:to-pink-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-600 disabled:opacity-50 active:scale-95"
            >
              {editNotebookMutation.isPending ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default EditNotebookModal;
