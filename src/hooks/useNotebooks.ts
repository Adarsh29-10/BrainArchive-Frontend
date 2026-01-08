import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
    getNotebooks,
    createNotebook, 
    updateNotebook, 
    deleteNotebook,
    getNotebookById,
    updateNotebookBlock
} from "../apis/notebook.api";


export const useNotebooks = () => {
    return useQuery({
        queryKey: ['notebooks'],
        queryFn: getNotebooks,
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

export const useGetNotebookById = () => {
    return useMutation({
        mutationFn: getNotebookById
    })
}


export const useUpdateNotebookBlock = () => {
    return useMutation({
        mutationFn: updateNotebookBlock,
    });
}