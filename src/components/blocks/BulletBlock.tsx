import { X } from 'lucide-react';

interface BulletBlockProps {
  block: {
    _id: string;
    content: string;
  };
  onChange: (id: string, value: string) => void;
  onDelete: (id: string) => void;
}

function BulletBlock({ block, onChange, onDelete }: BulletBlockProps) {
  const lines = block.content.split('\n');

  return (
    <div className="relative group  ml-4">

      <div className=" p-3 rounded-lg bg-transparent hover:bg-pink-50/20 transition-all">
        {lines.map((line, index) => (
          <div key={index} className="flex items-start gap-3 group/bullet">

            {/* Bullet */}
            <div className="pt-[4px] select-none text-gray-600 font-medium flex-shrink-0">•</div>

            {/* Text */}
            <textarea
              rows={1}
              className="flex-1 text-base leading-relaxed outline-none resize-none bg-transparent border-transparent focus:border-pink-400 focus:bg-pink-50/40 px-2 py-1 mr-2 rounded-sm transition-all"
              value={line}
              placeholder="Bullet point..."
              onChange={(e) => {
                const newLines = [...lines];
                newLines[index] = e.target.value;
                onChange(block._id, newLines.join('\n'));
              }}
            />

            {/* Delete button - show on hover */}
            {lines.length > 1 && (
              <button
                onClick={() => {
                  const newLines = lines.filter((_, i) => i !== index);
                  onChange(block._id, newLines.join('\n'));
                }}
                className="opacity-0 group-hover/bullet:opacity-100 p-1 text-red-600 hover:bg-red-100 rounded transition-all flex-shrink-0 mr-14"
                aria-label="Delete this bullet "
              >
                <X size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Delete entire block button */}
      <button
        onClick={() => onDelete(block._id)}
        className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all"
        aria-label="Delete bullet block"
      >
        <X size={20} />
      </button>
    </div>
  );
}

export default BulletBlock;
