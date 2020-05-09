import axios from "axios";

/**
 * Create an Axios Client with defaults
 */
const client = axios;

/**
 * Request Wrapper with default success/error actions
 */
const ApiRequest = async function (options, mockData = null) {
    if (mockData) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(mockData), 1000)
        })
    }

    const onSuccess = function (response) {
        // console.debug('Request Successful!', response);
        return response.data;
    }

    const onError = function (error) {
        console.error('Request Failed:', error.config);

        if (error.response) {
            // Request was made but server responded with something
            // other than 2xx
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
            console.error('Headers:', error.response.headers);

        } else {
            // Something else happened while setting up the request
            // triggered the error
            console.error('Error Message:', error.message);
        }

        return Promise.reject(error.response || error.message);
    }

    try {
        const response = await client(options);
        return onSuccess(response);
    }
    catch (error) {
        return onError(error);
    }
}

export default ApiRequest;