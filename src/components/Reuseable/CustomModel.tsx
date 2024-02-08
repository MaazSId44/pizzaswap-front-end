import "./model.css";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

interface CustomModalProps {
  title: string;

  onClose: () => void;
}

function CustomModal({ title, onClose }: CustomModalProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    secureLocalStorage.removeItem("token");
    secureLocalStorage.removeItem("id");
    secureLocalStorage.removeItem("image");
    navigate("/login");
  };

  return (


    <div className="custom-modal">
      <div className="modal-content">

        <div className='d-flex justify-content-center align-items-center'>
          <div className="py-3"></div>
        </div>
      </div>
    </div>
  );
}

export default CustomModal;
