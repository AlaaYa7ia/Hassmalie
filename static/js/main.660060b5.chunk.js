(this.webpackJsonpreacthassmalie=this.webpackJsonpreacthassmalie||[]).push([[0],{70:function(e,t,a){"use strict";a.r(t);var n=a(1),c=a.n(n),r=a(19),s=a.n(r),l=a(3),i=a(5),o=a(0),j=function(){return Object(o.jsxs)("html",{lang:"he",dir:"rtl",children:[Object(o.jsx)("head",{children:Object(o.jsx)("meta",{charset:"utf-8"})}),Object(o.jsx)("body",{dir:"rtl",children:Object(o.jsx)("div",{className:"container",lang:"he",dir:"rtl",style:{display:"flex",justifyContent:"center",alignItems:"right",height:"70vh"},children:Object(o.jsxs)("div",{class:"jumbotron mt-5",children:[Object(o.jsx)("h1",{class:"display-4",dir:"rtl",children:"\u05d4\u05d7\u05e9\u05de\u05dc\u05d0\u05d9"}),Object(o.jsx)("p",{class:"lead",children:"\u05de\u05e2\u05e8\u05db\u05ea \u05dc\u05d4\u05e0\u05d4\u05dc\u05ea \u05e2\u05e1\u05e7 \u05e2\u05d1\u05d5\u05d3\u05d5\u05ea \u05d7\u05e9\u05de\u05dc"}),Object(o.jsx)("hr",{class:"my-4"}),Object(o.jsx)("p",{children:"\u05dc\u05d7\u05e5 \u05e2\u05dc \u05d4\u05db\u05e4\u05ea\u05d5\u05e8 \u05dc\u05d4\u05ea\u05d7\u05d1\u05e8\u05d5\u05ea"}),Object(o.jsx)(l.b,{class:"btn btn-primary btn-lg",to:"/login",role:"button",children:"\u05dc\u05db\u05e0\u05d9\u05e1\u05d4"})]})})})]})},u=a(14),d=a(2),b=a(7),h=a(6),p=a(8),m=a.n(p),O=a(16),x=a(15),f=a.n(x),v="LOGIN_SUCCESS",g="LOGIN_FAIL",y="SIGNUP_SUCCESS",N="SIGNUP_FAIL",_="ACTIVATION_SUCCESS",S="ACTIVATION_FAIL",w="USER_LOADED_SUCCESS",A="USER_LOADED_FAIL",k="AUTHENTICATED_SUCCESS",C="AUTHENTICATED_FAIL",I="PASSWORD_RESET_FAIL",T="PASSWORD_RESET_SUCCESS",E="PASSWORD_RESET_CONFIRM_FAIL",L="PASSWORD_RESET_CONFIRM_SUCCESS",D="LOGOUT",U=function(){return function(){var e=Object(O.a)(m.a.mark((function e(t){var a,n;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!localStorage.getItem("access")){e.next=15;break}return a={headers:{"Content-Type":"application/json",Authorization:"JWT ".concat(localStorage.getItem("access")),Accept:"application/json"}},e.prev=2,e.next=5,f.a.get("".concat("http://localhost:8000","/auth/users/me/"),a);case 5:n=e.sent,t({type:w,payload:n.data}),n.data.first_name+" "+n.data.last_name,e.next=13;break;case 10:e.prev=10,e.t0=e.catch(2),t({type:A});case 13:e.next=16;break;case 15:t({type:A});case 16:case"end":return e.stop()}}),e,null,[[2,10]])})));return function(t){return e.apply(this,arguments)}}()},q=function(){return function(){var e=Object(O.a)(m.a.mark((function e(t){var a,n,c;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!localStorage.getItem("access")){e.next=16;break}return a={headers:{"Content-Type":"application/json",Authorization:"JWT ".concat(localStorage.getItem("access")),Accept:"application/json"}},e.prev=2,e.next=5,f.a.get("".concat("http://localhost:8000","/auth/users/me/"),a);case 5:return n=e.sent,c=n.data,e.abrupt("return",c);case 10:return e.prev=10,e.t0=e.catch(2),console.log(e.t0),e.abrupt("return","");case 14:e.next=17;break;case 16:return e.abrupt("return","");case 17:case"end":return e.stop()}}),e,null,[[2,10]])})));return function(t){return e.apply(this,arguments)}}()},R=Object(h.b)((function(e){return{isAuthenticated:e.auth.isAuthenticated}}),{login:function(e,t){return function(){var a=Object(O.a)(m.a.mark((function a(n){var c,r,s;return m.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return c={headers:{"Content-Type":"application/json"}},r=JSON.stringify({email:e,password:t}),a.prev=2,a.next=5,f.a.post("".concat("http://localhost:8000","/auth/jwt/create/"),r,c);case 5:s=a.sent,n({type:v,payload:s.data}),n(U()),a.next=13;break;case 10:a.prev=10,a.t0=a.catch(2),n({type:g});case 13:case"end":return a.stop()}}),a,null,[[2,10]])})));return function(e){return a.apply(this,arguments)}}()}})((function(e){var t=e.login,a=e.isAuthenticated,c=Object(n.useState)({email:"",password:""}),r=Object(b.a)(c,2),s=r[0],j=r[1],h=s.email,p=s.password,m=function(e){return j(Object(d.a)(Object(d.a)({},s),{},Object(u.a)({},e.target.name,e.target.value)))};return a?Object(o.jsx)(i.a,{to:"/homepage"}):Object(o.jsx)("html",{lang:"he",dir:"rtl",children:Object(o.jsx)("div",{class:"col-4 container-fluid jumbotron mt-5",lang:"he",style:{display:"flex",justifyContent:"center",alignItems:"center",height:"70vh"},children:Object(o.jsxs)("div",{className:"container mt-5",dir:"rtl",children:[Object(o.jsx)("h1",{dir:"rtl",children:"\u05db\u05e0\u05d9\u05e1\u05d4"}),Object(o.jsx)("p",{dir:"rtl",children:"\u05db\u05e0\u05d9\u05e1\u05d4 \u05dc\u05d7\u05e9\u05d1\u05d5\u05df \u05e9\u05dc\u05da"}),Object(o.jsxs)("form",{onSubmit:function(e){return function(e){e.preventDefault(),t(h,p)}(e)},children:[Object(o.jsx)("div",{className:"form-group",dir:"rtl",children:Object(o.jsx)("input",{className:"form-control",type:"email",placeholder:"\u05d0\u05d9\u05d9\u05de\u05d9\u05dc",name:"email",value:h,onChange:function(e){return m(e)},required:!0})}),Object(o.jsx)("div",{className:"form-group",children:Object(o.jsx)("input",{className:"form-control",type:"password",placeholder:"\u05e1\u05d9\u05e1\u05de\u05d4",name:"password",value:p,onChange:function(e){return m(e)},minLength:"6",required:!0})}),Object(o.jsx)("button",{className:"btn btn-primary",dir:"rtl",type:"submit",children:"\u05db\u05e0\u05d9\u05e1\u05d4"})]}),Object(o.jsxs)("p",{className:"mt-3",dir:"rtl",children:["\u05e2\u05d3\u05d9\u05df \u05dc\u05d0 \u05e2\u05e9\u05d9\u05ea \u05d7\u05e9\u05d1\u05d5\u05df? ",Object(o.jsx)(l.b,{to:"/signup",children:"\u05ea\u05d9\u05e8\u05e9\u05dd"})]}),Object(o.jsxs)("p",{className:"mt-3",children:["\u05e9\u05db\u05d7\u05ea \u05d0\u05ea \u05d4\u05e1\u05d9\u05e1\u05de\u05d4? ",Object(o.jsx)(l.b,{to:"/reset-password",children:"\u05dc\u05d0\u05e4\u05e1 \u05d0\u05ea \u05d4\u05e1\u05d9\u05e1\u05de\u05d4"})]})]})})})})),F=Object(h.b)((function(e){return{isAuthenticated:e.auth.isAuthenticated}}),{signup:function(e,t,a,n,c,r,s,l){return function(){var i=Object(O.a)(m.a.mark((function i(o){var j,u,d;return m.a.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return j={headers:{"Content-Type":"application/json"}},u=JSON.stringify({first_name:e,last_name:t,email:a,title:n,phone_number:c,address:r,password:s,re_password:l}),i.prev=2,i.next=5,f.a.post("".concat("http://localhost:8000","/auth/users/"),u,j);case 5:d=i.sent,o({type:y,payload:d.data}),i.next=12;break;case 9:i.prev=9,i.t0=i.catch(2),o({type:N});case 12:case"end":return i.stop()}}),i,null,[[2,9]])})));return function(e){return i.apply(this,arguments)}}()}})((function(e){var t=e.signup,a=e.isAuthenticated,c=Object(n.useState)(!1),r=Object(b.a)(c,2),s=r[0],j=r[1],h=Object(n.useState)({first_name:"",last_name:"",email:"",title:"",phone_number:"",address:"",password:"",re_password:""}),p=Object(b.a)(h,2),m=p[0],O=p[1],x=m.first_name,f=m.last_name,v=m.email,g=m.title,y=m.phone_number,N=m.address,_=m.password,S=m.re_password,w=function(e){return O(Object(d.a)(Object(d.a)({},m),{},Object(u.a)({},e.target.name,e.target.value)))};return a?Object(o.jsx)(i.a,{to:"/"}):s?Object(o.jsx)(i.a,{to:"/login"}):Object(o.jsxs)("div",{dir:"rtl",class:"col-6 container-fluid jumbotron mt-5",lang:"he",style:{justifyContent:"right"},children:[Object(o.jsx)("h1",{dir:"rtl",children:"\u05d4\u05e8\u05e9\u05de\u05d4"}),Object(o.jsx)("p",{children:"\u05ea\u05d9\u05e6\u05d5\u05e8 \u05d0\u05ea \u05d4\u05de\u05e9\u05ea\u05de\u05e9 \u05e9\u05dc\u05da"}),Object(o.jsxs)("form",{dir:"rtl",onSubmit:function(e){return function(e){e.preventDefault(),_===S&&(t(x,f,v,g,y,N,_,S),j(!0),console.log("form Data",m),localStorage.setItem("user",JSON.stringify(m)),console.log(localStorage.getItem("user")))}(e)},children:[Object(o.jsx)("div",{className:"form-group",children:Object(o.jsx)("input",{className:"form-control",type:"text",placeholder:"\u05e9\u05dd \u05e4\u05e8\u05d8\u05d9*",name:"first_name",value:x,onChange:function(e){return w(e)},required:!0})}),Object(o.jsx)("div",{className:"form-group",children:Object(o.jsx)("input",{className:"form-control",type:"text",placeholder:"\u05e9\u05dd \u05de\u05e9\u05e4\u05d7\u05d4*",name:"last_name",value:f,onChange:function(e){return w(e)},required:!0})}),Object(o.jsx)("div",{className:"form-group",children:Object(o.jsx)("input",{className:"form-control",type:"email",placeholder:"\u05d0\u05d9\u05d9\u05de\u05d9\u05dc*",name:"email",value:v,onChange:function(e){return w(e)},required:!0})}),Object(o.jsx)("div",{className:"form-group",children:Object(o.jsx)("input",{className:"form-control",type:"select",placeholder:"\u05e1\u05d5\u05d2 \u05e2\u05d5\u05d1\u05d3*",name:"title",value:g,onChange:function(e){return w(e)},required:!0})}),Object(o.jsx)("div",{className:"form-group",children:Object(o.jsx)("input",{className:"form-control",type:"number",placeholder:"\u05de\u05e1\u05e4\u05e8 \u05d8\u05d9\u05dc\u05e4\u05d5\u05df*",name:"phone_number",value:y,onChange:function(e){return w(e)},minLength:"8",required:!0})}),Object(o.jsx)("div",{className:"form-group",children:Object(o.jsx)("input",{className:"form-control",type:"text",placeholder:"\u05db\u05ea\u05d5\u05d1\u05ea*",name:"address",value:N,onChange:function(e){return w(e)},required:!0})}),Object(o.jsx)("div",{className:"form-group",children:Object(o.jsx)("input",{className:"form-control",type:"password",placeholder:"\u05e1\u05d9\u05e1\u05de\u05d4*",name:"password",value:_,onChange:function(e){return w(e)},minLength:"6",required:!0})}),Object(o.jsx)("div",{className:"form-group",children:Object(o.jsx)("input",{className:"form-control",type:"password",placeholder:"\u05d0\u05e9\u05e8 \u05e1\u05d9\u05e1\u05de\u05d4*",name:"re_password",value:S,onChange:function(e){return w(e)},minLength:"6",required:!0})}),Object(o.jsx)("button",{className:"btn btn-primary",type:"submit",children:"\u05d4\u05d9\u05e8\u05e9\u05dd"})]}),Object(o.jsxs)("p",{className:"mt-3",children:["\u05db\u05d1\u05e8 \u05d9\u05e9 \u05dc\u05da \u05d7\u05e9\u05d1\u05d5\u05df? ",Object(o.jsx)(l.b,{to:"/login",children:"\u05ea\u05ea\u05d7\u05d1\u05e8"})]})]})})),J=Object(h.b)(null,{verify:function(e,t){return function(){var a=Object(O.a)(m.a.mark((function a(n){var c,r;return m.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return c={headers:{"Content-Type":"application/json"}},r=JSON.stringify({uid:e,token:t}),a.prev=2,a.next=5,f.a.post("".concat("http://localhost:8000","/auth/users/activation/"),r,c);case 5:n({type:_}),a.next=11;break;case 8:a.prev=8,a.t0=a.catch(2),n({type:S});case 11:case"end":return a.stop()}}),a,null,[[2,8]])})));return function(e){return a.apply(this,arguments)}}()}})((function(e){var t=e.verify,a=e.match,c=Object(n.useState)(!1),r=Object(b.a)(c,2),s=r[0],l=r[1];return s?Object(o.jsx)(i.a,{to:"/"}):Object(o.jsx)("div",{className:"container",children:Object(o.jsxs)("div",{className:"d-flex flex-column justify-content-right align-items-center",style:{marginTop:"200px"},children:[Object(o.jsx)("h1",{dir:"rtl",children:"\u05d0\u05de\u05ea \u05d0\u05ea \u05d7\u05e9\u05d1\u05d5\u05e0\u05da: "}),Object(o.jsx)("button",{onClick:function(e){var n=a.params.uid,c=a.params.token;t(n,c),l(!0)},style:{marginTop:"50px"},type:"button",className:"btn btn-primary",children:Object(o.jsx)("div",{dir:"rtl",children:"\u05dc\u05d0\u05de\u05ea"})})]})})})),W=Object(h.b)(null,{reset_password:function(e){return function(){var t=Object(O.a)(m.a.mark((function t(a){var n,c;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={headers:{"Content-Type":"application/json"}},c=JSON.stringify({email:e}),t.prev=2,t.next=5,f.a.post("".concat("http://localhost:8000","/auth/users/reset_password/"),c,n);case 5:a({type:T}),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(2),a({type:I});case 11:case"end":return t.stop()}}),t,null,[[2,8]])})));return function(e){return t.apply(this,arguments)}}()}})((function(e){var t=e.reset_password,a=Object(n.useState)(!1),c=Object(b.a)(a,2),r=c[0],s=c[1],l=Object(n.useState)({email:""}),j=Object(b.a)(l,2),h=j[0],p=j[1],m=h.email;return r?Object(o.jsx)(i.a,{to:"/"}):Object(o.jsxs)("div",{className:"container mt-5",children:[Object(o.jsx)("h1",{children:"\u05d1\u05e7\u05e9 \u05d0\u05d9\u05e4\u05d5\u05e1 \u05e1\u05d9\u05e1\u05de\u05d4:"}),Object(o.jsxs)("form",{onSubmit:function(e){return function(e){e.preventDefault(),t(m),s(!0)}(e)},children:[Object(o.jsx)("div",{className:"form-group",children:Object(o.jsx)("input",{className:"form-control",type:"email",placeholder:"\u05d0\u05d9\u05de\u05d9\u05d9\u05dc",name:"email",value:m,onChange:function(e){return function(e){return p(Object(d.a)(Object(d.a)({},h),{},Object(u.a)({},e.target.name,e.target.value)))}(e)},required:!0})}),Object(o.jsx)("button",{className:"btn btn-primary",type:"submit",children:"\u05dc\u05d0\u05e4\u05e1 \u05d0\u05ea \u05d4\u05e1\u05d9\u05e1\u05de\u05d4"})]})]})})),P=Object(h.b)(null,{reset_password_confirm:function(e,t,a,n){return function(){var c=Object(O.a)(m.a.mark((function c(r){var s,l;return m.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return s={headers:{"Content-Type":"application/json"}},l=JSON.stringify({uid:e,token:t,new_password:a,re_new_password:n}),c.prev=2,c.next=5,f.a.post("".concat("http://localhost:8000","/auth/users/reset_password_confirm/"),l,s);case 5:r({type:L}),c.next=11;break;case 8:c.prev=8,c.t0=c.catch(2),r({type:E});case 11:case"end":return c.stop()}}),c,null,[[2,8]])})));return function(e){return c.apply(this,arguments)}}()}})((function(e){var t=e.match,a=e.reset_password_confirm,c=Object(n.useState)(!1),r=Object(b.a)(c,2),s=r[0],l=r[1],j=Object(n.useState)({new_password:"",re_new_password:""}),h=Object(b.a)(j,2),p=h[0],m=h[1],O=p.new_password,x=p.re_new_password,f=function(e){return m(Object(d.a)(Object(d.a)({},p),{},Object(u.a)({},e.target.name,e.target.value)))};return s?Object(o.jsx)(i.a,{to:"/"}):Object(o.jsx)("div",{className:"container mt-5",children:Object(o.jsxs)("form",{onSubmit:function(e){return function(e){e.preventDefault();var n=t.params.uid,c=t.params.token;a(n,c,O,x),l(!0)}(e)},children:[Object(o.jsx)("div",{className:"form-group",children:Object(o.jsx)("input",{className:"form-control",type:"password",placeholder:"\u05e1\u05d9\u05e1\u05de\u05d4 \u05d7\u05d3\u05e9\u05d4",name:"new_password",value:O,onChange:function(e){return f(e)},minLength:"6",required:!0})}),Object(o.jsx)("div",{className:"form-group",children:Object(o.jsx)("input",{className:"form-control",type:"password",placeholder:"\u05d7\u05d6\u05d5\u05e8 \u05e2\u05dc \u05e1\u05d9\u05e1\u05de\u05d4 \u05d7\u05d3\u05e9\u05d4",name:"re_new_password",value:x,onChange:function(e){return f(e)},minLength:"6",required:!0})}),Object(o.jsx)("button",{className:"btn btn-primary",type:"submit",children:"\u05dc\u05d0\u05e4\u05e1 \u05d0\u05ea \u05d4\u05e1\u05d9\u05e1\u05de\u05d4"})]})})})),M=function(){return Object(o.jsxs)("html",{lang:"he",dir:"rtl",children:[Object(o.jsx)("head",{children:Object(o.jsx)("meta",{charset:"utf-8"})}),Object(o.jsx)("body",{lang:"he",dir:"rtl",children:Object(o.jsx)("div",{class:"container-fluid",lang:"he",dir:"rtl",children:Object(o.jsxs)("div",{class:"row ",lang:"he",dir:"rtl",children:[Object(o.jsx)("div",{className:"container",lang:"he",dir:"rtl",class:"col-6",children:Object(o.jsxs)("div",{class:"jumbotron mt-5",children:[Object(o.jsx)("h1",{class:"display-4",children:"\u05d4\u05e2\u05e1\u05e7 \u05e9\u05dc\u05d9"}),Object(o.jsx)("hr",{class:"my-4"}),Object(o.jsx)("p",{class:"lead",children:Object(o.jsxs)("li",{children:[" ",Object(o.jsx)(l.b,{to:"/my-business-details",children:"\u05e4\u05e8\u05d8\u05d9 \u05d4\u05e2\u05e1\u05e7 \u05e9\u05dc\u05d9"})]})}),Object(o.jsx)("p",{class:"lead",children:Object(o.jsxs)("li",{children:[" ",Object(o.jsx)(l.b,{to:"/workers-management",children:"\u05e0\u05d9\u05d4\u05d5\u05dc \u05e2\u05d5\u05d1\u05d3\u05d9\u05dd"})]})}),Object(o.jsx)("p",{class:"lead",children:Object(o.jsxs)("li",{children:[" ",Object(o.jsx)(l.b,{to:"/work-schedule",children:"\u05d9\u05d5\u05de\u05df \u05e2\u05d1\u05d5\u05d3\u05d4"})]})}),Object(o.jsx)("p",{class:"lead",children:Object(o.jsxs)("li",{children:[" ",Object(o.jsx)(l.b,{to:"/financial",children:"\u05e4\u05d9\u05e0\u05e0\u05e1\u05d9"})]})})]})}),Object(o.jsx)("div",{className:"container",class:"col-6",children:Object(o.jsxs)("div",{class:"jumbotron mt-5",children:[Object(o.jsx)("h1",{class:"display-4",children:"\u05e4\u05e8\u05d5\u05d9\u05e7\u05d8\u05d9\u05dd"}),Object(o.jsx)("hr",{class:"my-4"}),Object(o.jsx)("p",{class:"lead",children:Object(o.jsxs)("li",{children:[" ",Object(o.jsx)(l.b,{to:"/projects-management",children:"\u05e0\u05d9\u05d4\u05d5\u05dc \u05e4\u05e8\u05d5\u05d9\u05e7\u05d8\u05d9\u05dd"})]})})]})})]})})})]})},G=a(39),z=Object(h.b)((function(e){return{isAuthenticated:e.auth.isAuthenticated}}),{})((function(e){var t=e.component,a=e.isAuthenticated,n=Object(G.a)(e,["component","isAuthenticated"]);return Object(o.jsx)(i.b,Object(d.a)(Object(d.a)({},n),{},{render:function(e){return a?Object(o.jsx)(t,Object(d.a)({},e)):Object(o.jsx)(i.a,{to:"/login"})}}))})),H=Object(h.b)((function(e){return{isAuthenticated:e.auth.isAuthenticated}}),{get_user_data:q})((function(e){var t=e.get_user_data,a=(e.isAuthenticated,Object(n.useState)("")),c=Object(b.a)(a,2),r=c[0],s=c[1];return Object(n.useEffect)((function(){t().then((function(e){s(e)}))}),[]),Object(o.jsxs)("div",{children:[Object(o.jsxs)("p",{children:["user: ",JSON.stringify(r)]}),Object(o.jsxs)("html",{lang:"he",children:[Object(o.jsx)("head",{children:Object(o.jsx)("meta",{charset:"utf-8"})}),Object(o.jsx)("body",{dir:"rtl",children:Object(o.jsx)("div",{class:"container-fluid",children:Object(o.jsxs)("div",{class:"row ",children:[Object(o.jsx)("div",{className:"container",class:"col-6",children:Object(o.jsxs)("div",{class:"row ",children:[Object(o.jsxs)("div",{class:"jumbotron mt-5 col-5",children:[Object(o.jsx)("h1",{class:"display-4",children:"\u05de\u05e0\u05d4\u05dc \u05d4\u05e2\u05e1\u05e7"}),Object(o.jsxs)("p",{class:"lead",children:["\u05e9\u05dd \u05e4\u05e8\u05d8\u05d9: ",r.first_name]}),Object(o.jsxs)("p",{class:"lead",children:["\u05e9\u05dd \u05de\u05e9\u05e4\u05d7\u05d4: ",r.last_name]}),Object(o.jsxs)("p",{class:"lead",children:["\u05de\u05e1\u05e4\u05e8 \u05d8\u05d9\u05dc\u05e4\u05d5\u05df: ",r.phone_number]}),Object(o.jsxs)("p",{class:"lead",children:["\u05d0\u05d9\u05d9\u05de\u05d9\u05dc: ",r.email]}),Object(o.jsxs)("p",{class:"lead",children:["\u05db\u05ea\u05d5\u05d1\u05ea \u05de\u05d2\u05d5\u05e8\u05d9\u05dd: ",r.address]}),Object(o.jsxs)("p",{class:"lead",children:["\u05d2\u05d9\u05dc: ",r.age]})]}),Object(o.jsx)("div",{class:"jumbotron mt-5 col-5",children:Object(o.jsx)("img",{src:"../public/logo512.png",alt:"stam pic"})})]})}),Object(o.jsx)("div",{className:"container",class:"col-6",children:Object(o.jsxs)("div",{class:"row ",children:[Object(o.jsxs)("div",{class:"jumbotron mt-5 col-5",children:[Object(o.jsx)("h1",{class:"display-4",children:"\u05e1\u05d2\u05df \u05de\u05e0\u05d4\u05dc"}),Object(o.jsx)("p",{class:"lead",children:"\u05e9\u05dd \u05e4\u05e8\u05d8\u05d9: "}),Object(o.jsx)("p",{class:"lead",children:"\u05e9\u05dd \u05de\u05e9\u05e4\u05d7\u05d4: "}),Object(o.jsx)("p",{class:"lead",children:"\u05de\u05e1\u05e4\u05e8 \u05d8\u05d9\u05dc\u05e4\u05d5\u05df: "}),Object(o.jsx)("p",{class:"lead",children:"\u05d0\u05d9\u05d9\u05de\u05d9\u05dc: "}),Object(o.jsx)("p",{class:"lead",children:"\u05db\u05ea\u05d5\u05d1\u05ea \u05de\u05d2\u05d5\u05e8\u05d9\u05dd: "}),Object(o.jsx)("p",{class:"lead",children:"\u05d2\u05d9\u05dc: "})]}),Object(o.jsx)("div",{class:"jumbotron mt-5 col-5",children:Object(o.jsx)("img",{src:"../public/logo512.png",alt:"stam pic"})})]})})]})})})]})]})})),V=function(){return Object(o.jsx)("html",{lang:"he",children:"WorkersManagement"})},B=function(){return Object(o.jsx)("html",{lang:"he",children:"WorkSchedule"})},K=function(){return Object(o.jsx)("html",{lang:"he",children:"ProjectsManagement"})},Q=function(){return Object(o.jsx)("html",{lang:"he",children:"Financial"})},X=a(17),Y=a(37),Z=a(38),$={access:localStorage.getItem("access"),refresh:localStorage.getItem("refresh"),isAuthenticated:null,user:null},ee=Object(X.combineReducers)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:$,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case k:return Object(d.a)(Object(d.a)({},e),{},{isAuthenticated:!0});case v:return localStorage.setItem("access",n.access),localStorage.setItem("refresh",n.refresh),Object(d.a)(Object(d.a)({},e),{},{isAuthenticated:!0});case y:return Object(d.a)(Object(d.a)({},e),{},{isAuthenticated:!1});case w:return Object(d.a)(Object(d.a)({},e),{},{user:n});case C:return Object(d.a)(Object(d.a)({},e),{},{isAuthenticated:!1});case A:return Object(d.a)(Object(d.a)({},e),{},{user:null});case g:case N:case D:return localStorage.removeItem("access"),localStorage.removeItem("refresh"),Object(d.a)(Object(d.a)({},e),{},{access:null,refresh:null,isAuthenticated:!1,user:null});case T:case I:case L:case E:case _:case S:return Object(d.a)({},e);default:return e}}}),te=[Z.a],ae=Object(X.createStore)(ee,{},Object(Y.composeWithDevTools)(X.applyMiddleware.apply(void 0,te))),ne=Object(h.b)((function(e){return{isAuthenticated:e.auth.isAuthenticated}}),{logout:function(){return function(e){e({type:D})}},get_user_data:q})((function(e){var t=e.get_user_data,a=e.logout,c=e.isAuthenticated,r=Object(n.useState)(""),s=Object(b.a)(r,2),i=s[0],j=s[1];Object(n.useEffect)((function(){t().then((function(e){j(e)}))}),[]);return Object(o.jsxs)("nav",{className:"navbar navbar-expand-lg navbar-light bg-light",lang:"he",dir:"rtl",children:[Object(o.jsx)(l.b,{className:"navbar-brand",to:"/",children:"\u05d4\u05d7\u05e9\u05de\u05dc\u05d0\u05d9"}),Object(o.jsx)("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarNav","aria-controls":"navbarNav","aria-expanded":"false","aria-label":"Toggle navigation",children:Object(o.jsx)("span",{className:"navbar-toggler-icon"})}),Object(o.jsx)("div",{className:"collapse navbar-collapse",id:"navbarNav",children:Object(o.jsxs)("ul",{className:"navbar-nav",children:[Object(o.jsx)("li",{className:"nav-item active",children:Object(o.jsxs)(l.b,{className:"nav-link",to:"/",children:["\u05e2\u05de\u05d5\u05d3 \u05d4\u05d1\u05d9\u05ea ",Object(o.jsx)("span",{className:"sr-only",children:"(current)"})]})}),c?Object(o.jsxs)(n.Fragment,{children:[Object(o.jsx)("li",{className:"nav-item",children:Object(o.jsx)("a",{className:"nav-link",href:"#!",onClick:a,children:"\u05dc\u05d9\u05e6\u05d9\u05d0\u05d4"})}),Object(o.jsx)("li",{className:"nav-item",children:Object(o.jsx)(l.b,{className:"nav-link",to:"/homepage",children:"\u05d4\u05e2\u05e1\u05e7 \u05e9\u05dc\u05d9"})}),Object(o.jsx)("li",{className:"nav-item",children:Object(o.jsxs)(l.b,{className:"nav-link",children:["\u05d1\u05e8\u05d5\u05da \u05d4\u05d1\u05d0 ",i.first_name+" "+i.last_name]})})]}):Object(o.jsxs)(n.Fragment,{children:[Object(o.jsx)("li",{className:"nav-item",children:Object(o.jsx)(l.b,{className:"nav-link",to:"/login",children:"\u05dc\u05db\u05e0\u05d9\u05e1\u05d4"})}),Object(o.jsx)("li",{className:"nav-item",children:Object(o.jsx)(l.b,{className:"nav-link",to:"/signup",children:"\u05dc\u05d4\u05e8\u05e9\u05de\u05d4"})})]})]})})]})})),ce=Object(h.b)(null,{checkAuthenticated:function(){return function(){var e=Object(O.a)(m.a.mark((function e(t){var a,n;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!localStorage.getItem("access")){e.next=15;break}return a={headers:{"Content-Type":"application/json",Accept:"application/json"}},n=JSON.stringify({token:localStorage.getItem("access")}),e.prev=3,e.next=6,f.a.post("".concat("http://localhost:8000","/auth/jwt/verify/"),n,a);case 6:"token_not_valid"!==e.sent.data.code?t({type:k}):t({type:C}),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(3),t({type:C});case 13:e.next=16;break;case 15:t({type:C});case 16:case"end":return e.stop()}}),e,null,[[3,10]])})));return function(t){return e.apply(this,arguments)}}()},load_user:U})((function(e){var t=e.checkAuthenticated,a=e.load_user,c=e.children;return Object(n.useEffect)((function(){t(),a()}),[]),Object(o.jsxs)("div",{children:[Object(o.jsx)(ne,{}),c]})})),re=function(){return Object(o.jsx)(h.a,{store:ae,children:Object(o.jsx)(l.a,{children:Object(o.jsx)(ce,{children:Object(o.jsxs)(i.d,{children:[Object(o.jsx)(i.b,{exact:!0,path:"/",component:j}),Object(o.jsx)(i.b,{exact:!0,path:"/login",component:R}),Object(o.jsx)(i.b,{exact:!0,path:"/signup",component:F}),Object(o.jsx)(i.b,{exact:!0,path:"/reset-password",component:W}),Object(o.jsx)(i.b,{exact:!0,path:"/password/reset/confirm/:uid/:token",component:P}),Object(o.jsx)(i.b,{exact:!0,path:"/activate/:uid/:token",component:J}),Object(o.jsx)(z,{exact:!0,path:"/homepage",component:M}),Object(o.jsx)(i.b,{exact:!0,path:"/my-business-details",component:H}),Object(o.jsx)(i.b,{exact:!0,path:"/workers-management",component:V}),Object(o.jsx)(i.b,{exact:!0,path:"/work-schedule",component:B}),Object(o.jsx)(i.b,{exact:!0,path:"/financial",component:Q}),Object(o.jsx)(i.b,{exact:!0,path:"/projects-management",component:K})]})})})})};a(69);s.a.render(Object(o.jsx)(c.a.StrictMode,{children:Object(o.jsx)(re,{})}),document.getElementById("root"))}},[[70,1,2]]]);
//# sourceMappingURL=main.660060b5.chunk.js.map