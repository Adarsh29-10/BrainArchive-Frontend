import { useCallback } from 'react';
import type { ComponentOptionType } from '../types/componentOption';
// import Sidebar from '../components/sidebar/Sidebar';
import ComponentPicker from '../components/pickers/ComponentPicker';

function LearningSession() {
  const handleSelectComponent = useCallback((type: ComponentOptionType) => {
    console.log(`Selected component: ${type}`);
    // TODO: Add component to the main content area
  }, []);

  return (
    
    // <div>
    //     <h1 className="text-4xl font-semibold text-gray-900 mb-2">Learning Session</h1>
    //     <p className="text-gray-600 mb-8">Start adding content by selecting options from the sidebar →</p>
    //   </div>
    <div className="min-h-screen flex gap-10 w-full bg-white px-4 sm:px-6 lg:px-16 lg:py-8">

      {/* Main Content Area */}
      <div className='relative min-h-screen flex-1 lg:px-14 lg:py-2 bg-white border-2 w-[80%]'>

        {/* Today's Learning  */}
        <div className=' flex justify-between items-center mb-10'>
          <h1 className="text-3xl font-semibold text-gray-700 mb-2">Today's Learning</h1>
          <div className='flex gap-4'>
            <h1>Date</h1>
            <h1>Time</h1>
          </div>
        </div>

        {/* main content */}
        <h1 className='text-4xl my-2'>Heading look like this</h1>
        <p className='text-xl'>Paragraph look like this</p>
        <image className='absolute h-64 w-72 my-10 bg-black text-white p-20'>
            some image
        </image>
        <div className='absolute h-64 w-72 my-10 bg-black text-white p-20'>
            some video
        </div>

        <div className='h-10 w-2xl border-2'>
          some link of resources
        </div>
      </div>


      {/* Sidebar Header */}
      <aside className={`w-[20%] bg-gray-50 border-l border-gray-200 overflow-y-auto`}>
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
          <h2 className="text-lg font-bold text-gray-900">Components</h2>
        </div>

        {/* Sidebar Content */}
        <div className="p-4">
          <ComponentPicker />
        </div>
      </aside>
    </div>
  );
}

export default LearningSession;
