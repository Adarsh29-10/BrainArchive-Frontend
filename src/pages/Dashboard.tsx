import { useState, useEffect } from 'react';
import type { Notebook } from '../types/notebook';
import AddNotebookButton from '../components/buttons/AddNotebookButton';
import AddNotebookModal from '../components/modals/AddNotebookModal';
import Navbar from '../components/navbar/Navbar';
import NotebookGrid from '../components/grids/NotebookGrid';

 function Dashboard() {
    const [notebooks, setNotebooks] = useState<Notebook[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    

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