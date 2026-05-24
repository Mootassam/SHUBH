import{W as d,n as N,u as O,o as T,p as I,i as n,w as D,j as M,L as c}from"./index-650658a7.js";import{u as k,y as m,F as p}from"./FormErrors-a07d954a.js";import{y as o}from"./yupFormSchemas-dbaeb59c.js";import{I as u}from"./InputFormItem-131e83dc.js";import{I as Q}from"./I18nSelect-2bf42b7b.js";import{u as w}from"./useDispatch-985f96c1.js";const h=d().shape({email:o.string(N("user.fields.username"),{required:!0}).email(N("validation.email")),password:o.string(N("user.fields.password"),{required:!0,min:6}),rememberMe:o.boolean(N("user.fields.rememberMe"))});function v(){const j=w(),s=O(),i=T(I.selectLoading),e=T(I.selectErrorMessage),[y,x]=n.useState(!1),a=k({resolver:m.yupResolver(h),mode:"onSubmit",defaultValues:{email:"",password:"",rememberMe:!0}});n.useEffect(()=>{j(D.doClearErrorMessage())},[j]);const r=({email:g,password:L,rememberMe:l})=>{j(D.doSigninWithEmailAndPassword(g,L,l))},z=()=>{j(D.doDemoLogin())},A=()=>{s.goBack()},E=()=>{x(!0)},t=()=>{x(!1)};return M.jsxs("div",{className:"signin-container",children:[M.jsxs("div",{className:"signin-header",children:[M.jsxs("div",{className:"header-left",onClick:A,children:[M.jsx("i",{className:"fas fa-arrow-left"}),M.jsx("span",{children:"Back"})]}),M.jsx("div",{className:"header-title",children:"Sign In"}),M.jsx("div",{className:"header-right",onClick:E,children:M.jsx("i",{className:"fas fa-globe"})})]}),M.jsxs("div",{className:"signin-card",children:[M.jsx("div",{className:"logo-container",children:M.jsx("img",{className:"logo-img",src:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAyIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMjAyIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNNTIuMjc0NyAzMC4xNTMzVjExLjE5NTZINTUuODYxNVYxMi44NjMyQzU2LjQ3MyAxMS44MDcxIDU4LjAwMTkgMTAuODg5OCA2MC4wNTk4IDEwLjg4OThDNjQuMDYyOSAxMC44ODk4IDY2LjM3MDMgMTMuOTQ3NSA2Ni4zNzAzIDE4LjAwNUM2Ni4zNzAzIDIyLjE0NyA2My43ODUzIDI1LjIwNDcgNTkuOTIxIDI1LjIwNDdDNTguMDMgMjUuMjA0NyA1Ni42NCAyNC40NTQzIDU1Ljk3NDEgMjMuNTM3VjMwLjE1MzNINTIuMjc0N1pNNTkuMzM1NiAxNC4xOTlDNTcuNDQ0NiAxNC4xOTkgNTUuOTE1OCAxNS42MTcyIDU1LjkxNTggMTguMDM1MkM1NS45MTU4IDIwLjQ1MzIgNTcuNDQ0NiAyMS44OTk1IDU5LjMzNTYgMjEuODk5NUM2MS4yMjY1IDIxLjg5OTUgNjIuNzI3MiAyMC40ODEzIDYyLjcyNzIgMTguMDM1MkM2Mi43MjcyIDE1LjYxNTIgNjEuMjI2NSAxNC4xOTkgNTkuMzM1NiAxNC4xOTlaTTgwLjg0IDIwLjk1NDFDODAuMTQ2IDIzLjMxNTggNzcuOTc3NSAyNS4yOTEyIDc0LjYxNCAyNS4yOTEyQzcwLjg2MjMgMjUuMjkxMiA2Ny41NTMxIDIyLjU5NTYgNjcuNTUzMSAxNy45ODA5QzY3LjU1MzEgMTMuNjE3NiA3MC43Nzc4IDEwLjc4MTIgNzQuMjgwMSAxMC43ODEyQzc4LjUwNDUgMTAuNzgxMiA4MS4wMzUyIDEzLjQ3NjggODEuMDM1MiAxNy44NzAyQzgxLjAzNTIgMTguMzk3MyA4MC45Nzg4IDE4Ljk1NDUgODAuOTc4OCAxOS4wMDg4SDcxLjE5NDJDNzEuMjc2NyAyMC44MTUzIDcyLjgwNTUgMjIuMTIyOCA3NC42NDAyIDIyLjEyMjhDNzYuMzY0MSAyMi4xMjI4IDc3LjMwOTYgMjEuMjYxOSA3Ny43NTQyIDIwLjAzODhMODAuODQgMjAuOTU0MVpNNzcuMzk0MSAxNi40NzgyQzc3LjMzNzggMTUuMTE2MyA3Ni40NDg2IDEzLjc4MjYgNzQuMzM2NCAxMy43ODI2QzcyLjQxNzMgMTMuNzgyNiA3MS4zNjEyIDE1LjIyODkgNzEuMjc4NyAxNi40NzgySDc3LjM5NDFaTTgyLjQwNTEgMzAuMTUzM1YxMS4xOTU2SDg1Ljk5MTlWMTIuODYzMkM4Ni42MDM0IDExLjgwNzEgODguMTMyMiAxMC44ODk4IDkwLjE5MDIgMTAuODg5OEM5NC4xOTMzIDEwLjg4OTggOTYuNTAwNyAxMy45NDc1IDk2LjUwMDcgMTguMDA1Qzk2LjUwMDcgMjIuMTQ3IDkzLjkxNTcgMjUuMjA0NyA5MC4wNTEzIDI1LjIwNDdDODguMTYwNCAyNS4yMDQ3IDg2Ljc3MDQgMjQuNDU0MyA4Ni4xMDQ1IDIzLjUzN1YzMC4xNTMzSDgyLjQwNTFaTTg5LjQ2NCAxNC4xOTlDODcuNTczIDE0LjE5OSA4Ni4wNDQyIDE1LjYxNzIgODYuMDQ0MiAxOC4wMzUyQzg2LjA0NDIgMjAuNDUzMiA4Ny41NzMgMjEuODk5NSA4OS40NjQgMjEuODk5NUM5MS4zNTQ5IDIxLjg5OTUgOTIuODU1NiAyMC40ODEzIDkyLjg1NTYgMTguMDM1MkM5Mi44NTU2IDE1LjYxNTIgOTEuMzU0OSAxNC4xOTkgODkuNDY0IDE0LjE5OVpNOTcuODM0NCAzMC4wNTI3VjExLjA5NUgxMDEuNDIxVjEyLjc2MjdDMTAyLjAzMyAxMS43MDY2IDEwMy41NjIgMTAuNzg5MiAxMDUuNjE5IDEwLjc4OTJDMTA5LjYyMyAxMC43ODkyIDExMS45MyAxMy44NDY5IDExMS45MyAxNy45MDQ0QzExMS45MyAyMi4wNDY0IDEwOS4zNDUgMjUuMTA0MSAxMDUuNDgxIDI1LjEwNDFDMTAzLjU5IDI1LjEwNDEgMTAyLjIgMjQuMzUzOCAxMDEuNTM0IDIzLjQzNjRWMzAuMDUyN0g5Ny44MzQ0Wk0xMDQuODkzIDE0LjA5NjRDMTAzLjAwMiAxNC4wOTY0IDEwMS40NzMgMTUuNTE0NiAxMDEuNDczIDE3LjkzMjZDMTAxLjQ3MyAyMC4zNTA2IDEwMy4wMDIgMjEuNzk2OSAxMDQuODkzIDIxLjc5NjlDMTA2Ljc4NCAyMS43OTY5IDEwOC4yODUgMjAuMzc4NyAxMDguMjg1IDE3LjkzMjZDMTA4LjI4NSAxNS41MTQ2IDEwNi43ODQgMTQuMDk2NCAxMDQuODkzIDE0LjA5NjRaTTEyNi4zOTggMjAuOTU0MUMxMjUuNzA0IDIzLjMxNTggMTIzLjUzNSAyNS4yOTEyIDEyMC4xNzIgMjUuMjkxMkMxMTYuNDIgMjUuMjkxMiAxMTMuMTExIDIyLjU5NTYgMTEzLjExMSAxNy45ODA5QzExMy4xMTEgMTMuNjE3NiAxMTYuMzM1IDEwLjc4MTIgMTE5LjgzOCAxMC43ODEyQzEyNC4wNjIgMTAuNzgxMiAxMjYuNTkzIDEzLjQ3NjggMTI2LjU5MyAxNy44NzAyQzEyNi41OTMgMTguMzk3MyAxMjYuNTM3IDE4Ljk1NDUgMTI2LjUzNyAxOS4wMDg4SDExNi43NTJDMTE2LjgzNCAyMC44MTUzIDExOC4zNjMgMjIuMTIyOCAxMjAuMTk4IDIyLjEyMjhDMTIxLjkyMiAyMi4xMjI4IDEyMi44NjcgMjEuMjYxOSAxMjMuMzEyIDIwLjAzODhMMTI2LjM5OCAyMC45NTQxWk0xMjIuOTUyIDE2LjQ3ODJDMTIyLjg5NSAxNS4xMTYzIDEyMi4wMDYgMTMuNzgyNiAxMTkuODk0IDEzLjc4MjZDMTE3Ljk3NSAxMy43ODI2IDExNi45MTkgMTUuMjI4OSAxMTYuODM2IDE2LjQ3ODJIMTIyLjk1MlpNMTM2LjU4MSAxNC44NjQ4QzEzNi4xNjQgMTQuNzgyNCAxMzUuODAyIDE0Ljc1NDIgMTM1LjQ2OCAxNC43NTQyQzEzMy41NzcgMTQuNzU0MiAxMzEuOTM4IDE1LjY3MTUgMTMxLjkzOCAxOC42MTg2VjI0Ljg3MjhIMTI4LjI0VjExLjE5NTZIMTMxLjgyN1YxMy4yMjUzQzEzMi42NiAxMS40MTg5IDEzNC41NTEgMTEuMDg1IDEzNS43MiAxMS4wODVDMTM2LjAyNSAxMS4wODUgMTM2LjMwMyAxMS4xMTMxIDEzNi41ODEgMTEuMTQxM1YxNC44NjQ4Wk0xNDAuMDY5IDIwLjM2ODdDMTQwLjE1MSAyMS40NTMgMTQwLjk1OCAyMi40NTI3IDE0Mi41NzEgMjIuNDUyN0MxNDMuNzk0IDIyLjQ1MjcgMTQ0LjM3OCAyMS44MTMxIDE0NC4zNzggMjEuMDkwOUMxNDQuMzc4IDIwLjQ3OTMgMTQzLjk2MSAxOS45Nzg0IDE0Mi45MDUgMTkuNzU3MkwxNDEuMDk5IDE5LjM0MDdDMTM4LjQ1OCAxOC43NTc0IDEzNy4yNjMgMTcuMTcyMiAxMzcuMjYzIDE1LjI1NTFDMTM3LjI2MyAxMi44MDg5IDEzOS40MzEgMTAuNzc5MiAxNDIuMzc4IDEwLjc3OTJDMTQ2LjI3MSAxMC43NzkyIDE0Ny41NzYgMTMuMjUzNSAxNDcuNzQzIDE0LjcyNkwxNDQuNjU3IDE1LjQyQzE0NC41NDcgMTQuNjEzNCAxNDMuOTYzIDEzLjU4NTQgMTQyLjQwNiAxMy41ODU0QzE0MS40MzMgMTMuNTg1NCAxNDAuNjU0IDE0LjE2ODggMTQwLjY1NCAxNC45NDczQzE0MC42NTQgMTUuNjE1MiAxNDEuMTU1IDE2LjAzMTYgMTQxLjkwNSAxNi4xNzA0TDE0My44NTEgMTYuNTg2OEMxNDYuNTQ2IDE3LjE0MiAxNDcuOTA4IDE4Ljc4MzUgMTQ3LjkwOCAyMC43ODUxQzE0Ny45MDggMjMuMDEgMTQ2LjE4NCAyNS4yODkyIDE0Mi41OTkgMjUuMjg5MkMxMzguNDg2IDI1LjI4OTIgMTM3LjA2NyAyMi42MTk3IDEzNi45IDIxLjA2NDdMMTQwLjA2OSAyMC4zNjg3Wk0xNTQuODMyIDExLjE5NTZIMTU3LjU4NFYxNC40NzY2SDE1NC44MzJWMjAuMjAzN0MxNTQuODMyIDIxLjM5ODYgMTU1LjM4OCAyMS43ODg5IDE1Ni40NDYgMjEuNzg4OUMxNTYuODkgMjEuNzg4OSAxNTcuMzkxIDIxLjczMjYgMTU3LjU4NCAyMS42NzgzVjI0LjczNkMxNTcuMjUgMjQuODc0OCAxNTYuNTg0IDI1LjA2OTkgMTU1LjUgMjUuMDY5OUMxNTIuODMzIDI1LjA2OTkgMTUxLjE2MyAyMy40ODQ3IDE1MS4xNjMgMjAuODQ1NFYxNC40ODA2SDE0OC42ODlWMTEuMTk5NkgxNDkuMzgzQzE1MC44MjkgMTEuMTk5NiAxNTEuNDk1IDEwLjI1NDEgMTUxLjQ5NSA5LjAzMTA3VjcuMTExOTZIMTU0LjgzVjExLjE5NTZIMTU0LjgzMlpNMTcyLjQxIDE4LjAzNTJDMTcyLjQxIDIyLjIzMzUgMTY5LjMyNCAyNS4yOTEyIDE2NS4yMzkgMjUuMjkxMkMxNjEuMTUzIDI1LjI5MTIgMTU4LjA2NyAyMi4yMzM1IDE1OC4wNjcgMTguMDM1MkMxNTguMDY3IDEzLjgxMDcgMTYxLjE1MyAxMC43ODEyIDE2NS4yMzkgMTAuNzgxMkMxNjkuMzI0IDEwLjc3OTIgMTcyLjQxIDEzLjgwODcgMTcyLjQxIDE4LjAzNTJaTTE2OC43MTMgMTguMDM1MkMxNjguNzEzIDE1LjQ1MDIgMTY3LjA0NSAxNC4xNDI2IDE2NS4yMzkgMTQuMTQyNkMxNjMuNDMyIDE0LjE0MjYgMTYxLjc2NCAxNS40NDgyIDE2MS43NjQgMTguMDM1MkMxNjEuNzY0IDIwLjU5MiAxNjMuNDMyIDIxLjkyNzcgMTY1LjIzOSAyMS45Mjc3QzE2Ny4wNDUgMjEuOTI3NyAxNjguNzEzIDIwLjYyMDEgMTY4LjcxMyAxOC4wMzUyWk0xNzcuNDE1IDI0Ljg3MjhIMTczLjcxOFYxMS4xOTU2SDE3Ny4zMDRWMTIuODkxNEMxNzguMTM3IDExLjQ3MzIgMTc5Ljc3OSAxMC44MzM1IDE4MS4yNTEgMTAuODMzNUMxODQuNjQzIDEwLjgzMzUgMTg2LjIgMTMuMjUxNSAxODYuMiAxNi4yNTQ5VjI0Ljg3MjhIMTgyLjUwMlYxNi44OTQ2QzE4Mi41MDIgMTUuMzY1NyAxODEuNzUyIDE0LjE3MDggMTc5Ljk3NCAxNC4xNzA4QzE3OC4zNjIgMTQuMTcwOCAxNzcuNDE3IDE1LjQyMjEgMTc3LjQxNyAxNy4wMDUyVjI0Ljg3MjhIMTc3LjQxNVpNMjAwLjk3MyAyMC45NTQxQzIwMC4yNzkgMjMuMzE1OCAxOTguMTExIDI1LjI5MTIgMTk0Ljc0NyAyNS4yOTEyQzE5MC45OTYgMjUuMjkxMiAxODcuNjg2IDIyLjU5NTYgMTg3LjY4NiAxNy45ODA5QzE4Ny42ODYgMTMuNjE3NiAxOTAuOTExIDEwLjc4MTIgMTk0LjQxMyAxMC43ODEyQzE5OC42MzggMTAuNzgxMiAyMDEuMTY4IDEzLjQ3NjggMjAxLjE2OCAxNy44NzAyQzIwMS4xNjggMTguMzk3MyAyMDEuMTEyIDE4Ljk1NDUgMjAxLjExMiAxOS4wMDg4SDE5MS4zMjhDMTkxLjQxIDIwLjgxNTMgMTkyLjkzOSAyMi4xMjI4IDE5NC43NzMgMjIuMTIyOEMxOTYuNDk3IDIyLjEyMjggMTk3LjQ0MyAyMS4yNjE5IDE5Ny44ODcgMjAuMDM4OEwyMDAuOTczIDIwLjk1NDFaTTE5Ny41MjcgMTYuNDc4MkMxOTcuNDcxIDE1LjExNjMgMTk2LjU4MiAxMy43ODI2IDE5NC40NyAxMy43ODI2QzE5Mi41NTEgMTMuNzgyNiAxOTEuNDk0IDE1LjIyODkgMTkxLjQxMiAxNi40NzgySDE5Ny41MjdaIiBmaWxsPSIjMTUxNTE1Ii8+CjxwYXRoIGQ9Ik0zNy45MjE2IDcuNDk2MTlDMzAuODQ0NyAzLjQyODY1IDE2LjEwOTQgMC4yMzIxNDggOC4zMDgyNCAwLjAyNDk0ODhDMC41MDUwNzggLTAuMTgyMjUgLTAuMzY1OTYyIDIuNTk3ODQgMC4xMTA3OTcgOC45MjY0N0MwLjU4OTU2OCAxNS4yNTcxIDIuNDE0MTMgMjUuMTM0MyA2LjQ0MTQ0IDMxLjQ0MjhDMTAuNDY2NyAzNy43NTEzIDE2LjY5MjggNDAuNDkxMSAyMy4yOTMgMzguMjMwMUMyOS44OTEyIDM1Ljk2NyAzNi44NjU1IDI4LjcwMjkgNDAuNjQxNCAyMi42MDE2QzQ0LjQxNzIgMTYuNTA0MyA0NC45OTg2IDExLjU2MzcgMzcuOTIxNiA3LjQ5NjE5Wk0yNC4wNjc1IDI0Ljg3ODhIMTkuMTA0N1YzMy4xMzI2SDE0LjA1MTVWMTQuNzcwM0gxOS4xMDQ3VjE5LjgyMzVIMjQuMDY3NVYxOS44MDk1QzI2LjE0OTUgMTkuNzczMyAyNy44MjcyIDE4LjA3NzQgMjcuODI3MiAxNS45ODczQzI3LjgyNzIgMTMuODk3MiAyNi4xNDk1IDEyLjE5OTQgMjQuMDY3NSAxMi4xNjUyVjEyLjE2MTJINy43MzI5MUw5LjU3OTYgNy4xMDc5NUgyNC4wNjU0QzI4Ljk4MTkgNy4xMDc5NSAzMi45NjkgMTEuMDk1IDMyLjk2OSAxNi4wMTE1QzMyLjk3MSAyMC45Mjk5IDI4Ljk4MzkgMjQuODc4OCAyNC4wNjc1IDI0Ljg3ODhaIiBmaWxsPSIjMDA2NEZBIi8+CjxwYXRoIGQ9Ik0yNC4wNjc1IDI0Ljg3ODhIMTkuMTA0N1YzMy4xMzI2SDE0LjA1MTVWMTQuNzcwM0gxOS4xMDQ3VjE5LjgyMzVIMjQuMDY3NVYxOS44MDk1QzI2LjE0OTUgMTkuNzczMyAyNy44MjcyIDE4LjA3NzQgMjcuODI3MiAxNS45ODczQzI3LjgyNzIgMTMuODk3MiAyNi4xNDk1IDEyLjE5OTQgMjQuMDY3NSAxMi4xNjUyVjEyLjE2MTJINy43MzI5MUw5LjU3OTYgNy4xMDc5NUgyNC4wNjU0QzI4Ljk4MTkgNy4xMDc5NSAzMi45NjkgMTEuMDk1IDMyLjk2OSAxNi4wMTE1QzMyLjk3MSAyMC45Mjk5IDI4Ljk4MzkgMjQuODc4OCAyNC4wNjc1IDI0Ljg3ODhaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K",alt:"FXCC Logo"})}),M.jsx("div",{className:"form-heading",children:"Sign in to Secure Client Area"}),M.jsxs(p,{...a,children:[e&&M.jsx("div",{className:"error-message",children:e}),M.jsxs("form",{onSubmit:a.handleSubmit(r),children:[M.jsx(u,{type:"email",name:"email",placeholder:N("auth.fields.emailPlaceholder"),className:"input-field"}),M.jsx(u,{type:"password",name:"password",placeholder:N("auth.fields.passwordPlaceholder"),className:"input-field",autoComplete:"current-password"}),M.jsx("div",{className:"forgot-link",children:M.jsx(c,{to:"/online-service",children:N("auth.signin.forgetPassword")})}),M.jsx("button",{className:"login-button",disabled:i,type:"submit",children:i?M.jsxs(M.Fragment,{children:[M.jsx("i",{className:"fas fa-spinner fa-spin",style:{marginRight:"8px"}}),N("auth.signin.signingIn")]}):N("auth.signin.button")}),M.jsx("button",{className:"demo-login-button",onClick:z,disabled:i,type:"button",children:i?M.jsxs(M.Fragment,{children:[M.jsx("i",{className:"fas fa-spinner fa-spin",style:{marginRight:"8px"}}),"Loading..."]}):"Login to Demo Account"})]})]}),M.jsx(c,{to:"/auth/signup",className:"bottom-text",children:M.jsx("p",{children:"Don't have an account?"})})]}),y&&M.jsx("div",{className:"modal-overlay",onClick:t,children:M.jsxs("div",{className:"modal-container-bottom",onClick:g=>g.stopPropagation(),children:[M.jsxs("div",{className:"modal-header-bottom",children:[M.jsx("div",{className:"modal-drag-handle"}),M.jsxs("div",{className:"modal-title-wrapper",children:[M.jsx("div",{className:"modal-title",children:N("auth.common.selectLanguage")}),M.jsx("button",{className:"modal-close-btn-bottom",onClick:t,children:M.jsx("i",{className:"fas fa-times"})})]})]}),M.jsx("div",{className:"modal-content-bottom",children:M.jsx(Q,{isInModal:!0})})]})}),M.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .signin-container {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          display: flex;
          flex-direction: column;
        }

        /* ── Header ── */
        .signin-header {
          min-height: 60px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: white;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          opacity: 0.9;
          transition: opacity 0.2s;
        }
        .header-left:hover {
          opacity: 1;
        }
        .header-left i {
          font-size: 16px;
        }

        .header-title {
          font-size: 17px;
          font-weight: 600;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .header-right {
          font-size: 18px;
          cursor: pointer;
          opacity: 0.9;
          transition: opacity 0.2s;
        }
        .header-right:hover {
          opacity: 1;
        }

        /* ── White content card ── */
        .signin-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 30px 24px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          flex: 1;
        }

        .logo-container {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        .logo-img {
          height: 36px;
          width: auto;
        }

        .form-heading {
          text-align: center;
          font-size: 15px;
          color: #555;
          margin-bottom: 28px;
          font-weight: 500;
        }

        .input-field {
          background-color: #ffffff;
          border: 1px solid #edeef1;
          border-radius: 8px;
          height: 48px;
          width: 100%;
          padding: 0 14px;
          color: #1a1a1a;
          font-size: 14px;
          outline: none;
          margin-bottom: 14px;
          box-sizing: border-box;
          transition: 0.2s;
          font-family: inherit;
        }
        .input-field:focus {
          border-color: #106cf5;
          box-shadow: 0 0 0 3px rgba(16, 108, 245, 0.06);
        }
        .input-field::placeholder {
          color: #aaa;
        }

        .forgot-link {
          text-align: right;
          margin-bottom: 20px;
        }
        .forgot-link a {
          color: #106cf5;
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
        }

        .login-button {
          background-color: #106cf5;
          color: white;
          font-weight: 600;
          height: 50px;
          width: 100%;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          cursor: pointer;
          margin-bottom: 18px;
          transition: 0.2s;
          box-shadow: 0 2px 8px rgba(16, 108, 245, 0.25);
          font-family: inherit;
        }
        .login-button:hover {
          background: #0a4fc4;
          box-shadow: 0 4px 14px rgba(16, 108, 245, 0.35);
          transform: translateY(-1px);
        }
        .login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .demo-login-button {
          background: white;
          color: #106cf5;
          font-weight: 600;
          height: 50px;
          width: 100%;
          border: 1px solid #106cf5;
          border-radius: 8px;
          font-size: 15px;
          cursor: pointer;
          margin-bottom: 20px;
          transition: 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-family: inherit;
        }
        .demo-login-button:hover {
          background: #e6efff;
          border-color: #0a4fc4;
          color: #0a4fc4;
          transform: translateY(-1px);
        }
        .demo-login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .bottom-text {
          text-align: center;
          font-size: 14px;
          color: #777;
          text-decoration: none;
          display: block;
          margin-top: 10px;
        }
        .bottom-text p {
          margin: 5px 0;
        }
        .bottom-text:hover p {
          color: #106cf5;
        }

        .error-message {
          color: #ff4d4d;
          text-align: center;
          margin-bottom: 16px;
          padding: 10px 12px;
          background-color: #fff5f5;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          border: 1px solid #ffcccc;
        }

        /* ── Language Modal (bottom sheet, light) ── */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 1000;
        }
        .modal-container-bottom {
          background-color: #ffffff;
          width: 100%;
          max-width: 400px;
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
          padding: 20px 16px 24px;
          box-sizing: border-box;
          color: #1a1a1a;
          box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
        }
        .modal-header-bottom {
          margin-bottom: 16px;
        }
        .modal-drag-handle {
          width: 36px;
          height: 4px;
          background-color: #d1d5db;
          border-radius: 2px;
          margin: 0 auto 14px;
        }
        .modal-title-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .modal-title {
          font-size: 17px;
          font-weight: 700;
        }
        .modal-close-btn-bottom {
          background: none;
          border: none;
          color: #777;
          font-size: 18px;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 6px;
          transition: 0.2s;
        }
        .modal-close-btn-bottom:hover {
          background: #f0f2f5;
          color: #1a1a1a;
        }
        .modal-content-bottom {
          overflow-y: auto;
        }
      `})]})}export{v as default};
