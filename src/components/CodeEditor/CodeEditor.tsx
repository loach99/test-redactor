import { Editor } from "@monaco-editor/react";
import { useState } from "react";
interface CodeEditorProps {
    onChange: (action: string | undefined, data: string | undefined) => void;
    lang: { id: number; name: string; label: string; value: string };
    code: string;
    theme: string
}
const CodeEditor = ({ onChange, lang, code, theme }: CodeEditorProps) => {
    const [codeValue, setCodeValue] = useState(code || '');

    const handleChange = (value:string | undefined): void => {
        setCodeValue(value || "")
        onChange('code', value)
    }

    return (
        <div>
            <Editor
                height="60vh"
                width={'100%'}
                language={lang.value}
                value={codeValue}
                theme={theme}
                onChange={handleChange}
                defaultValue="//"
            />
        </div>
    );
}

export default CodeEditor;

