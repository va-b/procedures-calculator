import { GetExpressionsByChoiceIds } from "@/model/ChoiceGraphHelper";
import { IChoiceLink, IExpression, IFrontendStep, IInitial, IParameter, IResultStep } from "@/model/model";
import { Choice } from "@/model/model";
import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex';

export class AppState
{
  public currentStepNumber = null;
  frontendSteps: IFrontendStep[] = [];
  parameters: IParameter[] = [];
  choices: Choice[] = [];
  expressions: IExpression[] = [];
  links: IChoiceLink[] = [];
  results: IResultStep[] = [];
}

const store: StoreOptions<AppState> = {
  state: new AppState(),
  mutations: {
    SetInitial(state: AppState, initData: IInitial)
    {
      state.frontendSteps = initData.frontendSteps;
      state.currentStepNumber = initData.frontendSteps.find(x => x.order == 1).order;
      state.parameters = initData.parameters;
      state.choices = initData.choices.map(x => new Choice(x, state));
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
      state.choices.forEach(x => {
        if(x.parameterId == choice.parameterId) x.selected = false;
      });
      choice.selected = true;
    },
    SetResults(state: AppState, results: IResultStep[])
    {
      state.results = results;
    }
  },
  actions: {
    async LoadInitial({commit}): Promise<void>
    {
      try
      {
        let res = await window
            .serviceFactory
            .GetDefaultCalculatorService()
            .GetSteps();
        commit('SetInitial', res);
      }
      catch(e) {console.error(e)}
    },
    async LoadResults({commit, state}): Promise<void>
    {
      let expressionIds = GetExpressionsByChoiceIds(
          state.choices.filter(x => x.selected).map(x => x.id),
          state.expressions,
          state.links,
          state.choices
      ).map(x => x.id);
      let distinctedExpressionIds = Array.from(new Set(expressionIds));

      try
      {
        let res = await window
            .serviceFactory
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
    ChoicesForParameter: state => parameterId =>
        state.choices.filter(x => x.parameterId == parameterId),
    SelectedChoiceIdForParameter: state => parameterId =>
    {
      let res = state.choices.find(x => x.parameterId == parameterId && x.selected);
      return !!res ? res.id : null;
    }
  }
};

Vue.use(Vuex);
export default new Vuex.Store(store);