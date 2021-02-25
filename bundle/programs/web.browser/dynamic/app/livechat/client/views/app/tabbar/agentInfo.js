function module(t,e,n){let a,s,i,r,o,c,l,g,m,u,d,h,p;n.link("meteor/meteor",{Meteor(t){a=t}},0),n.link("meteor/reactive-var",{ReactiveVar(t){s=t}},1),n.link("meteor/session",{Session(t){i=t}},2),n.link("meteor/templating",{Template(t){r=t}},3),n.link("meteor/rocketchat:tap-i18n",{TAPi18n(t){o=t}},4),n.link("underscore",{default(t){c=t}},5),n.link("underscore.string",{default(t){l=t}},6),n.link("../customTemplates/register",{getCustomFormTemplate(t){g=t}},7),n.link("./agentInfo.html"),n.link("../../../../../ui-utils",{modal(t){m=t}},8),n.link("../../../../../utils/client",{t(t){u=t},handleError(t){d=t},APIClient(t){h=t}},9),n.link("../../../../../authorization",{hasPermission(t){p=t}},10);const v=()=>g("livechatAgentInfoForm");r.agentInfo.helpers({canEdit(){const t=[...r.instance().availableDepartments.get()],e=null!==v();return t.length>0&&p("add-livechat-department-agents")||e},uid:()=>r.instance().agent.get()._id,name(){const t=r.instance().agent.get();return t&&t.name?t.name:o.__("Unnamed")},username(){const t=r.instance().agent.get();return t&&t.username},agentStatus(){const t=r.instance().agent.get(),e=i.get("user_".concat(t.username,"_status"));return e||o.__("offline")},agentStatusText(){const t=r.instance().agent.get();if(t&&l.trim(t.statusText))return t.statusText;const e=i.get("user_".concat(t.username,"_status"));return e||o.__("offline")},email(){const t=r.instance().agent.get();return t&&t.emails&&t.emails[0]&&t.emails[0].address},agent:()=>r.instance().agent.get(),hasEmails(){const t=r.instance().agent.get();return t&&c.isArray(t.emails)},editingAgent:()=>"edit"===r.instance().action.get(),agentToEdit(){const t=r.instance(),e=t.agent.get();return{agentId:e&&e._id,back(e){t.action.set(),t.agentEdited.set(e)}}},agentDepartments(){const t=r.instance().agentDepartments.get(),e=r.instance().departments.get();return e.filter(e=>{let{_id:n}=e;return t.includes(n)})},customFieldsTemplate:v,agentDataContext:()=>r.instance().agent,isReady(){const t=r.instance();return t.ready&&t.ready.get()}}),r.agentInfo.events({"click .delete-agent"(t,e){t.preventDefault(),m.open({title:u("Are_you_sure"),type:"warning",showCancelButton:!0,confirmButtonColor:"#DD6B55",confirmButtonText:u("Yes"),cancelButtonText:u("Cancel"),closeOnConfirm:!1,html:!1},()=>{a.call("livechat:removeAgent",this.username,t=>{if(t)return d(t);const{tabBar:n,onRemoveAgent:a}=e;n.close(),a&&a(),m.open({title:u("Removed"),text:u("Agent_removed"),type:"success",timer:1e3,showConfirmButton:!1})})})},"click .edit-agent"(t,e){t.preventDefault(),e.action.set("edit")}}),r.agentInfo.onCreated((async function(){this.agent=new s,this.ready=new s(!1),this.agentEdited=new s,this.departments=new s([]),this.availableDepartments=new s([]),this.agentDepartments=new s([]),this.action=new s,this.tabBar=r.currentData().tabBar,this.onRemoveAgent=r.currentData().onRemoveAgent;const{departments:t}=await h.v1.get('livechat/department?sort={"name": 1}');this.departments.set(t),this.availableDepartments.set(t.filter(t=>{let{enabled:e}=t;return e}));const e=async t=>{this.ready.set(!1);const{user:e}=await h.v1.get("livechat/users/agent/".concat(t)),{departments:n}=await h.v1.get("livechat/agents/".concat(t,"/departments"));this.agent.set(e),this.agentDepartments.set((n||[]).map(t=>t.departmentId)),this.ready.set(!0)};this.autorun(()=>{const{agentId:t}=r.currentData();t&&e(t)}),this.autorun(()=>{const t=this.agentEdited.get();t&&(e(t),this.agentEdited.set())})}))}

