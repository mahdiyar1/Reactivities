import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { Activity, ActivityFormValues } from "../models/activity";
import { User, UserFromValues } from "../models/user";
import { store } from "../stores/store";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers!.Authorization = `Bearer ${token}`
    return config
        
})

axios.interceptors.response.use(async Response => {
    await sleep(1000);
    return Response;
},(error: AxiosError) => {
    const {data, status, config} = error.response!;
    const dataAny = data as any;
    switch (status) {
        case 400:
           if (typeof data === 'string') {
            toast.error(data)
           }
           if (config.method === 'get' && dataAny.errors.hasOwnProperty('id')) {
            history.push('/not-found');
           }
            if (dataAny.errors) {
                const modalStateErrors = [];
                for (const key in dataAny.errors) {
                    if(dataAny.errors[key]) {
                        modalStateErrors.push(dataAny.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(dataAny);
            }
            break;
        case 401:
            toast.error('unauthorized');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(dataAny);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T>(Response: AxiosResponse<T>) => Response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: ActivityFormValues) => requests.post<void>('/activities', activity),
    update: (activity: ActivityFormValues) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del<void>(`/activities/${id}`),
    attend: (id: string) => requests.post<void>(`/activities/${id}/attend`,{})
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFromValues) => requests.post<User>('/account/login', user),
    register: (user: UserFromValues) => requests.post<User>('/account/register', user),
}

const agent = {
    Activities,
    Account
}

export default agent;