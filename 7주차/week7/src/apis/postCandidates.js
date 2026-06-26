import instance from "./instance";

const postCandidates = async (promiseId, {name, address, lat, lng}) => {
    const response = await instance.post(`/promises/${promiseId}/candidates`, {
        name,
        address,
        latitude: lat,
        longitude: lng
    });

    return response.data.data;
}

export default postCandidates;