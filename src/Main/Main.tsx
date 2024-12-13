/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import CodeEditor from "../components/CodeEditor/CodeEditor";
import Select from "../components/SelectList/Select";
import RunButton from "../components/RunButton/RunButton";
import { fetchCompileCode } from "../api/compileCode";
import { fetchCheckStatus } from "../api/checkStatus";
import Output from "../components/Output/Output";
import ThemeDropdown from "../components/ThemeDropdown/ThemeDropdown";
import { languageOptions } from "../constants/codeLanguage";
import styles from './styles/Main.module.css'
import Modal from "../components/Modal/Modal";

interface Language {
    id: number;
    name: string;
    label: string;
    value: string;
}
const Main = () => {
    const [code, setCode] = useState('//');
    const [lang, setLang] = useState<Language>({ id: 63, name: "JavaScript (Node.js 12.14.0)", label: "JavaScript (Node.js 12.14.0)", value: "javascript" });
    const [proccessing, setProccessing] = useState(true);
    const [outputDetails, setOutputDetails] = useState([]);
    const [theme, setTheme] = useState<string>('');
    const [isErrMsg, setMsg] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>(false)
    const onChange = (action: string | undefined, data: string | undefined) => {
        if (action === 'code') {
            setCode(data || '')
        }
    }
    const handleThemeChange = (th: string) => {
        setTheme(th);
    }

    const selectLanguage = (lang: string) => {
        setLang(languageOptions.filter(elem => elem.value === lang)[0])
    }
    const handleCodeRun = () => {
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
                                        setOutputDetails(res)
                                        setProccessing(false)
                                    })
                            }, 1000)
                            return
                        }
                        setProccessing(false)
                        if (res.message) {
                            setMsg(res.message)
                            setIsActive(true)
                        }
                    })
            })
    }
    let containerClass = styles.editor_container;
    if (theme === "vs") {
        containerClass += ` ${styles.lightTheme}`;
    } else if (theme === "vs-dark") {
        containerClass += ` ${styles.darkTheme}`;
    } else if (theme === "hc-black") {
        containerClass += ` ${styles.contrastTheme}`;
    }
    return (
        <div className={containerClass}>
            <div className={styles.editor_window}>
                <div className={styles.editor_header}>
                    <Select
                        selectLanguage={selectLanguage}
                    />
                    <ThemeDropdown handleThemeChange={handleThemeChange} />
                    <RunButton proccessing={proccessing} handleCodeRun={handleCodeRun} />
                </div>
                <div >
                    <CodeEditor theme={theme} onChange={onChange} lang={lang} code={code} />
                </div>
            </div>

            <div className={styles.output}>
                <Output outputDetails={outputDetails} />
            </div>
            {isActive &&
                <Modal setIsActive={setIsActive} isActive={isActive} textErr={isErrMsg} />
            }
        </div>
    );
}

export default Main;