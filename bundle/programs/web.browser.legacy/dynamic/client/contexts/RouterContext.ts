function module(u,n,t){var r,e,o,i;t.export({RouterContext:function(){return c},useRoute:function(){return f},useRoutePath:function(){return a},useRouteUrl:function(){return s},useRouteParameter:function(){return R},useQueryStringParameter:function(){return l},useCurrentRoute:function(){return y}}),t.link("react",{createContext:function(u){r=u},useContext:function(u){e=u},useMemo:function(u){o=u}},0),t.link("use-subscription",{useSubscription:function(u){i=u}},1);var c=r({queryRoutePath:function(){return{getCurrentValue:function(){},subscribe:function(){return function(){}}}},queryRouteUrl:function(){return{getCurrentValue:function(){},subscribe:function(){return function(){}}}},pushRoute:function(){},replaceRoute:function(){},queryRouteParameter:function(){return{getCurrentValue:function(){},subscribe:function(){return function(){}}}},queryQueryStringParameter:function(){return{getCurrentValue:function(){},subscribe:function(){return function(){}}}},queryCurrentRoute:function(){return{getCurrentValue:function(){return[void 0,{},{},void 0]},subscribe:function(){return function(){}}}}}),f=function(u){var n=e(c),t=n.queryRoutePath,r=n.queryRouteUrl,i=n.pushRoute,f=n.replaceRoute;return o((function(){return{getPath:function(n,r){return t(u,n,r).getCurrentValue()},getUrl:function(n,t){return r(u,n,t).getCurrentValue()},push:function(n,t){return i(u,n,t)},replace:function(n,t){return f(u,n,t)}}}),[t,r,u,i,f])},a=function(u,n,t){var r,f=e(c).queryRoutePath;return i(o((function(){return f(u,n,t)}),[f,u,n,t]))},s=function(u,n,t){var r,f=e(c).queryRouteUrl;return i(o((function(){return f(u,n,t)}),[f,u,n,t]))},R=function(u){var n,t=e(c).queryRouteParameter;return i(o((function(){return t(u)}),[t,u]))},l=function(u){var n,t=e(c).queryQueryStringParameter;return i(o((function(){return t(u)}),[t,u]))},y=function(){var u,n=e(c).queryCurrentRoute;return i(o((function(){return n()}),[n]))}}

