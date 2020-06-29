import { EntityKey } from "@/services/IDbService";

interface IEntity<E extends EntityKey>
{
    Id: number & {__type: EntityKey};
    __type?: E;
}

interface IContentEntity<E extends EntityKey> extends IEntity<E>
{
    Title: string;
}

export interface IChoiceLink extends IEntity<"Link">
{
    ChS: number;
    ChE: number;
}

export interface IChoice extends IContentEntity<"Choice">
{
    ParameterId: number;
    Selected: boolean;
    disabled?: boolean;
}

export interface IDocument extends IContentEntity<"Document">
{}

export interface IExpression extends IEntity<"Expression">
{
    ChoiceId: number;
    ProcedureId: number;
}
export interface IStage extends IContentEntity<"Stage">
{
    Order: number;
}
export interface IFrontendStep extends IContentEntity<"FrontendStep">
{
    Order: number;
}

export interface IOrganisation extends IContentEntity<"Organisation">
{
    Phone: string;
    Fax: string;
    Email: string;
    Address: string;
    YandexMapsLink: string;
    IsByGovernment: boolean;
    SubregionId: number;
    Description: string;
}

export interface IParameter extends IContentEntity<"Parameter">
{
    Description: string;
    ImageUrl: string;
    FrontendStepId: number;
}

export interface IProcedure extends IContentEntity<"Procedure">
{
    PerformingTime: number;
    IsTimeByCalendar: boolean;
    OrganisationId: number;
    DocumentId: number;
    StageId: number;
}

export interface ISubregion extends IContentEntity<"Subregion">
{}

export interface IResultItem
{
    StageId: number;
    ProcedureId: number;
    ProcedureName: string;
    OrganisationId: number;
    OrganisationName: string;
    PerformingTime: number|null;
    IsTimeByCalendar: boolean;
    DocumentName: string;
}

export interface IResultStep
{
    StepId: number;
    StepNum: number;
    StepName: string;
    TotalTime: number;
    Items: IResultItem[];
}

export interface IInitial
{
    FrontendSteps: IFrontendStep[];
    Parameters: IParameter[];
    Choices: IChoice[];
    Expressions: IExpression[];
    Links: IChoiceLink[];
}
