import instance from "./instance";

const deleteCandidates = async (promiseId, candidateId) => {
    await instance.delete(`/promises/${promiseId}/candidates/${candidateId}`);
}

export default deleteCandidates;