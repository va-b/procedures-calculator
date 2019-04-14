import { IInitial, IResultStep } from "@/model/model";
import ICalculatorService from "@/services/ICalculatorService";
import { ApiHelper } from "@/services/IService";
import axios from 'axios';

export default class CalculatorService implements ICalculatorService
{
    constructor(private readonly geturl: ApiHelper){}

    async GetSteps(): Promise<IInitial[]>
    {
        let res = await axios.get<IInitial[]>(this.geturl('initial'));
        return res.data;
    }

    async GetResults( expressionIds: number[] ): Promise<IResultStep[]>
    {
        let res = await axios.post<IResultStep[]>(this.geturl('results'), expressionIds);
        return res.data;
    }

}