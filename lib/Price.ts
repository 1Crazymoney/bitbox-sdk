import axios from "axios"

export interface Price {
  current(currency?: string): Promise<number>
}

export class Price implements Price {
  async current(currency: string = "usd"): Promise<number> {
    try {
      const response: any = await axios.get(
        `https://index-api.bitcoin.com/api/v0/cash/price/${currency.toLowerCase()}`
      )
      return response.data.price
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}
