function module(e,t,n){var o,a,r,c,l,_;n.export({KeyboardShortcuts:function(){return u}}),n.link("react",{default:function(e){o=e}},0),n.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){a=e}},1),n.link("@rocket.chat/fuselage",{Box:function(e){r=e},Divider:function(e){c=e}},2),n.link("../../../../contexts/TranslationContext",{useTranslation:function(e){l=e}},3),n.link("../../../../components/VerticalBar",{default:function(e){_=e}},4);var s=function(e){var t=e.title,n=e.command;return(o.createElement(r,{is:"section",mb:"x16"},o.createElement(r,{fontScale:"p2",fontWeight:"700"},t),o.createElement(c,null),o.createElement(r,{fontScale:"p1"},n)))},u=function(e){var t=e.handleClose,n=l();return o.createElement(o.Fragment,null,o.createElement(_.Header,null,o.createElement(_.Icon,{name:"keyboard"}),o.createElement(_.Text,null,n("Keyboard_Shortcuts_Title")),t&&o.createElement(_.Close,{onClick:t})),o.createElement(_.ScrollableContent,null,o.createElement(s,{title:n("Keyboard_Shortcuts_Open_Channel_Slash_User_Search"),command:n("Keyboard_Shortcuts_Keys_1")}),o.createElement(s,{title:n("Keyboard_Shortcuts_Mark_all_as_read"),command:n("Keyboard_Shortcuts_Keys_8")}),o.createElement(s,{title:n("Keyboard_Shortcuts_Edit_Previous_Message"),command:n("Keyboard_Shortcuts_Keys_2")}),o.createElement(s,{title:n("Keyboard_Shortcuts_Move_To_Beginning_Of_Message"),command:n("Keyboard_Shortcuts_Keys_3")}),o.createElement(s,{title:n("Keyboard_Shortcuts_Move_To_Beginning_Of_Message"),command:n("Keyboard_Shortcuts_Keys_4")}),o.createElement(s,{title:n("Keyboard_Shortcuts_Move_To_End_Of_Message"),command:n("Keyboard_Shortcuts_Keys_5")}),o.createElement(s,{title:n("Keyboard_Shortcuts_Move_To_End_Of_Message"),command:n("Keyboard_Shortcuts_Keys_6")}),o.createElement(s,{title:n("Keyboard_Shortcuts_New_Line_In_Message"),command:n("Keyboard_Shortcuts_Keys_7")})))};n.exportDefault(o.memo((function(e){var t=e.tabBar,n=a((function(){return t&&t.close()}));return o.createElement(u,{handleClose:n})})))}
