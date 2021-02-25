function module(e,n,t){var r,u,l,o,a,i,c,s,f,m,d,h,p,b,v,E,F;t.link("@babel/runtime/helpers/extends",{default:function(e){r=e}},0),t.link("@babel/runtime/helpers/objectSpread2",{default:function(e){u=e}},1),t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){l=e}},2),t.link("@babel/runtime/helpers/toConsumableArray",{default:function(e){o=e}},3),t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){a=e}},4),t.export({default:function(){return x}}),t.link("react",{default:function(e){i=e},useMemo:function(e){c=e},useEffect:function(e){s=e},useState:function(e){f=e}},0),t.link("@rocket.chat/fuselage",{TextInput:function(e){m=e},Select:function(e){d=e},Field:function(e){h=e}},1),t.link("../contexts/SettingsContext",{useSetting:function(e){p=e}},2),t.link("../hooks/useForm",{useForm:function(e){b=e}},3),t.link("../contexts/TranslationContext",{useTranslation:function(e){v=e}},4),t.link("../lib/capitalize",{capitalize:function(e){E=e}},5),t.link("../hooks/useComponentDidUpdate",{useComponentDidUpdate:function(e){F=e}},6);var k=function(e){var n=e.label,t=e.name,r=e.required,u=e.minLength,l=e.maxLength,d=e.setState,p=e.state,b=e.className,E=e.setCustomFieldsError,k=void 0===E?function(){return[]}:E,g=v(),C=f(""),x=a(C,2),j=x[0],S=x[1],_=c((function(){var e=[];return!p&&r&&e.push(g("The_field_is_required",n||t)),p.length<u&&p.length>0&&e.push(g("Min_length_is",u)),e.join(", ")}),[p,r,u,g,n,t]);return s((function(){k((function(e){return _?[].concat(o(e),[{name:t}]):e.filter((function(e){return e.name!==t}))}))}),[t,k,_]),F((function(){S(_)}),[_]),c((function(){return i.createElement(h,{className:b},i.createElement(h.Label,null,n||g(t),r&&"*"),i.createElement(h.Row,null,i.createElement(m,{name:t,error:j,maxLength:l,flexGrow:1,value:p,onChange:function(e){return d(e.currentTarget.value)}})),i.createElement(h.Error,null,j))}),[b,n,g,t,r,j,l,p,d])},g=function(e){var n=e.label,t=e.name,r=e.required,u=e.options,l=void 0===u?{}:u,m=e.setState,p=e.state,b=e.className,E=e.setCustomFieldsError,k=void 0===E?function(){return[]}:E,g=v(),C=f(""),x=a(C,2),j=x[0],S=x[1],_=c((function(){return Object.values(l).map((function(e){return[e,e]}))}),[l]),L=c((function(){return!p.length&&r?g("The_field_is_required",n||t):""}),[t,r,p.length,g]);return s((function(){k((function(e){return L?[].concat(o(e),[{name:t}]):e.filter((function(e){return e.name!==t}))}))}),[t,k,L]),F((function(){S(L)}),[L]),c((function(){return i.createElement(h,{className:b},i.createElement(h.Label,null,n||g(t),r&&"*"),i.createElement(h.Row,null,i.createElement(d,{name:t,error:j,flexGrow:1,value:p,options:_,onChange:function(e){return m(e)}})),i.createElement(h.Error,null,j))}),[b,n,g,t,r,j,p,_,m])},C=function(e){var n=e.formValues,t=e.formHandlers,o=e.customFields,c=l(e,["formValues","formHandlers","customFields"]);return Object.entries(o).map((function(e){var l=a(e,2),o=l[0],s=l[1],f=u({key:o,name:o,setState:t["handle"+E(o)],state:n[o]},s);return"select"===s.type?i.createElement(g,r({},f,c)):"text"===s.type?i.createElement(k,r({},f,c)):null}))};function x(e){var n=e.jsonCustomFields,t=e.customFieldsData,o=e.setCustomFieldsData,m=e.onLoadFields,d=void 0===m?function(){}:m,h=l(e,["jsonCustomFields","customFieldsData","setCustomFieldsData","onLoadFields"]),v=p("Accounts_CustomFields"),E=f((function(){try{return n||JSON.parse(v||"{}")}catch(e){return{}}})),F,k=a(E,1)[0],g=Boolean(Object.values(k).length),x=c((function(){return Object.entries(k).reduce((function(e,n){var t,r=a(n,2),u=r[0],l=r[1];return e[u]=null!==(t=l.defaultValue)&&void 0!==t?t:"",e}),{})}),[k]),j=b(u({},x,{},t)),S=j.values,_=j.handlers;return s((function(){d(g),g&&o(S)}),[g,d,o,S]),g?i.createElement(C,r({formValues:S,formHandlers:_,customFields:k},h)):null}}
