import { api } from "../../../shared/api/axios.api";

export const addNotebookBlock = async (data: {
    notebookId: string | undefined;
    _id: string;
    type: string;
    prevBlockId: string;
}) => {
    const {notebookId} = data;

    const res = await api.post(`/notebooks/${notebookId}/block`, data);
    return res.data.data;
}

export const deleteNotebookBlock = async (data: {
    notebookId:string | undefined;
    _id: string;
}) => {
    const { notebookId, _id } = data;

    const res = await api.delete(`/notebooks/${notebookId}/block/${_id}`);

    return res.data.data;
}

export const updateNotebookBlockContent = async (data: {
  notebookId: string | undefined;
  _id: string; 
  content: string;
}) => {
  const { notebookId, ...payload } = data;

  const res = await api.patch(`/notebooks/${notebookId}/block`, payload);

  return res.data.data;
};

export const getNotebookById = async (notebookId: string | undefined) => {
    const res = await api.get(`/notebooks/${notebookId}`);
    return res.data.data;
}