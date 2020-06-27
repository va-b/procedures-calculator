import {
    IChoice, IChoiceLink, IDocument, IExpression,
    IFrontendStep,
    IInitial,
    IOrganisation, IParameter, IProcedure, IResultItem,
    IResultStep, IStage,
} from "@/model/CommonModels";
import ICalculatorService from "@/services/ICalculatorService";
import { ApiHelper } from "@/services/IService";

type imported<T> = { default: T }

export default class CalculatorService implements ICalculatorService
{
    constructor(private readonly geturl: ApiHelper){}

    async GetSteps(): Promise<IInitial>
    {
        let res = await Promise.all([
            import('@/db/json/FrontendStep.json'),
            import('@/db/json/Parameter.json'),
            import('@/db/json/Choice.json'),
            import('@/db/json/Expression.json'),
            import('@/db/json/Link.json'),
        ]);
        return {
            FrontendSteps:  res[0].default.sort((a, b) => a.Order - b.Order) as IFrontendStep[],
            Parameters:     res[1].default.sort((a, b) => a.FrontendStepId - b.FrontendStepId) as IParameter[],
            Choices:        res[2].default.sort((a, b) => a.ParameterId - b.ParameterId) as IChoice[],
            Expressions:    res[3].default as IExpression[],
            Links:          res[4].default as IChoiceLink[]
        };
    }

    async GetResults( expressionIds: number[] ): Promise<IResultStep[]>
    {
        let procIds: number[] = (await import('@/db/json/Expression.json'))
            .default
            .filter(x => expressionIds.includes(x.Id))
            .map(x => x.ProcedureId);

        let procedures: IProcedure[] = (await import('@/db/json/Procedure.json'))
            .default
            .filter(x => procIds.includes(x.Id));

        let orgs: IOrganisation[] = (await import('@/db/json/Organisation.json')).default;
        let docs: IDocument[] = (await import('@/db/json/Document.json')).default;

        let items: IResultItem[] = procedures.map(p => {
            let doc = docs.find(d => d.Id == p.DocumentId);
            let org = orgs.find(o => o.Id == p.OrganisationId);

            return {
                StageId: p.StageId,
                ProcedureId: p.Id,
                ProcedureName: p.Title,
                PerformingTime: p.PerformingTime,
                IsTimeByCalendar: p.IsTimeByCalendar,
                OrganisationId: p.OrganisationId,
                OrganisationName: org.Title,
                DocumentName: doc.Title
            };
        });
        let result: IResultStep[] = (await import('@/db/json/Stage.json') as imported<IStage[]>)
            .default
            .sort((a, b) => a.Order - b.Order)
            .map(s => {
                let it = items.filter(i => i.StageId === s.Id);
                return {
                    StepId: s.Id,
                    StepName: s.Title,
                    StepNum: s.Order,
                    Items: it,
                    TotalTime: it.reduce((a, b) => a + (b.PerformingTime ?? 0), 0)
                };
            });

        return result;
    }

    async GetOrganisation( id: number ): Promise<IOrganisation>
    {
        let orgs = (await import('@/db/json/Organisation.json')).default as IOrganisation[];
        return orgs.find(x => x.Id == id);
    }

}