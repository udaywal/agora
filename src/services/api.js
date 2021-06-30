import axios from 'axios';
import { BASE_URL } from '../utils/constant'

const _getUserAndCounselor = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/getUserAndCounselor`)
        return handleResponse(response);
    } catch (err) {
        const error = handleError(err);
        console.log("⛔ Error ", error);
        // if (error !== "Unauthorized") props.toast({ status: "error", description: error.error })
        return error
    }
}

const _generateToken = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/generateToken`)
        return handleResponse(response);
    } catch (err) {
        const error = handleError(err);
        console.log("⛔ Error ", error);
        // if (error !== "Unauthorized") props.toast({ status: "error", description: error.error })
        return error
    }
}

const _outgoingCall = async (props) => {
    try {
        const response = await axios.post(`${BASE_URL}/outgoingCall`, {
            callerId: props.callerId,
            calleeId: props.calleeId
        })
        return handleResponse(response);
    } catch (err) {
        const error = handleError(err);
        console.log("⛔ Error ", error);
        // if (error !== "Unauthorized") props.toast({ status: "error", description: error.error })
        return error
    }
}

const handleResponse = (res) => {
    if (res.data) {
      return res.data;
    }
    return res;
  }
  
const handleError = (err) => {
    if (err.response) {
        // client received an error response (5xx, 4xx)
        // if (err.response.data === "Unauthorized") {
        //     props.handleUnauthorized()
        // } 
        return err.response.data
    } else if (err.request) {
        console.log("⛔ 2");
        // https://www.intricatecloud.io/2020/03/how-to-handle-api-errors-in-your-web-app-using-axios/
        // client never received a response, or request never left
        return { error: "Network error" }
    }
    return err
  }

const API = {
    _getUserAndCounselor,
    _generateToken,
    _outgoingCall,
}

export default API;