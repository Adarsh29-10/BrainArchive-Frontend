import { useState, useCallback } from 'react';
import type { Notebook, NotebookFormData } from '../types/notebook';
import AddNotebookButton from '../components/buttons/AddNotebookButton';
import AddNotebookModal from '../components/modals/AddNotebookModal';
import NotebookGrid from '../components/grids/NotebookGrid';
import Navbar from '../components/navbar/Navbar';


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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <Navbar />
            
            {/* Main Content */}
            <div className="pl-16 pr-16 py-8">
                <div className='flex items-center justify-between'>
                    {/* Heading */}
                    <div className="mb-12">
                        <h1 className="text-5xl font-bold text-gray-900 mb-2">My Notebooks</h1>
                        
                        <p className="text-gray-600 text-lg">{notebooks.length} notebook{notebooks.length !== 1 ? 's' : ''}</p>
                    </div>
                    
                    {/* Add Button Section */}
                    <div className="mb-12">
                        <AddNotebookButton onClick={() => setIsModalOpen(true)} />
                    </div>
                </div>

                {/* Notebooks Grid */}
                <div>    
                    <NotebookGrid
                        notebooks={notebooks}
                        onDeleteNotebook={handleDeleteNotebook}
                        onNotebookClick={(notebook) => {
                            // TODO: Navigate to notebook detail page
                            console.log('Opening notebook:', notebook);
                        }}
                    />
                </div>
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