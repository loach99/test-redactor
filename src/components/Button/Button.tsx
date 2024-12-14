import Loader from '../Loader/Loader';
import styles from './styles/Button.module.css'
interface RunButtonProps {
    handleCodeRun: () => void,
    proccessing: boolean,
    
}
const RunButton = ({ handleCodeRun, proccessing }: RunButtonProps) => {
    return (
        <div>
            <button className={styles.btn} onClick={handleCodeRun}>
                {proccessing ? <Loader /> : <p>Run code!</p>}
            </button>
        </div>
    );
}

export default RunButton;