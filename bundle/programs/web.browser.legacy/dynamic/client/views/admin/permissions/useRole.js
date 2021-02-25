function module(n,e,u){var i,t,o;u.export({useRole:function(){return c}}),u.link("react",{useCallback:function(n){i=n}},0),u.link("../../../../app/models/client",{Roles:function(n){t=n}},1),u.link("../../../hooks/useReactiveValue",{useReactiveValue:function(n){o=n}},2);var c=function(n){return o(i((function(){return t.findOne({_id:n})}),[n]))}}

