(this.webpackJsonpreacthassmalie=this.webpackJsonpreacthassmalie||[]).push([[0],{74:function(e,t,n){"use strict";n.r(t);var a=n(1),c=n.n(a),r=n(19),s=n.n(r),i=n(3),l=n(5),o=n(0),j=function(){return Object(o.jsxs)("html",{lang:"he",dir:"rtl",children:[Object(o.jsx)("head",{children:Object(o.jsx)("meta",{charset:"utf-8"})}),Object(o.jsx)("body",{dir:"rtl",children:Object(o.jsx)("div",{className:"container",lang:"he",dir:"rtl",style:{display:"flex",justifyContent:"center",alignItems:"right",height:"70vh"},children:Object(o.jsxs)("div",{class:"jumbotron mt-5",children:[Object(o.jsx)("h1",{class:"display-4",dir:"rtl",children:"\u05d4\u05d7\u05e9\u05de\u05dc\u05d0\u05d9"}),Object(o.jsx)("p",{class:"lead",children:"\u05de\u05e2\u05e8\u05db\u05ea \u05dc\u05d4\u05e0\u05d4\u05dc\u05ea \u05e2\u05e1\u05e7 \u05e2\u05d1\u05d5\u05d3\u05d5\u05ea \u05d7\u05e9\u05de\u05dc"}),Object(o.jsx)("hr",{class:"my-4"}),Object(o.jsx)("p",{children:"\u05dc\u05d7\u05e5 \u05e2\u05dc \u05d4\u05db\u05e4\u05ea\u05d5\u05e8 \u05dc\u05d4\u05ea\u05d7\u05d1\u05e8\u05d5\u05ea"}),Object(o.jsx)(i.b,{class:"btn btn-primary btn-lg",to:"/login",role:"button",children:"\u05dc\u05db\u05e0\u05d9\u05e1\u05d4"})]})})})]})},u=n(14),d=n(2),b=n(10),h=n(6),p=n(7),m=n.n(p),O=n(17),x=n(15),f=n.n(x),v="LOGIN_SUCCESS",g="LOGIN_FAIL",y="SIGNUP_SUCCESS",N="SIGNUP_FAIL",S="ACTIVATION_SUCCESS",w="ACTIVATION_FAIL",_="USER_LOADED_SUCCESS",k="USER_LOADED_FAIL",A="AUTHENTICATED_SUCCESS",C="AUTHENTICATED_FAIL",I="PASSWORD_RESET_FAIL",T="PASSWORD_RESET_SUCCESS",E="PASSWORD_RESET_CONFIRM_FAIL",L="PASSWORD_RESET_CONFIRM_SUCCESS",D="LOGOUT",U=function(){return function(){var e=Object(O.a)(m.a.mark((function e(t){var n,a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!localStorage.getItem("access")){e.next=14;break}return n={headers:{"Content-Type":"application/json",Authorization:"JWT ".concat(localStorage.getItem("access")),Accept:"application/json"}},e.prev=2,e.next=5,f.a.get("".concat("http://localhost:8000","/auth/users/me/"),n);case 5:a=e.sent,t({type:_,payload:a.data}),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),t({type:k});case 12:e.next=15;break;case 14:t({type:k});case 15:case"end":return e.stop()}}),e,null,[[2,9]])})));return function(t){return e.apply(this,arguments)}}()},R=Object(h.b)((function(e){return{isAuthenticated:e.auth.isAuthenticated}}),{login:function(e,t){return function(){var n=Object(O.a)(m.a.mark((function n(a){var c,r,s;return m.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return c={headers:{"Content-Type":"application/json"}},r=JSON.stringify({email:e,password:t}),n.prev=2,n.next=5,f.a.post("".concat("http://localhost:8000","/auth/jwt/create/"),r,c);case 5:s=n.sent,a({type:v,payload:s.data}),a(U()),n.next=13;break;case 10:n.prev=10,n.t0=n.catch(2),a({type:g});case 13:case"end":return n.stop()}}),n,null,[[2,10]])})));return function(e){return n.apply(this,arguments)}}()}})((function(e){var t=e.login,n=e.isAuthenticated,c=Object(a.useState)({email:"",password:""}),r=Object(b.a)(c,2),s=r[0],j=r[1],h=s.email,p=s.password,m=function(e){return j(Object(d.a)(Object(d.a)({},s),{},Object(u.a)({},e.target.name,e.target.value)))};return n?Object(o.jsx)(l.a,{to:"/homepage"}):Object(o.jsx)("html",{lang:"he",dir:"rtl",children:Object(o.jsx)("div",{class:"col-4 container-fluid jumbotron mt-5",lang:"he",style:{display:"flex",justifyContent:"center",alignItems:"center",height:"70vh"},children:Object(o.jsxs)("div",{className:"container mt-5",dir:"rtl",children:[Object(o.jsx)("h1",{dir:"rtl",children:"\u05db\u05e0\u05d9\u05e1\u05d4"}),Object(o.jsx)("p",{dir:"rtl",children:"\u05db\u05e0\u05d9\u05e1\u05d4 \u05dc\u05d7\u05e9\u05d1\u05d5\u05df \u05e9\u05dc\u05da"}),Object(o.jsxs)("form",{onSubmit:function(e){return function(e){e.preventDefault(),t(h,p)}(e)},children:[Object(o.jsx)("div",{className:"form-group",dir:"rtl",children:Object(o.jsx)("input",{className:"form-control",type:"email",placeholder:"\u05d0\u05d9\u05d9\u05de\u05d9\u05dc",name:"email",value:h,onChange:function(e){return m(e)},required:!0})}),Object(o.jsx)("div",{className:"form-group",children:Object(o.jsx)("input",{className:"form-control",type:"password",placeholder:"\u05e1\u05d9\u05e1\u05de\u05d4",name:"password",value:p,onChange:function(e){return m(e)},minLength:"6",required:!0})}),Object(o.jsx)("button",{className:"btn btn-primary",dir:"rtl",type:"submit",children:"\u05db\u05e0\u05d9\u05e1\u05d4"})]}),Object(o.jsxs)("p",{className:"mt-3",dir:"rtl",children:["\u05e2\u05d3\u05d9\u05df \u05dc\u05d0 \u05e2\u05e9\u05d9\u05ea \u05d7\u05e9\u05d1\u05d5\u05df? ",Object(o.jsx)(i.b,{to:"/signup",children:"\u05ea\u05d9\u05e8\u05e9\u05dd"})]}),Object(o.jsxs)("p",{className:"mt-3",children:["\u05e9\u05db\u05d7\u05ea \u05d0\u05ea \u05d4\u05e1\u05d9\u05e1\u05de\u05d4? ",Object(o.jsx)(i.b,{to:"/reset-password",children:"\u05dc\u05d0\u05e4\u05e1 \u05d0\u05ea \u05d4\u05e1\u05d9\u05e1\u05de\u05d4"})]})]})})})})),q=Object(h.b)((function(e){return{isAuthenticated:e.auth.isAuthenticated}}),{signup:function(e,t,n,a,c,r,s){return function(){var i=Object(O.a)(m.a.mark((function i(l){var o,j,u;return m.a.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return o={headers:{"Content-Type":"application/json"}},j=JSON.stringify({first_name:e,last_name:t,email:n,phone_number:a,address:c,password:r,re_password:s}),i.prev=2,i.next=5,f.a.post("".concat("http://localhost:8000","/auth/users/"),j,o);case 5:u=i.sent,l({type:y,payload:u.data}),i.next=12;break;case 9:i.prev=9,i.t0=i.catch(2),l({type:N});case 12:case"end":return i.stop()}}),i,null,[[2,9]])})));return function(e){return i.apply(this,arguments)}}()}})((function(e){var t=e.signup,n=e.isAuthenticated,c=Object(a.useState)(!1),r=Object(b.a)(c,2),s=r[0],j=r[1],h=Object(a.useState)({first_name:"",last_name:"",email:"",phone_number:"",address:"",password:"",re_password:""}),p=Object(b.a)(h,2),m=p[0],O=p[1],x=m.first_name,f=m.last_name,v=m.email,g=m.phone_number,y=m.address,N=m.password,S=m.re_password,w=function(e){return O(Object(d.a)(Object(d.a)({},m),{},Object(u.a)({},e.target.name,e.target.value)))};return n?Object(o.jsx)(l.a,{to:"/"}):s?Object(o.jsx)(l.a,{to:"/login"}):Object(o.jsxs)("div",{dir:"rtl",class:"col-6 container-fluid jumbotron mt-5",lang:"he",style:{justifyContent:"right"},children:[Object(o.jsx)("h1",{dir:"rtl",children:"\u05d4\u05e8\u05e9\u05de\u05d4"}),Object(o.jsx)("p",{children:"\u05ea\u05d9\u05e6\u05d5\u05e8 \u05d0\u05ea \u05d4\u05de\u05e9\u05ea\u05de\u05e9 \u05e9\u05dc\u05da"}),Object(o.jsxs)("form",{dir:"rtl",onSubmit:function(e){return function(e){e.preventDefault(),N===S&&(t(x,f,v,g,y,N,S),j(!0),console.log("form Data",m),localStorage.setItem("user",JSON.stringify(m)),console.log(localStorage.getItem("user")))}(e)},children:[Object(o.jsx)("div",{className:"form-group",children:Object(o.jsx)("input",{className:"form-control",type:"text",placeholder:"\u05e9\u05dd \u05e4\u05e8\u05d8\u05d9*",name:"first_name",value:x,onChange:function(e){return w(e)},required:!0})}),Object(o.jsx)("div",{className:"form-group",children:Object(o.jsx)("input",{className:"form-control",type:"text",placeholder:"\u05e9\u05dd \u05de\u05e9\u05e4\u05d7\u05d4*",name:"last_name",value:f,onChange:function(e){return w(e)},required:!0})}),Object(o.jsx)("div",{className:"form-group",children:Object(o.jsx)("input",{className:"form-control",type:"email",placeholder:"\u05d0\u05d9\u05d9\u05de\u05d9\u05dc*",name:"email",value:v,onChange:function(e){return w(e)},required:!0})}),Object(o.jsx)("div",{className:"form-group",children:Object(o.jsx)("input",{className:"form-control",type:"number",placeholder:"\u05de\u05e1\u05e4\u05e8 \u05d8\u05d9\u05dc\u05e4\u05d5\u05df*",name:"phone_number",value:g,onChange:function(e){return w(e)},minLength:"8",required:!0})}),Object(o.jsx)("div",{className:"form-group",children:Object(o.jsx)("input",{className:"form-control",type:"text",placeholder:"\u05db\u05ea\u05d5\u05d1\u05ea*",name:"address",value:y,onChange:function(e){return w(e)},required:!0})}),Object(o.jsx)("div",{className:"form-group",children:Object(o.jsx)("input",{className:"form-control",type:"password",placeholder:"\u05e1\u05d9\u05e1\u05de\u05d4*",name:"password",value:N,onChange:function(e){return w(e)},minLength:"6",required:!0})}),Object(o.jsx)("div",{className:"form-group",children:Object(o.jsx)("input",{className:"form-control",type:"password",placeholder:"\u05d0\u05e9\u05e8 \u05e1\u05d9\u05e1\u05de\u05d4*",name:"re_password",value:S,onChange:function(e){return w(e)},minLength:"6",required:!0})}),Object(o.jsx)("button",{className:"btn btn-primary",type:"submit",children:"\u05d4\u05d9\u05e8\u05e9\u05dd"})]}),Object(o.jsxs)("p",{className:"mt-3",children:["\u05db\u05d1\u05e8 \u05d9\u05e9 \u05dc\u05da \u05d7\u05e9\u05d1\u05d5\u05df? ",Object(o.jsx)(i.b,{to:"/login",children:"\u05ea\u05ea\u05d7\u05d1\u05e8"})]})]})})),F=Object(h.b)(null,{verify:function(e,t){return function(){var n=Object(O.a)(m.a.mark((function n(a){var c,r;return m.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return c={headers:{"Content-Type":"application/json"}},r=JSON.stringify({uid:e,token:t}),n.prev=2,n.next=5,f.a.post("".concat("http://localhost:8000","/auth/users/activation/"),r,c);case 5:a({type:S}),n.next=11;break;case 8:n.prev=8,n.t0=n.catch(2),a({type:w});case 11:case"end":return n.stop()}}),n,null,[[2,8]])})));return function(e){return n.apply(this,arguments)}}()}})((function(e){var t=e.verify,n=e.match,c=Object(a.useState)(!1),r=Object(b.a)(c,2),s=r[0],i=r[1];return s?Object(o.jsx)(l.a,{to:"/"}):Object(o.jsx)("div",{className:"container",children:Object(o.jsxs)("div",{className:"d-flex flex-column justify-content-right align-items-center",style:{marginTop:"200px"},children:[Object(o.jsx)("h1",{dir:"rtl",children:"\u05d0\u05de\u05ea \u05d0\u05ea \u05d7\u05e9\u05d1\u05d5\u05e0\u05da: "}),Object(o.jsx)("button",{onClick:function(e){var a=n.params.uid,c=n.params.token;t(a,c),i(!0)},style:{marginTop:"50px"},type:"button",className:"btn btn-primary",children:Object(o.jsx)("div",{dir:"rtl",children:"\u05dc\u05d0\u05de\u05ea"})})]})})})),J=Object(h.b)(null,{reset_password:function(e){return function(){var t=Object(O.a)(m.a.mark((function t(n){var a,c;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a={headers:{"Content-Type":"application/json"}},c=JSON.stringify({email:e}),t.prev=2,t.next=5,f.a.post("".concat("http://localhost:8000","/auth/users/reset_password/"),c,a);case 5:n({type:T}),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(2),n({type:I});case 11:case"end":return t.stop()}}),t,null,[[2,8]])})));return function(e){return t.apply(this,arguments)}}()}})((function(e){var t=e.reset_password,n=Object(a.useState)(!1),c=Object(b.a)(n,2),r=c[0],s=c[1],i=Object(a.useState)({email:""}),j=Object(b.a)(i,2),h=j[0],p=j[1],m=h.email;return r?Object(o.jsx)(l.a,{to:"/"}):Object(o.jsxs)("div",{className:"container mt-5",children:[Object(o.jsx)("h1",{children:"\u05d1\u05e7\u05e9 \u05d0\u05d9\u05e4\u05d5\u05e1 \u05e1\u05d9\u05e1\u05de\u05d4:"}),Object(o.jsxs)("form",{onSubmit:function(e){return function(e){e.preventDefault(),t(m),s(!0)}(e)},children:[Object(o.jsx)("div",{className:"form-group",children:Object(o.jsx)("input",{className:"form-control",type:"email",placeholder:"\u05d0\u05d9\u05de\u05d9\u05d9\u05dc",name:"email",value:m,onChange:function(e){return function(e){return p(Object(d.a)(Object(d.a)({},h),{},Object(u.a)({},e.target.name,e.target.value)))}(e)},required:!0})}),Object(o.jsx)("button",{className:"btn btn-primary",type:"submit",children:"\u05dc\u05d0\u05e4\u05e1 \u05d0\u05ea \u05d4\u05e1\u05d9\u05e1\u05de\u05d4"})]})]})})),M=Object(h.b)(null,{reset_password_confirm:function(e,t,n,a){return function(){var c=Object(O.a)(m.a.mark((function c(r){var s,i;return m.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return s={headers:{"Content-Type":"application/json"}},i=JSON.stringify({uid:e,token:t,new_password:n,re_new_password:a}),c.prev=2,c.next=5,f.a.post("".concat("http://localhost:8000","/auth/users/reset_password_confirm/"),i,s);case 5:r({type:L}),c.next=11;break;case 8:c.prev=8,c.t0=c.catch(2),r({type:E});case 11:case"end":return c.stop()}}),c,null,[[2,8]])})));return function(e){return c.apply(this,arguments)}}()}})((function(e){var t=e.match,n=e.reset_password_confirm,c=Object(a.useState)(!1),r=Object(b.a)(c,2),s=r[0],i=r[1],j=Object(a.useState)({new_password:"",re_new_password:""}),h=Object(b.a)(j,2),p=h[0],m=h[1],O=p.new_password,x=p.re_new_password,f=function(e){return m(Object(d.a)(Object(d.a)({},p),{},Object(u.a)({},e.target.name,e.target.value)))};return s?Object(o.jsx)(l.a,{to:"/"}):Object(o.jsx)("div",{className:"container mt-5",children:Object(o.jsxs)("form",{onSubmit:function(e){return function(e){e.preventDefault();var a=t.params.uid,c=t.params.token;n(a,c,O,x),i(!0)}(e)},children:[Object(o.jsx)("div",{className:"form-group",children:Object(o.jsx)("input",{className:"form-control",type:"password",placeholder:"\u05e1\u05d9\u05e1\u05de\u05d4 \u05d7\u05d3\u05e9\u05d4",name:"new_password",value:O,onChange:function(e){return f(e)},minLength:"6",required:!0})}),Object(o.jsx)("div",{className:"form-group",children:Object(o.jsx)("input",{className:"form-control",type:"password",placeholder:"\u05d7\u05d6\u05d5\u05e8 \u05e2\u05dc \u05e1\u05d9\u05e1\u05de\u05d4 \u05d7\u05d3\u05e9\u05d4",name:"re_new_password",value:x,onChange:function(e){return f(e)},minLength:"6",required:!0})}),Object(o.jsx)("button",{className:"btn btn-primary",type:"submit",children:"\u05dc\u05d0\u05e4\u05e1 \u05d0\u05ea \u05d4\u05e1\u05d9\u05e1\u05de\u05d4"})]})})})),W=function(){return Object(o.jsxs)("html",{lang:"he",dir:"rtl",children:[Object(o.jsx)("head",{children:Object(o.jsx)("meta",{charset:"utf-8"})}),Object(o.jsx)("body",{lang:"he",dir:"rtl",children:Object(o.jsx)("div",{class:"container-fluid",lang:"he",dir:"rtl",children:Object(o.jsxs)("div",{class:"row ",lang:"he",dir:"rtl",children:[Object(o.jsx)("div",{className:"container",lang:"he",dir:"rtl",class:"col-6",children:Object(o.jsxs)("div",{class:"jumbotron mt-5",children:[Object(o.jsx)("h1",{class:"display-4",children:"\u05d4\u05e2\u05e1\u05e7 \u05e9\u05dc\u05d9"}),Object(o.jsx)("hr",{class:"my-4"}),Object(o.jsx)("p",{class:"lead",children:Object(o.jsxs)("li",{children:[" ",Object(o.jsx)(i.b,{to:"/my-business-details",children:"\u05e4\u05e8\u05d8\u05d9 \u05d4\u05e2\u05e1\u05e7 \u05e9\u05dc\u05d9"})]})}),Object(o.jsx)("p",{class:"lead",children:Object(o.jsxs)("li",{children:[" ",Object(o.jsx)(i.b,{to:"/workers-management",children:"\u05e0\u05d9\u05d4\u05d5\u05dc \u05e2\u05d5\u05d1\u05d3\u05d9\u05dd"})]})}),Object(o.jsx)("p",{class:"lead",children:Object(o.jsxs)("li",{children:[" ",Object(o.jsx)(i.b,{to:"/work-schedule",children:"\u05d9\u05d5\u05de\u05df \u05e2\u05d1\u05d5\u05d3\u05d4"})]})}),Object(o.jsx)("p",{class:"lead",children:Object(o.jsxs)("li",{children:[" ",Object(o.jsx)(i.b,{to:"/financial",children:"\u05e4\u05d9\u05e0\u05e0\u05e1\u05d9"})]})})]})}),Object(o.jsx)("div",{className:"container",class:"col-6",children:Object(o.jsxs)("div",{class:"jumbotron mt-5",children:[Object(o.jsx)("h1",{class:"display-4",children:"\u05e4\u05e8\u05d5\u05d9\u05e7\u05d8\u05d9\u05dd"}),Object(o.jsx)("hr",{class:"my-4"}),Object(o.jsx)("p",{class:"lead",children:Object(o.jsxs)("li",{children:[" ",Object(o.jsx)(i.b,{to:"/projects-management",children:"\u05e0\u05d9\u05d4\u05d5\u05dc \u05e4\u05e8\u05d5\u05d9\u05e7\u05d8\u05d9\u05dd"})]})})]})})]})})})]})},P=n(42),G=Object(h.b)((function(e){return{isAuthenticated:e.auth.isAuthenticated}}),{})((function(e){var t=e.component,n=e.isAuthenticated,a=Object(P.a)(e,["component","isAuthenticated"]);return Object(o.jsx)(l.b,Object(d.a)(Object(d.a)({},a),{},{render:function(e){return n?Object(o.jsx)(t,Object(d.a)({},e)):Object(o.jsx)(l.a,{to:"/login"})}}))})),B=n(37),H=n(38),V=n(43),z=n(41),K=function(e){Object(V.a)(n,e);var t=Object(z.a)(n);function n(e){var a;return Object(B.a)(this,n),(a=t.call(this,e)).refreshList=function(){console.log("refreshList"),f.a.get("/api/users/").then((function(e){a.setState({usersList:e.data})})).catch((function(e){return console.log(e)}))},console.log("MyBusinessDetails"),console.log(e),a.state={id:0,first_name:"",last_name:"",email:"",address:"",password:"",phone_number:0,usersList:[]},a}return Object(H.a)(n,[{key:"componentDidMount",value:function(){console.log("componentDidMount"),this.refreshList()}},{key:"render",value:function(){return console.log(this.state.usersList),Object(o.jsxs)("div",{children:["somthing!!",Object(o.jsx)("p",{children:JSON.stringify(this.state.usersList)})]})}}]),n}(c.a.Component),Q=function(){return Object(o.jsx)("html",{lang:"he",children:"WorkersManagement"})},X=function(){return Object(o.jsx)("html",{lang:"he",children:"WorkSchedule"})},Y=function(){return Object(o.jsx)("html",{lang:"he",children:"ProjectsManagement"})},Z=function(){return Object(o.jsx)("html",{lang:"he",children:"Financial"})},$=n(16),ee=n(39),te=n(40),ne={access:localStorage.getItem("access"),refresh:localStorage.getItem("refresh"),isAuthenticated:null,user:null},ae=Object($.combineReducers)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ne,t=arguments.length>1?arguments[1]:void 0,n=t.type,a=t.payload;switch(n){case A:return Object(d.a)(Object(d.a)({},e),{},{isAuthenticated:!0});case v:return localStorage.setItem("access",a.access),localStorage.setItem("refresh",a.refresh),Object(d.a)(Object(d.a)({},e),{},{isAuthenticated:!0});case y:return Object(d.a)(Object(d.a)({},e),{},{isAuthenticated:!1});case _:return Object(d.a)(Object(d.a)({},e),{},{user:a});case C:return Object(d.a)(Object(d.a)({},e),{},{isAuthenticated:!1});case k:return Object(d.a)(Object(d.a)({},e),{},{user:null});case g:case N:case D:return localStorage.removeItem("access"),localStorage.removeItem("refresh"),Object(d.a)(Object(d.a)({},e),{},{access:null,refresh:null,isAuthenticated:!1,user:null});case T:case I:case L:case E:case S:case w:return Object(d.a)({},e);default:return e}}}),ce=[te.a],re=Object($.createStore)(ae,{},Object(ee.composeWithDevTools)($.applyMiddleware.apply(void 0,ce))),se=Object(h.b)((function(e){return{isAuthenticated:e.auth.isAuthenticated}}),{logout:function(){return function(e){e({type:D})}}})((function(e){var t=e.logout,n=e.isAuthenticated;return Object(o.jsxs)("nav",{className:"navbar navbar-expand-lg navbar-light bg-light",lang:"he",dir:"rtl",children:[Object(o.jsx)(i.b,{className:"navbar-brand",to:"/",children:"\u05d4\u05d7\u05e9\u05de\u05dc\u05d0\u05d9"}),Object(o.jsx)("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarNav","aria-controls":"navbarNav","aria-expanded":"false","aria-label":"Toggle navigation",children:Object(o.jsx)("span",{className:"navbar-toggler-icon"})}),Object(o.jsx)("div",{className:"collapse navbar-collapse",id:"navbarNav",children:Object(o.jsxs)("ul",{className:"navbar-nav",children:[Object(o.jsx)("li",{className:"nav-item active",children:Object(o.jsxs)(i.b,{className:"nav-link",to:"/",children:["\u05e2\u05de\u05d5\u05d3 \u05d4\u05d1\u05d9\u05ea ",Object(o.jsx)("span",{className:"sr-only",children:"(current)"})]})}),n?Object(o.jsxs)(a.Fragment,{children:[Object(o.jsx)("li",{className:"nav-item",children:Object(o.jsx)("a",{className:"nav-link",href:"#!",onClick:t,children:"\u05dc\u05d9\u05e6\u05d9\u05d0\u05d4"})}),Object(o.jsx)("li",{className:"nav-item",children:Object(o.jsx)(i.b,{className:"nav-link",to:"/homepage",children:"\u05d4\u05e2\u05e1\u05e7 \u05e9\u05dc\u05d9"})}),Object(o.jsx)("li",{className:"nav-item",children:Object(o.jsx)(i.b,{className:"nav-link",children:"\u05d1\u05e8\u05d5\u05da \u05d4\u05d1\u05d0 \u05de\u05e9\u05ea\u05de\u05e9 \u05d7\u05d3\u05e9"})})]}):Object(o.jsxs)(a.Fragment,{children:[Object(o.jsx)("li",{className:"nav-item",children:Object(o.jsx)(i.b,{className:"nav-link",to:"/login",children:"\u05dc\u05db\u05e0\u05d9\u05e1\u05d4"})}),Object(o.jsx)("li",{className:"nav-item",children:Object(o.jsx)(i.b,{className:"nav-link",to:"/signup",children:"\u05dc\u05d4\u05e8\u05e9\u05de\u05d4"})})]})]})})]})})),ie=Object(h.b)(null,{checkAuthenticated:function(){return function(){var e=Object(O.a)(m.a.mark((function e(t){var n,a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!localStorage.getItem("access")){e.next=15;break}return n={headers:{"Content-Type":"application/json",Accept:"application/json"}},a=JSON.stringify({token:localStorage.getItem("access")}),e.prev=3,e.next=6,f.a.post("".concat("http://localhost:8000","/auth/jwt/verify/"),a,n);case 6:"token_not_valid"!==e.sent.data.code?t({type:A}):t({type:C}),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(3),t({type:C});case 13:e.next=16;break;case 15:t({type:C});case 16:case"end":return e.stop()}}),e,null,[[3,10]])})));return function(t){return e.apply(this,arguments)}}()},load_user:U})((function(e){var t=e.checkAuthenticated,n=e.load_user,c=e.children;return Object(a.useEffect)((function(){t(),n()}),[]),Object(o.jsxs)("div",{children:[Object(o.jsx)(se,{}),c]})})),le=function(){return Object(o.jsx)(h.a,{store:re,children:Object(o.jsx)(i.a,{children:Object(o.jsx)(ie,{children:Object(o.jsxs)(l.d,{children:[Object(o.jsx)(l.b,{exact:!0,path:"/",component:j}),Object(o.jsx)(l.b,{exact:!0,path:"/login",component:R}),Object(o.jsx)(l.b,{exact:!0,path:"/signup",component:q}),Object(o.jsx)(l.b,{exact:!0,path:"/reset-password",component:J}),Object(o.jsx)(l.b,{exact:!0,path:"/password/reset/confirm/:uid/:token",component:M}),Object(o.jsx)(l.b,{exact:!0,path:"/activate/:uid/:token",component:F}),Object(o.jsx)(G,{exact:!0,path:"/homepage",component:W}),Object(o.jsx)(l.b,{exact:!0,path:"/my-business-details",component:K}),Object(o.jsx)(l.b,{exact:!0,path:"/workers-management",component:Q}),Object(o.jsx)(l.b,{exact:!0,path:"/work-schedule",component:X}),Object(o.jsx)(l.b,{exact:!0,path:"/financial",component:Z}),Object(o.jsx)(l.b,{exact:!0,path:"/projects-management",component:Y})]})})})})};n(73);s.a.render(Object(o.jsx)(c.a.StrictMode,{children:Object(o.jsx)(le,{})}),document.getElementById("root"))}},[[74,1,2]]]);
//# sourceMappingURL=main.c2299cc5.chunk.js.map