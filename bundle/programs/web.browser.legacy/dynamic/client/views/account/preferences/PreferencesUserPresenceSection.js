function module(e,n,t){var l,i,a,o,r,u,c,m,f,s,d,b;t.link("@babel/runtime/helpers/extends",{default:function(e){l=e}},0),t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){i=e}},1),t.link("react",{default:function(e){a=e},useCallback:function(e){o=e}},0),t.link("@rocket.chat/fuselage",{Accordion:function(e){r=e},Field:function(e){u=e},NumberInput:function(e){c=e},FieldGroup:function(e){m=e},ToggleSwitch:function(e){f=e}},1),t.link("../../../contexts/TranslationContext",{useTranslation:function(e){s=e}},2),t.link("../../../contexts/UserContext",{useUserPreference:function(e){d=e}},3),t.link("../../../hooks/useForm",{useForm:function(e){b=e}},4);var h=function(e){var n=e.onChange,t=e.commitRef,h=i(e,["onChange","commitRef"]),E=s(),k=d("enableAutoAway"),w=d("idleTimeLimit"),A=b({enableAutoAway:k,idleTimeLimit:w},n),x=A.values,T=A.handlers,g=A.commit,p=x.enableAutoAway,C=x.idleTimeLimit,v=T.handleEnableAutoAway,y=T.handleIdleTimeLimit;t.current.userPreference=g;var L=o((function(e){return y(Number(e.currentTarget.value))}),[y]);return(a.createElement(r.Item,l({title:E("User_Presence")},h),a.createElement(m,null,a.createElement(u,{display:"flex",flexDirection:"row",justifyContent:"spaceBetween",flexGrow:1},a.createElement(u.Label,null,E("Enable_Auto_Away")),a.createElement(u.Row,null,a.createElement(f,{checked:p,onChange:v}))),a.createElement(u,null,a.createElement(u.Label,null,E("Idle_Time_Limit")),a.createElement(u.Row,null,a.createElement(c,{value:C,onChange:L}))))))};t.exportDefault(h)}
