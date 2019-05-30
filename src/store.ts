import {GetExpressionsByChoiceIds, IsChoiceDisabled} from "@/model/ChoiceGraphHelper";
import {
  IChoice,
  IChoiceLink,
  IExpression,
  IFrontendStep,
  IInitial,
  IOrganisation,
  IParameter,
  IResultStep
} from "@/model/CommonModels";
import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex';

export class AppState
{
  public currentStepNumber = null;
  frontendSteps: IFrontendStep[] = [];
  parameters: IParameter[] = [];
  choices: IChoice[] = [];
  expressions: IExpression[] = [];
  links: IChoiceLink[] = [];
  results: IResultStep[] = [];
  organisationForView: IOrganisation = null;
}

//TODO: скорее всего Vuex здесь вовсе не нужен
const store: StoreOptions<AppState> = {
  state: new AppState(),
  mutations: {
    SetInitial(state: AppState, initData: IInitial)
    {
      state.frontendSteps = initData.frontendSteps;
      state.currentStepNumber = initData.frontendSteps.find(x => x.order == 1).order;
      state.parameters = initData.parameters;
      state.choices = initData.choices;
      state.links = initData.links;
      state.expressions = initData.expressions;
    },
    FrontendStepNext(state: AppState)
    {
      let st = state.frontendSteps.find(x => x.order == state.currentStepNumber + 1);
      if(!!st) state.currentStepNumber = st.order;
    },
    FrontendStepPrev(state: AppState)
    {
      let st = state.frontendSteps.find(x => x.order == state.currentStepNumber - 1);
      if(!!st) state.currentStepNumber = st.order;
    },
    CheckChoice(state: AppState, choiceId: number)
    {
      let choice = state.choices.find(x => x.id == choiceId);
      state.choices.filter(x => x.parameterId == choice.parameterId).forEach(x => x.selected = false);
      choice.selected = true;
    },
    SetResults(state: AppState, results: IResultStep[])
    {
      state.results = results;
    },
    SetOrganisationForView(state: AppState, organisation: IOrganisation)
    {
      state.organisationForView = organisation;
    },
    ResetOrganisationForView(state: AppState)
    {
      state.organisationForView = null;
    }
  },
  actions: {
    async LoadInitial({commit}): Promise<void>
    {
      try
      {
        let res = await window
            .$services
            .GetDefaultCalculatorService()
            .GetSteps();
        commit('SetInitial', res);
      }
      catch(e) {console.error(e)}
    },
    async LoadOrganisation({commit}, id: number): Promise<void>
    {
      commit('ResetOrganisationForView');
      try
      {
        let res = await window
            .$services
            .GetDefaultCalculatorService()
            .GetOrganisation(id);
        commit('SetOrganisationForView', res);
      }
      catch(e) {console.error(e)}
    },
    async LoadResults({commit, state}, expressionIds: number[]): Promise<void>
    {
      try
      {
        let res = await window
            .$services
            .GetDefaultCalculatorService()
            .GetResults(expressionIds);
        commit('SetResults', res);
      }
      catch (e){console.error(e)}

    }
  },
  getters: {
    IsFirstStep: state => state.currentStepNumber == 1,
    IsLastStep:  state => state.currentStepNumber == state.frontendSteps[state.frontendSteps.length - 1].order,
    CurrentParams: state => state.parameters.filter(x => x.frontendStepId == state.currentStepNumber),
    ChoicesForParameter: state => parameterId => state.choices.filter(x => x.parameterId == parameterId),
    IsChoiceDisabled: state => choiceId => IsChoiceDisabled(choiceId, state.links, state.choices),
    SelectedChoiceIdForParameter: state => parameterId =>
    {
      let res = state.choices.filter(x => x.parameterId == parameterId).find(x => x.selected);
      return !!res ? res.id : null;
    }
  }
};

Vue.use(Vuex);
export default new Vuex.Store(store);