function module(t,n,e){var o,i,l,a,c,u,r,f;e.link("react",{default:function(t){o=t},memo:function(t){i=t}},0),e.link("@rocket.chat/fuselage-tokens/colors",{default:function(t){l=t}},1),e.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(t){a=t}},2),e.link("../../../../contexts/TranslationContext",{useTranslation:function(t){c=t}},3),e.link("../../../../contexts/SettingsContext",{useSetting:function(t){u=t}},4),e.link("../../../../contexts/ServerContext",{useMethod:function(t){r=t}},5),e.link("../../../../components/Header",{default:function(t){f=t}},6);var s=function(t){var n=t.room,e=n._id,i=n.f,s=void 0!==i&&i,k=c(),d=u("Favorite_Rooms"),v=r("toggleFavorite"),g=a((function(){d&&v(e,!s)})),m=k(s?"Unfavorite":"Favorite");return d&&o.createElement(f.State,{title:m,icon:s?"star-filled":"star",onClick:g,color:s?l.y500:null,tiny:!0,ghost:!0})};e.exportDefault(i(s))}
