import { POLARIS_LOCALSTORAGE_TOKEN, POLARIS_LOCALSTORAGE_USER } from "../utils/constants";

/**
 * 
 * Add user to localstorage
 * @param {dynamicObject} user
 * @returns {void} 
 */
export const addUser = (user: dynamicObject): void => {
    localStorage.setItem(POLARIS_LOCALSTORAGE_USER, JSON.stringify(user));
}

/**
 * 
 * Add token to localstorage
 * @param {string} token 
 * @returns {void}
 */
export const addToken = (token: string): void => { 
    localStorage.setItem(POLARIS_LOCALSTORAGE_TOKEN, JSON.stringify(token)); 
}

/**
 * 
 * get the token from localstorage
 * @returns {string}
 */
export const getToken = (): string => {
    const tokens = JSON.parse(localStorage.getItem(POLARIS_LOCALSTORAGE_TOKEN) || '{}')

    return tokens.access.token || '';
};

/**
 * 
 * get the user from localstorage
 * @returns {dynamicObject}
 */
export const getUser = (): dynamicObject => JSON.parse(localStorage.getItem(POLARIS_LOCALSTORAGE_USER) || '{}');

/**
 * 
 * remove the user from localstorage
 * @returns {void}
 */
export const removeUser = (): void => {
    localStorage.removeItem(POLARIS_LOCALSTORAGE_USER);
}

/**
 * 
 * remove the token from localstorage
 * @returns {void}
 */
export const removeToken = (): void => {
    localStorage.removeItem(POLARIS_LOCALSTORAGE_TOKEN);
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