import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddNotebookButton from '../components/buttons/AddNotebookButton';
import AddNotebookModal from '../components/modals/AddNotebookModal';
import NotebookGrid from '../components/grids/NotebookGrid';
import AiSummaryButton from '../components/buttons/AiSummaryButton';
import ComingSoonModal from '../components/modals/ComingSoonModal';
import PublicNotebooksButton from '../components/buttons/PublicNotebooksButton';

 function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isComingSoonModalOpen, setIsComingSoonModalOpen] = useState(false);
    const navigate = useNavigate();
    

    return (
        <div className="h-full bg-zinc-950 overflow-y-auto">
            
            {/* Main Content */}
            <div className="px-6 sm:px-16 py-4">
                <div className='flex items-center gap-3'>
                    {/* Add Button Section */}
                    <div className="mt-2 mb-10">
                        <AddNotebookButton onClick={() => setIsModalOpen(true)} />
                    </div>
                    <div className="mt-2 mb-10">
                        <PublicNotebooksButton onClick={() => navigate('/notebooks')} />
                    </div>
                    <div className="mt-2 mb-10">
                        <AiSummaryButton onClick={() => setIsComingSoonModalOpen(true)} />
                    </div>
                </div>

                {/* Notebooks Grid */}
                <NotebookGrid/>
            </div>

            {/* Add Notebook Modal - DONE*/}
            <AddNotebookModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            <ComingSoonModal
                isOpen={isComingSoonModalOpen}
                onClose={() => setIsComingSoonModalOpen(false)}
            />

        </div>
    );
}

export default Dashboard
