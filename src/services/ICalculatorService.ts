import IService from "@/services/IService";
import {IFrontendStep} from "@/model/model";

export default interface ICalculatorService extends IService
{
    GetSteps: () => Promise<IFrontendStep[]>;
}
