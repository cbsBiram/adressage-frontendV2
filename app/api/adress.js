import client from "./client";

const endpoint = "get_code_infos/";

const getCodeInfos = (code, onUploadProgress) => client.get(endpoint, { code }, {
    onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
});

export default { getCodeInfos };