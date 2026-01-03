import { api } from "./axios.api";
import type { Notebook } from "../types/notebook";

export const getNotebooks = async (): Promise<Notebook[]> => {
    const res = await api.get('/notebooks');
    return res.data.data;
}

export const createNotebook = async (data: {
    title: string,
    description?: string
}) => {
    const res = await api.post('/notebooks', data);
    return res.data.data;
}

export const updateNotebook = async (data: {
    id: string,
    title: string,
    description?: string,
}) => {
    const {id, ...payload} = data;
    const res = await api.put(`/notebooks/${id}`, payload);
    return res.data.data;
}

export const deleteNotebook = async (id:string) => {
    const res = await api.delete(`/notebooks/${id}`);
    return res.data.data;
}