import axios from "axios";

export const fetchData = async (param) => {
    try {
        const request = await axios.get(`https://swapi.dev/api/${param.endPoint}`, {
            params: {
                search: param.param,
            },
        });

        if (!request) {
            throw new Error("API call failed");
        }

        return request;
    } catch (error) {
        const error2 = error.response && error.response.data ? error.response.data.message : "";
        console.log(error.message || error2 || "API call failed");
        return [];
    }
};
