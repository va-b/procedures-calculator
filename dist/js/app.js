(function(t){function e(e){for(var r,n,l=e[0],s=e[1],o=e[2],p=0,f=[];p<l.length;p++)n=l[p],i[n]&&f.push(i[n][0]),i[n]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(t[r]=s[r]);u&&u(e);while(f.length)f.shift()();return c.push.apply(c,o||[]),a()}function a(){for(var t,e=0;e<c.length;e++){for(var a=c[e],r=!0,l=1;l<a.length;l++){var s=a[l];0!==i[s]&&(r=!1)}r&&(c.splice(e--,1),t=n(n.s=a[0]))}return t}var r={},i={app:0},c=[];function n(e){if(r[e])return r[e].exports;var a=r[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=r,n.d=function(t,e,a){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(a,r,function(e){return t[e]}.bind(null,r));return a},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],s=l.push.bind(l);l.push=e,l=l.slice();for(var o=0;o<l.length;o++)e(l[o]);var u=s;c.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("cd49")},cd49:function(t,e,a){"use strict";a.r(e);a("744f"),a("6c7b"),a("7514"),a("20d6"),a("1c4c"),a("6762"),a("cadf"),a("e804"),a("55dd"),a("d04f"),a("c8ce"),a("217b"),a("7f7f"),a("f400"),a("7f25"),a("536b"),a("d9ab"),a("f9ab"),a("32d7"),a("25c9"),a("9f3c"),a("042e"),a("c7c6"),a("f4ff"),a("049f"),a("7872"),a("a69f"),a("0b21"),a("6c1a"),a("c7c62"),a("84b4"),a("c5f6"),a("2e37"),a("fca0"),a("7cdf"),a("ee1d"),a("b1b1"),a("87f3"),a("9278"),a("5df2"),a("04ff"),a("f751"),a("4504"),a("fee7"),a("ffc1"),a("0d6d"),a("9986"),a("8e6e"),a("25db"),a("e4f7"),a("b9a1"),a("64d5"),a("9aea"),a("db97"),a("66c8"),a("57f0"),a("165b"),a("456d"),a("cf6a"),a("fd24"),a("8615"),a("551c"),a("097d"),a("df1b"),a("2397"),a("88ca"),a("ba16"),a("d185"),a("ebde"),a("2d34"),a("f6b3"),a("2251"),a("c698"),a("a19f"),a("9253"),a("9275"),a("3b2b"),a("3846"),a("4917"),a("a481"),a("28a5"),a("386d"),a("6b54"),a("4f7f"),a("8a81"),a("ac4d"),a("8449"),a("9c86"),a("fa83"),a("48c0"),a("a032"),a("aef6"),a("d263"),a("6c37"),a("9ec8"),a("5695"),a("2fdb"),a("d0b0"),a("b54a"),a("f576"),a("ed50"),a("788d"),a("14b9"),a("f386"),a("f559"),a("1448"),a("673e"),a("242a"),a("c66f"),a("b05c"),a("34ef"),a("6aa2"),a("15ac"),a("af56"),a("b6e4"),a("9c29"),a("63d9"),a("4dda"),a("10ad"),a("c02b"),a("4795"),a("130f"),a("ac6a"),a("96cf");var r=a("2b0e"),i=a("ce5b"),c=a.n(i),n=(a("bf40"),a("0879")),l={lang:{locales:{ru:n["a"]},current:"ru"},theme:{primary:"#00B0FF",secondary:"#424242",accent:"#82B1FF",error:"#FF5252",info:"#2196F3",success:"#4CAF50",warning:"#FFC107"}};r["default"].use(c.a,l);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-content",[a("router-view")],1)],1)},o=[],u=a("c665"),p=a("dc0a"),f=a("d328"),d=a("11d9"),m=a("9ab4"),b=a("60a3"),v=function(t){function e(){return Object(u["a"])(this,e),Object(f["a"])(this,Object(d["a"])(e).apply(this,arguments))}return Object(p["a"])(e,t),e}(b["c"]);v=m["a"]([b["a"]],v);var h=v,g=h,w=a("2877"),_=Object(w["a"])(g,s,o,!1,null,null,null);_.options.__file="App.vue";var j=_.exports,y=a("8c4f"),x=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{"grid-list-lg":""}},[a("v-stepper",{model:{value:t.e1,callback:function(e){t.e1=e},expression:"e1"}},[a("v-stepper-header",t._l(t.steps,function(e,r){return a("v-stepper-step",{key:e.numer,attrs:{complete:t.e1>e.numer,step:e.numer}},[t._v("\n                "+t._s(e.title)+"\n            ")])})),a("v-stepper-items",t._l(t.steps,function(e,r){return a("v-stepper-content",{key:e.numer,attrs:{step:e.numer}},[a("v-card",{staticClass:"mb-5",attrs:{flat:""}},[a("v-card-title",{staticClass:"title"},[t._v("\n                        "+t._s(e.title)+"\n                    ")]),a("v-card-text",{staticClass:"title"},[a("v-layout",{attrs:{column:""}},t._l(t.params.filter(function(t){return t.step==e.numer}),function(t){return a("CalcParameter",{key:t.title,attrs:{parameter:t}})}))],1)],1),t.e1>1?a("v-btn",{attrs:{flat:""},on:{click:function(e){t.e1--}}},[t._v("Назад")]):t._e(),t.e1<t.steps.length?a("v-btn",{attrs:{depressed:"",color:"primary"},on:{click:function(a){t.e1=e.numer+1}}},[t._v("\n                    Вперёд\n                ")]):t._e()],1)}))],1)],1)},O=[],C=a("aa9a"),k=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-flex",[a("v-card",[a("v-card-title",[a("v-avatar",{staticClass:"mr-3",attrs:{size:40}},[a("img",{attrs:{src:t.parameter.imgUrl}})]),a("div",[t._v(t._s(t.parameter.title))])],1),a("v-card-text",{staticClass:"pt-0"},[a("v-radio-group",{staticClass:"mt-0",model:{value:t.radioGroup,callback:function(e){t.radioGroup=e},expression:"radioGroup"}},t._l(t.parameter.choices,function(t,e){return a("v-radio",{key:e,attrs:{label:t.title,value:e}})}))],1)],1)],1)},U=[],F=function(t){function e(){var t;return Object(u["a"])(this,e),t=Object(f["a"])(this,Object(d["a"])(e).apply(this,arguments)),t.radioGroup=null,t}return Object(p["a"])(e,t),e}(b["c"]);m["a"]([Object(b["b"])()],F.prototype,"parameter",void 0),F=m["a"]([b["a"]],F);var P=F,S=P,$=Object(w["a"])(S,k,U,!1,null,null,null);$.options.__file="CalcParameter.vue";var M=$.exports,E=[{title:"Тип объекта",step:1,imgUrl:"http://www.точказаточкой.com/data/images/Типичная-Хижина-африканской-деревни_56f191b29ed97-thumb.jpg",choices:[{title:"Малоэтажный жилой дом"},{title:"Средне этажный жилой дом"},{title:"Многоэтажный жилой дом"},{title:"Линейные объекты"},{title:"Производственного и коммерческого назначения"}]},{title:"Назначение объекта",step:2,imgUrl:"http://www.точказаточкой.com/data/images/Типичная-Хижина-африканской-деревни_56f191b29ed97-thumb.jpg",choices:[{title:"Жилого назначения"},{title:"Производственного и коммерческого назначения"}]},{title:"Местоположение объекта строительства",step:2,imgUrl:"http://www.точказаточкой.com/data/images/Типичная-Хижина-африканской-деревни_56f191b29ed97-thumb.jpg",choices:[{title:"г.Тамбов"}]},{title:"Общая площадь",step:2,imgUrl:"http://www.точказаточкой.com/data/images/Типичная-Хижина-африканской-деревни_56f191b29ed97-thumb.jpg",choices:[{title:"не более 1500 м2"}]},{title:"Этажность",step:2,imgUrl:"http://www.точказаточкой.com/data/images/Типичная-Хижина-африканской-деревни_56f191b29ed97-thumb.jpg",choices:[{title:"не более 2 этажа"},{title:"до 4-х этажей"},{title:"не выше 8 этажей"},{title:"9 и выше"}]},{title:"Система холодного водоснабжения",step:4,imgUrl:"http://www.точказаточкой.com/data/images/Типичная-Хижина-африканской-деревни_56f191b29ed97-thumb.jpg",choices:[{title:"Да"},{title:"Нет"}]},{title:"Система водоотведения",step:4,imgUrl:"http://www.точказаточкой.com/data/images/Типичная-Хижина-африканской-деревни_56f191b29ed97-thumb.jpg",choices:[{title:"Да"},{title:"Нет"}]},{title:"Система газораспределения",step:4,imgUrl:"http://www.точказаточкой.com/data/images/Типичная-Хижина-африканской-деревни_56f191b29ed97-thumb.jpg",choices:[{title:"Да"},{title:"Нет"}]},{title:"Электрические сети",step:4,imgUrl:"http://www.точказаточкой.com/data/images/Типичная-Хижина-африканской-деревни_56f191b29ed97-thumb.jpg",choices:[{title:"Да"},{title:"Нет"}]},{title:"Особо охраняемые охранные зоны",step:3,imgUrl:"http://www.точказаточкой.com/data/images/Типичная-Хижина-африканской-деревни_56f191b29ed97-thumb.jpg",choices:[{title:"Объект в границе зоны"},{title:"Объект не в границе зоны"}]},{title:"Охранные зоны культурного наследия",step:3,imgUrl:"http://www.точказаточкой.com/data/images/Типичная-Хижина-африканской-деревни_56f191b29ed97-thumb.jpg",choices:[{title:"Объект в границе зоны"},{title:"Объект не в границе зоны"}]},{title:"Установление санитарно-защитных зон",step:3,imgUrl:"http://www.точказаточкой.com/data/images/Типичная-Хижина-африканской-деревни_56f191b29ed97-thumb.jpg",choices:[{title:"Требуется"},{title:"Не требуется"}]},{title:"Разработка проектной документации",step:5,imgUrl:"http://www.точказаточкой.com/data/images/Типичная-Хижина-африканской-деревни_56f191b29ed97-thumb.jpg",choices:[{title:"Государственная экспертиза"},{title:"Негосударственная экспертиза"},{title:"Не проводится"}]},{title:"Источник финансирования",step:5,imgUrl:"http://www.точказаточкой.com/data/images/Типичная-Хижина-африканской-деревни_56f191b29ed97-thumb.jpg",choices:[{title:"Средства бюджета"},{title:"Внебюджетные средства"}]},{title:"Вырубка или пересадка деревьев",step:5,imgUrl:"http://www.точказаточкой.com/data/images/Типичная-Хижина-африканской-деревни_56f191b29ed97-thumb.jpg",choices:[{title:"Требуется"},{title:"Не требуется"}]}],G=[{numer:1,title:"Общие сведения"},{numer:2,title:"Земельный участок"},{numer:3,title:"Подключение к сетям"},{numer:4,title:"Параметры строительства"},{numer:5,title:"Строительство объекта"}],T=function(t){function e(){var t;return Object(u["a"])(this,e),t=Object(f["a"])(this,Object(d["a"])(e).apply(this,arguments)),t.e1=1,t}return Object(C["a"])(e,[{key:"params",get:function(){return E}},{key:"steps",get:function(){return G}}]),Object(p["a"])(e,t),e}(b["c"]);T=m["a"]([Object(b["a"])({components:{CalcParameter:M}})],T);var z=T,A=z,B=Object(w["a"])(A,x,O,!1,null,null,null);B.options.__file="Main.vue";var J=B.exports,D=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{"grid-list-lg":"","fill-height":"","justify-center":"","align-center":""}},[a("v-layout",{attrs:{row:"","fill-height":"","justify-center":"","align-center":""}},[a("v-flex",{staticClass:"elevation-8 pa-4 h-100",staticStyle:{background:"url(http://archit.tmbreg.ru/assets/files/news/calculator/mainimg2.png) center center no-repeat","background-size":"cover"},attrs:{xs12:"",xl8:""}},[a("v-layout",{attrs:{row:"","justify-end":""}},[a("v-flex",{attrs:{xs12:"",md8:"",lg6:""}},[a("v-card",{staticClass:"mb-2 elevation-12",attrs:{tile:""}},[a("div",{staticClass:"d-flex py-3 px-4 d-flex"},[a("img",{staticClass:"d-block pr-3",staticStyle:{height:"68px","min-width":"64px","max-width":"64px"},attrs:{src:"http://archit.tmbreg.ru/assets/files/news/calculator/gerb-small.png"}}),a("div",{staticClass:"headline py-2"},[t._v("\r\n                                Калькулятор процедур в сфере строительства\r\n                            ")])])]),a("v-layout",{attrs:{row:"",wrap:""}},t._l(t.etap,function(e,r){return a("v-flex",{key:r,attrs:{xs12:"",sm4:""}},[a("v-card",{staticClass:"elevation-12 h-100",attrs:{tile:""}},[a("v-card-title",{staticClass:"justify-center align-center py-2 h-50"},[a("v-avatar",{attrs:{color:"primary"}},[a("v-icon",{staticClass:"white--text"},[t._v(t._s(e.icon))])],1)],1),a("v-divider"),a("v-card-title",{staticClass:"subheading justify-center align-center py-2 h-50"},[a("div",{staticClass:"text-xs-center"},[t._v(t._s(e.text))])])],1)],1)})),a("v-card",{staticClass:"mt-2 elevation-12",attrs:{tile:""}},[a("v-card-text",{staticClass:"subheading"},[t._v("\r\n                            Интерактивный сервис для застройщиков, где можно узнать сроки и этапы прохождения строительных процедур для конкретного проекта.\r\n                        ")]),a("v-card-actions",{staticClass:"justify-center pb-3"},[a("v-btn",{attrs:{large:"",dark:"",color:"primary"},on:{click:function(e){t.$router.push("/main")}}},[t._v("\r\n                                Открыть Онлайн-калькулятор (Demo-версия)\r\n                            ")])],1)],1)],1)],1)],1)],1)],1)},q=[],H=function(t){function e(){var t;return Object(u["a"])(this,e),t=Object(f["a"])(this,Object(d["a"])(e).apply(this,arguments)),t.e1=1,t.etap=[{icon:"fa-file-invoice",text:"прохождение процедур"},{icon:"fa-clock",text:"расчёт времени"},{icon:"fa-hotel",text:"реализация строительного проекта"}],t}return Object(p["a"])(e,t),e}(b["c"]);H=m["a"]([b["a"]],H);var I=H,K=I,L=Object(w["a"])(K,D,q,!1,null,null,null);L.options.__file="StartPage.vue";var N=L.exports;r["default"].use(y["a"]);var Q=new y["a"]({routes:[{path:"/main",component:J},{path:"/",component:N}]}),R=a("2f62");r["default"].use(R["a"]);var V=new R["a"].Store({state:{},mutations:{},actions:{}});a("d236");r["default"].config.productionTip=!1,new r["default"]({router:Q,store:V,render:function(t){return t(j)}}).$mount("#app")},d236:function(t,e,a){}});