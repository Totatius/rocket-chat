function module(e,t,n){var l,u,a,r,o,i,c,f,m,s,d;n.link("@babel/runtime/helpers/extends",{default:function(e){l=e}},0),n.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){u=e}},1),n.link("@babel/runtime/helpers/toConsumableArray",{default:function(e){a=e}},2),n.link("@babel/runtime/helpers/slicedToArray",{default:function(e){r=e}},3),n.export({AutoCompleteDepartment:function(){return p}}),n.link("react",{default:function(e){o=e},useMemo:function(e){i=e},useState:function(e){c=e}},0),n.link("@rocket.chat/fuselage",{AutoComplete:function(e){f=e},Option:function(e){m=e}},1),n.link("../contexts/TranslationContext",{useTranslation:function(e){s=e}},2),n.link("../hooks/useEndpointData",{useEndpointData:function(e){d=e}},3);var p=o.memo((function(e){var t=s(),n=c(""),p=r(n,2),b=p[0],v=p[1],k,h=d("livechat/department",i((function(){return{text:b}}),[b])).value,A=e.label,x=i((function(){return h&&[{value:"All",label:A&&t("All")}].concat(a(h.departments.map((function(e){return{value:e._id,label:e.name}}))))||[{value:"All",label:A||t("All")}]}),[h,A,t]);return o.createElement(f,l({},e,{filter:b,setFilter:v,renderSelected:function(e){var t=e.label;return(o.createElement(o.Fragment,null,t))},renderItem:function(e){var t=e.value,n=u(e,["value"]);return(o.createElement(m,l({key:t},n)))},options:x}))}))}
