import PropTypes from 'prop-types'
import Popup from "reactjs-popup";
import { CloseIcon } from '../Icons';
import './modal.scss'

function Modal({ children, trigger, className }) {
    const handleCloseModal = (e, close) => {
        if (e.target === document.querySelector('.modal--over')) {
            close()
        }
        e.stopPropagation();
    }

    return (
        <Popup trigger={trigger} modal>
            {close => (
                <div className='modal--over w-screen h-screen bg-opacity-70 bg-[#000] ' onClick={(e) => handleCloseModal(e, close)}>
                    <div className={`${className} modal  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:!rounded-none md:rounded-none rounded-md overflow-hidden bg-white`}>
                        <div className='w-full h-auto p-2 text-right'>
                            <button className="close w-auto h-auto p-2 outline-none text-white text-4xl rounded-sm sm:bg-red-600 md:bg-red-600 bg-gray-600 hover:bg-red-600" onClick={close}>
                                <CloseIcon />
                            </button>
                        </div>
                        {children}
                    </div>
                </div>
            )}
        </Popup>
    );
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    trigger: PropTypes.node.isRequired,
    className: PropTypes.string,
}


export default Modal;