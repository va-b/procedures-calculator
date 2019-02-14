import ICalculatorService from "@/services/ICalculatorService";
import IServiceFactory from "@/services/IServiceFactory";
import FakeDbCalculatorService from "@/dataScheme/FakeDbCalculatorService";
import IService from "@/services/IService";

export default class ServiceFactory implements IServiceFactory
{
    private servicesStorage: IService[] = [];

    private serviceRegister<TService extends IService>(S: {new(): TService}, key: string): TService
    {
        if(!this.servicesStorage[key]) this.servicesStorage[key] = new S;
        return this.servicesStorage[key];
    }

    GetDefaultCalculatorService(): ICalculatorService
    {
        return this.serviceRegister<ICalculatorService>(FakeDbCalculatorService, "DefaultCalculatorService");
    }
}
