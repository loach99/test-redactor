/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './styles/Output.module.css';
const Output = ({ outputDetails, setProccessing}:any) => {
    const getOutput = () => {
        const statusId = outputDetails?.status?.id;
        if (statusId === 6) {
            setProccessing(false);
            return (
                <pre style={{ color: 'red' }}>
                    {atob(outputDetails?.compile_output)}
                </pre>
            );
        } else if (statusId === 3) {
            setProccessing(false);
            return (
                <pre style={{ color: 'green' }}>
                    {atob(outputDetails.stdout) !== null
                        ? `${atob(outputDetails.stdout)}`
                        : null}
                </pre>
            );
        } else if (statusId === 5) {
            setProccessing(false);
            return (
                <pre style={{ color: 'red' }} >
                    {`Time Limit Exceeded`}
                </pre>
            );
        } else if (statusId > 7) {
            setProccessing(false);
            return (
                <pre style={{ color: 'red' }} >
                    {atob(outputDetails?.message)}
                </pre>
            );
        }
    };
    return (
        <div className={styles.output_container}>
            <h3>
                Output
            </h3>
            <div className={styles.output_body}>
                {outputDetails ? <>{getOutput()}</> : null}
            </div>
        </div>
    );
}

export default Output;