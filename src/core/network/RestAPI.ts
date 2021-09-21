import Axios, {AxiosRequestConfig, AxiosError, AxiosResponse} from 'axios';

export type HTTPMethod = 'get' | 'post' | 'put' | 'delete';

interface RestError {
  message?: string;
  status?: number;
}

const timeOut = 60000;
const headers = {
  'Content-Type': 'application/json',
};

export async function request<T>(url: string, method: HTTPMethod, data?: unknown): Promise<T> {
  const config: AxiosRequestConfig = {
    url: url,
    method: method,
    data: data,
    timeout: timeOut,
    headers: headers,
  };
  return request_(config);
}

async function request_<T>(config: AxiosRequestConfig): Promise<T> {
  try {
    interceptRequest(config);
    const response = await Axios.request<T>(config);
    interceptResponseSuccess(response);
    return response.data;
  } catch (error) {
    return handleError(error as AxiosError);
  }
}

function handleError(error: AxiosError) {
  interceptResponseFailure(error);
  const err: RestError = {status: error?.response?.status, message: error?.response?.data?.message};
  return Promise.reject(err);
}

function interceptRequest(config: AxiosRequestConfig) {
  console.log('Request ' + config.method + ': ' + config.url);
  const data = config.params || config.data;
  if (data) {
    let requestString = JSON.stringify(data, null, 2);
    console.log(requestString);
  }
}

function interceptResponseSuccess(response: AxiosResponse) {
  console.log('Response Success ' + response.config.method + ': ' + response.config.url);
  if (response.data) {
    console.log(response.data);
  }
}

function interceptResponseFailure(error: AxiosError) {
  console.log('Response Failure ' + error?.config?.method + ': ' + error?.config?.url);
  if (error?.response?.data) {
    console.log(error?.response?.data);
  }
}
