// import React from 'react';

// import "./model.css"
// import { useNavigate } from "react-router-dom";
// import secureLocalStorage from "react-secure-storage";
// function CustomModal({ title, content, onClose }) {
//     const navigate = useNavigate();
//     const handleLogout = () => {
//         secureLocalStorage.removeItem("token");
//         secureLocalStorage.removeItem("id");
//         secureLocalStorage.removeItem("image");
//         navigate("/login");
//     };
//     return (
//         <div className="custom-modal">
//             <div className="modal-content">
//                 <h4>{title}</h4>
//                 {/* <p>{content}</p> */}
//                 <div className='d-flex justify-content-center align-items-center'>
//                     <div className="py-3">
//                         // <button onClick={() => { handleLogout(); onClose() }}>Login</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default CustomModal;


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
