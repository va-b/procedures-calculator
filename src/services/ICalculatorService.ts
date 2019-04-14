import { IInitial, IOrganisation, IResultStep } from "@/model/model";
import IService from "@/services/IService";

export default interface ICalculatorService extends IService
{
    GetSteps: () => Promise<IInitial[]>;
    GetResults: (expressionIds: number[]) => Promise<IResultStep[]>;
    GetOrganisation: (id: number) => Promise<IOrganisation>;
}

