function module(e,t,n){let l,a,o,i,u,r,c;function d(e){let{_id:t,label:n,value:d,placeholder:s,readonly:m,autocomplete:g,disabled:k,hasResetButton:p,onChangeValue:h,onResetButtonClick:C}=e;const E=r(),f=e=>{h(e)};return u.createElement(u.Fragment,null,u.createElement(o.Container,null,u.createElement(l,null,u.createElement(a.Label,{htmlFor:t,title:t},n),p&&u.createElement(c,{"data-qa-reset-setting-id":t,onClick:C}))),u.createElement(a.Row,null,u.createElement(i,{"data-qa-setting-id":t,id:t,value:d,placeholder:s,disabled:k,readOnly:m,autoComplete:!1===g?"off":void 0,onChange:f,options:E.map(e=>{let{key:t,name:n}=e;return[t,n]})})))}n.export({LanguageSettingInput:()=>d}),n.link("@rocket.chat/fuselage",{Box(e){l=e},Field(e){a=e},Flex(e){o=e},Select(e){i=e}},0),n.link("react",{default(e){u=e}},1),n.link("../../../../contexts/TranslationContext",{useLanguages(e){r=e}},2),n.link("../ResetSettingButton",{ResetSettingButton(e){c=e}},3)}

