function module(e,t,n){let a,l,i,o,r,s,c,u,p,h,d;n.link("@babel/runtime/helpers/extends",{default(e){a=e}},0),n.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){l=e}},1),n.export({AppSettingsAssembler:()=>g}),n.link("react",{default(e){i=e},useMemo(e){o=e},useCallback(e){r=e}},0),n.link("@rocket.chat/fuselage",{Box(e){s=e}},1),n.link("../../../contexts/TranslationContext",{useTranslation(e){c=e}},2),n.link("../settings/Setting",{MemoizedSetting(e){u=e}},3),n.link("../../../lib/capitalize",{capitalize(e){p=e}},4),n.link("../../../contexts/RouterContext",{useRouteParameter(e){h=e}},5),n.link("../../../components/MarkdownText",{default(e){d=e}},6);const g=e=>{let{settings:t,values:n,handlers:a}=e;return(i.createElement(s,null,Object.values(t).map(e=>{const{id:t}=e;return(i.createElement(m,{key:t,appSetting:e,value:n[t],onChange:a["handle".concat(p(t))]}))})))},k=e=>{const t=c(),n=r((function(n){if(!n)return"";const a="project:apps-".concat(e,"-").concat(n);for(var l=arguments.length,i=new Array(l>1?l-1:0),o=1;o<l;o++)i[o-1]=arguments[o];return t(t.has(a)?a:n,...i)}),[t,e]);return n.has=r(n=>!!n&&(t.has("project:apps-".concat(e,"-").concat(n))||t.has(n)),[t,e]),n};function m(e){let{appSetting:t,onChange:n,value:r}=e,s=l(e,["appSetting","onChange","value"]);const c=h("id"),p=k(c),{id:g,type:m,i18nLabel:b,i18nDescription:f,values:v}=t,x=b&&p(b)||g||p(g),C=o(()=>f&&i.createElement(d,{content:p(f)}),[f,p]);return i.createElement(u,a({type:m,label:x,hint:C,value:r,onChangeValue:n,_id:g,values:v},s))}}

