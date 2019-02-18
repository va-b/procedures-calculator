import ICalculatorService from "@/services/ICalculatorService";
import {FrontendStepDbModel} from "@/dataScheme/DataModel";
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
        return new Promise(resolve => resolve(
            FakeDb.Parameter
                .filter(x => x.frontendStepId == stepId)
        ));
    }

}
