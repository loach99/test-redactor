import styles from './styles/Loader.module.css'
const Loader = () => {
    return (
        <div className={styles.overlay_loader}>
            <div className={styles.loader}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default Loader;