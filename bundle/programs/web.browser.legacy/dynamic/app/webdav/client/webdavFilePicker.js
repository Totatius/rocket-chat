function module(e,t,n){var r,i,a,s,o,c,u,l,d,f,p,v,m,g;function h(e,t,n){return"desc"===n?("name"===t&&e.sort((function(e,t){return t.basename.localeCompare(e.basename)})),"size"===t&&e.sort((function(e,t){return t.size-e.size})),"date"===t&&e.sort((function(e,t){return new Date(t.lastmod)-new Date(e.lastmod)}))):("name"===t&&e.sort((function(e,t){return e.basename.localeCompare(t.basename)})),"size"===t&&e.sort((function(e,t){return e.size-t.size})),"date"===t&&e.sort((function(e,t){return new Date(e.lastmod)-new Date(t.lastmod)}))),e}function b(e,t){var n;return r.async(function(){function r(r){for(;;)switch(r.prev=r.next){case 0:if(Array.isArray(t)&&t.length){r.next=2;break}return r.abrupt("return");case 2:return n=t.map((function(n,r){if("file"===n.type)return v("getWebdavFilePreview",e,n.filename).then((function(e){var n=new Blob([e.data],{type:"image/png"}),i=URL.createObjectURL(n);t[r].preview=i})).catch((function(e){return e}))})).filter(Boolean),r.abrupt("return",Promise.all(n).then((function(){return t})).catch((function(e){return e})));case 4:case"end":return r.stop()}}return r}(),null,null,null,Promise)}function w(){var e,t,n,i,s,o;return r.async(function(){function c(c){for(;;)switch(c.prev=c.next){case 0:return e=a.instance(),t=e.data.accountId,n=e.state.get("webdavCurrentFolder"),e.isLoading.set(!0),e.state.set({webdavNodes:[]}),c.prev=5,c.next=8,r.awrap(v("getWebdavFileList",t,n).catch((function(e){return console.log(e)})));case 8:if((s=c.sent)&&s.success){c.next=13;break}return e.isLoading.set(!1),p.close(),c.abrupt("return");case 13:i=s.data,e.state.set({unfilteredWebdavNodes:i}),$(".js-webdav-search-input").val(""),e.searchText.set("");case 17:return c.prev=17,e.isLoading.set(!1),c.next=21,r.awrap(b(t,i));case 21:return o=c.sent,Array.isArray(o)&&o.length&&e.state.set({unfilteredWebdavNodes:o}),c.finish(17);case 24:case"end":return c.stop()}}return c}(),null,null,[[5,,17,24]],Promise)}n.link("@babel/runtime/regenerator",{default:function(e){r=e}},0),n.link("meteor/meteor",{Meteor:function(e){i=e}},0),n.link("meteor/templating",{Template:function(e){a=e}},1),n.link("underscore",{default:function(e){s=e}},2),n.link("toastr",{default:function(e){o=e}},3),n.link("meteor/session",{Session:function(e){c=e}},4),n.link("meteor/ui",{Handlebars:function(e){u=e}},5),n.link("meteor/reactive-var",{ReactiveVar:function(e){l=e}},6),n.link("meteor/reactive-dict",{ReactiveDict:function(e){d=e}},7),n.link("../../ui/client/views/app/helpers",{timeAgo:function(e){f=e}},8),n.link("../../ui-utils",{modal:function(e){p=e},call:function(e){v=e}},9),n.link("../../utils",{t:function(e){m=e}},10),n.link("../../file-upload",{fileUploadHandler:function(e){g=e}},11),a.webdavFilePicker.helpers({iconType:function(){var e="clip",t="",n=this.basename.split(".").pop();return n===this.basename&&(n=""),"directory"===this.type?(e="folder",t="directory"):this.mime.match(/application\/pdf/)?(e="file-pdf",t="pdf"):["application/vnd.oasis.opendocument.text","application/vnd.oasis.opendocument.presentation"].includes(this.mime)?(e="file-document",t="document"):["application/vnd.ms-excel","application/vnd.oasis.opendocument.spreadsheet","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"].includes(this.mime)?(e="file-sheets",t="sheets"):["application/vnd.ms-powerpoint","application/vnd.oasis.opendocument.presentation"].includes(this.mime)&&(e="file-sheets",t="ppt"),{icon:e,type:t,extension:n}},filePreview:function(){return this.preview},isLoading:function(){return a.instance().isLoading.get()},listMode:function(){return a.instance().isListMode.get()},sortBy:function(e){return a.instance().sortBy.get()===e},getSortBy:function(){return a.instance().sortBy.get()},getName:function(e){var t=a.instance().isListMode.get()?35:20;return e.length<t?e:e.slice(0,t-10)+"…"+e.slice(-7)},getSize:function(){if("directory"===this.type)return"";var e=this.size;if(0===e)return"0 B";var t=1024,n=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],r=Math.floor(Math.log(e)/Math.log(t));return parseFloat((e/Math.pow(t,r)).toFixed(2))+" "+n[r]},getDate:function(){return f(new Date(this.lastmod),m)},sortIcon:function(e){var t=a.instance(),n=t.sortDirection,r;return e===t.sortBy.get()&&"asc"===n.get()?"sort-up":"sort-down"},onTableSort:function(){var e=a.instance(),t=e.sortDirection,n=e.sortBy;return function(e){n.get()===e?t.set("asc"===t.get()?"desc":"asc"):(n.set(e),t.set("asc"))}},parentFolders:function(){var e=a.instance().state.get("webdavCurrentFolder");return e?e.split("/").filter((function(e){return e})):[]},webdavNodes:function(){return a.instance().state.get("webdavNodes")},webdavCurrentFolder:function(){return a.instance().state.get("webdavCurrentFolder")}}),a.webdavFilePicker.events({"click .js-list-grid-mode":function(){var e=a.instance();e.isListMode.set(!e.isListMode.get())},"click .js-webdav-sort-direction":function(){var e,t=a.instance().sortDirection;t.set("asc"===t.get()?"desc":"asc")},"change .js-webdav-select-sort":function(){var e,t=a.instance().sortBy,n=$(".js-webdav-select-sort").val();t.set(n)},"click .js-webdav-search-icon":function(){$(".js-webdav-search-input").focus()},"submit .js-search-form":function(e){e.preventDefault(),e.stopPropagation()},"input .js-webdav-search-input":s.debounce((function(e,t){t.searchText.set(e.currentTarget.value)}),200),"blur .js-webdav-search-input":function(e,t){s.delay((function(){e.target.value="",t.searchText.set("")}),200)},"click .js-webdav-grid-back-icon":function(){function e(){var e,t,n;return r.async(function(){function r(r){for(;;)switch(r.prev=r.next){case 0:e=a.instance(),t=e.state.get("webdavCurrentFolder"),n="/",t&&"/"!==t&&("/"===t[t.length-1]&&(t=t.slice(0,-1)),n=t.substr(0,t.lastIndexOf("/")+1)),e.state.set("webdavCurrentFolder",n);case 5:case"end":return r.stop()}}return r}(),null,null,null,Promise)}return e}(),"click .js-webdav_directory":function(){function e(){var e;return r.async(function(){function t(t){for(;;)switch(t.prev=t.next){case 0:(e=a.instance()).state.set("webdavCurrentFolder",this.filename);case 2:case"end":return t.stop()}}return t}(),null,this,null,Promise)}return e}(),"click .js-webdav-breadcrumb-folder":function(){function e(e){var t,n,i,s,o,c;return r.async(function(){function r(r){for(;;)switch(r.prev=r.next){case 0:for(t=a.instance(),n=$(e.target).data("index"),i=t.state.get("webdavCurrentFolder"),s=i.split("/").filter((function(e){return e})),o="/",c=0;c<=n;c++)o+=s[c],o+="/";t.state.set("webdavCurrentFolder",o);case 7:case"end":return r.stop()}}return r}(),null,null,null,Promise)}return e}(),"click .js-webdav_file":function(){function e(){var e,t,n,l,d,f,h;return r.async(function(){function b(b){for(;;)switch(b.prev=b.next){case 0:return e=c.get("openedRoom"),t=a.instance(),n=t.data.accountId,t.isLoading.set(!0),l=this,b.next=7,r.awrap(v("getFileFromWebdav",n,l).catch((function(e){console.log(e)})));case 7:if(d=b.sent,t.isLoading.set(!1),d&&d.success){b.next=12;break}return p.close(),b.abrupt("return",o.error(m("Failed_to_get_webdav_file")));case 12:return(f=new Blob([d.data],{type:d.type})).lastModified=l.lastmod,f.name=l.basename,h="\n\t\t\t<div class='upload-preview-title'>\n\t\t\t\t<div class=\"rc-input__wrapper\">\n\t\t\t\t\t<input class=\"rc-input__element\" id='file-name' style='display: inherit;' value='"+u._escape(f.name)+"' placeholder='"+m("Upload_file_name")+"'>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"rc-input__wrapper\">\n\t\t\t\t\t<input class=\"rc-input__element\" id='file-description' style='display: inherit;' value='' placeholder='"+m("Upload_file_description")+"'>\n\t\t\t\t</div>\n\t\t\t</div>",b.abrupt("return",p.open({title:m("Upload_file_question"),text:h,showCancelButton:!0,closeOnConfirm:!1,closeOnCancel:!1,confirmButtonText:m("Send"),cancelButtonText:m("Cancel"),html:!0,onRendered:function(){return $("#file-name").focus()}},(function(t){var n={name:document.getElementById("file-name").value||f.name,size:f.size,type:f.type,rid:e,description:document.getElementById("file-description").value};if(p.close(),t){var r=g("Uploads",n,f),a=c.get("uploading")||[];a.push({id:r.id,name:r.getFileName(),percentage:0}),c.set("uploading",a),r.onProgress=function(e){a=c.get("uploading");var t=s.findWhere(a,{id:r.id});if(null!=t)return t.percentage=Math.round(100*e)||0,c.set("uploading",a)},r.start((function(t,n,a){if(t){var o=c.get("uploading");Array.isArray(o)||(o=[]);var u=s.findWhere(o,{id:r.id});return s.isObject(u)?(u.error=t.message,u.percentage=0):o.push({error:t.error,percentage:0}),c.set("uploading",o)}n&&i.call("sendFileMessage",e,a,n,(function(){setTimeout((function(){var e=c.get("uploading");if(null!==e){var t=s.findWhere(e,{id:r.id});return c.set("uploading",s.without(e,t))}}),2e3)}))}))}})));case 17:case"end":return b.stop()}}return b}(),null,this,null,Promise)}return e}()}),a.webdavFilePicker.onRendered(function(){function e(){var e=this;return r.async(function(){function t(t){for(;;)switch(t.prev=t.next){case 0:this.autorun((function(){w()})),this.autorun((function(){var t=a.instance(),n=t.sortDirection,r=t.sortBy,i=h(e.state.get("webdavNodes"),r.get(),n.get());e.state.set("webdavNodes",i)})),this.autorun((function(){var t;if(!e.isLoading.get()){var n=e.searchText.get(),r=new RegExp("\\b"+n,"i"),i=e.state.get("unfilteredWebdavNodes").filter((function(e){var t;return e.basename.match(r)}));e.state.set("webdavNodes",i)}}));case 3:case"end":return t.stop()}}return t}(),null,this,null,Promise)}return e}()),a.webdavFilePicker.onCreated((function(){this.state=new d({webdavCurrentFolder:"/",webdavNodes:[],unfilteredWebdavNodes:[]}),this.isLoading=new l(!0),this.isListMode=new l(!0),this.sortBy=new l("name"),this.sortDirection=new l("asc"),this.searchText=new l("")}))}

