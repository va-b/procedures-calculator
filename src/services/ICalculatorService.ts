import IService from "@/services/IService";
import {IFrontendStep, IParameter} from "@/model/model";

export default interface ICalculatorService extends IService
{
    GetSteps: () => Promise<IFrontendStep[]>;

    GetParameter: (stepId: number) => Promise<IParameter[]>;
}
