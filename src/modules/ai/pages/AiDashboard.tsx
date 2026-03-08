import NewChatAiButton from '../components/buttons/NewChatAiButton';
import ChatGrid from '../components/grids/ChatGrid';

function AiDashboard() {
  return (
    <div className="h-full bg-zinc-950 overflow-y-auto">
            
            {/* Main Content */}
            <div className="px-6 sm:px-16 py-4">
                <div className='flex items-center gap-3 mb-6'>
                    {/* Add Button Section */}
                    <NewChatAiButton />
                </div>

                {/* Chat Grid */}
                <ChatGrid />
            </div>
        </div>
  );
}

export default AiDashboard;
