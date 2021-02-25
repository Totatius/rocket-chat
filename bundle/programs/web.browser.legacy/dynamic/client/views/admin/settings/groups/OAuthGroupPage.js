function module(e,t,n){var r,o,u,a,c,s,i,l,f,m,p,h,d,_,x;function k(e){var t=e._id,n=u(e,["_id"]),s=l(t),k=1===s.length,g=d(),v=function(e){return e&&/^Custom OAuth:\s.+/.test(e)},C=m(),b=function(e){var t=i.strRight(e,"Custom OAuth: ").toLowerCase();return C("_oauth/"+t)},y=h(),w=p("refreshOAuthService"),E=p("addOAuthService"),A=p("removeOAuthService"),S=f(),B=function(){function e(){return o.async(function(){function e(e){for(;;)switch(e.prev=e.next){case 0:return y({type:"info",message:g("Refreshing")}),e.prev=1,e.next=4,o.awrap(w());case 4:y({type:"success",message:g("Done")}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),y({type:"error",message:e.t0});case 10:case"end":return e.stop()}}return e}(),null,null,[[1,7]],Promise)}return e}(),O=function(){S.open({title:g("Add_custom_oauth"),text:g("Give_a_unique_name_for_the_custom_oauth"),type:"input",showCancelButton:!0,closeOnConfirm:!0,inputPlaceholder:g("Custom_oauth_unique_name")},function(){function e(e){return o.async(function(){function t(t){for(;;)switch(t.prev=t.next){case 0:if(!1!==e){t.next=2;break}return t.abrupt("return",!1);case 2:if(""!==e){t.next=5;break}return S.showInputError(g("Name_cant_be_empty")),t.abrupt("return",!1);case 5:return t.prev=5,t.next=8,o.awrap(E(e));case 8:t.next=13;break;case 10:t.prev=10,t.t0=t.catch(5),y({type:"error",message:t.t0});case 13:case"end":return t.stop()}}return t}(),null,null,[[5,10]],Promise)}return e}())};return c.createElement(_,r({_id:t},n,{headerButtons:c.createElement(c.Fragment,null,c.createElement(a,{onClick:B},g("Refresh_oauth_services")),c.createElement(a,{onClick:O},g("Add_custom_oauth")))}),s.map((function(e){if(v(e)){var n=i.strRight(e,"Custom OAuth: ").toLowerCase(),r=function(){S.open({title:g("Are_you_sure"),type:"warning",showCancelButton:!0,confirmButtonColor:"#DD6B55",confirmButtonText:g("Yes_delete_it"),cancelButtonText:g("Cancel"),closeOnConfirm:!0},function(){function e(){return o.async(function(){function e(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,o.awrap(A(n));case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),y({type:"error",message:e.t0});case 8:case"end":return e.stop()}}return e}(),null,null,[[0,5]],Promise)}return e}())};return c.createElement(x,{key:e,groupId:t,help:c.createElement("span",{dangerouslySetInnerHTML:{__html:g("Custom_oauth_helper",b(e))}}),sectionName:e,solo:k},c.createElement("div",{className:"submit"},c.createElement(a,{danger:!0,onClick:r},g("Remove_custom_oauth"))))}return(c.createElement(x,{key:e,groupId:t,sectionName:e,solo:k}))})))}n.link("@babel/runtime/helpers/extends",{default:function(e){r=e}},0),n.link("@babel/runtime/regenerator",{default:function(e){o=e}},1),n.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){u=e}},2),n.link("@rocket.chat/fuselage",{Button:function(e){a=e}},0),n.link("react",{default:function(e){c=e},memo:function(e){s=e}},1),n.link("underscore.string",{default:function(e){i=e}},2),n.link("../../../../contexts/EditableSettingsContext",{useEditableSettingsGroupSections:function(e){l=e}},3),n.link("../../../../contexts/ModalContext",{useModal:function(e){f=e}},4),n.link("../../../../contexts/ServerContext",{useAbsoluteUrl:function(e){m=e},useMethod:function(e){p=e}},5),n.link("../../../../contexts/ToastMessagesContext",{useToastMessageDispatch:function(e){h=e}},6),n.link("../../../../contexts/TranslationContext",{useTranslation:function(e){d=e}},7),n.link("../GroupPage",{default:function(e){_=e}},8),n.link("../Section",{Section:function(e){x=e}},9),n.exportDefault(s(k))}
