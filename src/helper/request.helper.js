import axios from "axios";
import qs from "qs";

const instance = axios.create({
  timeout: 30000
});

const handleError = error => {
  if (error.response) {
    const { code, message, data, status } = error.response;
  }
};

const preprocessResponse = data => {
  if (data.success === false) {
    throw { response: { message: data.message, code: data.code } };
  }
  return data;
};

export default class RequestHelper {
  static async getHeader() {
    return {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
  }

  static async get(url, params) {
    const header = await this.getHeader();
    return instance
      .get(url, {
        headers: header,
        params: params,
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        }
      })
      .then(data => {
        return data.data;
      })
      .then(data => {
        return preprocessResponse(data);
      })
      .catch(e => {
        handleError(e);
        throw e;
      });
  }

  static async post(url, data) {
    return instance({
      method: "post",
      url: url,
      headers: await this.getHeader(),
      data: data
    })
      .then(data => {
        return data.data;
      })
      .then(data => {
        return preprocessResponse(data);
      })
      .catch(e => {
        handleError(e);
        throw e;
      });
  }

  static async put(apiUrl, data) {
    return instance({
      method: "put",
      url: apiUrl,
      headers: await this.getHeader(),
      data: data
    })
      .then(data => {
        return data.data;
      })
      .then(data => {
        return preprocessResponse(data);
      })
      .catch(e => {
        handleError(e);
        throw e;
      });
  }

  static async delete(apiUrl, data) {
    return instance({
      method: "delete",
      url: apiUrl,
      headers: await this.getHeader(),
      data: data
    })
      .then(data => {
        return data.data;
      })
      .then(data => {
        return preprocessResponse(data);
      })
      .catch(e => {
        handleError(e);
        throw e;
      });
  }

  static async postAndUploadImage(apiUrl, data) {
    return instance({
      method: "post",
      url: apiUrl,
      headers: await this.getHeaderUploadFile(),
      data: data
    })
      .then(data => {
        return data.data;
      })
      .then(data => {
        return preprocessResponse(data);
      })
      .catch(e => {
        handleError(e);
        throw e;
      });
  }
}
