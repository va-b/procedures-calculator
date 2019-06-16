import {
    IInitial,
    IOrganisation,
    IResultStep
} from "@/model/CommonModels";
import ICalculatorService from "@/services/ICalculatorService";
import { ApiHelper } from "@/services/IService";

export default class CalculatorService implements ICalculatorService
{
    constructor(private readonly geturl: ApiHelper){}

    GetSteps(): Promise<IInitial>
    {
        return window.$http.get<IInitial>(this.geturl('initial'));
    }

    GetResults( expressionIds: number[] ): Promise<IResultStep[]>
    {
        return window.$http.get<IResultStep[]>(this.geturl(`results?exids=${expressionIds.join('_')}`));
    }

    GetOrganisation( id: number ): Promise<IOrganisation>
    {
        return window.$http.get<IOrganisation>(this.geturl(`organisation?id=${id}`));
    }

}