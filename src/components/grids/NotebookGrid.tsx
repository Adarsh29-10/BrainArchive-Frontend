import { BookOpen } from 'lucide-react';
import { useState } from 'react';
import NotebookCard from '../cards/NotebookCard';
import DeleteModal from '../modals/DeleteModal';
import EditNotebookModal from '../modals/EditNotebookModal';
import { useNotebooks, useDeleteNotebook } from '../../hooks/useNotebooks';
import type { Notebook } from '../../types/notebook';

function NotebookGrid() {
  const { data, isLoading, isError, error } = useNotebooks();
  const deleteMutation = useDeleteNotebook();

  const [deleteTarget, setDeleteTarget] = useState<Notebook | null>(null);
  const [updateTarget, setUpdateTarget] = useState<Notebook | null>(null);

  if (isLoading) return <div>Loading..</div>;
  if (isError) return <div>{error.message}</div>;

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-16 px-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
          <BookOpen size={40} className="text-gray-300" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-600 mb-2">
          No notebooks yet
        </h3>
        <p className="text-gray-500 text-lg">
          Create your first notebook to get started!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {data.map((notebook) => (
          <NotebookCard
            key={notebook._id}
            notebook={notebook}
            onDeleteClick={setDeleteTarget}
            onUpdateClick={setUpdateTarget}
          />
        ))}
      </div>

      {/* DELETE MODAL */}
      <DeleteModal
        isOpen={!!deleteTarget}
        title="Delete Notebook"
        message="Are you sure you want to delete this notebook?"
        itemName={deleteTarget?.title}
        isLoading={deleteMutation.isPending}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (!deleteTarget) return;
          deleteMutation.mutate(deleteTarget._id, {
            onSuccess: () => setDeleteTarget(null),
          });
        }}
      />

      {/* EDIT MODAL */}
      <EditNotebookModal
        notebook={updateTarget}
        onClose={() => setUpdateTarget(null)}
      />
    </>
  );
}

export default NotebookGrid;
