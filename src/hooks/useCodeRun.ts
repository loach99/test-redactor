import { useState } from "react";
import { fetchCompileCode } from "../api/compileCode";
import { fetchCheckStatus } from "../api/checkStatus";
interface CodeRunProps {
    code: string;
    lang: { id: number; name: string; label: string; value: string };
    setMsg: React.Dispatch<React.SetStateAction<string>>;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}
const useCodeRun = ({ code, lang, setMsg, setIsActive }: CodeRunProps) => {
    const [proccessing, setProccessing] = useState(false);
    const [outputDetails, setOutputDetails] = useState([]);
    const handleCodeRun = () => {
        if(code === '//'){
            setMsg('Empty code');
            setIsActive(true);
            return;
        }
        setProccessing(true);
        const formData = {
            language_id: lang.id,
            source_code: btoa(code),
            stdin: btoa(''),
        };
        fetchCompileCode(formData)
            .then((res) => {
                fetchCheckStatus(res.token)
                    .then((res) => {
                        if (res.status_id === 1 || res.status_id === 2) {
                            setTimeout(() => {
                                fetchCheckStatus(res.token)
                                    .then((res) => {
                                        setOutputDetails(res);
                                        setProccessing(false);
                                    });
                            }, 1000)
                            return
                        }
                        setProccessing(false)
                        if (res.message) {
                            setMsg(res.message);
                            setIsActive(true);
                            return;
                        }
                        if (res.status_id > 6) {
                            setMsg(btoa(res.message));
                            setIsActive(true);
                            return;
                        }
                    })
                    .catch((err) => {
                        setMsg(JSON.stringify(err));
                        setIsActive(true);
                        setProccessing(false);
                    });

            })
    }
    return {
        handleCodeRun,
        proccessing,
        outputDetails,
        setProccessing

    };
}

export default useCodeRun;