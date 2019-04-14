import CalculatorService from "@/services/CalculatorService";
import ICalculatorService from "@/services/ICalculatorService";
import IServiceFactory from "@/services/IServiceFactory";
import IService, { ApiHelper } from "@/services/IService";

export default class ServiceFactory implements IServiceFactory
{
    private readonly servicesStorage: IService[] = [];
    private readonly getUrl: ApiHelper = url => 'http://muapc.dlinkddns.com:5000/api/' + url;

    private getService<TService extends IService>(SC: () => TService, key: string): TService
    {
        if(!this.servicesStorage[key]) this.servicesStorage[key] = SC();
        return this.servicesStorage[key];
    }

    GetDefaultCalculatorService(): ICalculatorService
    {
        return this.getService<ICalculatorService>(
            () => <ICalculatorService>new CalculatorService(this.getUrl),
            'CalculatorService'
        );
    }
}
