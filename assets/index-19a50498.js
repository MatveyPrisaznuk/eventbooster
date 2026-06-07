(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function o(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(t){if(t.ep)return;t.ep=!0;const i=o(t);fetch(t.href,i)}})();function B(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var F="Expected a function",w=0/0,W="[object Symbol]",D=/^\s+|\s+$/g,K=/^[-+]0x[0-9a-f]+$/i,U=/^0b[01]+$/i,G=/^0o[0-7]+$/i,X=parseInt,Y=typeof{}=="object"&&{}&&{}.Object===Object&&{},V=typeof self=="object"&&self&&self.Object===Object&&self,Z=Y||V||Function("return this")(),z=Object.prototype,J=z.toString,Q=Math.max,ee=Math.min,S=function(){return Z.Date.now()};function te(e,r,o){var n,t,i,s,c,l,u=0,_=!1,d=!1,y=!0;if(typeof e!="function")throw new TypeError(F);r=k(r)||0,M(o)&&(_=!!o.leading,d="maxWait"in o,i=d?Q(k(o.maxWait)||0,r):i,y="trailing"in o?!!o.trailing:y);function j(a){var f=n,L=t;return n=t=void 0,u=a,s=e.apply(L,f),s}function q(a){return u=a,c=setTimeout(T,r),_?j(a):s}function H(a){var f=a-l,L=a-u,C=r-f;return d?ee(C,i-L):C}function $(a){var f=a-l,L=a-u;return l===void 0||f>=r||f<0||d&&L>=i}function T(){var a=S();if($(a))return I(a);c=setTimeout(T,H(a))}function I(a){return c=void 0,y&&n?j(a):(n=t=void 0,s)}function A(){c!==void 0&&clearTimeout(c),u=0,n=l=t=c=void 0}function R(){return c===void 0?s:I(S())}function O(){var a=S(),f=$(a);if(n=arguments,t=this,l=a,f){if(c===void 0)return q(l);if(d)return c=setTimeout(T,r),j(l)}return c===void 0&&(c=setTimeout(T,r)),s}return O.cancel=A,O.flush=R,O}function M(e){var r=typeof e;return!!e&&(r=="object"||r=="function")}function ne(e){return!!e&&typeof e=="object"}function re(e){return typeof e=="symbol"||ne(e)&&J.call(e)==W}function k(e){if(typeof e=="number")return e;if(re(e))return w;if(M(e)){var r=typeof e.valueOf=="function"?e.valueOf():e;e=M(r)?r+"":r}if(typeof e!="string")return e===0?e:+e;e=e.replace(D,"");var o=U.test(e);return o||G.test(e)?X(e.slice(2),o?2:8):K.test(e)?w:+e}var ie=te;const N=B(ie),oe="jXZOafnGYsrmKAOfdIhi31h8j1RlfCR5";let x=0;const se=document.querySelector(".form__search"),p=document.querySelector(".hero__listcards"),ce=document.querySelector(".header__form"),ae=document.querySelector(".hero__box"),b=document.querySelector(".pagination__container"),le=document.querySelector(".form__choose"),E=document.querySelector(".choose__list"),ue=document.querySelector(".choose__text");let g="",m="";async function v(e="",r=""){return(await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${e}&countryCode=${r}&page=${x}&apikey=${oe}`)).json()}const de=N(async()=>{var n,t,i;const e=await v(g,m);h(((n=e._embedded)==null?void 0:n.events)||[]),b.style.display="flex",ae.style.display="none";const r=((t=e.page)==null?void 0:t.totalPages)||0,o=((i=e.page)==null?void 0:i.number)||0;P(r,o)},900);de();se.addEventListener("input",e=>{b.style.display="none",fe(e)});const fe=N(e=>{p.innerHTML="",g=e.target.value.trim(),v(g,m).then(o=>{var n;h(((n=o._embedded)==null?void 0:n.events)||[])})},500);function h(e){if(p.innerHTML="",!e.length){b.style.display="none",p.innerHTML=`
       <div class="center">
          <p>We couldn't find your request :(</p>
        </div>
    `;return}b.style.display="flex";const r=e.map(({name:o,images:n,dates:t,_embedded:i})=>{var u,_,d,y;const s=((u=n==null?void 0:n[0])==null?void 0:u.url)||"",c=((_=t==null?void 0:t.start)==null?void 0:_.localDate)||"Unknown date",l=((y=(d=i==null?void 0:i.venues)==null?void 0:d[0])==null?void 0:y.name)||"Unknown place";return`
        <li class="listcards__item">
          <img src="${s}"
               alt="${o}"
               class="listcards__image">
          <div class="listcards__group">
            <h2 class="listcards__title">${o}</h2>
            <p class="listcards__time">${c}</p>
            <div class="listcards__point">
              <svg class="listcards__svg">
                <use href="./img/pointplace.svg"></use>
              </svg>
              <p class="listcards__place">${l}</p>
            </div>
          </div>
        </li>
      `}).join("");p.insertAdjacentHTML("beforeend",r)}ce.addEventListener("submit",e=>{e.preventDefault()});le.addEventListener("click",e=>{E.style.display==="flex"?E.style.display="none":E.style.display="flex";const r=e.target.closest(".choose__item");r&&(m=r.dataset.country,ue.textContent=r.textContent.trim(),p.innerHTML="",v(g,m).then(n=>{var t;h(((t=n._embedded)==null?void 0:t.events)||[])}))});b.addEventListener("click",e=>{e.target.classList.contains("pagination:number")&&!e.target.classList.contains("arrow")&&(x=Number(e.target.textContent)-1,p.innerHTML="",v(g,m).then(n=>{var s,c,l;h(((s=n._embedded)==null?void 0:s.events)||[]);const t=((c=n.page)==null?void 0:c.totalPages)||0,i=((l=n.page)==null?void 0:l.number)||0;P(t,i)}));const r=e.target.closest(".arrow");if(r){const o=r.dataset.action;o==="prev"?x>0&&(x-=1,p.innerHTML="",v(g,m).then(n=>{var s,c,l;h(((s=n._embedded)==null?void 0:s.events)||[]);const t=((c=n.page)==null?void 0:c.totalPages)||0,i=((l=n.page)==null?void 0:l.number)||0;P(t,i)})):o==="next"&&(x+=1,p.innerHTML="",v(g,m).then(n=>{var s,c,l;h(((s=n._embedded)==null?void 0:s.events)||[]);const t=((c=n.page)==null?void 0:c.totalPages)||0,i=((l=n.page)==null?void 0:l.number)||0;P(t,i)}))}});function P(e,r){const o=Math.min(e,5);let n="";n+=`
    <div class="pagination:number arrow" data-action="prev">
        <svg width="18" height="18"><use xlink:href="#left" /></svg>
        <span class="arrow:text">Previous</span>
    </div>
  `;for(let t=0;t<o;t+=1){const i=t+1;n+=`
      <div class="pagination:number ${t===r?"pagination:active":""}">
          ${i}
      </div>
    `}n+=`
    <div class="pagination:number arrow" data-action="next">
        <svg width="18" height="18"><use xlink:href="#right" /></svg>
    </div>
  `,b.innerHTML=n}
