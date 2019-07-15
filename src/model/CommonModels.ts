interface IEntity
{
    Id: number;
}

interface IContentEntity extends IEntity
{
    Title: string;
}

export interface IChoiceLink extends IEntity
{
    ChS: number;
    ChE: number;
}

export interface IChoice extends IContentEntity
{
    ParameterId: number;
    Selected: boolean;
    disabled?: boolean;
}

export interface IDocument extends IContentEntity
{}

export interface IExpression extends IEntity
{
    ChoiceId: number;
    ProcedureId: number;
}

export interface IFrontendStep extends IContentEntity
{
    Order: number;
}

export interface IOrganisation extends IContentEntity
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

export interface IParameter extends IContentEntity
{
    Description: string;
    ImageUrl: string;
    FrontendStepId: number;
}

export interface IProcedure extends IContentEntity
{
    PerformingTime: number;
    IsTimeByCalendar: boolean;
    OrganisationId: number;
    DocumentId: number;
    StageId: number;
}

export interface StageDbModel extends IContentEntity
{
    Order: number;
}

export interface SubregionDbModel extends IContentEntity
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
