(this.webpackJsonpreacthassmalie=this.webpackJsonpreacthassmalie||[]).push([[0],{69:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a(1),s=a.n(c),r=a(19),l=a.n(r),i=a(3),o=a(5),j=function(){return Object(n.jsxs)("html",{lang:"he",dir:"rtl",children:[Object(n.jsx)("head",{children:Object(n.jsx)("meta",{charset:"utf-8"})}),Object(n.jsx)("body",{dir:"rtl",children:Object(n.jsx)("div",{className:"container",lang:"he",dir:"rtl",style:{display:"flex",justifyContent:"center",alignItems:"right",height:"70vh"},children:Object(n.jsxs)("div",{class:"jumbotron mt-5",children:[Object(n.jsx)("h1",{class:"display-4",dir:"rtl",children:"\u05d4\u05d7\u05e9\u05de\u05dc\u05d0\u05d9"}),Object(n.jsx)("p",{class:"lead",children:"\u05de\u05e2\u05e8\u05db\u05ea \u05dc\u05d4\u05e0\u05d4\u05dc\u05ea \u05e2\u05e1\u05e7 \u05e2\u05d1\u05d5\u05d3\u05d5\u05ea \u05d7\u05e9\u05de\u05dc"}),Object(n.jsx)("hr",{class:"my-4"}),Object(n.jsx)("p",{children:"\u05dc\u05d7\u05e5 \u05e2\u05dc \u05d4\u05db\u05e4\u05ea\u05d5\u05e8 \u05dc\u05d4\u05ea\u05d7\u05d1\u05e8\u05d5\u05ea"}),Object(n.jsx)(i.b,{class:"btn btn-primary btn-lg",to:"/login",role:"button",children:"\u05dc\u05db\u05e0\u05d9\u05e1\u05d4"})]})})})]})},u=a(14),d=a(2),b=a(7),h=a(6),p=a(8),m=a.n(p),O=a(16),x=a(15),f=a.n(x),v="LOGIN_SUCCESS",g="LOGIN_FAIL",y="SIGNUP_SUCCESS",N="SIGNUP_FAIL",_="ACTIVATION_SUCCESS",S="ACTIVATION_FAIL",w="USER_LOADED_SUCCESS",A="USER_LOADED_FAIL",k="AUTHENTICATED_SUCCESS",C="AUTHENTICATED_FAIL",I="PASSWORD_RESET_FAIL",T="PASSWORD_RESET_SUCCESS",E="PASSWORD_RESET_CONFIRM_FAIL",L="PASSWORD_RESET_CONFIRM_SUCCESS",D="LOGOUT",U=function(){return function(){var e=Object(O.a)(m.a.mark((function e(t){var a,n;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!localStorage.getItem("access")){e.next=15;break}return a={headers:{"Content-Type":"application/json",Authorization:"JWT ".concat(localStorage.getItem("access")),Accept:"application/json"}},e.prev=2,e.next=5,f.a.get("".concat("http://localhost:8000","/auth/users/me/"),a);case 5:n=e.sent,t({type:w,payload:n.data}),n.data.first_name+" "+n.data.last_name,e.next=13;break;case 10:e.prev=10,e.t0=e.catch(2),t({type:A});case 13:e.next=16;break;case 15:t({type:A});case 16:case"end":return e.stop()}}),e,null,[[2,10]])})));return function(t){return e.apply(this,arguments)}}()},R=function(){return function(){var e=Object(O.a)(m.a.mark((function e(t){var a,n,c;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!localStorage.getItem("access")){e.next=16;break}return a={headers:{"Content-Type":"application/json",Authorization:"JWT ".concat(localStorage.getItem("access")),Accept:"application/json"}},e.prev=2,e.next=5,f.a.get("".concat("http://localhost:8000","/auth/users/me/"),a);case 5:return n=e.sent,c=n.data,e.abrupt("return",c);case 10:return e.prev=10,e.t0=e.catch(2),console.log(e.t0),e.abrupt("return","");case 14:e.next=17;break;case 16:return e.abrupt("return","");case 17:case"end":return e.stop()}}),e,null,[[2,10]])})));return function(t){return e.apply(this,arguments)}}()},q=Object(h.b)((function(e){return{isAuthenticated:e.auth.isAuthenticated}}),{login:function(e,t){return function(){var a=Object(O.a)(m.a.mark((function a(n){var c,s,r;return m.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return c={headers:{"Content-Type":"application/json"}},s=JSON.stringify({email:e,password:t}),a.prev=2,a.next=5,f.a.post("".concat("http://localhost:8000","/auth/jwt/create/"),s,c);case 5:r=a.sent,n({type:v,payload:r.data}),n(U()),a.next=13;break;case 10:a.prev=10,a.t0=a.catch(2),n({type:g});case 13:case"end":return a.stop()}}),a,null,[[2,10]])})));return function(e){return a.apply(this,arguments)}}()}})((function(e){var t=e.login,a=e.isAuthenticated,s=Object(c.useState)({email:"",password:""}),r=Object(b.a)(s,2),l=r[0],j=r[1],h=l.email,p=l.password,m=function(e){return j(Object(d.a)(Object(d.a)({},l),{},Object(u.a)({},e.target.name,e.target.value)))};return a?Object(n.jsx)(o.a,{to:"/homepage"}):Object(n.jsx)("html",{lang:"he",dir:"rtl",children:Object(n.jsx)("div",{class:"col-4 container-fluid jumbotron mt-5",lang:"he",style:{display:"flex",justifyContent:"center",alignItems:"center",height:"70vh"},children:Object(n.jsxs)("div",{className:"container mt-5",dir:"rtl",children:[Object(n.jsx)("h1",{dir:"rtl",children:"\u05db\u05e0\u05d9\u05e1\u05d4"}),Object(n.jsx)("p",{dir:"rtl",children:"\u05db\u05e0\u05d9\u05e1\u05d4 \u05dc\u05d7\u05e9\u05d1\u05d5\u05df \u05e9\u05dc\u05da"}),Object(n.jsxs)("form",{onSubmit:function(e){return function(e){e.preventDefault(),t(h,p)}(e)},children:[Object(n.jsx)("div",{className:"form-group",dir:"rtl",children:Object(n.jsx)("input",{className:"form-control",type:"email",placeholder:"\u05d0\u05d9\u05d9\u05de\u05d9\u05dc",name:"email",value:h,onChange:function(e){return m(e)},required:!0})}),Object(n.jsx)("div",{className:"form-group",children:Object(n.jsx)("input",{className:"form-control",type:"password",placeholder:"\u05e1\u05d9\u05e1\u05de\u05d4",name:"password",value:p,onChange:function(e){return m(e)},minLength:"6",required:!0})}),Object(n.jsx)("button",{className:"btn btn-primary",dir:"rtl",type:"submit",children:"\u05db\u05e0\u05d9\u05e1\u05d4"})]}),Object(n.jsxs)("p",{className:"mt-3",dir:"rtl",children:["\u05e2\u05d3\u05d9\u05df \u05dc\u05d0 \u05e2\u05e9\u05d9\u05ea \u05d7\u05e9\u05d1\u05d5\u05df? ",Object(n.jsx)(i.b,{to:"/signup",children:"\u05ea\u05d9\u05e8\u05e9\u05dd"})]}),Object(n.jsxs)("p",{className:"mt-3",children:["\u05e9\u05db\u05d7\u05ea \u05d0\u05ea \u05d4\u05e1\u05d9\u05e1\u05de\u05d4? ",Object(n.jsx)(i.b,{to:"/reset-password",children:"\u05dc\u05d0\u05e4\u05e1 \u05d0\u05ea \u05d4\u05e1\u05d9\u05e1\u05de\u05d4"})]})]})})})})),F=Object(h.b)((function(e){return{isAuthenticated:e.auth.isAuthenticated}}),{signup:function(e,t,a,n,c,s,r,l){return function(){var i=Object(O.a)(m.a.mark((function i(o){var j,u,d;return m.a.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return j={headers:{"Content-Type":"application/json"}},u=JSON.stringify({first_name:e,last_name:t,email:a,title:n,phone_number:c,address:s,password:r,re_password:l}),i.prev=2,i.next=5,f.a.post("".concat("http://localhost:8000","/auth/users/"),u,j);case 5:d=i.sent,o({type:y,payload:d.data}),i.next=12;break;case 9:i.prev=9,i.t0=i.catch(2),o({type:N});case 12:case"end":return i.stop()}}),i,null,[[2,9]])})));return function(e){return i.apply(this,arguments)}}()}})((function(e){var t=e.signup,a=e.isAuthenticated,s=Object(c.useState)(!1),r=Object(b.a)(s,2),l=r[0],j=r[1],h=Object(c.useState)({first_name:"",last_name:"",email:"",title:"",phone_number:"",address:"",password:"",re_password:""}),p=Object(b.a)(h,2),m=p[0],O=p[1],x=m.first_name,f=m.last_name,v=m.email,g=m.title,y=m.phone_number,N=m.address,_=m.password,S=m.re_password,w=function(e){return O(Object(d.a)(Object(d.a)({},m),{},Object(u.a)({},e.target.name,e.target.value)))};return a?Object(n.jsx)(o.a,{to:"/"}):l?Object(n.jsx)(o.a,{to:"/login"}):Object(n.jsxs)("div",{dir:"rtl",class:"col-6 container-fluid jumbotron mt-5",lang:"he",style:{justifyContent:"right"},children:[Object(n.jsx)("h1",{dir:"rtl",children:"\u05d4\u05e8\u05e9\u05de\u05d4"}),Object(n.jsx)("p",{children:"\u05ea\u05d9\u05e6\u05d5\u05e8 \u05d0\u05ea \u05d4\u05de\u05e9\u05ea\u05de\u05e9 \u05e9\u05dc\u05da"}),Object(n.jsxs)("form",{dir:"rtl",onSubmit:function(e){return function(e){e.preventDefault(),_===S&&(t(x,f,v,g,y,N,_,S),j(!0),console.log("form Data",m),localStorage.setItem("user",JSON.stringify(m)),console.log(localStorage.getItem("user")))}(e)},children:[Object(n.jsx)("div",{className:"form-group",children:Object(n.jsx)("input",{className:"form-control",type:"text",placeholder:"\u05e9\u05dd \u05e4\u05e8\u05d8\u05d9*",name:"first_name",value:x,onChange:function(e){return w(e)},required:!0})}),Object(n.jsx)("div",{className:"form-group",children:Object(n.jsx)("input",{className:"form-control",type:"text",placeholder:"\u05e9\u05dd \u05de\u05e9\u05e4\u05d7\u05d4*",name:"last_name",value:f,onChange:function(e){return w(e)},required:!0})}),Object(n.jsx)("div",{className:"form-group",children:Object(n.jsx)("input",{className:"form-control",type:"email",placeholder:"\u05d0\u05d9\u05d9\u05de\u05d9\u05dc*",name:"email",value:v,onChange:function(e){return w(e)},required:!0})}),Object(n.jsx)("div",{className:"form-group",children:Object(n.jsx)("input",{className:"form-control",type:"number",placeholder:"\u05de\u05e1\u05e4\u05e8 \u05d8\u05d9\u05dc\u05e4\u05d5\u05df*",name:"phone_number",value:y,onChange:function(e){return w(e)},minLength:"8",required:!0})}),Object(n.jsx)("div",{className:"form-group",children:Object(n.jsx)("input",{className:"form-control",type:"text",placeholder:"\u05db\u05ea\u05d5\u05d1\u05ea*",name:"address",value:N,onChange:function(e){return w(e)},required:!0})}),Object(n.jsx)("div",{className:"form-group",children:Object(n.jsx)("input",{className:"form-control",type:"password",placeholder:"\u05e1\u05d9\u05e1\u05de\u05d4*",name:"password",value:_,onChange:function(e){return w(e)},minLength:"6",required:!0})}),Object(n.jsx)("div",{className:"form-group",children:Object(n.jsx)("input",{className:"form-control",type:"password",placeholder:"\u05d0\u05e9\u05e8 \u05e1\u05d9\u05e1\u05de\u05d4*",name:"re_password",value:S,onChange:function(e){return w(e)},minLength:"6",required:!0})}),Object(n.jsx)("button",{className:"btn btn-primary",type:"submit",children:"\u05d4\u05d9\u05e8\u05e9\u05dd"})]}),Object(n.jsxs)("p",{className:"mt-3",children:["\u05db\u05d1\u05e8 \u05d9\u05e9 \u05dc\u05da \u05d7\u05e9\u05d1\u05d5\u05df? ",Object(n.jsx)(i.b,{to:"/login",children:"\u05ea\u05ea\u05d7\u05d1\u05e8"})]})]})})),J=Object(h.b)(null,{verify:function(e,t){return function(){var a=Object(O.a)(m.a.mark((function a(n){var c,s;return m.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return c={headers:{"Content-Type":"application/json"}},s=JSON.stringify({uid:e,token:t}),a.prev=2,a.next=5,f.a.post("".concat("http://localhost:8000","/auth/users/activation/"),s,c);case 5:n({type:_}),a.next=11;break;case 8:a.prev=8,a.t0=a.catch(2),n({type:S});case 11:case"end":return a.stop()}}),a,null,[[2,8]])})));return function(e){return a.apply(this,arguments)}}()}})((function(e){var t=e.verify,a=e.match,s=Object(c.useState)(!1),r=Object(b.a)(s,2),l=r[0],i=r[1];return l?Object(n.jsx)(o.a,{to:"/"}):Object(n.jsx)("div",{className:"container",children:Object(n.jsxs)("div",{className:"d-flex flex-column justify-content-right align-items-center",style:{marginTop:"200px"},children:[Object(n.jsx)("h1",{dir:"rtl",children:"\u05d0\u05de\u05ea \u05d0\u05ea \u05d7\u05e9\u05d1\u05d5\u05e0\u05da: "}),Object(n.jsx)("button",{onClick:function(e){var n=a.params.uid,c=a.params.token;t(n,c),i(!0)},style:{marginTop:"50px"},type:"button",className:"btn btn-primary",children:Object(n.jsx)("div",{dir:"rtl",children:"\u05dc\u05d0\u05de\u05ea"})})]})})})),W=Object(h.b)(null,{reset_password:function(e){return function(){var t=Object(O.a)(m.a.mark((function t(a){var n,c;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={headers:{"Content-Type":"application/json"}},c=JSON.stringify({email:e}),t.prev=2,t.next=5,f.a.post("".concat("http://localhost:8000","/auth/users/reset_password/"),c,n);case 5:a({type:T}),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(2),a({type:I});case 11:case"end":return t.stop()}}),t,null,[[2,8]])})));return function(e){return t.apply(this,arguments)}}()}})((function(e){var t=e.reset_password,a=Object(c.useState)(!1),s=Object(b.a)(a,2),r=s[0],l=s[1],i=Object(c.useState)({email:""}),j=Object(b.a)(i,2),h=j[0],p=j[1],m=h.email;return r?Object(n.jsx)(o.a,{to:"/"}):Object(n.jsxs)("div",{className:"container mt-5",children:[Object(n.jsx)("h1",{children:"\u05d1\u05e7\u05e9 \u05d0\u05d9\u05e4\u05d5\u05e1 \u05e1\u05d9\u05e1\u05de\u05d4:"}),Object(n.jsxs)("form",{onSubmit:function(e){return function(e){e.preventDefault(),t(m),l(!0)}(e)},children:[Object(n.jsx)("div",{className:"form-group",children:Object(n.jsx)("input",{className:"form-control",type:"email",placeholder:"\u05d0\u05d9\u05de\u05d9\u05d9\u05dc",name:"email",value:m,onChange:function(e){return function(e){return p(Object(d.a)(Object(d.a)({},h),{},Object(u.a)({},e.target.name,e.target.value)))}(e)},required:!0})}),Object(n.jsx)("button",{className:"btn btn-primary",type:"submit",children:"\u05dc\u05d0\u05e4\u05e1 \u05d0\u05ea \u05d4\u05e1\u05d9\u05e1\u05de\u05d4"})]})]})})),P=Object(h.b)(null,{reset_password_confirm:function(e,t,a,n){return function(){var c=Object(O.a)(m.a.mark((function c(s){var r,l;return m.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return r={headers:{"Content-Type":"application/json"}},l=JSON.stringify({uid:e,token:t,new_password:a,re_new_password:n}),c.prev=2,c.next=5,f.a.post("".concat("http://localhost:8000","/auth/users/reset_password_confirm/"),l,r);case 5:s({type:L}),c.next=11;break;case 8:c.prev=8,c.t0=c.catch(2),s({type:E});case 11:case"end":return c.stop()}}),c,null,[[2,8]])})));return function(e){return c.apply(this,arguments)}}()}})((function(e){var t=e.match,a=e.reset_password_confirm,s=Object(c.useState)(!1),r=Object(b.a)(s,2),l=r[0],i=r[1],j=Object(c.useState)({new_password:"",re_new_password:""}),h=Object(b.a)(j,2),p=h[0],m=h[1],O=p.new_password,x=p.re_new_password,f=function(e){return m(Object(d.a)(Object(d.a)({},p),{},Object(u.a)({},e.target.name,e.target.value)))};return l?Object(n.jsx)(o.a,{to:"/"}):Object(n.jsx)("div",{className:"container mt-5",children:Object(n.jsxs)("form",{onSubmit:function(e){return function(e){e.preventDefault();var n=t.params.uid,c=t.params.token;a(n,c,O,x),i(!0)}(e)},children:[Object(n.jsx)("div",{className:"form-group",children:Object(n.jsx)("input",{className:"form-control",type:"password",placeholder:"\u05e1\u05d9\u05e1\u05de\u05d4 \u05d7\u05d3\u05e9\u05d4",name:"new_password",value:O,onChange:function(e){return f(e)},minLength:"6",required:!0})}),Object(n.jsx)("div",{className:"form-group",children:Object(n.jsx)("input",{className:"form-control",type:"password",placeholder:"\u05d7\u05d6\u05d5\u05e8 \u05e2\u05dc \u05e1\u05d9\u05e1\u05de\u05d4 \u05d7\u05d3\u05e9\u05d4",name:"re_new_password",value:x,onChange:function(e){return f(e)},minLength:"6",required:!0})}),Object(n.jsx)("button",{className:"btn btn-primary",type:"submit",children:"\u05dc\u05d0\u05e4\u05e1 \u05d0\u05ea \u05d4\u05e1\u05d9\u05e1\u05de\u05d4"})]})})})),M=function(){return Object(n.jsxs)("html",{lang:"he",dir:"rtl",children:[Object(n.jsx)("head",{children:Object(n.jsx)("meta",{charset:"utf-8"})}),Object(n.jsx)("body",{lang:"he",dir:"rtl",children:Object(n.jsx)("div",{class:"container-fluid",lang:"he",dir:"rtl",children:Object(n.jsxs)("div",{class:"row ",lang:"he",dir:"rtl",children:[Object(n.jsx)("div",{className:"container",lang:"he",dir:"rtl",class:"col-6",children:Object(n.jsxs)("div",{class:"jumbotron mt-5",children:[Object(n.jsx)("h1",{class:"display-4",children:"\u05d4\u05e2\u05e1\u05e7 \u05e9\u05dc\u05d9"}),Object(n.jsx)("hr",{class:"my-4"}),Object(n.jsx)("p",{class:"lead",children:Object(n.jsxs)("li",{children:[" ",Object(n.jsx)(i.b,{to:"/my-business-details",children:"\u05e4\u05e8\u05d8\u05d9 \u05d4\u05e2\u05e1\u05e7 \u05e9\u05dc\u05d9"})]})}),Object(n.jsx)("p",{class:"lead",children:Object(n.jsxs)("li",{children:[" ",Object(n.jsx)(i.b,{to:"/workers-management",children:"\u05e0\u05d9\u05d4\u05d5\u05dc \u05e2\u05d5\u05d1\u05d3\u05d9\u05dd"})]})}),Object(n.jsx)("p",{class:"lead",children:Object(n.jsxs)("li",{children:[" ",Object(n.jsx)(i.b,{to:"/work-schedule",children:"\u05d9\u05d5\u05de\u05df \u05e2\u05d1\u05d5\u05d3\u05d4"})]})}),Object(n.jsx)("p",{class:"lead",children:Object(n.jsxs)("li",{children:[" ",Object(n.jsx)(i.b,{to:"/financial",children:"\u05e4\u05d9\u05e0\u05e0\u05e1\u05d9"})]})})]})}),Object(n.jsx)("div",{className:"container",class:"col-6",children:Object(n.jsxs)("div",{class:"jumbotron mt-5",children:[Object(n.jsx)("h1",{class:"display-4",children:"\u05e4\u05e8\u05d5\u05d9\u05e7\u05d8\u05d9\u05dd"}),Object(n.jsx)("hr",{class:"my-4"}),Object(n.jsx)("p",{class:"lead",children:Object(n.jsxs)("li",{children:[" ",Object(n.jsx)(i.b,{to:"/projects-management",children:"\u05e0\u05d9\u05d4\u05d5\u05dc \u05e4\u05e8\u05d5\u05d9\u05e7\u05d8\u05d9\u05dd"})]})})]})})]})})})]})},G=a(39),z=Object(h.b)((function(e){return{isAuthenticated:e.auth.isAuthenticated}}),{})((function(e){var t=e.component,a=e.isAuthenticated,c=Object(G.a)(e,["component","isAuthenticated"]);return Object(n.jsx)(o.b,Object(d.a)(Object(d.a)({},c),{},{render:function(e){return a?Object(n.jsx)(t,Object(d.a)({},e)):Object(n.jsx)(o.a,{to:"/login"})}}))})),H=Object(h.b)((function(e){return{isAuthenticated:e.auth.isAuthenticated}}),{get_user_data:R})((function(e){var t=e.get_user_data,a=(e.isAuthenticated,Object(c.useState)("")),s=Object(b.a)(a,2),r=s[0],l=s[1];return Object(c.useEffect)((function(){t().then((function(e){l(e)}))}),[]),Object(n.jsxs)("div",{children:[Object(n.jsxs)("p",{children:["user: ",JSON.stringify(r)]}),Object(n.jsxs)("html",{lang:"he",children:[Object(n.jsx)("head",{children:Object(n.jsx)("meta",{charset:"utf-8"})}),Object(n.jsx)("body",{dir:"rtl",children:Object(n.jsx)("div",{class:"container-fluid",children:Object(n.jsxs)("div",{class:"row ",children:[Object(n.jsx)("div",{className:"container",class:"col-6",children:Object(n.jsxs)("div",{class:"row ",children:[Object(n.jsxs)("div",{class:"jumbotron mt-5 col-5",children:[Object(n.jsx)("h1",{class:"display-4",children:"\u05de\u05e0\u05d4\u05dc \u05d4\u05e2\u05e1\u05e7"}),Object(n.jsxs)("p",{class:"lead",children:["\u05e9\u05dd \u05e4\u05e8\u05d8\u05d9: ",r.first_name]}),Object(n.jsxs)("p",{class:"lead",children:["\u05e9\u05dd \u05de\u05e9\u05e4\u05d7\u05d4: ",r.last_name]}),Object(n.jsxs)("p",{class:"lead",children:["\u05de\u05e1\u05e4\u05e8 \u05d8\u05d9\u05dc\u05e4\u05d5\u05df: ",r.phone_number]}),Object(n.jsxs)("p",{class:"lead",children:["\u05d0\u05d9\u05d9\u05de\u05d9\u05dc: ",r.email]}),Object(n.jsxs)("p",{class:"lead",children:["\u05db\u05ea\u05d5\u05d1\u05ea \u05de\u05d2\u05d5\u05e8\u05d9\u05dd: ",r.address]}),Object(n.jsxs)("p",{class:"lead",children:["\u05d2\u05d9\u05dc: ",r.age]})]}),Object(n.jsx)("div",{class:"jumbotron mt-5 col-5",children:Object(n.jsx)("img",{src:"../public/logo512.png",alt:"stam pic"})})]})}),Object(n.jsx)("div",{className:"container",class:"col-6",children:Object(n.jsxs)("div",{class:"row ",children:[Object(n.jsxs)("div",{class:"jumbotron mt-5 col-5",children:[Object(n.jsx)("h1",{class:"display-4",children:"\u05e1\u05d2\u05df \u05de\u05e0\u05d4\u05dc"}),Object(n.jsx)("p",{class:"lead",children:"\u05e9\u05dd \u05e4\u05e8\u05d8\u05d9: "}),Object(n.jsx)("p",{class:"lead",children:"\u05e9\u05dd \u05de\u05e9\u05e4\u05d7\u05d4: "}),Object(n.jsx)("p",{class:"lead",children:"\u05de\u05e1\u05e4\u05e8 \u05d8\u05d9\u05dc\u05e4\u05d5\u05df: "}),Object(n.jsx)("p",{class:"lead",children:"\u05d0\u05d9\u05d9\u05de\u05d9\u05dc: "}),Object(n.jsx)("p",{class:"lead",children:"\u05db\u05ea\u05d5\u05d1\u05ea \u05de\u05d2\u05d5\u05e8\u05d9\u05dd: "}),Object(n.jsx)("p",{class:"lead",children:"\u05d2\u05d9\u05dc: "})]}),Object(n.jsx)("div",{class:"jumbotron mt-5 col-5",children:Object(n.jsx)("img",{src:"../public/logo512.png",alt:"stam pic"})})]})})]})})})]})]})})),V=function(){return Object(n.jsx)("html",{lang:"he",children:"WorkersManagement"})},B=function(){return Object(n.jsx)("html",{lang:"he",children:"WorkSchedule"})},K=function(){return Object(n.jsx)("html",{lang:"he",children:"ProjectsManagement"})},Q=function(){return Object(n.jsx)("html",{lang:"he",children:"Financial"})},X=a(17),Y=a(37),Z=a(38),$={access:localStorage.getItem("access"),refresh:localStorage.getItem("refresh"),isAuthenticated:null,user:null},ee=Object(X.combineReducers)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:$,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case k:return Object(d.a)(Object(d.a)({},e),{},{isAuthenticated:!0});case v:return localStorage.setItem("access",n.access),localStorage.setItem("refresh",n.refresh),Object(d.a)(Object(d.a)({},e),{},{isAuthenticated:!0});case y:return Object(d.a)(Object(d.a)({},e),{},{isAuthenticated:!1});case w:return Object(d.a)(Object(d.a)({},e),{},{user:n});case C:return Object(d.a)(Object(d.a)({},e),{},{isAuthenticated:!1});case A:return Object(d.a)(Object(d.a)({},e),{},{user:null});case g:case N:case D:return localStorage.removeItem("access"),localStorage.removeItem("refresh"),Object(d.a)(Object(d.a)({},e),{},{access:null,refresh:null,isAuthenticated:!1,user:null});case T:case I:case L:case E:case _:case S:return Object(d.a)({},e);default:return e}}}),te=[Z.a],ae=Object(X.createStore)(ee,{},Object(Y.composeWithDevTools)(X.applyMiddleware.apply(void 0,te))),ne=Object(h.b)((function(e){return{isAuthenticated:e.auth.isAuthenticated}}),{logout:function(){return function(e){e({type:D})}},get_user_data:R})((function(e){var t=e.get_user_data,a=e.logout,s=e.isAuthenticated,r=Object(c.useState)(""),l=Object(b.a)(r,2),o=l[0],j=l[1];Object(c.useEffect)((function(){t().then((function(e){j(e)}))}),[]);return Object(n.jsxs)("nav",{className:"navbar navbar-expand-lg navbar-light bg-light",lang:"he",dir:"rtl",children:[Object(n.jsx)(i.b,{className:"navbar-brand",to:"/",children:"\u05d4\u05d7\u05e9\u05de\u05dc\u05d0\u05d9"}),Object(n.jsx)("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarNav","aria-controls":"navbarNav","aria-expanded":"false","aria-label":"Toggle navigation",children:Object(n.jsx)("span",{className:"navbar-toggler-icon"})}),Object(n.jsx)("div",{className:"collapse navbar-collapse",id:"navbarNav",children:Object(n.jsxs)("ul",{className:"navbar-nav",children:[Object(n.jsx)("li",{className:"nav-item active",children:Object(n.jsxs)(i.b,{className:"nav-link",to:"/",children:["\u05e2\u05de\u05d5\u05d3 \u05d4\u05d1\u05d9\u05ea ",Object(n.jsx)("span",{className:"sr-only",children:"(current)"})]})}),s?Object(n.jsxs)(c.Fragment,{children:[Object(n.jsx)("li",{className:"nav-item",children:Object(n.jsx)("a",{className:"nav-link",href:"#!",onClick:a,children:"\u05dc\u05d9\u05e6\u05d9\u05d0\u05d4"})}),Object(n.jsx)("li",{className:"nav-item",children:Object(n.jsx)(i.b,{className:"nav-link",to:"/homepage",children:"\u05d4\u05e2\u05e1\u05e7 \u05e9\u05dc\u05d9"})}),Object(n.jsx)("li",{className:"nav-item",children:Object(n.jsxs)(i.b,{className:"nav-link",children:["\u05d1\u05e8\u05d5\u05da \u05d4\u05d1\u05d0 ",o.first_name+" "+o.last_name]})})]}):Object(n.jsxs)(c.Fragment,{children:[Object(n.jsx)("li",{className:"nav-item",children:Object(n.jsx)(i.b,{className:"nav-link",to:"/login",children:"\u05dc\u05db\u05e0\u05d9\u05e1\u05d4"})}),Object(n.jsx)("li",{className:"nav-item",children:Object(n.jsx)(i.b,{className:"nav-link",to:"/signup",children:"\u05dc\u05d4\u05e8\u05e9\u05de\u05d4"})})]})]})})]})})),ce=Object(h.b)(null,{checkAuthenticated:function(){return function(){var e=Object(O.a)(m.a.mark((function e(t){var a,n;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!localStorage.getItem("access")){e.next=15;break}return a={headers:{"Content-Type":"application/json",Accept:"application/json"}},n=JSON.stringify({token:localStorage.getItem("access")}),e.prev=3,e.next=6,f.a.post("".concat("http://localhost:8000","/auth/jwt/verify/"),n,a);case 6:"token_not_valid"!==e.sent.data.code?t({type:k}):t({type:C}),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(3),t({type:C});case 13:e.next=16;break;case 15:t({type:C});case 16:case"end":return e.stop()}}),e,null,[[3,10]])})));return function(t){return e.apply(this,arguments)}}()},load_user:U})((function(e){var t=e.checkAuthenticated,a=e.load_user,s=e.children;return Object(c.useEffect)((function(){t(),a()}),[]),Object(n.jsxs)("div",{children:[Object(n.jsx)(ne,{}),s]})})),se=function(){return Object(n.jsx)(h.a,{store:ae,children:Object(n.jsx)(i.a,{children:Object(n.jsx)(ce,{children:Object(n.jsxs)(o.d,{children:[Object(n.jsx)(o.b,{exact:!0,path:"/",component:j}),Object(n.jsx)(o.b,{exact:!0,path:"/login",component:q}),Object(n.jsx)(o.b,{exact:!0,path:"/signup",component:F}),Object(n.jsx)(o.b,{exact:!0,path:"/reset-password",component:W}),Object(n.jsx)(o.b,{exact:!0,path:"/password/reset/confirm/:uid/:token",component:P}),Object(n.jsx)(o.b,{exact:!0,path:"/activate/:uid/:token",component:J}),Object(n.jsx)(z,{exact:!0,path:"/homepage",component:M}),Object(n.jsx)(o.b,{exact:!0,path:"/my-business-details",component:H}),Object(n.jsx)(o.b,{exact:!0,path:"/workers-management",component:V}),Object(n.jsx)(o.b,{exact:!0,path:"/work-schedule",component:B}),Object(n.jsx)(o.b,{exact:!0,path:"/financial",component:Q}),Object(n.jsx)(o.b,{exact:!0,path:"/projects-management",component:K})]})})})})};l.a.render(Object(n.jsx)(s.a.StrictMode,{children:Object(n.jsx)(se,{})}),document.getElementById("root"))}},[[69,1,2]]]);
//# sourceMappingURL=main.19c31ec4.chunk.js.map