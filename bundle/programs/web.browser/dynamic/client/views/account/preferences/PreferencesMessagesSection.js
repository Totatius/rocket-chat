function module(e,l,t){let n,a,o,r,i,c,s,d,m,u,E,h,w;t.link("@babel/runtime/helpers/extends",{default(e){n=e}},0),t.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){a=e}},1),t.link("react",{default(e){o=e},useMemo(e){r=e}},0),t.link("@rocket.chat/fuselage",{Accordion(e){i=e},Field(e){c=e},Select(e){s=e},FieldGroup(e){d=e},ToggleSwitch(e){m=e}},1),t.link("../../../contexts/TranslationContext",{useTranslation(e){u=e}},2),t.link("../../../contexts/UserContext",{useUserPreference(e){E=e}},3),t.link("../../../contexts/SettingsContext",{useSetting(e){h=e}},4),t.link("../../../hooks/useForm",{useForm(e){w=e}},5);const f=e=>{var l;let{onChange:t,commitRef:f}=e,x=a(e,["onChange","commitRef"]);const p=u(),g=h("UI_DisplayRoles"),C={unreadAlert:E("unreadAlert"),showMessageInMainThread:E("showMessageInMainThread"),useEmojis:E("useEmojis"),convertAsciiEmoji:E("convertAsciiEmoji"),autoImageLoad:E("autoImageLoad"),saveMobileBandwidth:E("saveMobileBandwidth"),collapseMediaByDefault:E("collapseMediaByDefault"),hideUsernames:E("hideUsernames"),hideRoles:E("hideRoles"),hideFlexTab:E("hideFlexTab"),hideAvatars:E("hideAvatars"),clockMode:null!==(l=E("clockMode"))&&void 0!==l?l:0,sendOnEnter:E("sendOnEnter"),messageViewMode:E("messageViewMode")},{values:_,handlers:M,commit:y}=w(C,t),{unreadAlert:b,showMessageInMainThread:k,useEmojis:v,convertAsciiEmoji:B,autoImageLoad:j,saveMobileBandwidth:D,collapseMediaByDefault:R,hideUsernames:A,hideRoles:L,hideFlexTab:T,hideAvatars:I,clockMode:G,sendOnEnter:H,messageViewMode:U}=_,{handleUnreadAlert:F,handleShowMessageInMainThread:S,handleUseEmojis:O,handleConvertAsciiEmoji:V,handleAutoImageLoad:N,handleSaveMobileBandwidth:P,handleCollapseMediaByDefault:z,handleHideUsernames:W,handleHideRoles:q,handleHideFlexTab:J,handleHideAvatars:K,handleClockMode:Q,handleSendOnEnter:X,handleMessageViewMode:Y}=M,Z=r(()=>[[0,p("Default")],[1,p("12_Hour")],[2,p("24_Hour")]],[p]),$=r(()=>[["normal",p("Enter_Normal")],["alternative",p("Enter_Alternative")],["desktop",p("Only_On_Desktop")]],[p]),ee=r(()=>[[0,p("Normal")],[1,p("Cozy")],[2,p("Compact")]],[p]);return f.current.messages=y,o.createElement(i.Item,n({title:p("Messages")},x),o.createElement(d,null,r(()=>o.createElement(c,{display:"flex",flexDirection:"row",justifyContent:"spaceBetween",flexGrow:1},o.createElement(c.Label,null,p("Unread_Tray_Icon_Alert")),o.createElement(c.Row,null,o.createElement(m,{checked:b,onChange:F}))),[F,p,b]),r(()=>o.createElement(c,{display:"flex",flexDirection:"row",justifyContent:"spaceBetween",flexGrow:1},o.createElement(c.Label,null,p("Show_Message_In_Main_Thread")),o.createElement(c.Row,null,o.createElement(m,{checked:k,onChange:S}))),[S,k,p]),r(()=>o.createElement(c,null,o.createElement(c.Label,null,p("Message_TimeFormat")),o.createElement(c.Row,null,o.createElement(s,{value:G,onChange:Q,options:Z}))),[G,Q,p,Z]),r(()=>o.createElement(c,{display:"flex",flexDirection:"row",justifyContent:"spaceBetween",flexGrow:1},o.createElement(c.Label,null,p("Use_Emojis")),o.createElement(c.Row,null,o.createElement(m,{checked:v,onChange:O}))),[O,p,v]),r(()=>o.createElement(c,{display:"flex",flexDirection:"row",justifyContent:"spaceBetween",flexGrow:1},o.createElement(c.Label,null,p("Convert_Ascii_Emojis")),o.createElement(c.Row,null,o.createElement(m,{checked:B,onChange:V}))),[B,V,p]),r(()=>o.createElement(c,{display:"flex",flexDirection:"row",justifyContent:"spaceBetween",flexGrow:1},o.createElement(c.Label,null,p("Auto_Load_Images")),o.createElement(c.Row,null,o.createElement(m,{checked:j,onChange:N}))),[j,N,p]),r(()=>o.createElement(c,{display:"flex",flexDirection:"row",justifyContent:"spaceBetween",flexGrow:1},o.createElement(c.Label,null,p("Save_Mobile_Bandwidth")),o.createElement(c.Row,null,o.createElement(m,{checked:D,onChange:P}))),[P,D,p]),r(()=>o.createElement(c,{display:"flex",flexDirection:"row",justifyContent:"spaceBetween",flexGrow:1},o.createElement(c.Label,null,p("Collapse_Embedded_Media_By_Default")),o.createElement(c.Row,null,o.createElement(m,{checked:R,onChange:z}))),[R,z,p]),r(()=>o.createElement(c,{display:"flex",flexDirection:"row",justifyContent:"spaceBetween",flexGrow:1},o.createElement(c.Label,null,p("Hide_usernames")),o.createElement(c.Row,null,o.createElement(m,{checked:A,onChange:W}))),[W,A,p]),r(()=>g&&o.createElement(c,{display:"flex",flexDirection:"row",justifyContent:"spaceBetween",flexGrow:1},o.createElement(c.Label,null,p("Hide_roles")),o.createElement(c.Row,null,o.createElement(m,{checked:L,onChange:q}))),[q,L,g,p]),r(()=>o.createElement(c,{display:"flex",flexDirection:"row",justifyContent:"spaceBetween",flexGrow:1},o.createElement(c.Label,null,p("Hide_flextab")),o.createElement(c.Row,null,o.createElement(m,{checked:T,onChange:J}))),[J,T,p]),r(()=>o.createElement(c,{display:"flex",flexDirection:"row",justifyContent:"spaceBetween",flexGrow:1},o.createElement(c.Label,null,p("Hide_Avatars")),o.createElement(c.Row,null,o.createElement(m,{checked:I,onChange:K}))),[K,I,p]),r(()=>o.createElement(c,null,o.createElement(c.Label,null,p("Enter_Behaviour")),o.createElement(c.Row,null,o.createElement(s,{value:H,onChange:X,options:$})),o.createElement(c.Hint,null,p("Enter_Behaviour_Description"))),[X,H,$,p]),r(()=>o.createElement(c,null,o.createElement(c.Label,null,p("View_mode")),o.createElement(c.Row,null,o.createElement(s,{value:U,onChange:Y,options:ee})),o.createElement(c.Hint,null,p("Message_view_mode_info"))),[Y,U,ee,p])))};t.exportDefault(f)}

