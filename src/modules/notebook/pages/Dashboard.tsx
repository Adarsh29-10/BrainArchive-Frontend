import { useState } from 'react';
import AddNotebookButton from '../components/buttons/AddNotebookButton';
import AddNotebookModal from '../components/modals/AddNotebookModal';
import NotebookGrid from '../components/NotebookGrid';

function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    return (
        <div className="h-full bg-zinc-950 overflow-y-auto">
            
            {/* Main Content */}
            <div className="px-6 sm:px-16 py-4">
                <div className='flex items-center gap-3'>
                    {/* Add Button Section */}
                    <div className=" mb-6">
                        <AddNotebookButton onClick={() => setIsModalOpen(true)} />
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

        </div>
    );
}

export default Dashboard
