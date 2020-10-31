import client from "./client";

const endpoint = "get_code_infos/";

const getCodeInfos = (code) => client.get(endpoint, code);

export default { getCodeInfos };