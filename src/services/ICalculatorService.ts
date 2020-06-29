import type { IInitial, IOrganisation, IResultStep } from "@/model/CommonModels";
import type { IService } from "@/services/IService";

export interface ICalculatorService extends IService
{
    GetSteps: () => Promise<IInitial>;
    GetResults: (expressionIds: number[]) => Promise<IResultStep[]>;
    GetOrganisation: (id: number) => Promise<IOrganisation>;
}

