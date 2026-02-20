import { useCallback, useMemo, useState } from 'react';
import { X, Upload, FileText } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import {convertMarkdownToBlocks} from '../index'
import { useAddNotebookBlockBulkSave } from '../../../hooks/useEditor';
import type { FileRejection } from 'react-dropzone';

interface ConvertNotesFromModalProps {
  isOpen: boolean;
  onClose: () => void;
  notebookId: string;
}

function ConvertNotesFromModal({ isOpen, onClose, notebookId }: ConvertNotesFromModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [markdownInput, setMarkdownInput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const addBlockMutation = useAddNotebookBlockBulkSave();

  const resetState = () => {
    setSelectedFile(null);
    setMarkdownInput('');
    setError('');
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const onDrop = useCallback(async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    if (rejectedFiles.length > 0) {
      const hasInvalidType = rejectedFiles.some((file) =>
        file.errors.some((item) => item.code === 'file-invalid-type')
      );

      setSelectedFile(null);
      setError(hasInvalidType ? 'Only .md files are supported.' : 'File could not be accepted.');
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const markdownText = await file.text();
      setSelectedFile(file);
      setMarkdownInput(markdownText);
      setError('');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
    accept: {
      'text/markdown': ['.md'],
      'text/plain': ['.md']
    }
  });

  const dropzoneClassName = useMemo(
    () =>
      `w-full rounded-xl border-2 border-dashed p-6 text-center transition-all duration-200 cursor-pointer ${
        isDragActive
          ? 'border-green-500 bg-green-950/20'
          : 'border-zinc-700 hover:border-zinc-600 bg-zinc-900/60'
      }`,
    [isDragActive]
  );

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!markdownInput.trim()) {
      setError('Please upload a markdown (.md) file or paste markdown text.');
      return;
    }

    const markdownText = markdownInput;
    const blocks = convertMarkdownToBlocks(markdownText);

    try {
        await addBlockMutation.mutateAsync({
          notebookId,
          blocks,
        });
      } catch (err) {
        console.error("Failed to add block", err);
      }

    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300" />

      <div className="relative w-full max-w-md mx-6 bg-zinc-950 rounded-2xl shadow-2xl animate-fadeIn border border-zinc-800">
        <div className="flex items-center justify-between p-3 sm:p-6 border-b border-zinc-800">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Convert Notes From .md</h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600"
            aria-label="Close modal"
          >
            <X size={24} className="text-zinc-400 hover:text-zinc-200" />
          </button>
        </div>

        <form onSubmit={handleConvert} className="p-4 sm:p-6 space-y-3">
          <div>
            <label className="block text-sm font-semibold text-zinc-100 mb-2">
              Markdown File
            </label>

            <div {...getRootProps({ className: dropzoneClassName })}>
              <input {...getInputProps()} />
              <Upload size={24} className="mx-auto mb-3 text-green-500" />

              {isDragActive ? (
                <p className="text-sm text-zinc-100 font-medium">Drop your .md file here</p>
              ) : (
                <>
                  <p className="text-sm text-zinc-100 font-medium">Drag and drop a .md file here</p>
                  <p className="text-xs text-zinc-500 mt-1">or click to browse files</p>
                </>
              )}
            </div>

            {selectedFile && (
              <div className="mt-3 flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2">
                <FileText size={16} className="text-green-400" />
                <p className="text-sm text-zinc-200 truncate">{selectedFile.name}</p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-100 mb-2">
              Markdown Text
            </label>
            <textarea
              value={markdownInput}
              onChange={(e) => {
                setMarkdownInput(e.target.value);
                setError('');
              }}
              placeholder="Paste markdown content here or upload a .md file above"
              rows={4}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {error && <p className="text-sm text-red-400 font-medium">{error}</p>}
          <p className="text-xs sm:text-sm text-zinc-400 font-medium">Caution: This process will replace all current notes and add .md file notes.</p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 rounded-lg border-2 border-zinc-700 text-zinc-200 font-semibold hover:bg-zinc-800 hover:border-zinc-600 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold hover:from-green-500 hover:to-green-400 hover:scale-105 transition-all duration-300 active:scale-95"
            >
              Convert
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

export default ConvertNotesFromModal;
