import { createPortal } from "react-dom";
import styles from './styles/Modal.module.css'
const modalElem = document.getElementById('portal');
interface HouseCardProp{
    setIsActive: (isActive: boolean)=>void;
    isActive: boolean;
    textErr: string
}
const Modal = ({setIsActive, isActive, textErr}:HouseCardProp) => {
    if (!modalElem) {
        return null;
    }
    
    return createPortal(
        (
            <div className={styles.modalWindow} onClick={()=>setIsActive(!isActive)}>
                <div className={styles.modal}>
                    <div>
                        Error!!!
                    </div>
                    <div>
                        {textErr}!!!
                    </div>
                </div>
            </div>
        ), modalElem
    )
}

export default Modal;