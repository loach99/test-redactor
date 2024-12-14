import {useState } from "react";
import classNames from "classnames";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import Select from "../../components/SelectList/Select";
import Output from "../../components/Output/Output";
import ThemeDropdown from "../../components/ThemeDropdown/ThemeDropdown";
import { languageOptions } from "../../constants/codeLanguage";
import styles from './styles/Main.module.css'
import Modal from "../../components/Modal/Modal";
import { useTheme } from "../../hooks/useTheme";
import useCodeRun from "../../hooks/useCodeRun";
import Button from "../../components/Button/Button";
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
    const { theme, activeTheme, handleThemeChange } = useTheme();
    const { handleCodeRun, proccessing, outputDetails, setProccessing } = useCodeRun({code, lang, setMsg, setIsActive});
    const onChange = (action: string | undefined, data: string | undefined) => {
        if (action === 'code') {
            setCode(data || '')
        }
    }
    const selectLanguage = (lang: string) => {
        setLang(languageOptions.filter(elem => elem.value === lang)[0])
    }
    const containerClass = classNames(styles.editor_container, {
        [styles.lightTheme]: theme === "vs",
        [styles.darkTheme]: theme === "vs-dark",
        [styles.contrastTheme]: theme === "hc-black",
    });

    const windowClass = classNames(styles.editor_window, {
        [styles.lightThemeWindow]: theme === "vs",
        [styles.darkThemeWindow]: theme === "vs-dark",
        [styles.contrastThemeWindow]: theme === "hc-black",
    });
    return (
        <div className={containerClass}>
            <div className={windowClass}>
                <div className={styles.editor_header}>
                    <Select
                        selectLanguage={selectLanguage} />
                    <ThemeDropdown
                        handleThemeChange={handleThemeChange} theme={theme} />
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