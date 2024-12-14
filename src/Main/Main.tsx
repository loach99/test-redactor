/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
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
    const [proccessing, setProccessing] = useState(false);
    const [outputDetails, setOutputDetails] = useState([]);
    const [theme, setTheme] = useState<string>('');
    const [isErrMsg, setMsg] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>(false);
    const [activeTheme, setActiveTheme] = useState<Record<string, string>>({});
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
    const changeTheme = () => {
        let containerClass = styles.editor_container;
        let window = styles.editor_window;

        if (theme === "vs") {
            containerClass += ` ${styles.lightTheme}`;
            window += ` ${styles.lightThemeWindow}`
        } else if (theme === "vs-dark") {
            containerClass += ` ${styles.darkTheme}`;
            window += ` ${styles.darkThemeWindow}`

        } else if (theme === "hc-black") {
            containerClass += ` ${styles.contrastTheme}`;
            window += ` ${styles.contrastThemeWindow}`

        }
        setActiveTheme({
            [styles.editor_container]: containerClass,
            [styles.editor_window]: window,
        })
        return
    }
    useEffect(() => {
        changeTheme();
    }, [theme])

    return (
        <div className={activeTheme[styles.editor_container]}>
            <div className={activeTheme[styles.editor_window]}>
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
                <Output activeTheme={activeTheme[styles.output_container]} outputDetails={outputDetails} />
            </div>
            {isActive &&
                <Modal setIsActive={setIsActive} isActive={isActive} textErr={isErrMsg} />
            }
        </div>
    );
}

export default Main;