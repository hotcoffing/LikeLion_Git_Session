import instance from './instance';

const getCandidates = async (promiseId) => {
    const response = await instance.get(`/promises/${promiseId}/candidates`)
    return response.data.data.candidates.map((c) => ({
        id: c.id,
        address: c.address,
        lat: c.latitude,
        lng: c.longitude,
    }));
}

export default getCandidates;