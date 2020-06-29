import type {
    IChoice, IChoiceLink,
    IDocument, IExpression,
    IFrontendStep,
    IInitial,
    IOrganisation, IParameter,
    IProcedure, IResultItem,
    IResultStep,
} from "@/model/CommonModels";
import type { ICalculatorService } from "@/services/ICalculatorService";

export default class CalculatorService implements ICalculatorService
{
    constructor(){}

    async GetSteps(): Promise<IInitial>
    {
        let res = await Promise.all([
            window.$db.GetEntity("FrontendStep"),
            window.$db.GetEntity("Parameter"),
            window.$db.GetEntity("Choice"),
            window.$db.GetEntity("Expression"),
            window.$db.GetEntity("Link"),
        ]);
        return {
            FrontendSteps:  res[0].sort((a, b) => a.Order - b.Order) as IFrontendStep[],
            Parameters:     res[1].sort((a, b) => a.FrontendStepId - b.FrontendStepId) as IParameter[],
            Choices:        res[2].sort((a, b) => a.ParameterId - b.ParameterId) as IChoice[],
            Expressions:    res[3] as IExpression[],
            Links:          res[4] as IChoiceLink[]
        };
    }

    async GetResults( expressionIds: number[] ): Promise<IResultStep[]>
    {
        let procIds: number[] = (await window.$db.GetEntity("Expression"))
            .filter(x => expressionIds.includes(x.Id))
            .map(x => x.ProcedureId);

        let procedures: IProcedure[] = (await window.$db.GetEntity("Procedure"))
            .filter(x => procIds.includes(x.Id));

        let orgs: IOrganisation[] = await window.$db.GetEntity("Organisation");
        let docs: IDocument[] = await window.$db.GetEntity("Document");
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
        let result: IResultStep[] = (await window.$db.GetEntity("Stage"))
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
        let orgs = (await window.$db.GetEntity("Organisation")) as IOrganisation[];
        return orgs.find(x => x.Id == id);
    }

}