import { Choice, IChoiceLink, IExpression  } from "@/model/CommonModels";

export function GetExpressionsByChoiceIds(
    choiceIds: number[],
    expressions: IExpression[],
    links: IChoiceLink[],
    choices: Choice[]
): IExpression[]
{
    const isChoiceSelected: (choiceId: number) => boolean =
            choiceId => choices.find(c => c.id == choiceId).selected;

    const downToTheGraph: (choiceId: number) => boolean
        = choiceId =>
    {
        let h1 = links.filter(l => l.chE == choiceId).map(l => l.chS);
        if(h1.length == 0)
        {
            return isChoiceSelected(choiceId);
        }
        else
        {
            return !!h1.filter(isChoiceSelected).find(downToTheGraph);
        }
    };

    return expressions.filter(x => downToTheGraph(x.choiceId));

}