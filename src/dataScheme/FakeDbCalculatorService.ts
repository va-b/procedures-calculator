import ICalculatorService from "@/services/ICalculatorService";
import {FrontendStepDbModel, ParameterDbModel} from "@/dataScheme/DataModel";
import {FakeDb} from "@/dataScheme/FakeDb";
import {IParameter} from "@/model/model";

export default class FakeDbCalculatorService implements ICalculatorService
{
    GetSteps(): Promise<FrontendStepDbModel[]>
    {
        return new Promise(resolve => resolve(
            FakeDb.FrontendStep
                .sort((a, b) => a.order - b.order)
        ));
    }

    GetParameter(stepId: number): Promise<IParameter[]>
    {
        let mapParams: (p: ParameterDbModel) => IParameter
            = param =>
        {
            (<IParameter>param).choices = FakeDb.Choice.filter(y => y.parameterId == param.id)
            return param as IParameter;
        };
        return new Promise(resolve => resolve(
            FakeDb.Parameter
                .filter(x => x.frontendStepId == stepId )
                .map(mapParams)
        ));
    }

}
