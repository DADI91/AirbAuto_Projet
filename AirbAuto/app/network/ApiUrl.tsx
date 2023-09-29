const BASE_URL = 'http://127.0.0.1:8000';

const ApiUrls = {
  LOGIN: BASE_URL + '/api/login',
  REGISTER: BASE_URL + '/api/singup',
  MEDIA: BASE_URL + '/upload_media',
  POST_ANNONCE: BASE_URL + '/publications',
  GET_ANNONCE_USER: BASE_URL + '/publications_user',
  GET_ANNONCE_ID: BASE_URL + '/publication_id',
  UPDATE_PUBLICATION: BASE_URL + '/publication',
  UPDATE_NOTE: BASE_URL + '/publication_note',
  NEW_RESERVATION: BASE_URL + '/reservation',

  GET_USER: BASE_URL + '/api/user',
};
export default ApiUrls;
