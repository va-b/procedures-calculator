import {
    ChoiceDbModel,
    DocumentDbModel,
    ExpressionDbModel,
    FrontendStepDbModel,
    OrganisationDbModel,
    ParameterDbModel,
    ProcedureDbModel,
    StageDbModel,
    SubregionDbModel
} from "@/model/DataModel";
import { AppState } from "@/store";

export class Choice implements ChoiceDbModel
{
    selected: boolean = false;

    get disabled(): boolean
    {
        return false;
    }

    private state: AppState;

    id: number;
    parameterId: number;
    title: string;

    constructor(x: ChoiceDbModel, state: AppState)
    {
        this.id = x.id;
        this.parameterId = x.parameterId;
        this.title = x.title;
        this.state = state;
    }
}

export type IFrontendStep = FrontendStepDbModel;