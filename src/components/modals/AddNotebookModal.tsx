import { useState } from 'react';
import { X } from 'lucide-react';
import { useCreateNotebook } from '../../hooks/useNotebooks';

interface AddNotebookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddNotebookModal({ isOpen, onClose }: AddNotebookModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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
      isPublic: false,
      lastActivityAt: new Date(),
      totalTimeSpent: 0
    });
    setTitle('');
    setDescription('');
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
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
      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Create Notebook</h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-200"
            aria-label="Close modal"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
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
              placeholder="e.g., Machine Learning Basics"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-100 ${
                errors.title
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 bg-white hover:border-gray-400'
              }`}
            />
            {errors.title && (
              <p className="mt-2 text-sm text-red-600 font-medium">{errors.title}</p>
            )}
          </div>

          {/* Description Input */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
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
              rows={4}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-100 resize-none ${
                errors.description
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 bg-white hover:border-gray-400'
              }`}
            />
            {errors.description && (
              <p className="mt-2 text-sm text-red-600 font-medium">{errors.description}</p>
            )}
          </div>

          {/* Character count */}
          <div className="text-xs text-gray-500">
            Description: {description.length} characters
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-lg bg-pink-400 text-black font-semibold hover:bg-pink-500 hover:scale-105 transition-all duration-300  active:scale-95"
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
