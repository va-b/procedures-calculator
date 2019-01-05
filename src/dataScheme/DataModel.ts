interface IEntity
{
    id: number;
}

interface IContentEntity extends IEntity
{
    title: string;
}

export interface ChoiceDbModel extends IContentEntity
{
    parameterId: number;
    relatedExpressionId: number;
}

export interface DocumentDbModel extends IContentEntity 
{}

export interface ExpressionDbModel extends IEntity
{
    choiceId: number;
    procedureId: number;
}

export interface FrontendStepDbModel extends IContentEntity
{
    order: number;
}

export interface OrganisationDbModel extends IContentEntity
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

export interface ParameterDbModel extends IContentEntity
{
    description: string;
    imageUrl: string;
    frontendStepId: number;
}

export interface ProcedureDbModel extends IEntity
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
