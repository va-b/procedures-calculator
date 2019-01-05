import ChoiceTable from "@/dataScheme/ChoiceTable";
import DocumentTable from "@/dataScheme/DocumentTable";
import ExpressionTable from "@/dataScheme/ExpressionTable";
import FrontendStepTable from "@/dataScheme/FrontendStepTable";
import OrganisationTable from "@/dataScheme/OrganisationTable";
import ParameterTable from "@/dataScheme/ParameterTable";
import ProcedureTable from "@/dataScheme/ProcedureTable";
import StageTable from "@/dataScheme/StageTable";
import SubregionTable from "@/dataScheme/SubregionTable";
import {
    ChoiceDbModel,
    DocumentDbModel,
    ExpressionDbModel,
    FrontendStepDbModel,
    OrganisationDbModel, ParameterDbModel, ProcedureDbModel, StageDbModel, SubregionDbModel
} from "@/dataScheme/DataModel";


export const FakeDb : IFakeDb = {
  Choice:       ChoiceTable,
  Document:     DocumentTable,
  Expression:   ExpressionTable,
  FrontendStep: FrontendStepTable,
  Organisation: OrganisationTable,
  Parameter:    ParameterTable,
  Procedure:    ProcedureTable,
  Stage:        StageTable,
  Subregion:    SubregionTable
};

export interface IFakeDb
{
    Choice:         ChoiceDbModel[];
    Document:       DocumentDbModel[];
    Expression:     ExpressionDbModel[];
    FrontendStep:   FrontendStepDbModel[];
    Organisation:   OrganisationDbModel[];
    Parameter:      ParameterDbModel[];
    Procedure:      ProcedureDbModel[];
    Stage:          StageDbModel[];
    Subregion:      SubregionDbModel[];
}
