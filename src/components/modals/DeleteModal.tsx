import { AlertTriangle, X } from 'lucide-react';

interface DeleteModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  itemName?: string;
  isLoading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean;
}

function DeleteModal({
  isOpen,
  title,
  message,
  itemName,
  isLoading = false,
  onCancel,
  onConfirm,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  isDangerous = true,
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-zinc-950 rounded-2xl shadow-2xl animate-fadeIn border border-zinc-800">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-950/40 rounded-lg">
              <AlertTriangle size={24} className="text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
          </div>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="p-2 rounded-lg hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-50"
            aria-label="Close modal"
          >
            <X size={24} className="text-zinc-400 hover:text-zinc-200" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Message */}
          <p className="text-zinc-300 leading-relaxed">
            {message}
          </p>

          {/* Item Name (if provided) */}
          {itemName && (
            <div className="p-4 bg-zinc-900 rounded-lg border-2 border-zinc-700">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1">Item to Delete:</p>
              <p className="text-base font-bold text-red-400 truncate">
                "{itemName}"
              </p>
            </div>
          )}

          {/* Warning Message */}
          {isDangerous && (
            <div className="p-3 bg-red-950/30 rounded-lg border-l-4 border-red-600">
              <p className="text-sm text-red-300">
                <strong>⚠️ Warning:</strong> This action cannot be undone. Please proceed with caution.
              </p>
            </div>
          )}
        </div>

        {/* Footer with Actions */}
        <div className="border-t border-zinc-800 p-6 flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-lg border-2 border-zinc-700 text-zinc-200 font-semibold hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
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

export default DeleteModal;
