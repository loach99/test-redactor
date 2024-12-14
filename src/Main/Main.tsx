/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import CodeEditor from "../components/CodeEditor/CodeEditor";
import Select from "../components/SelectList/Select";
import Output from "../components/Output/Output";
import ThemeDropdown from "../components/ThemeDropdown/ThemeDropdown";
import { languageOptions } from "../constants/codeLanguage";
import styles from './styles/Main.module.css'
import Modal from "../components/Modal/Modal";
import { useTheme } from "../hooks/useTheme";
import useCodeRun from "../hooks/useCodeRun";
import Button from "../components/Button/Button";

interface Language {
    id: number;
    name: string;
    label: string;
    value: string;
}

const Main = () => {

    const [code, setCode] = useState('//');
    const [lang, setLang] = useState<Language>(languageOptions[0]);
    const [isErrMsg, setMsg] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>(false);
    const { theme, activeTheme, setActiveTheme, handleThemeChange } = useTheme();
    const { handleCodeRun, proccessing, outputDetails, setProccessing } = useCodeRun({code, lang, setMsg, setIsActive});
    const onChange = (action: string | undefined, data: string | undefined) => {
        if (action === 'code') {
            setCode(data || '')
        }
    }
    const selectLanguage = (lang: string) => {
        setLang(languageOptions.filter(elem => elem.value === lang)[0])
    }
    const changeTheme = () => {
        let containerClass = styles.editor_container;
        let window = styles.editor_window;

        if (localStorage.getItem('theme') === "vs") {
            containerClass += ` ${styles.lightTheme}`;
            window += ` ${styles.lightThemeWindow}`
        } else if (localStorage.getItem('theme') === "vs-dark") {
            containerClass += ` ${styles.darkTheme}`;
            window += ` ${styles.darkThemeWindow}`

        } else if (localStorage.getItem('theme') === "hc-black") {
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
                        selectLanguage={selectLanguage} />
                    <ThemeDropdown
                        handleThemeChange={handleThemeChange} />
                    <Button
                        proccessing={proccessing}
                        handleCodeRun={handleCodeRun} />
                </div>
                <div>
                    <CodeEditor
                        theme={theme}
                        onChange={onChange}
                        lang={lang}
                        code={code} />
                </div>
            </div>

            <div className={styles.output}>
                <Output
                    activeTheme={activeTheme[styles.output_container]}
                    outputDetails={outputDetails}
                    setProccessing={setProccessing} />
            </div>
            {isActive &&
                <Modal
                    setIsActive={setIsActive}
                    isActive={isActive}
                    textErr={isErrMsg} />
            }
        </div>
    );
}

export default Main;