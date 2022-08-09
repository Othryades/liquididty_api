import axios from "axios";

export const getPages = async (search, pageNumber) => {
    try {
        const request = await axios.get("https://swapi.dev/api/people/", {
            params: {
                search: search,
                page: pageNumber,
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
