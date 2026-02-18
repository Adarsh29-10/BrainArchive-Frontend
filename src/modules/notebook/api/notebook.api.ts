import { api } from "../../../shared/api/axios.api";
import type { Notebook } from "../types";

export const getNotebooks = async (): Promise<Notebook[]> => {
    const res = await api.get('/notebooks');
    return res.data.data;
}

export const getPublicNotebooks = async (): Promise<Notebook[]> => {
    const res = await api.get('/notebooks/public');
    return res.data.data;
}

export const createNotebook = async (data: {
    title: string;
    description?: string;
    blocks: [];
    isPublic: boolean;
    lastActivityAt: Date;
    totalTimeSpent: number;
}) => {
    const res = await api.post('/notebooks', data);
    return res.data.data;
}

export const updateNotebook = async (data: {
    notebookId: string,
    title: string,
    description?: string,
    isPublic: boolean
}) => {
    const {notebookId, ...payload} = data;
    const res = await api.put(`/notebooks/${notebookId}`, payload);
    return res.data.data;
}

export const deleteNotebook = async (id:string) => {
    const res = await api.delete(`/notebooks/${id}`);
    return res.data.data;
}

