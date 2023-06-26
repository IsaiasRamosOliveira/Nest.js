import { NestResponse } from "./nestResponse";

export class NestResponseBuilder {
    private response: NestResponse = {
        status: 200,
        headers: {},
        body: {}
    }
    status(status: number) {
        this.response.status = status;
        return this;
    }
    headers(headers: object) {
        this.response.headers = headers;
        return this;
    }
    body(body: object) {
        this.response.body = body;
        return this;
    }
    build(){
        return new NestResponse(this.response);
    }
}