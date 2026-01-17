import { useState } from 'react';
import { X, Lock, Globe } from 'lucide-react';
import { useCreateNotebook } from '../../hooks/useNotebooks';

interface AddNotebookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddNotebookModal({ isOpen, onClose }: AddNotebookModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const createNotebookMutation = useCreateNotebook();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { title?: string; description?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    createNotebookMutation.mutate({
      title, 
      description,
      blocks: [],
      isPublic,
      lastActivityAt: new Date(),
      totalTimeSpent: 0
    });
    setTitle('');
    setDescription('');
    setIsPublic(false);
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setIsPublic(false);
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        // onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-6 bg-zinc-950 rounded-2xl shadow-2xl animate-fadeIn border border-zinc-800">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-6 border-b border-zinc-800">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Create Notebook</h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-600"
            aria-label="Close modal"
          >
            <X size={24} className="text-zinc-400 hover:text-zinc-200" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5">
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-zinc-100 mb-1 sm:mb-2">
              Notebook Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) {
                  setErrors({ ...errors, title: undefined });
                }
              }}
              placeholder="e.g., Python Basics"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-600/50 bg-zinc-900 text-white placeholder-zinc-500 ${
                errors.title
                  ? 'border-red-600 bg-red-950/20'
                  : 'border-zinc-700 hover:border-zinc-600'
              }`}
            />
            {errors.title && (
              <p className="mt-2 text-sm text-red-400 font-medium">{errors.title}</p>
            )}
          </div>

          {/* Description Input */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-zinc-100 mb-1 sm:mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) {
                  setErrors({ ...errors, description: undefined });
                }
              }}
              placeholder="Add a description for your notebook..."
              rows={2}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-600/50 resize-none bg-zinc-900 text-white placeholder-zinc-500 ${
                errors.description
                  ? 'border-red-600 bg-red-950/20'
                  : 'border-zinc-700 hover:border-zinc-600'
              }`}
            />
            {errors.description && (
              <p className="mt-2 text-sm text-red-400 font-medium">{errors.description}</p>
            )}
          </div>

          {/* Character count
          <div className="text-xs text-zinc-500">
            Description: {description.length} characters
          </div> */}

          {/* Public/Private Toggle */}
          <div className="space-y-3 bg-zinc-800/30 rounded-lg p-2 border border-zinc-700">
            
            <div className="flex gap-3">
              {/* Private Option */}
              <button
                type="button"
                onClick={() => setIsPublic(false)}
                className={`flex-1 flex items-center justify-center gap-2 px-1 py-1.5 rounded-lg font-medium transition-all duration-200 ${
                  !isPublic
                    ? 'bg-blue-600 text-white border-2 border-blue-500'
                    : 'bg-zinc-700 text-zinc-300 border-2 border-zinc-600 hover:bg-zinc-600'
                }`}
              >
                <Lock size={16} />
                Private
              </button>

              {/* Public Option */}
              <button
                type="button"
                onClick={() => setIsPublic(true)}
                className={`flex-1 flex items-center justify-center gap-2 px-1 py-1.5 rounded-lg font-medium transition-all duration-200 ${
                  isPublic
                    ? 'bg-blue-600 text-white border-2 border-blue-500'
                    : 'bg-zinc-700 text-zinc-300 border-2 border-zinc-600 hover:bg-zinc-600'
                }`}
              >
                <Globe size={16} />
                Public
              </button>
            </div>

            <p className="text-xs text-zinc-400 mt-2">
              {isPublic 
                ? 'This notebook can be shared and viewed by others' 
                : 'This notebook is only visible to you'}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-3 rounded-lg border-2 border-zinc-700 text-zinc-200 font-semibold hover:bg-zinc-800 hover:border-zinc-600 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-600"
              >
                Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-pink-600 to-pink-500 text-white font-semibold hover:from-pink-500 hover:to-pink-400 hover:scale-105 transition-all duration-300 active:scale-95"
            >
              Create
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0);
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

export default AddNotebookModal
