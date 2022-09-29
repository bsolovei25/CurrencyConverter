export interface IExchangeCourse {
  date?: string,
  info?: {
    rate?: number
    timestamp?: number
  },
  "query": {
    "amount": number,
    "from": string,
    "to": string
  },
  "result": number,
  "success": boolean
}

export interface IGetToUAHCourse {
  "base": string,
  "date": string,
  "rates": {
    "UAH": number
  },
  "success": boolean,
  "timestamp": number
}
