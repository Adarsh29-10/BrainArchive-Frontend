import { useState } from 'react';
import AddNotebookButton from '../components/buttons/AddNotebookButton';
import AddNotebookModal from '../components/modals/AddNotebookModal';
import NotebookGrid from '../components/grids/NotebookGrid';

 function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    

    return (
        <div className="h-full bg-zinc-950 overflow-y-auto">
            
            {/* Main Content */}
            <div className="px-6 sm:px-16 py-4">
                <div className='flex items-center justify-between'>
                    {/* Add Button Section */}
                    <div className="mt-2 mb-10">
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