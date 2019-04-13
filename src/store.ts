import { GetExpressionsByChoiceIds } from "@/model/ChoiceGraphHelper";
import { ChoiceLinkDbModel, ExpressionDbModel, FrontendStepDbModel, ParameterDbModel } from "@/model/DataModel";
import { Choice } from "@/model/model";
import { IInitial } from "@/services/ICalculatorService";
import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex';

export class AppState
{
  public currentStepNumber = null;
  frontendSteps: FrontendStepDbModel[] = [];
  parameters: ParameterDbModel[] = [];
  choices: Choice[] = [];
  expressions: ExpressionDbModel[] =[];
  links: ChoiceLinkDbModel[] =[];
}

const store: StoreOptions<AppState> = {
  state: new AppState(),
  mutations: {
    SetInitial(state: AppState, initData: IInitial)
    {
      state.frontendSteps = initData.frontendSteps.sort((a, b) => a.order - b.order);
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
      console.log(distinctedExpressionIds);

      try
      {
        let res = await window
            .serviceFactory
            .GetDefaultCalculatorService()
            .GetResults(distinctedExpressionIds);
        console.log(res);
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