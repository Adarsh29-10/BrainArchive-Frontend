import { BookOpen } from 'lucide-react';
import { useState } from 'react';
import NotebookCard from '../components/NotebookCard';
import DeleteModal from './modals/DeleteModal';
import EditNotebookModal from '../components/modals/EditNotebookModal';
import { useNotebooks, useDeleteNotebook } from '../hooks/useNotebooks';
import { LoadingState, ErrorState } from '../../../shared/ui/LoaderStates';
import type { Notebook } from '../types';

function NotebookGrid() {
  const { data, isLoading, isError, error } = useNotebooks();
  const deleteMutation = useDeleteNotebook();

  const [deleteTarget, setDeleteTarget] = useState<Notebook | null>(null);
  const [updateTarget, setUpdateTarget] = useState<Notebook | null>(null);

  if (isLoading) return <LoadingState message="Loading notebooks..." />;
  if (isError) return <ErrorState message={error?.message || 'Failed to load notebooks'} />;

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-16 px-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-zinc-800 rounded-full mb-4">
          <BookOpen size={40} className="text-zinc-300" />
        </div>
        <h3 className="text-2xl font-semibold text-zinc-600 mb-2">
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
      <div className=" space-y-1 ">
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
