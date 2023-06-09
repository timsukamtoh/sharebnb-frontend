import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class SharebnbApi {

  static accessToken = "";

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = (method === "get")
      ? { Authorization: `Bearer ${SharebnbApi.accessToken}` }
      : { Authorization: `Bearer ${SharebnbApi.accessToken}`,
          'content-type': 'multipart/form-data'  }
    const params = (method === "get")
      ? data
      : {};

      try {
        return (await axios({ url, method, data, params, headers })).data;
      } catch (err) {
        console.log("here error")
        console.error("API Error:", err.response.data);
        let message = err.response.data.error;
        throw Array.isArray(message) ? message : [message];
      }
  }

  // Individual API routes

  /** Get details on a property by Id. */
  static async getProperty(propertyId) {
    let res = await this.request(`property/${propertyId}`);
    return res.property;
  }

  /** Add Property */
  static async addProperty(formData={}) {
    let res = await this.request(`property`, formData, "post");
    return res.property;
  }

  /** Get list of properties*/
  static async getProperties() {
    let res = await this.request("property");
    return res.properties;
  }


  /** Send { username, password } to api and retrieve token */
  static async login(data) {
    let res = await this.request("auth/login", data, "post");
    return res.access_token;
  }

  /** Send { username, password, firstName, lastName, email }
   * to api and retrieve token */
  static async register(data) {
    let res = await this.request("auth/signup", data, "post");
    return res.access_token;
  }

  /** Send username and get user information */
  static async getUser(username) {
    let res = await this.request(`user/${username}`);
    return res.user;
  }

  /** Send { username, password, firstName, lastName, email }
   *  to api and retrieve user */
  static async updateUser(username, data) {
    let res = await this.request(`user/${username}`, data, "patch");
    return res.user;
  }

  /** Add booking and return booking item */
  static async addBooking(propertyId, data) {
    console.log("addBooking", "propertyId: ", propertyId, "data: ", data)
    let res = await this.request(`property/${propertyId}/bookings`, data, "post");
    console.log('res', res);
    return res.booking;
  }

  /** Get details regarding booking provided bookingId */
  static async getBooking(bookingId) {
    console.log("booking token: ", this.accessToken)
    let res = await this.request(`bookings/${bookingId}`);
    return res.booking;
  }

  /** Delete booking from db */
  static async deleteBooking(bookingId) {
    console.log("booking token: ", this.accessToken)
    let res = await this.request(`bookings/${bookingId}`,{}, "delete");
    return res;
  }

}

export default SharebnbApi;