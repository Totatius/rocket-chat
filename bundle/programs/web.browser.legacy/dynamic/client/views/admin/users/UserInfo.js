function module(e,n,t){var s,o,i,r,u,a,l,c,f,m,d,k,h,p,U,b,v,A;function g(e){var n,t,g=e.uid,E=e.username,x=i(e,["uid","username"]),S=f(),I=m("UI_Use_Real_Name"),_=m("Accounts_ManuallyApproveNewUsers"),C=v("users.info",u((function(){return o({},g&&{userId:g},{},E&&{username:E})}),[g,E])),y=C.value,D=C.phase,N=C.error,R=C.reload,F=l((function(){return R()})),L=u((function(){var e,n=(y||{user:{}}).user,t=n.name,s=n.username,i=n.roles,u=void 0===i?[]:i,a=n.status,l=n.statusText,c=n.bio,f=n.utcOffset,m=n.lastLogin,h=n.nickname;return{name:t,username:s,lastLogin:m,showRealNames:I,roles:u.map((function(e,n){return r.createElement(k.Role,{key:n},e)})),bio:c,phone:n.phone,utcOffset:f,customFields:o({},n.customFields,{},_&&!1===n.active&&n.reason&&{Reason:n.reason}),verified:b(n),email:U(n),createdAt:n.createdAt,status:r.createElement(d,{status:a}),customStatus:l,nickname:h}}),[_,y,I]);if(D===A.LOADING)return r.createElement(p,null);if(N)return r.createElement(a,{mbs:"x16"},S("User_not_found"));var M=null===(n=y.user)||void 0===n?void 0:null===(t=n.roles)||void 0===t?void 0:t.includes("admin");return(r.createElement(c,s({},L,{data:y.user,onChange:F,actions:y&&y.user&&r.createElement(h,{isActive:y.user.active,isAdmin:M,_id:y.user._id,username:y.user.username,onChange:F})},x)))}t.link("@babel/runtime/helpers/extends",{default:function(e){s=e}},0),t.link("@babel/runtime/helpers/objectSpread2",{default:function(e){o=e}},1),t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){i=e}},2),t.export({UserInfoWithData:function(){return g}}),t.link("react",{default:function(e){r=e},useMemo:function(e){u=e}},0),t.link("@rocket.chat/fuselage",{Box:function(e){a=e}},1),t.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){l=e}},2),t.link("../../room/contextualBar/UserInfo",{UserInfo:function(e){c=e}},3),t.link("../../../contexts/TranslationContext",{useTranslation:function(e){f=e}},4),t.link("../../../contexts/SettingsContext",{useSetting:function(e){m=e}},5),t.link("../../../components/UserStatus",{UserStatus:function(e){d=e}},6),t.link("../../../components/UserCard",{default:function(e){k=e}},7),t.link("./UserInfoActions",{UserInfoActions:function(e){h=e}},8),t.link("../../../components/Skeleton",{FormSkeleton:function(e){p=e}},9),t.link("../../../lib/getUserEmailAddress",{getUserEmailAddress:function(e){U=e}},10),t.link("../../../lib/getUserEmailVerified",{getUserEmailVerified:function(e){b=e}},11),t.link("../../../hooks/useEndpointData",{useEndpointData:function(e){v=e}},12),t.link("../../../hooks/useAsyncState",{AsyncStatePhase:function(e){A=e}},13)}
