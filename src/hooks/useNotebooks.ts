import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
    getNotebooks,
    getPublicNotebooks,
    createNotebook, 
    updateNotebook, 
    deleteNotebook,
    getNotebookById,
    addNotebookBlock,
    deleteNotebookBlock,
    updateNotebookBlockContent
} from "../apis/notebook.api";


export const useNotebooks = () => {
    return useQuery({
        queryKey: ['notebooks'],
        queryFn: getNotebooks,
    });
};

export const usePublicNotebooks = () => {
    return useQuery({
        queryKey: ['public-notebooks'],
        queryFn: getPublicNotebooks,
    });
};


export const useCreateNotebook = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createNotebook,
        onSuccess: ()=> {
            queryClient.invalidateQueries({ queryKey: ["notebooks"] });
        },
    });
}


export const useUpdateNotebook = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateNotebook,
        onSuccess: ()=> {
            queryClient.invalidateQueries({ queryKey: ["notebooks"] });
        },
    });
}


export const useDeleteNotebook = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteNotebook,
        onSuccess: ()=> {
            queryClient.invalidateQueries({ queryKey: ["notebooks"] });
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
