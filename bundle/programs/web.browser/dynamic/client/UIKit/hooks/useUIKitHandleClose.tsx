function module(e,t,a){let i,s,o,n;a.link("@babel/runtime/helpers/objectSpread2",{default(e){i=e}},0),a.export({useUIKitHandleClose:()=>c}),a.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){s=e}},0),a.link("../../contexts/ToastMessagesContext",{useToastMessageDispatch(e){o=e}},1),a.link("../../../app/ui-message/client/ActionManager",{"*"(e){n=e}},2);const l=(e,t)=>void 0,c=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:l;const a=o();return s(()=>n.triggerCancel({appId:e.appId,viewId:e.viewId,view:i({},e,{id:e.viewId}),isCleared:!0}).then(e=>t(void 0,e)).catch(e=>(a({type:"error",message:e}),t(e,void 0),Promise.reject(e))))}}
