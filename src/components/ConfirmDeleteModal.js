import React from 'react';

const ConfirmDeleteModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) {
    return null;
  }

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <div>
      <div>
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete this post?</p>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
      <div onClick={onClose} />
      {/* The div above with onClick is used to close the modal when clicking outside */}
    </div>
  );
};

export default ConfirmDeleteModal;
