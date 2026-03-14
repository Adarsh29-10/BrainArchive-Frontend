import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteAiSession, getAiSessions, getAiSessionsById, renameAiSession } from "../api/ai.api"


export const useGetAiSessions = () => {
    return useQuery({
        queryKey: ['ai-sessionId'],
        queryFn: getAiSessions
    })
}

export const useGetAiSessionsById = (sessionId: string | null) => {
    return useQuery({
        queryKey: ['ai-sessionId', sessionId],
        queryFn: () => getAiSessionsById(sessionId as string),
        enabled: Boolean(sessionId)
    })
}

export const useDeleteAiSession = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteAiSession,
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: ["ai-sessionId"]})
        }
    })
}


export const useRenameAiSession = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: renameAiSession,
        onSuccess: ()=> {
            queryClient.invalidateQueries({ queryKey: ["ai-sessionId"] });
        },
    });
}
