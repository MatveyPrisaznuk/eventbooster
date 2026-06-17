(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();function F(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var D="Expected a function",z=0/0,K="[object Symbol]",Y=/^\s+|\s+$/g,G=/^[-+]0x[0-9a-f]+$/i,V=/^0b[01]+$/i,X=/^0o[0-7]+$/i,Z=parseInt,J=typeof{}=="object"&&{}&&{}.Object===Object&&{},Q=typeof self=="object"&&self&&self.Object===Object&&self,ee=J||Q||Function("return this")(),te=Object.prototype,ne=te.toString,se=Math.max,re=Math.min,H=function(){return ee.Date.now()};function ae(e,s,a){var n,t,r,o,i,c,u=0,p=!1,d=!1,f=!0;if(typeof e!="function")throw new TypeError(D);s=N(s)||0,P(a)&&(p=!!a.leading,d="maxWait"in a,r=d?se(N(a.maxWait)||0,s):r,f="trailing"in a?!!a.trailing:f);function m(l){var g=n,E=t;return n=t=void 0,u=l,o=e.apply(E,g),o}function T(l){return u=l,i=setTimeout(w,s),p?m(l):o}function $(l){var g=l-c,E=l-u,q=s-g;return d?re(q,r-E):q}function I(l){var g=l-c,E=l-u;return c===void 0||g>=s||g<0||d&&E>=r}function w(){var l=H();if(I(l))return C(l);i=setTimeout(w,$(l))}function C(l){return i=void 0,f&&n?m(l):(n=t=void 0,o)}function W(){i!==void 0&&clearTimeout(i),u=0,n=c=t=i=void 0}function U(){return i===void 0?o:C(H())}function S(){var l=H(),g=I(l);if(n=arguments,t=this,c=l,g){if(i===void 0)return T(c);if(d)return i=setTimeout(w,s),m(c)}return i===void 0&&(i=setTimeout(w,s)),o}return S.cancel=W,S.flush=U,S}function P(e){var s=typeof e;return!!e&&(s=="object"||s=="function")}function oe(e){return!!e&&typeof e=="object"}function ie(e){return typeof e=="symbol"||oe(e)&&ne.call(e)==K}function N(e){if(typeof e=="number")return e;if(ie(e))return z;if(P(e)){var s=typeof e.valueOf=="function"?e.valueOf():e;e=P(s)?s+"":s}if(typeof e!="string")return e===0?e:+e;e=e.replace(Y,"");var a=V.test(e);return a||X.test(e)?Z(e.slice(2),a?2:8):G.test(e)?z:+e}var ce=ae;const R=F(ce),A="jXZOafnGYsrmKAOfdIhi31h8j1RlfCR5";let L=0;const le=document.querySelector(".form__search"),_=document.querySelector(".hero__listcards"),de=document.querySelector(".header__form"),ue=document.querySelector(".hero__box"),x=document.querySelector(".pagination__container"),fe=document.querySelector(".form__choose"),O=document.querySelector(".choose__list"),me=document.querySelector(".choose__text");let h="",v="";async function y(e="",s=""){return(await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${e}&countryCode=${s}&page=${L}&apikey=${A}`)).json()}const pe=R(async()=>{var n,t,r;const e=await y(h,v);b(((n=e._embedded)==null?void 0:n.events)||[]),x.style.display="flex",ue.style.display="none";const s=((t=e.page)==null?void 0:t.totalPages)||0,a=((r=e.page)==null?void 0:r.number)||0;M(s,a)},900);le.addEventListener("input",e=>{x.style.display="none",ge(e)});const ge=R(e=>{_.innerHTML="",h=e.target.value.trim(),y(h,v).then(a=>{var n;b(((n=a._embedded)==null?void 0:n.events)||[])})},500);function b(e){if(_.innerHTML="",!e.length){x.style.display="none",_.innerHTML=`
       <div class="center">
          <p>We couldn't find your request :(</p>
        </div>
    `;return}x.style.display="flex";const s=e.map(({name:a,images:n,dates:t,_embedded:r,id:o})=>{var p,d,f,m;const i=((p=n==null?void 0:n[0])==null?void 0:p.url)||"",c=((d=t==null?void 0:t.start)==null?void 0:d.localDate)||"Unknown date",u=((m=(f=r==null?void 0:r.venues)==null?void 0:f[0])==null?void 0:m.name)||"Unknown place";return`
        <li class="listcards__item" data-id="${o}">
          <img src="${i}"
               alt="${a}"
               class="listcards__image">
          <div class="listcards__group">
            <h2 class="listcards__title">${a}</h2>
            <p class="listcards__time">${c}</p>
            <div class="listcards__point">
              <svg class="listcards__svg">
                <use href="../img/pointplace.svg"></use>
              </svg>
              <p class="listcards__place">${u}</p>
            </div>
          </div>
        </li>
      `}).join("");_.insertAdjacentHTML("beforeend",s)}de.addEventListener("submit",e=>{e.preventDefault()});fe.addEventListener("click",e=>{O.style.display==="flex"?O.style.display="none":O.style.display="flex";const s=e.target.closest(".choose__item");s&&(v=s.dataset.country,me.textContent=s.textContent.trim(),_.innerHTML="",y(h,v).then(n=>{var t;b(((t=n._embedded)==null?void 0:t.events)||[])}))});x.addEventListener("click",e=>{e.target.classList.contains("pagination:number")&&!e.target.classList.contains("arrow")&&(L=Number(e.target.textContent)-1,_.innerHTML="",y(h,v).then(n=>{var o,i,c;b(((o=n._embedded)==null?void 0:o.events)||[]);const t=((i=n.page)==null?void 0:i.totalPages)||0,r=((c=n.page)==null?void 0:c.number)||0;M(t,r)}));const s=e.target.closest(".arrow");if(s){const a=s.dataset.action;a==="prev"?L>0&&(L-=1,_.innerHTML="",y(h,v).then(n=>{var o,i,c;b(((o=n._embedded)==null?void 0:o.events)||[]);const t=((i=n.page)==null?void 0:i.totalPages)||0,r=((c=n.page)==null?void 0:c.number)||0;M(t,r)})):a==="next"&&(L+=1,_.innerHTML="",y(h,v).then(n=>{var o,i,c;b(((o=n._embedded)==null?void 0:o.events)||[]);const t=((i=n.page)==null?void 0:i.totalPages)||0,r=((c=n.page)==null?void 0:c.number)||0;M(t,r)}))}});function M(e,s){const a=Math.min(e,5);let n="";n+=`
    <div class="pagination:number arrow" data-action="prev">
        <svg width="18" height="18"><use xlink:href="#left" /></svg>
        <span class="arrow:text">Previous</span>
    </div>
  `;for(let t=0;t<a;t+=1){const r=t+1;n+=`
      <div class="pagination:number ${t===s?"pagination:active":""}">
          ${r}
      </div>
    `}n+=`
    <div class="pagination:number arrow" data-action="next">
        <svg width="18" height="18"><use xlink:href="#right" /></svg>
    </div>
  `,x.innerHTML=n}const _e=document.querySelector(".hero__listcards"),j=document.querySelector("[data-modal]"),he=document.querySelector(".modal__wrap"),ve=document.querySelector("[data-close]"),B=document.body;_e.addEventListener("click",async e=>{const s=e.target.closest(".listcards__item");if(!s)return;const a=s.dataset.id,t=await(await fetch(`https://app.ticketmaster.com/discovery/v2/events/${a}.json?apikey=${A}`)).json();he.innerHTML=ye(t),j.classList.remove("backdrop-hidden"),B.classList.add("no-scroll")});ve.addEventListener("click",k);j.addEventListener("click",e=>{e.target.closest(".modal")||k()});document.addEventListener("keydown",e=>{e.code==="Escape"&&k()});function k(){j.classList.add("backdrop-hidden"),B.classList.remove("no-scroll")}function ye(e){var s,a,n,t,r,o,i,c,u,p,d,f,m,T,$;return`
    <img class="modal__preview" src="${((a=(s=e.images)==null?void 0:s[0])==null?void 0:a.url)||""}" />

    <div class="content">
      <img class="content__image" src="${((t=(n=e.images)==null?void 0:n[0])==null?void 0:t.url)||""}" />

      <ul class="content__list">

        <li>
          <h2 class="modal__title">INFO</h2>
          <p class="modal__text">${e.info||"No information"}</p>
        </li>

        <li>
          <h2 class="modal__title">WHEN</h2>
          <p class="modal__text">${((o=(r=e.dates)==null?void 0:r.start)==null?void 0:o.localDate)||""}</p>
          <p class="modal__text">${((c=(i=e.dates)==null?void 0:i.start)==null?void 0:c.localTime)||""}</p>
        </li>

        <li>
          <h2 class="modal__title">WHERE</h2>
          <p class="modal__text">${((f=(d=(p=(u=e._embedded)==null?void 0:u.venues)==null?void 0:p[0])==null?void 0:d.city)==null?void 0:f.name)||""}</p>
          <p class="modal__text">${(($=(T=(m=e._embedded)==null?void 0:m.venues)==null?void 0:T[0])==null?void 0:$.name)||""}</p>
        </li>

        <li>
          <h2 class="modal__title">WHO</h2>
          <p class="modal__text">${e.name||""}</p>
        </li>

        <li class="modal__pric">
          <h2 class="modal__title">PRICES</h2>

          <div class="price__wrap">
          <svg class="price__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 29 20"><path d="M3.22 0H0v19.33h3.22zm8.11 0H8.1v19.33h3.23zm4.88 0h-3.22v19.33h3.22zM29 0h-4.78v19.33H29zM6.44 0H4.88v19.33h1.56zm12.89 0h-1.56v19.33h1.56zm3.23 0h-1.57v19.33h1.57z" fill="#0E0E0E"/></svg>
            <p class="modal__text">Standart 300-500 UAH</p>
            
          </div>

          <a class="modal__btn" href="${e.url||"#"}" target="_blank">
            BUY TICKETS
          </a>

          <div class="price__wrap">
            <svg class="price__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 29 20"><path d="M3.22 0H0v19.33h3.22zm8.11 0H8.1v19.33h3.23zm4.88 0h-3.22v19.33h3.22zM29 0h-4.78v19.33H29zM6.44 0H4.88v19.33h1.56zm12.89 0h-1.56v19.33h1.56zm3.23 0h-1.57v19.33h1.57z" fill="#0E0E0E"/></svg>
            <p class="modal__text">VIP 1000-1500 UAH</p>
          </div>

          <a class="modal__btn" href="${e.url||"#"}" target="_blank">
            BUY TICKETS
          </a>

        </li>

      </ul>
    </div>

    <a class="btn-info" href="${e.url||"#"}" target="_blank">
      MORE FROM THIS AUTHOR
    </a>
  `}pe();
