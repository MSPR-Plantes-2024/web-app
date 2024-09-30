import secrets from '../../../secrets.json'

export const BASE_URL: string = `http://${secrets.ipAddress}:8080/api/v1`;
export const USERS_ENDPOINT = '/users';
export const PUBLICATION_ENDPOINT: string = '/publications';
export const ADDRESSES_ENDPOINT: string = '/addresses';
export const COMMENTS_ENDPOINT: string = '/comments';
export const MESSAGES_ENDPOINT: string = '/messages';
export const PICTURES_ENDPOINT: string = '/pictures';
export const PLANT_CONDITIONS_ENDPOINT: string = '/plantsConditions';
export const PLANTS_ENDPOINT: string = '/plants';
export const REPORTS_ENDPOINT: string = '/reports';
export const USER_TYPES_ENDPOINT: string = '/user_types';
export const REGISTER_ENDPOINT: string = '/auth/register';
export const AUTHENTICATE_ENDPOINT: string = '/auth/authenticate';
export const REFRESH_ENDPOINT: string = '/auth/refresh-token';

