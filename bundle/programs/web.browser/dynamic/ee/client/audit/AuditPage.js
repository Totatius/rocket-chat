function module(e,l,t){let n,r,a,o,s,c,i,u,m,d,E,h,g,f,p,k,C,_,x,w,R;t.link("react",{default(e){n=e},useRef(e){r=e},useState(e){a=e}},0),t.link("@rocket.chat/fuselage",{Box(e){o=e},Field(e){s=e},TextInput(e){c=e},ButtonGroup(e){i=e},Button(e){u=e},Margins(e){m=e},Tabs(e){d=e},Flex(e){E=e}},1),t.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){h=e}},2),t.link("../../../client/components/Page",{default(e){g=e}},3),t.link("./DateRangePicker",{default(e){f=e}},4),t.link("./RoomAutoComplete",{default(e){p=e}},5),t.link("./UserAutoCompleteMultiple",{default(e){k=e}},6),t.link("./VisitorAutoComplete",{default(e){C=e}},7),t.link("./Result",{default(e){_=e}},8),t.link("../../../client/components/AutoCompleteAgent",{AutoCompleteAgent(e){x=e}},9),t.link("../../../client/contexts/TranslationContext",{useTranslation(e){w=e}},10),t.link("../../../client/hooks/useForm",{useForm(e){R=e}},11);const v={msg:"",type:"",dateRange:{start:"",end:""},visitor:"",agent:"all",rid:"",users:[]},b=()=>{const e=w(),{values:l,handlers:t}=R(v),b=r(()=>{}),[D,A]=a({}),{msg:y,type:T,dateRange:{start:U,end:I},visitor:L,agent:M,users:P,rid:F}=l,{handleMsg:S,handleType:G,handleVisitor:V,handleAgent:q,handleUsers:B,handleRid:j,handleDateRange:H}=t,N=e=>h(()=>{V(""),q(),j(""),B([]),G(e)}),O=h((e,l)=>{if(!l){if(P.includes(e))return;return B([...P,e])}B(P.filter(l=>l!==e))}),W=h(()=>{if(!F&&""===T)return A({rid:e("The_field_is_required",e("Channel_name"))});if(P.length<2&&"d"===T)return A({users:e("Select_at_least_two_users")});if("l"===T){const l={};if(""===M&&(l.agent=e("The_field_is_required",e("Agent"))),""===L&&(l.visitor=e("The_field_is_required",e("Visitor"))),l.visitor||l.agent)return A(l)}A({}),b.current({msg:y,type:T,startDate:new Date(U),endDate:new Date("".concat(I,"T23:59:00")),visitor:L,agent:M,users:P,rid:F})});return n.createElement(g,null,n.createElement(g.Header,{title:e("Message_auditing")}),n.createElement(d,null,n.createElement(d.Item,{selected:""===T,onClick:N("")},e("Channels")),n.createElement(d.Item,{selected:"u"===T,onClick:N("u")},e("Users")),n.createElement(d.Item,{selected:"d"===T,onClick:N("d")},e("Direct_Messages")),n.createElement(d.Item,{selected:"l"===T,onClick:N("l")},e("Omnichannel"))),n.createElement(g.ScrollableContentWithShadow,{mb:"neg-x4"},n.createElement(m,{block:"x4"},n.createElement(o,{display:"flex",flexDirection:"row",mi:"neg-x4",justifyContent:"stretch"},n.createElement(m,{inline:"x4"},n.createElement(E.Item,{shrink:1},n.createElement(s,null,n.createElement(s.Label,null,e("Message")),n.createElement(s.Row,null,n.createElement(c,{value:y,onChange:S,placeholder:e("Search")}))),n.createElement(s,null,n.createElement(s.Label,null,e("Date")),n.createElement(s.Row,null,n.createElement(f,{onChange:H,display:"flex",flexGrow:1})))))),n.createElement(o,{display:"flex",flexDirection:"row",alignItems:"flex-end"},n.createElement(E.Item,{shrink:1},""===T&&n.createElement(s,null,n.createElement(s.Label,null,e("Channel_name")),n.createElement(s.Row,null,n.createElement(p,{error:D.rid,value:F,onChange:j,placeholder:e("Channel_Name_Placeholder")})),D.rid&&n.createElement(s.Error,null,D.rid)),"u"===T&&n.createElement(s,null,n.createElement(s.Label,null,e("Users")),n.createElement(s.Row,null,n.createElement(k,{error:D.users,value:P,onChange:O,placeholder:e("Username_Placeholder")})),D.users&&n.createElement(s.Error,null,D.users)),"d"===T&&n.createElement(s,null,n.createElement(s.Label,null,e("Users")),n.createElement(s.Row,null,n.createElement(k,{error:D.users,value:P,onChange:O,placeholder:e("Username_Placeholder")})),D.users&&n.createElement(s.Error,null,D.users)),"l"===T&&n.createElement(n.Fragment,null,n.createElement(m,{inline:"x4"},n.createElement(s,null,n.createElement(s.Label,{flexGrow:0},e("Visitor")),n.createElement(s.Row,null,n.createElement(C,{error:D.visitor,value:L,onChange:V,placeholder:e("Username_Placeholder")})),D.visitor&&n.createElement(s.Error,null,D.visitor)),n.createElement(s,null,n.createElement(s.Label,{flexGrow:0},e("Agent")),n.createElement(s.Row,null,n.createElement(x,{error:D.agent,value:M,onChange:q,placeholder:e("Username_Placeholder")})),D.agent&&n.createElement(s.Error,null,D.agent)))),n.createElement(i,{mis:"x8",align:"end"},n.createElement(u,{primary:!0,onClick:W},e("Apply"))))),n.createElement(_,{setDataRef:b}))))};t.exportDefault(b)}
