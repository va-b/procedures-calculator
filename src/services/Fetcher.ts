export default class Fetcher implements IHttpClient
{
    private readonly fetchParams: RequestInit;

    constructor(private readonly baseUrl: string = '')
    {
        let headers = new Headers();
        headers.set('Content-type', 'application/json');
        //headers.set("Cache-Control", "no-cache");

        this.fetchParams = {
            credentials: "same-origin",
            headers: headers            
        };
    }
    
    private dataparser(val: any, key: string): any
    {
        let type = typeof (val);
        let dateRegExp: RegExp = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z|)/;


        if (type === "string" && dateRegExp.test(val))
        {
            return new Date(val);
        }
        else return val;
    }

    private async handleResponse(response: Response): Promise<any>
    {
        if(!response.ok)
        {
            let msg: string = JSON.stringify(response);
            throw msg;
        }
        else
        {
            let contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
                return JSON.parse(await response.text(), this.dataparser);
            }
            else{
                return response.text();
            }
        }
    }

    public async delete<T>( url: string ): Promise<T>
    {
        let params: RequestInit = { method: "DELETE", ...this.fetchParams };
        let resp = await fetch(this.baseUrl + url, params);
        let res = await this.handleResponse(resp);
        return res as T;
    }

    public async get<T>( url: string ): Promise<T>
    {
        let params: RequestInit = { method: "GET", ...this.fetchParams };
        let resp = await fetch(this.baseUrl + url, params);
        let res = await this.handleResponse(resp);
        return res as T;
    }

    public async patch<T>( url: string, data: string ): Promise<T>
    {
        let params: RequestInit = { method: "PATCH", body: data, ...this.fetchParams };
        let resp = await fetch(this.baseUrl + url, params);
        let res = await this.handleResponse(resp);
        return res as T;
    }

    public async post<T>( url: string, data: string | FormData ): Promise<T>
    { 
        let fp;

        if(data instanceof FormData)
        {
            let h = new Headers();
            h.set('Content-type', 'multipart/form-data');
            fp = {credentials: "same-origin", headers: h};
        }
        else
        {
            fp = this.fetchParams;
        }
        let params: RequestInit = { method: "POST", body: data, ...fp };
        let resp = await fetch(this.baseUrl + url, params);
        let res = await this.handleResponse(resp);
        return res as T;
    }

    public async put<T>( url: string, data: string ): Promise<T>
    {
        let params: RequestInit = { method: "PUT", body: data };
        let resp = await fetch(this.baseUrl + url, {...this.fetchParams, ...params});
        let res = await this.handleResponse(resp);
        return res as T;
    }
}