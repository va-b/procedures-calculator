import {IChoice, IChoiceLink, IExpression} from "@/model/CommonModels";

export function GetExpressionsByChoiceIds(
    expressions: IExpression[],
    links: IChoiceLink[],
    choices: IChoice[]
): IExpression[]
{
    const downToTheGraph: (choiceId: number) => boolean
        = choiceId =>
    {
        let h1 = links.filter(l => l.ChE == choiceId).map(l => l.ChS);
        if(h1.length == 0)
        {
            return choices.find(x => x.Id == choiceId).Selected;
        }
        else
        {
            return !!h1
                .filter(choiceId => choices.find(x => x.Id == choiceId).Selected)
                .find(downToTheGraph);
        }
    };

    return Array.from(new Set(expressions.filter(x => downToTheGraph(x.ChoiceId))));
}

export function IsChoiceDisabled(
    choiceId: number,
    links: IChoiceLink[],
    choices: IChoice[]
): boolean
{
    const GetFlatPoints: (choiceId: number) => number[]
        = choiceId =>
    {
        let hl = links.filter(l => l.ChE == choiceId).map(l => l.ChS);
        if(hl.length == 0) return [choiceId];
        else return [].concat(...hl.map(GetFlatPoints));
    };

    let hl0 = links.filter(l => l.ChE == choiceId).map(l => l.ChS);
    if(hl0.length == 0) return false;

    let res: number[] = Array.from(new Set([].concat(...hl0.map(GetFlatPoints))));
    let r = res.every(x => !choices.find(y => y.Id == x).Selected);
    if(r) choices.find(x => x.Id == choiceId).Selected = false;
    return r;
}