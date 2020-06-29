import type {
	IChoice,
	IChoiceLink,
	IDocument,
	IExpression,
	IFrontendStep,
	IOrganisation,
	IParameter, IProcedure, IStage, ISubregion,
} from "@/model/CommonModels";

export type EntityMap = {
	"Choice" : IChoice;
	"Document" : IDocument;
	"Expression" : IExpression;
	"FrontendStep" : IFrontendStep;
	"Link" : IChoiceLink;
	"Organisation" : IOrganisation;
	"Parameter" : IParameter;
	"Procedure" : IProcedure;
	"Stage" : IStage;
	"Subregion" : ISubregion;
};
export type EntityKey = keyof EntityMap;

export interface IDbService
{
	GetEntity<E extends EntityKey>(key: E): Promise<EntityMap[E][]>
}