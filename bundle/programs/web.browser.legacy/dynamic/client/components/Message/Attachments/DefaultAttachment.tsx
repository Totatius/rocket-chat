function module(e,t,n){var l,r,a,i,u,o,c,m,h,f;n.link("@babel/runtime/helpers/extends",{default:function(e){l=e}},0),n.link("@babel/runtime/helpers/objectSpread2",{default:function(e){r=e}},1),n.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){a=e}},2),n.link("@babel/runtime/helpers/slicedToArray",{default:function(e){i=e}},3),n.export({DefaultAttachment:function(){return k}}),n.link("react",{default:function(e){u=e}},0),n.link("./FieldsAttachment",{FieldsAttachment:function(e){o=e}},1),n.link("../../MarkdownText",{default:function(e){c=e}},2),n.link("./ActionAttachtment",{ActionAttachment:function(e){m=e}},3),n.link("./Attachment",{Attachment:function(e){h=e}},4),n.link("./hooks/useCollapse",{useCollapse:function(e){f=e}},5);var d=function(e){return"actions"in e},s=function(e){return function(t,n){return(null==e?void 0:e.includes(t))?u.createElement(c,{withRichContent:void 0,content:n}):n}},k=function(e){var t=s(e.mrkdwn_in),n=f(!!e.collapsed),k=i(n,2),E=k[0],_=k[1];return u.createElement(h.Block,{color:e.color,pre:e.pretext&&u.createElement(h.Text,null,t("pretext",e.pretext))},u.createElement(h.Content,null,e.author_name&&u.createElement(h.Author,null,e.author_icon&&u.createElement(h.AuthorAvatar,{url:e.author_icon}),u.createElement(h.AuthorName,e.author_link&&{is:"a",href:e.author_link,target:"_blank",color:void 0},e.author_name)),e.title&&u.createElement(h.Row,null,u.createElement(h.Title,e.title_link&&{is:"a",href:e.title_link,target:"_blank",color:void 0},e.title)," ",_),!E&&u.createElement(u.Fragment,null,e.text&&u.createElement(h.Text,null,t("text",e.text)),e.fields&&u.createElement(o,{fields:e.fields.map((function(e){var t=e.value,n=a(e,["value"]);return r({},n,{value:u.createElement(c,{withRichContent:void 0,content:t})})}))}),e.image_url&&u.createElement(h.Image,l({},e.image_dimensions,{src:e.image_url})),d(e)&&u.createElement(m,e))),e.thumb_url&&u.createElement(h.Thumb,{url:e.thumb_url}))}}
