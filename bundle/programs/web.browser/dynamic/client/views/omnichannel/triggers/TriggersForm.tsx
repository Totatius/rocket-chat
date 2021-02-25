function module(e,a,l){let n,t,r,o,c,m,s,u,i,d,E,p,h;l.link("@babel/runtime/helpers/objectSpread2",{default(e){n=e}},0),l.link("react",{default(e){t=e},useMemo(e){r=e},useState(e){o=e}},0),l.link("@rocket.chat/fuselage",{Box(e){c=e},Field(e){m=e},TextInput(e){s=e},ToggleSwitch(e){u=e},Select(e){i=e},TextAreaInput(e){d=e}},1),l.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){E=e}},2),l.link("../../../contexts/TranslationContext",{useTranslation(e){p=e}},3),l.link("../../../hooks/useComponentDidUpdate",{useComponentDidUpdate(e){h=e}},4);const g=e=>{let{values:a,handlers:l,className:g}=e;const[_,v]=o(""),C=p(),{name:b,description:f,enabled:w,runOnce:k,conditions:R,actions:x}=a,{handleName:N,handleDescription:T,handleEnabled:D,handleRunOnce:L,handleConditions:S,handleActions:q}=l,{name:y,value:A}=R,{params:{sender:I,msg:M,name:U}}=x,F=r(()=>[["page-url",C("Visitor_page_URL")],["time-on-site",C("Visitor_time_on_site")]],[C]),O=r(()=>[["queue",C("Impersonate_next_agent_from_queue")],["custom",C("Custom_agent")]],[C]),V=E(e=>{S({name:e,value:""})}),j=E(e=>{let{currentTarget:{value:a}}=e;S(n({},R,{value:a}))}),B=E(e=>{let{currentTarget:{value:a}}=e;q(n({},x,{params:n({},x.params,{name:a})}))}),z=E(e=>{q(n({},x,{params:n({},x.params,{sender:e})}))}),G=E(e=>{let{currentTarget:{value:a}}=e;q(n({},x,{params:n({},x.params,{msg:a})}))});return h(()=>{v(b?"":C("The_field_is_required","name"))},[C,b]),t.createElement(t.Fragment,null,t.createElement(m,{className:g},t.createElement(c,{display:"flex",flexDirection:"row"},t.createElement(m.Label,null,C("Enabled")),t.createElement(m.Row,null,t.createElement(u,{checked:w,onChange:D})))),t.createElement(m,{className:g},t.createElement(c,{display:"flex",flexDirection:"row"},t.createElement(m.Label,null,C("Run_only_once_for_each_visitor")),t.createElement(m.Row,null,t.createElement(u,{checked:k,onChange:L})))),t.createElement(m,{className:g},t.createElement(m.Label,null,C("Name"),"*"),t.createElement(m.Row,null,t.createElement(s,{value:b,error:_,onChange:N,placeholder:C("Name")}))),t.createElement(m,{className:g},t.createElement(m.Label,null,C("Description")),t.createElement(m.Row,null,t.createElement(s,{value:f,onChange:T,placeholder:C("Description")}))),t.createElement(m,{className:g},t.createElement(m.Label,null,C("Condition")),t.createElement(m.Row,null,t.createElement(i,{options:F,value:y,onChange:V})),t.createElement(m.Row,null,t.createElement(s,{value:A,onChange:j,placeholder:C("page-url"===y?"Enter_a_regex":"Time_in_seconds")}))),t.createElement(m,{className:g},t.createElement(m.Label,null,C("Action")),t.createElement(m.Row,null,t.createElement(s,{value:C("Send_a_message"),disabled:!0})),t.createElement(m.Row,null,t.createElement(i,{options:O,value:I,onChange:z,placeholder:C("Select_an_option")})),"custom"===I&&t.createElement(m.Row,null,t.createElement(s,{value:U,onChange:B,placeholder:C("Name_of_agent")})),t.createElement(m.Row,null,t.createElement(d,{rows:3,value:M,onChange:G,placeholder:C("Message")}))))};l.exportDefault(g)}
