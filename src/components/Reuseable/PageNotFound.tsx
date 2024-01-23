
import "./model.css"
import pageImage from  "../../assets/Images/Pagenotfouund.svg"
import { Link } from 'react-router-dom';
function Page404() {
    return (
        <>
        
<div className='container-fluid'>

        <div className='container'>
            <div className='row '  >
                <div className='col-12 d-flex justify-content-center'>
                <img
            
            style={{ height: "100%", width: "50%", objectFit: "cover" ,    marginLeft: "27%"
        }}
     
            src={pageImage}
            alt="No InterNet"
        />

                </div>
            <div className='row align-item-center mb-5'>
                <div className='col d-flex justify-content-center align-items-center text-center'>
                <Link to="/">
                <button type="button" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md">
                        Go to Home page
                        </button>
                </Link>
                </div>
            </div>
            </div>
        </div>
</div>
        

        </>



    )
}

export default Page404