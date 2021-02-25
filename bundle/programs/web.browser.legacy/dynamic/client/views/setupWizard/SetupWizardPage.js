function module(e,t,n){var i,l,a,r,o,c,u,s,f,p,m,d,k,S,g;function x(e){var t=e.currentStep,n=void 0===t?1:t;u();var x=c(),v=r("(max-width: 760px)");return o.createElement(o.Fragment,null,o.createElement(s,null),o.createElement(i,{width:"full",height:"sh",display:"flex",flexDirection:v?"column":"row",alignItems:"stretch",style:{backgroundColor:"var(--color-dark-05, #f1f2f4)"},"data-qa":"setup-wizard"},n===p&&o.createElement(m,null)||o.createElement(o.Fragment,null,o.createElement(d,{steps:[{step:1,title:x("Admin_Info")},{step:2,title:x("Organization_Info")},{step:3,title:x("Server_Info")},{step:4,title:x("Register_Server")}],currentStep:n}),o.createElement(i,{flexGrow:1,flexShrink:1,minHeight:"none",display:"flex",flexDirection:"column"},o.createElement(f,null,o.createElement(l,{all:"x16"},o.createElement(a,{is:"section",flexGrow:1,flexShrink:1},o.createElement(k,{step:1,title:x("Admin_Info"),active:1===n}),o.createElement(S,{step:2,title:x("Organization_Info"),active:2===n}),o.createElement(S,{step:3,title:x("Server_Info"),active:3===n}),o.createElement(g,{step:4,title:x("Register_Server"),active:4===n}))))))))}n.link("@rocket.chat/fuselage",{Box:function(e){i=e},Margins:function(e){l=e},Tile:function(e){a=e}},0),n.link("@rocket.chat/fuselage-hooks",{useMediaQuery:function(e){r=e}},1),n.link("react",{default:function(e){o=e}},2),n.link("../../contexts/TranslationContext",{useTranslation:function(e){c=e}},3),n.link("../../hooks/useWipeInitialPageLoading",{useWipeInitialPageLoading:function(e){u=e}},4),n.link("../../components/connectionStatus/ConnectionStatusAlert",{default:function(e){s=e}},5),n.link("../../components/ScrollableContentWrapper",{default:function(e){f=e}},6),n.link("./SetupWizardState",{finalStep:function(e){p=e}},7),n.link("./steps/FinalStep",{default:function(e){m=e}},8),n.link("./SideBar",{default:function(e){d=e}},9),n.link("./steps/AdminUserInformationStep",{default:function(e){k=e}},10),n.link("./steps/SettingsBasedStep",{default:function(e){S=e}},11),n.link("./steps/RegisterServerStep",{default:function(e){g=e}},12),n.exportDefault(x)}
