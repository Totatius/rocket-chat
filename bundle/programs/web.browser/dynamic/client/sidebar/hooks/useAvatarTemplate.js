function module(e,t,r){let n,a,s,d,o;r.link("@babel/runtime/helpers/objectSpread2",{default(e){n=e}},0),r.export({useAvatarTemplate:()=>u}),r.link("react",{default(e){a=e},useMemo(e){s=e}},0),r.link("../../components/avatar/RoomAvatar",{default(e){d=e}},1),r.link("../../contexts/UserContext",{useUserPreference(e){o=e}},2);const u=()=>{const e=o("sidebarViewMode"),t=o("sidebarHideAvatar");return s(()=>{if(t)return null;const r=(()=>{switch(e){case"extended":return"x36";case"medium":return"x28";case"condensed":default:return"x16"}})();return e=>a.createElement(d,{size:r,room:n({},e,{_id:e.rid||e._id,type:e.t})})},[t,e])}}

