import { useParams } from 'react-router-dom';
import BlockRenderer from '../components/blocks/BlockRenderer';
import { useGetNotebookById } from '../hooks/useNotebooks';
import { NotebookErrorState, NotebookLoadingState } from '../components/loaders/LoaderStates';
import type { Block } from '../types/block';

function PublicEditor() {
  const { notebookId } = useParams<{ notebookId: string | undefined }>();
  const { data, isPending, isError } = useGetNotebookById(notebookId);

  if (isPending) return <NotebookLoadingState />;
  if (isError || !data) return <NotebookErrorState />;

  return (
    <div className="h-full min-h-0 overflow-hidden bg-zinc-950">
      <main className="h-full min-h-0 px-5 sm:px-6 py-4 overflow-y-auto">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100">
            {data.title}
          </h1>
          {data.description?.trim() && (
            <p className="mt-2 text-sm sm:text-base text-zinc-400">{data.description}</p>
          )}
        </div>

        {(data.blocks as Block[] | undefined)?.map((block, index) => (
          <BlockRenderer
            key={block._id ?? `public-block-${index}`}
            block={block}
            onChange={() => {}}
            autoFocus={null}
            setFocusedBlockId={() => {}}
            moveBlockFocus={() => {}}
            readOnly
          />
        ))}
      </main>
    </div>
  );
}

export default PublicEditor;
