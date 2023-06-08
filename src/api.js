import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class SharebnbApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
//   static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

  static token = "";

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get list of companies with search term*/

  static async getCompanies(data) {
    let res = await this.request("companies", data);
    return res.companies;
  }

  /** Get list of jobs with search term */

  static async getJobs(data) {
    let res = await this.request("jobs", data);
    return res.jobs;
  }

  /** Send { username, password } to api and retrieve token */

  static async login(data) {
    let res = await this.request("auth/token", data, "post");
    return res.token;
  }

  /** Send { username, password, firstName, lastName,
   * email } to api and retrieve token */

  static async signUp(data) {
    let res = await this.request("auth/register", data, "post");
    return res.token;
  }

  /** Send username and get user information */
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }
//hint endpoint is /user/username so update user needs to recieve username
//current user has access
  /** Send { username, password, firstName, lastName, email }
   *  to api and retrieve user */
  static async updateUser(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

}

export default SharebnbApi;