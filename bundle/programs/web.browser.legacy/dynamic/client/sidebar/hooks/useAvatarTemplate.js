function module(e,n,t){var r,u,a,i,o;t.link("@babel/runtime/helpers/objectSpread2",{default:function(e){r=e}},0),t.export({useAvatarTemplate:function(){return c}}),t.link("react",{default:function(e){u=e},useMemo:function(e){a=e}},0),t.link("../../components/avatar/RoomAvatar",{default:function(e){i=e}},1),t.link("../../contexts/UserContext",{useUserPreference:function(e){o=e}},2);var c=function(){var e=o("sidebarViewMode"),n=o("sidebarHideAvatar");return a((function(){if(n)return null;var t=function(){switch(e){case"extended":return"x36";case"medium":return"x28";case"condensed":default:return"x16"}}();return function(e){return u.createElement(i,{size:t,room:r({},e,{_id:e.rid||e._id,type:e.t})})}}),[n,e])}}

