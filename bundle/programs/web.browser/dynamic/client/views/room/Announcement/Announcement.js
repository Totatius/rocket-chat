function module(t,e,n){let o,l,c,a,r,i,u,s,k;function d(){const t=o(["\n\t\tbackground-color: ",";\n\t\tcolor: ",";\n\t\tcursor: pointer;\n\t\ttransition: transform 0.2s ease-out;\n\t\ta{\n\t\t\tcolor: "," !important;\n\t\t\ttext-decoration: underline !important;\n\t\t}\n\t\t> * {\n\t\t\tflex: auto;\n\t\t}\n\t\t&:hover,\n\t\t&:focus {\n\t\t\tbackground-color: ",";\n\t\t\tcolor: ",";\n\t\t}"]);return d=function(){return t},t}n.link("@babel/runtime/helpers/taggedTemplateLiteral",{default(t){o=t}},0),n.export({Announcement:()=>f}),n.link("react",{default(t){l=t}},0),n.link("@rocket.chat/fuselage",{Box(t){c=t}},1),n.link("@rocket.chat/css-in-js",{css(t){a=t}},2),n.link("@rocket.chat/fuselage-tokens/colors",{default(t){r=t}},3),n.link("@rocket.chat/fuselage-hooks",{useMutableCallback(t){i=t}},4),n.link("./AnnouncementModal",{default(t){u=t}},5),n.link("../../../contexts/ModalContext",{useSetModal(t){s=t}},6),n.link("../../../components/MarkdownText",{default(t){k=t}},7);const f=t=>{let{children:e,onClickOpen:n}=t;const o=a(d(),r.b200,r.b600,r.b600,r.b300,r.b800);return(l.createElement(c,{onClick:n,height:"x40",pi:"x24",alignItems:"center",display:"flex",fontScale:"p2",textAlign:"center",className:o},l.createElement(c,{withTruncatedText:!0,w:"none"},e)))};n.exportDefault(t=>{let{announcement:e,announcementDetails:n}=t;const o=s(),c=i(()=>o()),a=t=>{t.target.href||""===window.getSelection().toString()&&(n?n():o(l.createElement(u,{onClose:c},e)))};return!!e&&l.createElement(f,{onClickOpen:a},l.createElement(k,{content:e}))})}

