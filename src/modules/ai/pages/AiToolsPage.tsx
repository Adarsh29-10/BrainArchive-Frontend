import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ComingSoonModal from '../components/ComingSoonModal';

function AiTools() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    navigate('/dashboard');
  };

  return (
    <div className="h-full bg-zinc-950 overflow-hidden">
      <ComingSoonModal isOpen={isOpen} onClose={handleClose} />
    </div>
  );
}

export default AiTools;
