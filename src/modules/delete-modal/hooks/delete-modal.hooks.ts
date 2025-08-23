import { useState } from "react";

const deleteTargetField = { id: "", title: "" };

export const useDeleteModalControl = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(deleteTargetField);

  const switchDeleteModalOpen = () => setIsDeleteModalOpen(!isDeleteModalOpen);

  return {
    isDeleteModalOpen,
    deleteTarget,
    setDeleteTarget,
    switchDeleteModalOpen,
  };
};
