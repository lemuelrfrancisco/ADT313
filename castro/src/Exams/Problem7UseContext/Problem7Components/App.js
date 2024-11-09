const [theme, setTheme] = useState('light');
const toggleTheme = () => {
  setTheme(curr => curr === 'light' ? 'dark' : 'light');
};