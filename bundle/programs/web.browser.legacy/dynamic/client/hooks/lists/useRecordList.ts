function module(e,t,n){var r,i,o,u;n.link("@babel/runtime/helpers/objectSpread2",{default:function(e){r=e}},0),n.link("@babel/runtime/helpers/slicedToArray",{default:function(e){i=e}},1),n.export({useRecordList:function(){return c}}),n.link("react",{useEffect:function(e){o=e},useState:function(e){u=e}},0);var c=function(e){var t=u((function(){return{phase:e.phase,items:e.items,itemCount:e.itemCount,error:void 0}})),n=i(t,2),c=n[0],a=n[1];return o((function(){var t=e.on("mutating",(function(){a((function(){return{phase:e.phase,items:e.items,itemCount:e.itemCount,error:void 0}}))})),n=e.on("mutated",(function(){a((function(t){return{phase:e.phase,items:e.items,itemCount:e.itemCount,error:t.error}}))})),i=e.on("cleared",(function(){a((function(){return{phase:e.phase,items:e.items,itemCount:e.itemCount,error:void 0}}))})),o=e.on("errored",(function(e){a((function(t){return r({},t,{error:e})}))}));return function(){t(),n(),i(),o()}}),[e]),c}}

