function module(t,e,n){var o,r,u,l,a,i;function f(t){var e=t.room,n=r(t,["room"]),l=i(),f=n.url,c=void 0===f?l(e):f,m=r(n,["url"]);return u.createElement(a,o({url:c},m))}n.link("@babel/runtime/helpers/extends",{default:function(t){o=t}},0),n.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(t){r=t}},1),n.link("react",{default:function(t){u=t},memo:function(t){l=t}},0),n.link("./BaseAvatar",{default:function(t){a=t}},1),n.link("../../contexts/AvatarUrlContext",{useRoomAvatarPath:function(t){i=t}},2),n.exportDefault(l(f))}
