function module(e,t,n){let i,o,a,r,l,c,d,u,s,m,p,b,f,v,k,I,g,x,y,E,h,C,w,S,M;n.link("@babel/runtime/helpers/objectSpread2",{default(e){i=e}},0),n.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){o=e}},1),n.export({ModalBlock:()=>A}),n.link("@rocket.chat/apps-engine/definition/uikit/UIKitIncomingInteractionContainer",{UIKitIncomingInteractionContainerType(e){a=e}},0),n.link("@rocket.chat/fuselage",{Modal(e){r=e},AnimatedVisibility(e){l=e},ButtonGroup(e){c=e},Button(e){d=e},Box(e){u=e}},1),n.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){s=e},useUniqueId(e){m=e}},2),n.link("@rocket.chat/fuselage-ui-kit",{kitContext(e){p=e},UiKitComponent(e){b=e},UiKitModal(e){f=e},modalParser(e){v=e}},3),n.link("@rocket.chat/ui-kit",{uiKitText(e){k=e}},4),n.link("react",{default(e){I=e},useCallback(e){g=e},useEffect(e){x=e},useMemo(e){y=e},useReducer(e){E=e},useRef(e){h=e},useState(e){C=e}},5),n.link("../../lib/renderMessageBody",{renderMessageBody(e){w=e}},6),n.link("../../../app/utils/lib/getURL",{getURL(e){S=e}},7),n.link("../../../app/ui-message/client/ActionManager",{"*"(e){M=e}},8),v.text=function(){let{text:e,type:t}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return"mrkdwn"!==t?e:I.createElement("span",{dangerouslySetInnerHTML:{__html:w({msg:e})}})};const P=k({plain_text:e=>{let{text:t}=e;return t},text:e=>{let{text:t}=e;return t}}),U='\n\ta[href]:not([tabindex="-1"]),\n\tarea[href]:not([tabindex="-1"]),\n\tinput:not([disabled]):not([tabindex="-1"]),\n\tselect:not([disabled]):not([tabindex="-1"]),\n\ttextarea:not([disabled]):not([tabindex="-1"]),\n\tbutton:not([disabled]):not([tabindex="-1"]),\n\tiframe,\n\tobject,\n\tembed,\n\t[tabindex]:not([tabindex="-1"]),\n\t[contenteditable]',j='\n\ta[href]:not([tabindex="-1"]):invalid,\n\tarea[href]:not([tabindex="-1"]):invalid,\n\tinput:not([disabled]):not([tabindex="-1"]):invalid,\n\tselect:not([disabled]):not([tabindex="-1"]):invalid,\n\ttextarea:not([disabled]):not([tabindex="-1"]):invalid,\n\tbutton:not([disabled]):not([tabindex="-1"]):invalid,\n\tiframe:invalid,\n\tobject:invalid,\n\tembed:invalid,\n\t[tabindex]:not([tabindex="-1"]):invalid,\n\t[contenteditable]:invalid';function A(e){let{view:t,errors:n,appId:i,onSubmit:o,onClose:a,onCancel:s}=e;const p="modal_id_".concat(m()),v=h();x(()=>{if(v.current)if(n&&Object.keys(n).length){const e=v.current.querySelector(j);e&&e.focus()}else{const e=v.current.querySelector(U);e&&e.focus()}},[n]);const k=y(()=>document.activeElement,[]);x(()=>()=>k&&k.focus(),[k]);const E=g(e=>{if(13===e.keyCode)return o(e);if(27===e.keyCode)return e.stopPropagation(),e.preventDefault(),a(),!1;if(9===e.keyCode){const t=Array.from(v.current.querySelectorAll(U)),[n]=t,i=t.pop();if(!v.current.contains(document.activeElement))return n.focus();if(e.shiftKey)return void(n&&n!==document.activeElement||(i.focus(),e.stopPropagation(),e.preventDefault()));i&&i!==document.activeElement||(n.focus(),e.stopPropagation(),e.preventDefault())}},[a,o]);return x(()=>{const e=document.querySelector(".rc-modal-wrapper"),t=e.querySelector(".rcx-modal__content"),n=t=>{if(t.target===e)return t.preventDefault(),t.stopPropagation(),a(),!1},i=e=>{if(t.contains(e.target))return E(e)};return document.addEventListener("keydown",i),e.addEventListener("click",n),()=>{document.removeEventListener("keydown",i),e.removeEventListener("click",n)}},[E,a]),I.createElement(l,{visibility:l.UNHIDING},I.createElement(r,{open:!0,id:p,ref:v},I.createElement(r.Header,null,t.showIcon?I.createElement(r.Thumb,{url:S("/api/apps/".concat(i,"/icon"))}):null,I.createElement(r.Title,null,P([t.title])),I.createElement(r.Close,{tabIndex:-1,onClick:a})),I.createElement(r.Content,null,I.createElement(u,{is:"form",method:"post",action:"#",onSubmit:o},I.createElement(b,{render:f,blocks:t.blocks}))),I.createElement(r.Footer,null,I.createElement(c,{align:"end"},t.close&&I.createElement(d,{onClick:s},P([t.close.text])),t.submit&&I.createElement(d,{primary:!0,onClick:o},P([t.submit.text]))))))}const B=e=>{const[t,n]=C(e),{viewId:a}=t;return x(()=>{const e=e=>{let{type:t}=e,a=o(e,["type"]);if("errors"!==t)n(a);else{const{errors:e}=a;n(t=>i({},t,{errors:e}))}};return M.on(a,e),()=>{M.off(a,e)}},[a]),t},D=e=>{const t=s((e,t)=>{let{actionId:n,payload:o}=t;return i({},e,{[n]:o})}),n=s(()=>{const t=e=>{let{element:n,elements:i=[]}=e;return!(!n||!n.initialValue)||(!(!i.length||!i.map(e=>({element:e})).filter(t).length)||void 0)},n=e=>{let{element:i,blockId:o,elements:a=[]}=e;return a.length?a.map(e=>({element:e,blockId:o})).filter(t).map(n):[i.actionId,{value:i.initialValue,blockId:o}]};return e.blocks.filter(t).map(n).reduce((e,t)=>{if(Array.isArray(t[0]))return i({},e,{},Object.fromEntries(t));const[n,o]=t;return i({},e,{[n]:o})},{})});return E(t,null,n)};function L(e){const t=B(e),{appId:n,viewId:o,mid:r,errors:l,view:c}=t,[d,u]=D(c),m=e=>Object.entries(e).reduce((e,t)=>{let[n,{blockId:i,value:o}]=t;return e[i]=e[i]||{},e[i][n]=o,e},{}),b=e=>{e&&((e.nativeEvent||e).stopImmediatePropagation(),e.stopPropagation(),e.preventDefault())},f=i({action:e=>{let{actionId:t,appId:n,value:i,blockId:l,mid:c=r}=e;return M.triggerBlockAction({container:{type:a.VIEW,id:o},actionId:t,appId:n,value:i,blockId:l,mid:c})},state:e=>{let{actionId:t,value:n,blockId:i="default"}=e;u({actionId:t,payload:{blockId:i,value:n}})}},t,{values:d}),v=s(e=>{b(e),M.triggerSubmitView({viewId:o,appId:n,payload:{view:i({},c,{id:o,state:m(d)})}})}),k=s(e=>(b(e),M.triggerCancel({appId:n,viewId:o,view:i({},c,{id:o,state:m(d)})}))),g=s(e=>(b(e),M.triggerCancel({appId:n,viewId:o,view:i({},c,{id:o,state:m(d)}),isCleared:!0})));return I.createElement(p.Provider,{value:f},I.createElement(A,{view:c,errors:l,appId:n,onSubmit:v,onCancel:k,onClose:g}))}n.exportDefault(L)}
