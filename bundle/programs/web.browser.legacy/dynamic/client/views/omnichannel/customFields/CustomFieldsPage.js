function module(e,t,n){var l,a,o,r,u,c,i,s,f,m,d;n.link("@babel/runtime/helpers/extends",{default:function(e){l=e}},0),n.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){a=e}},1),n.link("react",{default:function(e){o=e}},0),n.link("@rocket.chat/fuselage",{Button:function(e){r=e},Icon:function(e){u=e}},1),n.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){c=e}},2),n.link("../../../components/Page",{default:function(e){i=e}},3),n.link("../../../contexts/RouterContext",{useRoute:function(e){s=e}},4),n.link("../../../contexts/TranslationContext",{useTranslation:function(e){f=e}},5),n.link("../../../components/GenericTable",{default:function(e){m=e}},6),n.link("../../../components/FilterByText",{default:function(e){d=e}},7);var k=function(e){var t=e.data,n=e.header,k=e.setParams,h=e.params,p=e.title,x=e.renderRow,b=e.children,C=f(),E=s("omnichannel-customfields"),g=c((function(){return E.push({context:"new"})}));return o.createElement(i,{flexDirection:"row"},o.createElement(i,null,o.createElement(i.Header,{title:p},o.createElement(r,{onClick:g},o.createElement(u,{name:"plus",size:"x16"})," ",C("New"))),o.createElement(i.Content,null,o.createElement(m,{header:n,renderRow:x,results:t&&t.customFields,total:t&&t.total,setParams:k,params:h,renderFilter:function(e){var t=e.onChange,n=a(e,["onChange"]);return(o.createElement(d,l({onChange:t},n)))}}))),b)};n.exportDefault(k)}
