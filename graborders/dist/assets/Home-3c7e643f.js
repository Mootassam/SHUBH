import{i as S,j as c,E as v,k as e}from"./index-8eeec364.js";class z{static async list(r){return(await S.get("/news",{params:{category:r.category==="all"?void 0:r.category,page:r.page,pageSize:r.pageSize,search:r.search||void 0}})).data}}const C=["All","Forex","Crypto"],A={All:"all",Forex:"forex",Crypto:"crypto"},E={All:"fas fa-newspaper",Forex:"fas fa-globe",Crypto:"fab fa-bitcoin"},M=12,P=400;function R(t){const r=Math.round((Date.now()-new Date(t).getTime())/6e4);if(r<1)return"Just now";if(r<60)return`${r} min ago`;const l=Math.round(r/60);if(l<24)return`${l} h ago`;const d=Math.round(l/24);return d<7?`${d} d ago`:new Date(t).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function T(t,r){const d=Array.from(new Set([1,r,t-1,t,t+1].filter(o=>o>=1&&o<=r))).sort((o,x)=>o-x);return d.reduce((o,x,s)=>s>0&&x-d[s-1]>1?[...o,null,x]:[...o,x],[])}function D({article:t}){const[r,l]=c.useState(!1),d=t.category==="crypto";return e.jsxs("article",{className:"news-card",children:[e.jsx("a",{href:t.url,target:"_blank",rel:"noopener noreferrer",className:"news-img-container",tabIndex:-1,"aria-hidden":"true",children:t.image&&!r?e.jsx("img",{src:t.image,alt:"",loading:"lazy",referrerPolicy:"no-referrer",onError:()=>l(!0)}):e.jsx("span",{className:"news-img-fallback",children:e.jsx("i",{className:d?"fab fa-bitcoin":"fas fa-globe"})})}),e.jsxs("div",{className:"news-card-body",children:[e.jsxs("div",{className:"news-meta",children:[e.jsx("span",{className:"news-tag "+t.category,children:d?"Crypto":"Forex"}),e.jsx("span",{children:t.source}),e.jsx("span",{"aria-hidden":"true",children:"·"}),e.jsx("time",{dateTime:t.publishedAt,title:new Date(t.publishedAt).toLocaleString(),children:R(t.publishedAt)})]}),e.jsx("h4",{className:"news-title",children:e.jsx("a",{href:t.url,target:"_blank",rel:"noopener noreferrer",children:t.title})}),t.description&&e.jsx("p",{className:"news-desc",children:t.description}),e.jsxs("a",{href:t.url,target:"_blank",rel:"noopener noreferrer",className:"news-read",children:["Read on ",t.source," ",e.jsx("i",{className:"fas fa-external-link-alt"})]})]})]})}function L(){const[t,r]=c.useState("All"),[l,d]=c.useState(""),[o,x]=c.useState(""),[s,f]=c.useState(1),[i,j]=c.useState(null),[p,u]=c.useState(!0),[g,m]=c.useState(""),[N,w]=c.useState(0),k=c.useRef(null);c.useEffect(()=>{const a=setTimeout(()=>{x(l.trim()),f(1)},P);return()=>clearTimeout(a)},[l]),c.useEffect(()=>{let a=!1;return u(!0),m(""),z.list({category:A[t],page:s,pageSize:M,search:o}).then(n=>{a||(j(n),n.page!==s&&f(n.page))}).catch(n=>{a||(v.handle(n),m(v.selectMessage(n)))}).finally(()=>{a||u(!1)}),()=>{a=!0}},[t,s,o,N]);const h=a=>{var n;f(a),(n=k.current)==null||n.scrollIntoView({behavior:"smooth",block:"start"})},y=(i==null?void 0:i.rows)??[],b=(i==null?void 0:i.totalPages)??1;return e.jsxs("div",{className:"home-container",children:[e.jsx("div",{className:"header"}),e.jsxs("div",{className:"content-card",ref:k,children:[e.jsxs("div",{className:"section-header",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"section-title",children:"Market News"}),e.jsx("small",{className:"section-subtitle",children:"Latest forex & crypto headlines from trusted sources"})]}),e.jsx("button",{className:"news-refresh",disabled:p,onClick:()=>w(a=>a+1),"aria-label":"Refresh news",children:e.jsx("i",{className:"fas fa-sync-alt"+(p?" fa-spin":"")})})]}),e.jsx("div",{className:"news-tabs",role:"tablist","aria-label":"News category",children:C.map(a=>e.jsxs("button",{role:"tab","aria-selected":t===a,className:t===a?"selected":"",onClick:()=>{r(a),f(1)},children:[e.jsx("i",{className:E[a]})," ",a]},a))}),e.jsxs("label",{className:"news-search",children:[e.jsx("i",{className:"fas fa-search"}),e.jsx("input",{type:"search",value:l,onChange:a=>d(a.target.value),placeholder:"Search news...","aria-label":"Search news"})]}),e.jsxs("div",{"aria-busy":p,children:[i&&!g&&i.count>0&&e.jsxs("p",{className:"news-count",role:"status",children:[i.count," articles · page ",i.page," of ",i.totalPages]}),g?e.jsxs("div",{className:"error-box",children:[e.jsx("i",{className:"fas fa-exclamation-circle"}),e.jsx("b",{children:"Couldn't load the news"}),e.jsx("span",{children:g}),e.jsx("button",{onClick:()=>w(a=>a+1),className:"retry-btn",children:"Try again"})]}):p&&!i?e.jsx("div",{className:"news-grid",children:Array.from({length:4},(a,n)=>e.jsxs("div",{className:"news-card skeleton","aria-hidden":"true",children:[e.jsx("div",{className:"skeleton-img"}),e.jsxs("div",{className:"skeleton-body",children:[e.jsx("div",{className:"skeleton-line short"}),e.jsx("div",{className:"skeleton-line long"}),e.jsx("div",{className:"skeleton-line medium"})]})]},n))}):y.length?e.jsx("div",{className:"news-grid"+(p?" is-loading":""),children:y.map(a=>e.jsx(D,{article:a},a.id))}):e.jsxs("div",{className:"news-empty",children:[e.jsx("i",{className:"fas fa-newspaper"}),e.jsx("b",{children:"No news found"}),e.jsx("span",{children:o?`Nothing matches "${o}". Try another word.`:"No articles right now. Try again in a few minutes."})]}),!g&&b>1&&e.jsxs("nav",{className:"news-pagination","aria-label":"News pages",children:[e.jsx("button",{disabled:s<=1||p,onClick:()=>h(s-1),"aria-label":"Previous page",children:e.jsx("i",{className:"fas fa-chevron-left"})}),T(s,b).map((a,n)=>a===null?e.jsx("span",{className:"news-gap",children:"…"},"gap"+n):e.jsx("button",{className:a===s?"selected":"","aria-current":a===s?"page":void 0,disabled:p,onClick:()=>h(a),children:a},a)),e.jsx("button",{disabled:s>=b||p,onClick:()=>h(s+1),"aria-label":"Next page",children:e.jsx("i",{className:"fas fa-chevron-right"})})]})]})]}),e.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }
        body {
          background-color: var(--kt-bg-card-alt, #f5f7fa);
        }
        .home-container {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          position: relative;
        }

        .header {
          padding: 30px 20px 20px;
        }

        /* White content card – matches LoginPassword / MarketDetail */
        .content-card {
          background: var(--kt-bg-card, #ffffff);
          border-radius: 40px 40px 0 0;
          padding: 25px 20px 60px;
          box-shadow: 0 -5px 20px rgba(0,0,0,0.05);
          min-height: calc(100vh - 100px);
          scroll-margin-top: 10px;
        }

        /* Section header */
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 16px;
        }
        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--kt-text-primary, #1a1a1a);
        }
        .section-subtitle {
          display: block;
          margin-top: 3px;
          font-size: 12px;
          color: var(--kt-text-muted, #999999);
        }
        .news-refresh {
          flex: none;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid var(--kt-border, #e7eaee);
          background: var(--kt-bg-card, #ffffff);
          color: #106cf5;
          cursor: pointer;
        }
        .news-refresh:disabled {
          opacity: 0.6;
          cursor: default;
        }

        /* Category tabs */
        .news-tabs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4px;
          padding: 4px;
          margin-bottom: 12px;
          border-radius: 12px;
          background: var(--kt-bg-card-alt, #f5f7fa);
          border: 1px solid var(--kt-border, #e7eaee);
        }
        .news-tabs button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 4px;
          border: none;
          border-radius: 9px;
          background: transparent;
          color: var(--kt-text-tertiary, #777777);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }
        .news-tabs button.selected {
          background: #106cf5;
          color: #fff;
          box-shadow: 0 2px 8px rgba(16,108,245,0.3);
        }

        /* Search */
        .news-search {
          display: flex;
          align-items: center;
          gap: 8px;
          height: 40px;
          padding: 0 12px;
          margin-bottom: 12px;
          border-radius: 10px;
          border: 1px solid var(--kt-border, #e7eaee);
          background: var(--kt-bg-card, #ffffff);
          color: var(--kt-text-muted, #999999);
        }
        .news-search:focus-within {
          border-color: #106cf5;
        }
        .news-search input {
          flex: 1;
          min-width: 0;
          border: none;
          outline: none;
          background: transparent;
          color: var(--kt-text-primary, #1a1a1a);
          font-size: 14px;
        }
        .news-count {
          margin-bottom: 10px;
          font-size: 12px;
          color: var(--kt-text-muted, #999999);
        }

        /* News list */
        .news-grid {
          display: grid;
          gap: 12px;
          transition: opacity 0.2s;
        }
        .news-grid.is-loading {
          opacity: 0.55;
        }
        .news-card {
          background: var(--kt-bg-card, #ffffff);
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--kt-border, #e7eaee);
          color: var(--kt-text-secondary, #555555);
          transition: 0.2s;
          display: flex;
          flex-direction: column;
        }
        .news-card:hover {
          border-color: #106cf5;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        .news-img-container {
          display: block;
          width: 100%;
          height: 150px;
          overflow: hidden;
          background: var(--kt-bg-card-alt, #f5f7fa);
        }
        .news-img-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .news-img-fallback {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          font-size: 34px;
          color: #106cf5;
          opacity: 0.6;
        }
        .news-card-body {
          padding: 12px 14px 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .news-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: var(--kt-text-muted, #999999);
        }
        .news-tag {
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          color: #fff;
          background: #106cf5;
        }
        .news-tag.crypto {
          background: #f59e0b;
        }
        .news-title {
          font-size: 14px;
          font-weight: 600;
          line-height: 1.4;
        }
        .news-title a {
          color: var(--kt-text-primary, #1a1a1a);
          text-decoration: none;
        }
        .news-title a:hover {
          color: #106cf5;
        }
        .news-desc {
          font-size: 12px;
          color: var(--kt-text-tertiary, #777777);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .news-read {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          color: #106cf5;
          text-decoration: none;
        }
        .news-read i {
          font-size: 10px;
        }

        /* Pagination */
        .news-pagination {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 6px;
          margin-top: 18px;
        }
        .news-pagination button {
          min-width: 34px;
          height: 34px;
          padding: 0 8px;
          border-radius: 9px;
          border: 1px solid var(--kt-border, #e7eaee);
          background: var(--kt-bg-card, #ffffff);
          color: var(--kt-text-secondary, #555555);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }
        .news-pagination button.selected {
          background: #106cf5;
          border-color: #106cf5;
          color: #fff;
        }
        .news-pagination button:disabled:not(.selected) {
          opacity: 0.45;
          cursor: default;
        }
        .news-gap {
          color: var(--kt-text-muted, #999999);
        }

        /* Skeletons */
        .skeleton .skeleton-img {
          height: 150px;
          background: linear-gradient(90deg, var(--kt-bg-card-alt, #f5f7fa) 25%, var(--kt-border, #e7eaee) 50%, var(--kt-bg-card-alt, #f5f7fa) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
        }
        .skeleton-body {
          padding: 12px;
        }
        .skeleton-line {
          background: linear-gradient(90deg, var(--kt-bg-card-alt, #f5f7fa) 25%, var(--kt-border, #e7eaee) 50%, var(--kt-bg-card-alt, #f5f7fa) 75%);
          background-size: 200% 100%;
          border-radius: 4px;
          margin-bottom: 8px;
          animation: shimmer 1.4s infinite;
        }
        .skeleton-line.short { height: 12px; width: 40%; }
        .skeleton-line.long { height: 14px; width: 90%; }
        .skeleton-line.medium { height: 12px; width: 60%; }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Error and empty states */
        .error-box,
        .news-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 28px 20px;
          border-radius: 12px;
          text-align: center;
          font-size: 13px;
        }
        .error-box {
          background: #fff5f5;
          border: 1px solid #ffcccc;
          color: #f56c6c;
        }
        .news-empty {
          border: 1px dashed var(--kt-border, #e7eaee);
          color: var(--kt-text-muted, #999999);
        }
        .error-box i,
        .news-empty i {
          font-size: 26px;
          margin-bottom: 4px;
        }
        .error-box b,
        .news-empty b {
          font-size: 15px;
        }
        .news-empty b {
          color: var(--kt-text-primary, #1a1a1a);
        }
        .retry-btn {
          background: #106cf5;
          color: white;
          border: none;
          margin-top: 8px;
          padding: 8px 20px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        /* Mobile tweaks */
        @media (max-width: 380px) {
          .content-card {
            padding: 20px 16px 60px;
          }
          .news-img-container,
          .skeleton .skeleton-img {
            height: 130px;
          }
        }
      `})]})}export{L as default};
