import { languageOptions } from "../../constants/codeLanguage";
import styles from '../ThemeDropdown/styles/Select.module.css'
interface SelectProps {selectLanguage: (lang: string) => void}
const Select = ({selectLanguage}: SelectProps) => {
    return ( 
        <div>
            <select className={styles.select} onChange={(e) => selectLanguage(e.target.value)}>
            {languageOptions?.map((option) => (
                <option key={option.id}>{option.value}</option>
              ))}
            </select>
        </div>
    );
}
 
export default Select;