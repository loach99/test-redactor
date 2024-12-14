import { themeList } from '../../constants/codeLanguage';
import styles from './styles/Select.module.css'
interface ThemeProps {
    handleThemeChange: (name: string) => void,
    theme: string
}
const ThemeDropdown = ({ handleThemeChange, theme }: ThemeProps) => {
    return (
        <div>
            <select className={styles.select} defaultValue={theme} onChange={(e) => handleThemeChange(e.target.value)}>
              {themeList?.map((option) => (
                <option key={option.id}>{option.value}</option>
              ))}
            </select>
        </div>
    );
}

export default ThemeDropdown;