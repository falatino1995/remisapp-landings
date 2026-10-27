/* Meta Pixel + PostHog, compartido por todas las paginas */
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '222704174148647');
fbq('track', 'PageView');

(function(){
  var s=document.createElement('script');
  s.src='https://us-assets.i.posthog.com/static/array.js';
  s.async=true;
  s.onload=function(){
    posthog.init('phc_BWpZouDvHARDDTR9BvG8rbRKiwVUkE8ey3dn3nk3tGqs',{
      api_host:'https://us.i.posthog.com',
      person_profiles:'identified_only'
    });
    var currentParams = new URLSearchParams(window.location.search || '');
    var trackingKeys = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid'];
    document.querySelectorAll("a[href*='empezar']").forEach(function(link){
      try{
        var url = new URL(link.href, window.location.origin);
        trackingKeys.forEach(function(key){
          var value = currentParams.get(key);
          if(value && !url.searchParams.get(key)) url.searchParams.set(key, value);
        });
        link.href = url.toString();
      }catch(err){}
    });
    document.addEventListener('click',function(e){
      var a=e.target.closest("a[href*='empezar']");
      if(a){
        posthog.capture('cta_click',{text:a.textContent.trim().slice(0,40)});
        if(window.fbq) fbq('track','Lead',{content_name:'empezar_gratis'});
      }
      var w=e.target.closest("a[href*='wa.me']");
      if(w){
        posthog.capture('whatsapp_click');
        if(window.fbq) fbq('trackCustom','WhatsAppClick',{content_name:'consultar_whatsapp'});
      }
    });
    var marks={25:false,50:false,75:false,100:false};
    window.addEventListener('scroll',function(){
      var pct=Math.round((window.scrollY+window.innerHeight)/document.body.scrollHeight*100);
      [25,50,75,100].forEach(function(m){if(!marks[m]&&pct>=m){marks[m]=true;posthog.capture('scroll_depth',{pct:m});}});
    },{passive:true});
  };
  document.head.appendChild(s);
})();
