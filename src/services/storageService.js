const storageService = {
    setToLocalStorage: (key, item) =>
        window.localStorage.setItem(key, item),
    getFromLocalStorage: (key) =>
        window.localStorage.getItem(key),
};

export default storageService;
