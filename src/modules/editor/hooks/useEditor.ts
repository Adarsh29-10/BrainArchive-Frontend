import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addNotebookBlock, deleteNotebookBlock, getNotebookById, updateNotebookBlockContent } from "../api/editor.api";

export const useAddNotebookBlock = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addNotebookBlock,
        onSuccess: ()=> {
            queryClient.invalidateQueries({ queryKey: ["notebooks"] });
        },
    });
}

export const useDeleteNotebookBlock = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteNotebookBlock,
        onSuccess: ()=> {
            queryClient.invalidateQueries({ queryKey: ["notebooks"] });
        },
    })
}

export const useUpdateNotebookBlockContent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateNotebookBlockContent,

        retry: 3,
        retryDelay:1500,

        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ 
                queryKey: ['notebook', variables.notebookId]
            })
            
        },
    });
}

export const useGetNotebookById = (notebookId: string | undefined) => {
    return useQuery({
        queryKey: ['notebooks', notebookId],
        queryFn: () =>  getNotebookById(notebookId),
        enabled: !!notebookId
    })
}