function module(e,n,t){var l,a,o,c,r,i,s,u;t.link("react",{default:function(e){l=e},useMemo:function(e){a=e}},0),t.link("@rocket.chat/fuselage",{Box:function(e){o=e},Field:function(e){c=e},TextInput:function(e){r=e},Select:function(e){i=e},ToggleSwitch:function(e){s=e}},1),t.link("../../../contexts/TranslationContext",{useTranslation:function(e){u=e}},2);var m=function(e){var n=e.values,t=e.handlers,m=e.className,d=e.editing,f=void 0!==d&&d,h=e.isProtected,E=void 0!==h&&h,p=u(),v=n.name,b=n.description,g=n.scope,w=n.mandatory2fa,x=t.handleName,R=t.handleDescription,k=t.handleScope,N=t.handleMandatory2fa,S=a((function(){return[["Users",p("Global")],["Subscriptions",p("Rooms")]]}),[p]);return l.createElement(l.Fragment,null,l.createElement(c,{className:m},l.createElement(c.Label,null,p("Role")),l.createElement(c.Row,null,l.createElement(r,{disabled:f,value:v,onChange:x,placeholder:p("Role")}))),l.createElement(c,{className:m},l.createElement(c.Label,null,p("Description")),l.createElement(c.Row,null,l.createElement(r,{value:b,onChange:R,placeholder:p("Description")})),l.createElement(c.Hint,null,"Leave the description field blank if you dont want to show the role")),l.createElement(c,{className:m},l.createElement(c.Label,null,p("Scope")),l.createElement(c.Row,null,l.createElement(i,{disabled:E,options:S,value:g,onChange:k,placeholder:p("Scope")}))),l.createElement(c,{className:m},l.createElement(o,{display:"flex",flexDirection:"row"},l.createElement(c.Label,null,p("Users must use Two Factor Authentication")),l.createElement(c.Row,null,l.createElement(s,{checked:w,onChange:N})))))};t.exportDefault(m)}

