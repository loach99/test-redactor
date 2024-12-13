import styles from './styles/Select.module.css'
interface ThemeProps {
    handleThemeChange: (name: string) => void
}
const ThemeDropdown = ({ handleThemeChange }: ThemeProps) => {

    return (
        <div>
            <select className={styles.select} onChange={(e) => handleThemeChange(e.target.value)}>
                <option value="vs">Light</option>
                <option value="vs-dark">Dark</option>
                <option value="hc-black">High Contrast</option>
            </select>
        </div>
    );
}

export default ThemeDropdown;