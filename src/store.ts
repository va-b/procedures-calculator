import {GetExpressionsByChoiceIds, IsChoiceDisabled} from "@/model/ChoiceGraphHelper";
import {
  IChoice,
  IChoiceLink,
  IExpression,
  IFrontendStep,
  IInitial,
  IParameter,
  IResultStep
} from "@/model/CommonModels";
import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex';

export class AppState
{
  FrontendSteps: IFrontendStep[] = [];
  Parameters: IParameter[] = [];
  Choices: IChoice[] = [];
  Expressions: IExpression[] = [];
  Links: IChoiceLink[] = [];
  Results: IResultStep[] = [];
}

//TODO: скорее всего Vuex здесь вовсе не нужен
const store: StoreOptions<AppState> = {
  state: new AppState(),
  mutations: {
    SetInitial(state: AppState, initData: IInitial)
    {
      state.FrontendSteps = initData.FrontendSteps;
      state.Parameters = initData.Parameters;
      state.Choices = initData.Choices;
      state.Links = initData.Links;
      state.Expressions = initData.Expressions;
    },

    CheckChoice(state: AppState, choiceId: number)
    {
      let choice = state.Choices.find(x => x.Id == choiceId);
      state.Choices.filter(x => x.ParameterId == choice.ParameterId).forEach(x => x.Selected = false);
      choice.Selected = true;
    },
    SetResults(state: AppState, results: IResultStep[])
    {
      state.Results = results;
    },
  },
  actions: {
    async LoadInitial({commit}): Promise<void>
    {
      try
      {
        let res = await window
            .$service
            .GetSteps();
        commit('SetInitial', res);
      }
      catch(e) {console.error(e)}
    },
    async LoadResults({commit, state}, expressionIds: number[]): Promise<void>
    {
      try
      {
        let res = await window
            .$service.GetResults(expressionIds);
        commit('SetResults', res);
      }
      catch (e){console.error(e)}

    }
  },
  getters: {
    ChoicesForParameter: state => parameterId => state.Choices.filter(x => x.ParameterId == parameterId),
    IsChoiceDisabled: state => choiceId => IsChoiceDisabled(choiceId, state.Links, state.Choices),
    SelectedChoiceIdForParameter: state => parameterId =>
    {
      let res = state.Choices.filter(x => x.ParameterId == parameterId).find(x => x.Selected);
      return !!res ? res.Id : null;
    }
  }
};

Vue.use(Vuex);
export default new Vuex.Store(store);