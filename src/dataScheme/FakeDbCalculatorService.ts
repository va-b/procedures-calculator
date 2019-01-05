import ICalculatorService from "@/services/ICalculatorService";
import {FrontendStepDbModel} from "@/dataScheme/DataModel";
import {FakeDb} from "@/dataScheme/FakeDb";

export default class FakeDbCalculatorService implements ICalculatorService
{
    GetSteps(): Promise<FrontendStepDbModel[]>
    {
        return new Promise(resolve => {
            return FakeDb.FrontendStep.sort((a, b) => a.order - b.order)
        });
    }

}
