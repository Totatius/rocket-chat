function module(e,t,n){let l,a,o;n.link("react",{default(e){l=e}},0),n.link("../../../../client/contexts/TranslationContext",{useTranslation(e){a=e}},1),n.link("../../../../client/views/room/contextualBar/UserInfo",{UserInfo(e){o=e}},2);const r=e=>{let{data:{livechat:{maxNumberSimultaneousChat:t=""}={}}={}}=e;const n=a();return t&&l.createElement(l.Fragment,null,l.createElement(o.Label,null,n("Max_number_of_chats_per_agent")),l.createElement(o.Info,null,t))};n.exportDefault(r)}
