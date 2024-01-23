import React from 'react';
import Modal from 'react-modal';

interface ReactModalProps {
  imageUrl: string;
  onClose: () => void;
}

const ReactModal: React.FC<ReactModalProps> = ({ imageUrl, onClose }) => {
  return (
    <Modal
      isOpen={true} // Show the modal when isPreviewOpen is true
      onRequestClose={onClose}
      contentLabel="Image Preview"
      className="modal_react"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        {imageUrl ? <img src={imageUrl} alt="Preview" className="modal-image" />
          : ""}
        {/* <button onClick={onClose} className="close-button">
          Close
        </button> */}
      </div>
    </Modal>
  );
};

export default ReactModal;
