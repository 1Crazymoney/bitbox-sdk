"use strict"
import axios from "axios"
class Util {
  constructor(restURL) {
    this.restURL = restURL
  }

  async validateAddress(address) {
    try {
      let response = await axios.get(
        `${this.restURL}util/validateAddress/${address}`
      )
      return response.data
    } catch (error) {
      throw error.response.data
    }
  }
}

export default Util
