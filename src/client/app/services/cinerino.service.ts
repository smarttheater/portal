import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as cinerino from '@cinerino/sdk';
import { Functions } from '..';

@Injectable({
    providedIn: 'root',
})
export class CinerinoService {
    public auth: cinerino.auth.OAuth2;
    public account: cinerino.service.Account;
    public creativeWork: cinerino.service.CreativeWork;
    public categoryCode: cinerino.service.CategoryCode;
    public customer: cinerino.service.Customer;
    public delivery: cinerino.service.Delivery;
    public event: cinerino.service.Event;
    public emailMessage: cinerino.service.EmailMessage;
    public offer: cinerino.service.Offer;
    public order: cinerino.service.Order;
    public seller: cinerino.service.Seller;
    public place: cinerino.service.Place;
    public person: cinerino.service.Person;
    public project: cinerino.service.Project;
    public product: cinerino.service.Product;
    public ownershipInfo: cinerino.service.person.OwnershipInfo;
    public reservation: cinerino.service.Reservation;
    public payment: cinerino.service.Payment;
    public serviceOutput: cinerino.service.ServiceOutput;
    public token: cinerino.service.Token;
    public transaction: {
        placeOrder: cinerino.service.transaction.PlaceOrder;
        returnOrder: cinerino.service.transaction.ReturnOrder;
    };
    public admin: {
        ownershipInfo: cinerino.service.OwnershipInfo;
    };
    public userName: string;
    private endpoint: string;
    private waiterServerUrl: string;

    constructor(private http: HttpClient) {}

    /**
     * getServices
     */
    public async getServices(): Promise<void> {
        try {
            const option = await this.createOption();
            this.account = new cinerino.service.Account(option);
            this.creativeWork = new cinerino.service.CreativeWork(option);
            this.categoryCode = new cinerino.service.CategoryCode(option);
            this.customer = new cinerino.service.Customer(option);
            this.event = new cinerino.service.Event(option);
            this.emailMessage = new cinerino.service.EmailMessage(option);
            this.delivery = new cinerino.service.Delivery(option);
            this.offer = new cinerino.service.Offer(option);
            this.order = new cinerino.service.Order(option);
            this.seller = new cinerino.service.Seller(option);
            this.place = new cinerino.service.Place(option);
            this.person = new cinerino.service.Person(option);
            this.project = new cinerino.service.Project({
                ...option,
                project: undefined,
            });
            this.product = new cinerino.service.Product(option);
            this.ownershipInfo = new cinerino.service.person.OwnershipInfo(
                option
            );
            this.reservation = new cinerino.service.Reservation(option);
            this.payment = new cinerino.service.Payment(option);
            this.serviceOutput = new cinerino.service.ServiceOutput(option);
            this.token = new cinerino.service.Token(option);
            this.transaction = {
                placeOrder: new cinerino.service.transaction.PlaceOrder(option),
                returnOrder: new cinerino.service.transaction.ReturnOrder(
                    option
                ),
            };
            this.admin = {
                ownershipInfo: new cinerino.service.OwnershipInfo(option),
            };
        } catch (err) {
            console.error(err);
            throw { error: 'アクセストークンの取得に失敗しました。' };
        }
    }

    /**
     * createOption
     */
    public async createOption() {
        await this.authorize();
        return {
            endpoint: this.endpoint,
            auth: this.auth,
            project: { id: Functions.Util.getProject().projectId },
        };
    }

    /**
     * 認証情報取得
     */
    public async authorize() {
        const url = '/api/authorize/getCredentials';
        const body = {};
        const limit = 5;
        let count = 0;
        let loop = true;
        while (loop) {
            loop = false;
            try {
                const result = await this.http
                    .post<{
                        accessToken: string;
                        expiryDate: number;
                        clientId: string;
                        endpoint: string;
                        userName: string;
                    }>(url, body)
                    .toPromise();
                this.setCredentials(result);
            } catch (error) {
                if (error.status !== undefined && error.status >= 500) {
                    loop = count < limit;
                    count++;
                    await Functions.Util.sleep(20000);
                    continue;
                }
                throw error;
            }
        }
    }

    /**
     * 認証情報設定
     */
    public setCredentials(params: {
        clientId: string;
        accessToken: string;
        expiryDate: number;
        endpoint: string;
        userName: string;
    }) {
        const option = {
            domain: '',
            clientId: params.clientId,
            redirectUri: '',
            logoutUri: '',
            responseType: '',
            scope: '',
            state: '',
            nonce: null,
            tokenIssuer: '',
        };
        this.auth = cinerino.createAuthInstance(option);
        this.auth.setCredentials({
            accessToken: params.accessToken,
            expiryDate: params.expiryDate,
        });
        this.endpoint = params.endpoint;
        this.userName = params.userName;
    }

    /**
     * サインイン
     */
    public async signIn() {
        const url = '/api/authorize/signIn';
        const result = await this.http
            .get<{ url: string }>(url, {})
            .toPromise();
        // console.log(result.url);
        location.href = result.url;
    }

    /**
     * サインアウト
     */
    public async signOut() {
        const url = '/api/authorize/signOut';
        const result = await this.http
            .get<{ url: string }>(url, {})
            .toPromise();
        // console.log(result.url);
        location.href = result.url;
    }

    /**
     * パスポート取得
     */
    public async getPassport(params: { scope: string }) {
        if (this.waiterServerUrl === undefined || this.waiterServerUrl === '') {
            return { token: '' };
        }
        const url = `${this.waiterServerUrl}/projects/${
            Functions.Util.getProject().projectId
        }/passports`;
        const body = { scope: params.scope };
        const result = await this.http
            .post<{ token: string }>(url, body)
            .toPromise();

        return result;
    }
}
