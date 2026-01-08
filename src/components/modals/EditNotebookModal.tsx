import { useEffect, useState } from 'react';
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
  const [errors, setErrors] = useState<{ title?: string }>({});

  // 🔑 Prefill form when notebook changes
  useEffect(() => {
    if (notebook) {
      setTitle(notebook.title);
      setDescription(notebook.description || '');
    }
  }, [notebook]);

  if (!notebook) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setErrors({ title: 'Title is required' });
      return;
    }

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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl">
        <div className="flex justify-between p-6 border-b">
          <h2 className="text-xl font-bold">Edit Notebook</h2>
          <button onClick={onClose}><X /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Title"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Description"
          />

          <button
            type="submit"
            disabled={editNotebookMutation.isPending}
            className="w-full bg-pink-400 py-2 rounded"
          >
            {editNotebookMutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditNotebookModal;
