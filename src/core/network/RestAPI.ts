import Axios, {AxiosRequestConfig, AxiosError, AxiosResponse} from 'axios';
import {plainToClass} from 'class-transformer';
import {ClassType} from 'class-transformer/ClassTransformer';

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

export async function requestTransform<T>(
  url: string,
  method: HTTPMethod,
  cls: ClassType<T>,
  data?: unknown,
): Promise<T> {
  const config: AxiosRequestConfig = {
    url: url,
    method: method,
    data: data,
    timeout: timeOut,
    headers: headers,
  };
  return requestTransform_(config, cls);
}

export async function requestTransformArray<T>(
  url: string,
  method: HTTPMethod,
  cls: ClassType<T>,
  data?: unknown,
): Promise<T[]> {
  const config: AxiosRequestConfig = {
    url: url,
    method: method,
    data: data,
    timeout: timeOut,
    headers: headers,
  };
  return requestTransformArray_(config, cls);
}

async function request_<T>(config: AxiosRequestConfig): Promise<T> {
  try {
    interceptRequest(config);
    const response = await Axios.request<T>(config);
    interceptResponseSuccess(response);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
}

async function requestTransform_<T>(config: AxiosRequestConfig, cls: ClassType<T>): Promise<T> {
  try {
    interceptRequest(config);
    const response = await Axios.request<T>(config);
    interceptResponseSuccess(response);
    return plainToClass(cls, removeNulls(response.data));
  } catch (error) {
    return handleError(error);
  }
}

async function requestTransformArray_<T>(
  config: AxiosRequestConfig,
  cls: ClassType<T>,
): Promise<T[]> {
  try {
    interceptRequest(config);
    const response = await Axios.request<T>(config);
    interceptResponseSuccess(response);
    return plainToClass(cls, removeNulls(response.data) as Record<string, unknown>[]);
  } catch (error) {
    return handleError(error);
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

function removeNulls(obj: any) {
  const isArray = obj instanceof Array;
  for (const k in obj) {
    if (obj[k] === null) {
      isArray ? obj.splice(k, 1) : delete obj[k];
    } else if (typeof obj[k] === 'object') {
      removeNulls(obj[k]);
    }
    if (isArray && obj.length === k) {
      removeNulls(obj);
    }
  }
  return obj;
}
