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
        let h1 = links.filter(l => l.chE == choiceId).map(l => l.chS);
        if(h1.length == 0)
        {
            return choices.find(x => x.id == choiceId).selected;
        }
        else
        {
            return !!h1
                .filter(choiceId => choices.find(x => x.id == choiceId).selected)
                .find(downToTheGraph);
        }
    };

    return Array.from(new Set(expressions.filter(x => downToTheGraph(x.choiceId))));
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
        let hl = links.filter(l => l.chE == choiceId).map(l => l.chS);
        if(hl.length == 0) return [choiceId];
        else return [].concat(...hl.map(GetFlatPoints));
    };

    let hl0 = links.filter(l => l.chE == choiceId).map(l => l.chS);
    if(hl0.length == 0) return false;

    let res: number[] = Array.from(new Set([].concat(...hl0.map(GetFlatPoints))));
    let r = res.every(x => !choices.find(y => y.id == x).selected);
    if(r) choices.find(x => x.id == choiceId).selected = false;
    return r;
}