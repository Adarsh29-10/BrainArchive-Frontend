import { Sparkle } from "lucide-react";
import { useGetAiSessions } from "../../hooks/useAi"
import AiChatCard from "../cards/AiChatCard"
import { LoadingState, ErrorState } from '../../../../shared/ui/LoaderStates'

interface Card {
  _id: string;
  sessionId: string;
  title: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

function ChatGrid() {

  const { data, error, isError, isLoading } = useGetAiSessions(); 

  if (isLoading) return <LoadingState />
  if (isError) return <ErrorState message={error?.message || 'Failed to load chats'} />
  
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-16 px-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-zinc-800 rounded-full mb-4">
          <Sparkle size={40} className="text-zinc-300" />
        </div>
        <h3 className="text-2xl font-semibold text-zinc-600 mb-2">
          No chats yet
        </h3>
        <p className="text-gray-500 text-lg">
          Create your first chat with BrainArchive
        </p>
      </div>
    );
  }

  console.log(data)
  return (
    <div className=" space-y-2">
      {
        data.map((card: Card) => (
          <AiChatCard 
            key={card._id}
            title={card.title}
            sessionId={card.sessionId}
          />
        ))
      }
    </div>
  )
}

export default ChatGrid