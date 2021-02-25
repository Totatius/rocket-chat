function module(e,n,t){var o,i,a,l,r,u,s,c,d,m,f,p,h,k,C,E;t.link("@babel/runtime/helpers/toConsumableArray",{default:function(e){o=e}},0),t.export({NotificationPreferences:function(){return b}}),t.link("react",{default:function(e){i=e}},0),t.link("@rocket.chat/fuselage",{Button:function(e){a=e},ButtonGroup:function(e){l=e},FieldGroup:function(e){r=e},Icon:function(e){u=e}},1),t.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){s=e}},2),t.link("../../../../hooks/useForm",{useForm:function(e){c=e}},3),t.link("../../../../contexts/UserContext",{useUserSubscription:function(e){d=e}},4),t.link("../../../../contexts/TranslationContext",{useTranslation:function(e){m=e}},5),t.link("../../../../contexts/CustomSoundContext",{useCustomSound:function(e){f=e}},6),t.link("../../../../hooks/useEndpointAction",{useEndpointActionExperimental:function(e){p=e}},7),t.link("../../../../components/VerticalBar",{default:function(e){h=e}},8),t.link("./components/Preferences",{Preferences:function(e){k=e}},9),t.link("./components/NotificationByDevice",{NotificationByDevice:function(e){C=e}},10),t.link("./components/NotificationToogle",{NotificationToogle:function(e){E=e}},11);var b=function(e){var n=e.handleClose,t=e.formValues,o=e.formHandlers,s=e.formHasUnsavedChanges,c=e.handlePlaySound,d=e.handleOptions,f=e.handleSaveButton,p=e.handleCancelButton,b=m();return i.createElement(i.Fragment,null,i.createElement(h.Header,null,i.createElement(h.Icon,{name:"bell"}),i.createElement(h.Text,null,b("Notifications_Preferences")),n&&i.createElement(h.Close,{onClick:n})),i.createElement(h.ScrollableContent,null,i.createElement(E,{label:b("Turn_ON"),description:b("Receive_alerts"),onChange:o.handleTurnOn,defaultChecked:t.turnOn}),i.createElement(E,{label:b("Mute_Group_Mentions"),onChange:o.handleMuteGroupMentions,defaultChecked:t.muteGroupMentions}),i.createElement(E,{label:b("Show_counter"),description:b("Display_unread_counter"),onChange:o.handleShowCounter,defaultChecked:t.showCounter}),i.createElement(r,null,i.createElement(C,{device:b("Desktop"),icon:"computer"},i.createElement(k,{id:"DesktopAlert",onChange:o.handleDesktopAlert,name:b("Alerts"),options:d.alerts,optionDefault:t.desktopAlert}),i.createElement(k,{id:"DesktopAudio",onChange:o.handleDesktopAudio,name:b("Audio"),options:d.audio,optionDefault:t.desktopAudio}),i.createElement(k,{id:"DesktopSound",onChange:o.handleDesktopSound,name:b("Sound"),options:d.sound,optionDefault:t.desktopSound},i.createElement(a,{mis:"x4",square:!0,ghost:!0,onClick:c},i.createElement(u,{name:"play",size:"x18"})))),i.createElement(C,{device:b("Mobile"),icon:"mobile"},i.createElement(k,{id:"MobileAlert",onChange:o.handleMobileAlert,name:b("Alerts"),options:d.alerts,optionDefault:t.mobileAlert})),i.createElement(C,{device:b("Email"),icon:"mail"},i.createElement(k,{id:"EmailAlert",onChange:o.handleEmailAlert,name:b("Alerts"),options:d.alerts,optionDefault:t.emailAlert})))),i.createElement(h.Footer,null,i.createElement(l,{stretch:!0},i.createElement(a,{onClick:p},b("Cancel")),i.createElement(a,{primary:!0,disabled:!s,onClick:f},b("Save")))))};t.exportDefault(i.memo((function(e){var n=e.tabBar,t=e.rid,a=m(),l=d(t),r=f(),u=s((function(){return n&&n.close()})),h=p("POST","rooms.saveNotification",a("Room_updated_successfully")),k=c({turnOn:!l.disableNotifications,muteGroupMentions:l.muteGroupMentions,showCounter:!l.hideUnreadStatus,desktopAlert:"subscription"===l.desktopPrefOrigin&&l.desktopNotifications||"default",desktopAudio:"subscription"===l.audioPrefOrigin&&l.audioNotifications||"default",desktopSound:l.audioNotificationValue||"default",mobileAlert:"subscription"===l.mobilePrefOrigin&&l.mobilePushNotifications||"default",emailAlert:"subscription"===l.emailPrefOrigin&&l.emailNotifications||"default"}),C=k.values,E=k.handlers,A=k.hasUnsavedChanges,g=k.commit,N=k.reset,S=[["default",a("Default")],["all",a("All_messages")],["mentions",a("Mentions")],["nothing",a("Nothing")]],v=Object.entries(r.list.get()).map((function(e){return[e[0],e[1].name]})),D={alerts:S,audio:S,sound:[["none None",a("None")],["default",a("Default")]].concat(o(v))},M=function(){return r.play(C.desktopSound)},O=s((function(){var e={};e.disableNotifications=C.turnOn?"0":"1",e.muteGroupMentions=C.muteGroupMentions?"1":"0",e.hideUnreadStatus=C.showCounter?"0":"1",e.desktopNotifications=C.desktopAlert,e.audioNotifications=C.desktopAudio,e.audioNotificationValue=C.desktopSound,e.mobilePushNotifications=C.mobileAlert,e.emailNotifications=C.emailAlert,h({roomId:t,notifications:e}),g()}));return i.createElement(b,{handleClose:u,formValues:C,formHandlers:E,formHasUnsavedChanges:A,handlePlaySound:M,handleOptions:D,handleSaveButton:O,handleCancelButton:N})})))}
