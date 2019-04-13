import { ChoiceDbModel, ChoiceLinkDbModel, ExpressionDbModel, FrontendStepDbModel, ParameterDbModel } from "@/model/DataModel";
import IService from "@/services/IService";

export default interface ICalculatorService extends IService
{
    GetSteps: () => Promise<IInitial[]>;
    GetResults: (expressionIds: number[]) => Promise<ICalcResult>
}

export interface IInitial
{
    frontendSteps: FrontendStepDbModel[];
    parameters: ParameterDbModel[];
    choices: ChoiceDbModel[];
    expressions: ExpressionDbModel[];
    links: ChoiceLinkDbModel[];
}

export interface ICalcResult
{

}