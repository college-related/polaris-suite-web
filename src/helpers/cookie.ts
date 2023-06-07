
/**
 * 
 * Add user to localstorage
 * @param {dynamicObject} user
 * @returns {void} 
 */
export const addUser = (user: dynamicObject): void => {
    localStorage.setItem('polaris-suite--user', JSON.stringify(user));
}

/**
 * 
 * Add token to localstorage
 * @param {string} token 
 * @returns {void}
 */
export const addToken = (token: string): void => { 
    localStorage.setItem('polaris-suite--token', token); 
}

/**
 * 
 * get the token from localstorage
 * @returns {string}
 */
export const getToken = (): string => localStorage.getItem('polaris-suite--token') || '';

/**
 * 
 * get the user from localstorage
 * @returns {dynamicObject}
 */
export const getUser = (): dynamicObject => JSON.parse(localStorage.getItem('polaris-suite--user') || '{}');

/**
 * 
 * remove the user from localstorage
 * @returns {void}
 */
export const removeUser = (): void => {
    localStorage.removeItem('polaris-suite--user');
}

/**
 * 
 * remove the token from localstorage
 * @returns {void}
 */
export const removeToken = (): void => {
    localStorage.removeItem('polaris-suite--token');
}

/**
 * 
 * get role of the user from localstorage
 * @returns {string}
 */
export const getRole = (): string => {
    const user = getUser();
    return user.role || '';
}