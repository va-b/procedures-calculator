interface IEntity
{
    id: number;
}

interface IContentEntity extends IEntity
{
    title: string;
}

export interface IChoiceLink extends IEntity
{
    chS: number;
    chE: number;
}

export interface IChoice extends IContentEntity
{
    parameterId: number;
    selected: boolean;
    disabled?: boolean;
}

export interface IDocument extends IContentEntity
{}

export interface IExpression extends IEntity
{
    choiceId: number;
    procedureId: number;
}

export interface IFrontendStep extends IContentEntity
{
    order: number;
}

export interface IOrganisation extends IContentEntity
{
    phone: string;
    fax: string;
    email: string;
    address: string;
    latitude: number;
    longitude: number;
    isByGovernment: boolean;
    subregionId: number;
}

export interface IParameter extends IContentEntity
{
    description: string;
    imageUrl: string;
    frontendStepId: number;
}

export interface IProcedure extends IContentEntity
{
    performingTime: number;
    isTimeByCalendar: boolean;
    organisationId: number;
    documentId: number;
    stageId: number;
}

export interface StageDbModel extends IContentEntity
{
    order: number;
}

export interface SubregionDbModel extends IContentEntity
{}

export interface IResultItem
{
    stageId: number;
    procedureId: number;
    procedureName: string;
    organisationId: number;
    organisationName: string;
    performingTime: number|null;
    isTimeByCalendar: boolean;
    documentName: string;
}

export interface IResultStep
{
    stepId: number;
    stepNum: number;
    stepName: string;
    totalTime: number;
    items: IResultItem[];
}

export interface IInitial
{
    frontendSteps: IFrontendStep[];
    parameters: IParameter[];
    choices: IChoice[];
    expressions: IExpression[];
    links: IChoiceLink[];
}
