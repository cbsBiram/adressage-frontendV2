import http from './httpServices';

const apiEndpoint1 = 'https://adressage-backend.herokuapp.com/api/get_code_infos/';


export function getCodeInfos(code) {
    return http.get(apiEndpoint1, { params: { code } })
}