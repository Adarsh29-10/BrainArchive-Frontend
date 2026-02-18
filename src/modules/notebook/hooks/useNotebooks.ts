import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
    getNotebooks,
    getPublicNotebooks,
    createNotebook, 
    updateNotebook, 
    deleteNotebook,
} from "../api/notebook.api";


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






