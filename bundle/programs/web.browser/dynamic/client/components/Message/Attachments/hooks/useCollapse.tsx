function module(t,e,l){let n,o,a,c;l.export({useCollapse:()=>s}),l.link("react",{default(t){n=t}},0),l.link("@rocket.chat/fuselage-hooks",{useToggle(t){o=t}},1),l.link("../Attachment",{Attachment(t){a=t}},2),l.link("../context/AttachmentContext",{useAttachmentIsCollapsedByDefault(t){c=t}},3);const s=t=>{const e=c(),[l,s]=o(e||t);return[l,n.createElement(a.Collapse,{collapsed:l,onClick:s})]}}

