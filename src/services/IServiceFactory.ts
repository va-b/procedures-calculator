import ICalculatorService from "@/services/ICalculatorService";

export default interface IServiceFactory
{
    GetDefaultCalculatorService: () => ICalculatorService;
}


