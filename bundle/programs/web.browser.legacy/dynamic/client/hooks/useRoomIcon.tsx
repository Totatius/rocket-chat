function module(e,n,t){var u,a;t.export({colors:function(){return r},useRoomIcon:function(){return s}}),t.link("react",{default:function(e){u=e}},0),t.link("../components/UserStatus",{ReactiveUserStatus:function(e){a=e}},1);var r={busy:"danger-500",away:"warning-600",online:"success-500",offline:"neutral-600"},s=function(e){switch(e.t){case"p":return{name:"lock"};case"c":return{name:"hash"};case"l":return{name:"headset",color:r[e.v.status]};case"d":var n=e;return n.uids&&n.uids.length>2?{name:"team"}:n.uids&&n.uids.length>0?u.createElement(a,{small:"small",uid:n.uids.filter((function(n){return n!==e.u._id}))[0]||e.u._id}):{name:"at"};default:return null}}}
