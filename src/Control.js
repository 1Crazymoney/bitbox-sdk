"use strict"
import axios from "axios"
class Control {
  constructor(restURL) {
    this.restURL = restURL
  }

  async getInfo() {
    try {
      let response = await axios.get(`${this.restURL}control/getInfo`)
      return response.data
    } catch (error) {
      throw error.response.data
    }
  }

  async getMemoryInfo() {
    try {
      let response = await axios.get(`${this.restURL}control/getMemoryInfo`)
      return response.data
    } catch (error) {
      throw error.response.data
    }
  }
  //
  // stop() {
  //   // Stop Bitcoin Cash server.
  //   return axios.post(`${this.restURL}control/stop`)
  //   .then((response) => {
  //     return response.data;
  //   })
  //   .catch((error) => {
  //     return JSON.stringify(error.response.data.error.message);
  //   });
  // }
}

export default Control
