import IServiceFactory from "@/services/IServiceFactory";
import FakeDbCalculatorService from "@/dataScheme/FakeDbCalculatorService";
import IService from "@/services/IService";

export default class ServiceFactory implements IServiceFactory
{
    private servicesStorage: IService[] = [];

    private serviceRegister(S: {new(): IService}, key: string): IService
    {
        if(!this.servicesStorage[key]) this.servicesStorage[key] = new S;
        return this.servicesStorage[key];
    }

    GetDefaultCalculatorService(): FakeDbCalculatorService
    {
        return this.serviceRegister(FakeDbCalculatorService, "DefaultCalculatorService");
    }
}
