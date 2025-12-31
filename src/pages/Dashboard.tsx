import { useState, useCallback } from 'react';
import type { Notebook, NotebookFormData } from '../types/notebook';
import AddNotebookButton from '../components/buttons/AddNotebookButton';
import AddNotebookModal from '../components/modals/AddNotebookModal';
import NotebookGrid from '../components/grids/NotebookGrid';


function Dashboard() {
    const [notebooks, setNotebooks] = useState<Notebook[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalSubmit = useCallback((formData: NotebookFormData) => {
        const newNotebook: Notebook = {
            id: new Date().toString(),
            ...formData,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        setNotebooks((prevNotebooks) => [newNotebook, ...prevNotebooks]);
        setIsModalOpen(false);
    }, []);

    const handleDeleteNotebook = useCallback((id: string) => {
        setNotebooks((prevNotebooks) =>
            prevNotebooks.filter((notebook) => notebook.id !== id)
        );
    }, []);

    return (
        <div className="min-h-screen bg-white p-8 sm:px-6 lg:px-16">

            {/* Heading */}
            <div className='mb-10'>
                <h1 className="text-4xl font-semibold text-gray-900 ">My Notebooks</h1>
            </div>
            
            {/* Notebooks Grid */}
            <div className="max-w-7xl mx-auto">    
                <NotebookGrid
                    notebooks={notebooks}
                    onDeleteNotebook={handleDeleteNotebook}
                    onNotebookClick={(notebook) => {
                        // TODO: Navigate to notebook detail page
                        console.log('Opening notebook:', notebook);
                    }}
                />
            </div>
            
            {/* Add Button Section */}
            <div className="absolute right-20 bottom-20">
                <AddNotebookButton onClick={()=> setIsModalOpen(true)}/>
            </div>

            {/* Add Notebook Modal */}
            <AddNotebookModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
            />
        </div>
    );
}

export default Dashboard