import axios from "axios";
export const URL_API=process.env.REACT_APP_TODO_API

export default class BaseApi {
  request=axios.create({ baseURL: URL_API })
}
