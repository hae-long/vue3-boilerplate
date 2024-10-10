export const whiteTheme = () => {
  document.body.classList.remove('dark-mode');
  
  setRootProperty('--boiler-page-bg-color', '#ffffff');
};

export const darkTheme = () => {
  document.body.classList.add('dark-mode');
  
  setRootProperty('--boiler-page-bg-color', '#333333');
};

const setRootProperty = (target, color) => {
  document.documentElement.style.setProperty(target, color);
};
