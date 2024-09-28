import axios from 'axios';

// export const API_BASE_URL = "https://stilina-api-env.eba-5bv9wity.ca-central-1.elasticbeanstalk.com/api/v1";
export const API_BASE_URL = "http://localhost:8080/api/v1";

const getAuthConfig = () => ({
    headers: {
        Authorization: `${localStorage.getItem("access_token")}`
    }
})

export const getProducts = async () => {
    try {
        return await axios.get(
            `${API_BASE_URL}/products/all`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const saveProduit = async (product) => {
    try {
        return await axios.post(
            `${API_BASE_URL}/products`,
            product
        )
    } catch (e) {
        throw e;
    }
}

export const updateProduit = async (id, update) => {
    try {
        return await axios.put(
            `${API_BASE_URL}/api/v1/products/${id}`,
            update,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const deleteProduit = async (id) => {
    try {
        return await axios.delete(
            `${API_BASE_URL}/api/v1/products/${id}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const login = async (emailAndPassword) => {
    try {
        return await axios.post(
            `${API_BASE_URL}/auth/login`,
            emailAndPassword
        )
    } catch (e) {
        throw e;
    }
}

export const uploadProduitProfilePicture = async (id, formData) => {
    try {
        return axios.post(
            `${API_BASE_URL}/api/v1/products/${id}/profile-image`,
            formData,
            {
                ...getAuthConfig(),
                'Content-Type': 'multipart/form-data'
            }
        );
    } catch (e) {
        throw e;
    }
}

export const produitProfilePictureUrl = (id) =>
    `${API_BASE_URL}/api/v1/products/${id}/profile-image`;
