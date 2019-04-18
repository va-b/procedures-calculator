import { IChoice } from "@/model/CommonModels";
import { AppState } from "@/store";

export class Choice implements IChoice
{
    get disabled(): boolean
    {
        return false;
    }

    private state: AppState;

    id: number;
    parameterId: number;
    title: string;
    selected: boolean;

    constructor( x: IChoice, state: AppState)
    {
        this.id = x.id;
        this.parameterId = x.parameterId;
        this.title = x.title;
        this.selected = x.selected;
        this.state = state;
    }
}