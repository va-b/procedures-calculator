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
  //Индексированное хранилище ссылок на Choice
  choicesIndex: {[key: number]: IChoice} = {};
  //Индексированное по parameterId хранилище ссылок на Choice
  parameterIdChoicesIndex: {[key: number]: IChoice[]} = {};
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

      //
      state.choices.forEach(x => state.choicesIndex[x.id] = x);
      state.parameters.forEach(
          x => state.parameterIdChoicesIndex[x.id] = state.choices.filter(c => c.parameterId == x.id)
      );
      //
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
      let choice = state.choicesIndex[choiceId];
      state.parameterIdChoicesIndex[choice.parameterId].forEach(x => {
        x.selected = false;
      });
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
    async LoadResults({commit, state}): Promise<void>
    {
      let expressionIds = GetExpressionsByChoiceIds(
          state.expressions,
          state.links,
          state.choices
      ).map(x => x.id);
      let distinctedExpressionIds = Array.from(new Set(expressionIds));

      try
      {
        let res = await window
            .$services
            .GetDefaultCalculatorService()
            .GetResults(distinctedExpressionIds);
        commit('SetResults', res);
      }
      catch (e){console.error(e)}

    }
  },
  getters: {
    IsFirstStep: state => state.currentStepNumber == 1,
    IsLastStep:  state => state.currentStepNumber == state.frontendSteps[state.frontendSteps.length - 1].order,
    CurrentParams: state => state.parameters.filter(x => x.frontendStepId == state.currentStepNumber),
    ChoicesForParameter: state => parameterId => state.parameterIdChoicesIndex[parameterId],
    IsChoiceDisabled: state => choiceId => IsChoiceDisabled(choiceId, state.links, state.choicesIndex),
    SelectedChoiceIdForParameter: state => parameterId =>
    {
      let res = state.parameterIdChoicesIndex[parameterId].find(x => x.selected);
      return !!res ? res.id : null;
    }
  }
};

Vue.use(Vuex);
export default new Vuex.Store(store);