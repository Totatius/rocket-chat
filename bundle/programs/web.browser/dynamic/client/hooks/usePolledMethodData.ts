function module(e,t,l){let o,n,r,a;l.link("@babel/runtime/helpers/objectSpread2",{default(e){o=e}},0),l.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){n=e}},1),l.export({usePolledMethodData:()=>u}),l.link("react",{useEffect(e){r=e}},0),l.link("./useMethodData",{useMethodData(e){a=e}},1);const u=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],l=arguments.length>2?arguments[2]:void 0;const u=a(e,t),{reload:d}=u,i=n(u,["reload"]);return r(()=>{const e=setInterval(()=>{d()},l);return()=>{clearInterval(e)}},[d,l]),o({},i,{reload:d})}}

