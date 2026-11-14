(function(){
  var $=function(s,r){return (r||document).querySelector(s);};
  var $$=function(s,r){return [].slice.call((r||document).querySelectorAll(s));};
  var LS='verax_platform_v1';
  var uid=function(){return Math.random().toString(36).slice(2,9);};
  var fmt=function(n){return Number(n||0).toLocaleString('pt-BR',{maximumFractionDigits:2});};
  var money=function(n){return 'R$ '+Number(Math.round(n||0)).toLocaleString('pt-BR');};
  var kb=function(b){b=b||0; if(b>1048576)return (b/1048576).toFixed(1)+' MB'; if(b>1024)return Math.round(b/1024)+' KB'; return b+' B';};

  function seed(){return {
    auth:false, blocks:['stop','warn','go'],
    dd:{
      intake:{cnpj:'45.678.912/0001-33',razao:'Hortifrúti Vale Ltda',rep:'João P. Meireles',ubo:'',tipo:'Completo',produto:'',valor:'',moeda:'BRL',rota:''},
      profile:{exportaUE:false,perecivel:false,imovel:false},
      agro:{eudr:'',cadeia:'',terra:''},
      revisor:'', condicoes:''
    },
    fin:[
      {id:uid(),date:'2026-09-07',desc:'Venda alho · Atacadão do Campo',cat:'Receita de vendas',center:'Comercial',type:'in',value:378000,status:'recebido'},
      {id:uid(),date:'2026-09-06',desc:'Compra lote feijão',cat:'Fornecedores',center:'Suprimentos',type:'out',value:54000,status:'pago'},
      {id:uid(),date:'2026-09-05',desc:'Assinatura Pro · Distribuidora Sul',cat:'Receita recorrente',center:'Comercial',type:'in',value:2400,status:'recebido'},
      {id:uid(),date:'2026-09-04',desc:'Serasa · pacote de consultas',cat:'Bureaus e dados',center:'Operação',type:'out',value:6800,status:'pago'},
      {id:uid(),date:'2026-09-03',desc:'Venda orégano · Comercial Prata',cat:'Receita de vendas',center:'Comercial',type:'in',value:81000,status:'a_receber'},
      {id:uid(),date:'2026-09-12',desc:'Folha da equipe',cat:'Folha',center:'Administrativo',type:'out',value:47000,status:'a_pagar'},
      {id:uid(),date:'2026-09-15',desc:'Campanhas e influenciadores',cat:'Marketing',center:'Comercial',type:'out',value:14000,status:'a_pagar'}
    ],
    est:[
      {id:uid(),produto:'Alho',lote:'ALH-2409',origem:'Curitibanos/SC',qtd:18,custo:22.40,local:'Câmara fria A',sit:'OK'},
      {id:uid(),produto:'Cebola',lote:'CEB-2411',origem:'Ituporanga/SC',qtd:32,custo:3.10,local:'Box 4',sit:'OK'},
      {id:uid(),produto:'Feijão',lote:'FEI-2402',origem:'Cristalina/GO',qtd:60,custo:6.90,local:'Armazém 2',sit:'Girar'},
      {id:uid(),produto:'Orégano',lote:'ORE-2408',origem:'Mendoza/AR',qtd:4,custo:41.00,local:'Seco · prat. 3',sit:'OK'},
      {id:uid(),produto:'Grão-de-bico',lote:'GDB-2410',origem:'Nova Andradina/MS',qtd:22,custo:7.30,local:'Armazém 1',sit:'OK'},
      {id:uid(),produto:'Alho',lote:'ALH-2405',origem:'San Juan/AR',qtd:9,custo:20.10,local:'Câmara fria B',sit:'Brotando'}
    ],
    attach:{dd:[],credito:[{id:uid(),name:'balanco_2025.pdf',size:412000,type:'application/pdf'},{id:uid(),name:'extrato_90d.pdf',size:230000,type:'application/pdf'}]},
    crm:{
      leads:[
        {id:uid(),nome:'Carlos Menezes',empresa:'CEASA Campinas',origem:'Feira Hortitec',status:'qualificado',valor:48000},
        {id:uid(),nome:'Ana Prado',empresa:'Distribuidora Prado',origem:'Indicação',status:'contatado',valor:24000},
        {id:uid(),nome:'Rafael Lima',empresa:'Cooperativa Vale Verde',origem:'LinkedIn',status:'novo',valor:96000},
        {id:uid(),nome:'Jorge Fontes',empresa:'Trading Sul Grãos',origem:'ColdCall',status:'novo',valor:120000}
      ],
      opps:[
        {id:uid(),nome:'Plano Business · CEASA Campinas',conta:'CEASA Campinas',valor:58800,stage:'proposta',prob:60,fecha:'2026-10-15'},
        {id:uid(),nome:'Enterprise · Trading Sul Grãos',conta:'Trading Sul Grãos',valor:150000,stage:'negociacao',prob:75,fecha:'2026-10-30'},
        {id:uid(),nome:'Pro · Distribuidora Prado',conta:'Distribuidora Prado',valor:28800,stage:'qualificacao',prob:40,fecha:'2026-11-05'},
        {id:uid(),nome:'Business · Cooperativa Vale Verde',conta:'Cooperativa Vale Verde',valor:58800,stage:'prospeccao',prob:20,fecha:'2026-11-20'},
        {id:uid(),nome:'Enterprise · Atacadão do Campo',conta:'Atacadão do Campo',valor:94800,stage:'ganho',prob:100,fecha:'2026-09-06'},
        {id:uid(),nome:'Pro · Hortifrúti Vale',conta:'Hortifrúti Vale',valor:28800,stage:'perdido',prob:0,fecha:'2026-09-01'}
      ],
      contas:[
        {id:uid(),nome:'CEASA Campinas',segmento:'Central de abastecimento',cidade:'Campinas/SP',dono:'Eduardo'},
        {id:uid(),nome:'Trading Sul Grãos',segmento:'Trading/exportadora',cidade:'Rondonópolis/MT',dono:'Eduardo'},
        {id:uid(),nome:'Cooperativa Vale Verde',segmento:'Cooperativa',cidade:'Cascavel/PR',dono:'Sócio'},
        {id:uid(),nome:'Atacadão do Campo',segmento:'Atacadista',cidade:'São Paulo/SP',dono:'Eduardo'}
      ],
      contatos:[
        {id:uid(),nome:'Carlos Menezes',conta:'CEASA Campinas',cargo:'Diretor comercial',email:'carlos@ceasacampinas.com',tel:'(19) 99999-0001'},
        {id:uid(),nome:'Jorge Fontes',conta:'Trading Sul Grãos',cargo:'Head de crédito',email:'jorge@sulgraos.com',tel:'(66) 99999-0002'},
        {id:uid(),nome:'Marina Souza',conta:'Atacadão do Campo',cargo:'Compras',email:'marina@atacadaocampo.com',tel:'(11) 99999-0003'}
      ],
      atividades:[
        {id:uid(),tipo:'ligacao',assunto:'Follow-up proposta CEASA',quando:'2026-09-09',rel:'CEASA Campinas',status:'aberta'},
        {id:uid(),tipo:'reuniao',assunto:'Demo Enterprise Trading Sul',quando:'2026-09-10',rel:'Trading Sul Grãos',status:'aberta'},
        {id:uid(),tipo:'email',assunto:'Enviar contrato Atacadão',quando:'2026-09-07',rel:'Atacadão do Campo',status:'concluida'}
      ]
    },
    role:'admin', viewAs:null,
    users:[
      {id:uid(),nome:'Marcos Diretor',email:'marcos@atacadaocampo.com',role:'master',team:'Atacadão do Campo',ativo:true,mfa:'obrigatório',perms:null},
      {id:uid(),nome:'Beatriz Head',email:'beatriz@atacadaocampo.com',role:'head',team:'Atacadão do Campo',ativo:true,mfa:'pendente',perms:null},
      {id:uid(),nome:'Pedro Operador',email:'pedro@atacadaocampo.com',role:'user',team:'Atacadão do Campo',ativo:true,mfa:'pendente',perms:null}
    ],
    audit:[
      {id:uid(),when:'15/09/2026 09:00',actor:'Sistema',action:'Baseline de acesso criado',detail:'Perfis e permissões padrão da VORKAX.'}
    ],
    apis:{fxBase:'',fxProvider:'',fxClientRef:'',fxAuth:'oauth2_mtls',fxEnvironment:'sandbox',fxScopes:'cotações, operações',fxWebhookRef:'',driveCredito:'',driveDD:''},
    fx:{
      sender:{legalName:'',taxId:'',country:'BR',address:'',representative:'',representativeId:'',fundingBank:'',fundingAccount:''},
      beneficiary:{legalName:'',taxId:'',country:'',address:'',accountHolder:'',bankName:'',bankCountry:'',swift:'',ibanOrAccount:''},
      draft:{currency:'USD',amount:'',purpose:'Importação de mercadorias',reference:'',settlementDate:'',feeBearer:'SHA'}, quote:null, operations:[]
    },
    proposals:[
      {id:uid(),cliente:'Atacadão do Campo',score:81,limite:950000,prazo:'45 dias',parecer:'Capacidade e idoneidade confirmadas. Limite dentro da exposição pretendida.',status:'enviada',data:'2026-09-07'}
    ],
    set:{drive:'',fx:'',cam:''}
  };}
  var S;
  function load(){ try{var r=JSON.parse(localStorage.getItem(LS)); var base=seed(); if(r){for(var k in r)base[k]=r[k];} if(base.apis&&base.apis.fxKey){ delete base.apis.fxKey; } return base;}catch(e){return seed();} }
  function save(){ try{localStorage.setItem(LS, JSON.stringify(S,function(k,v){return k.charAt(0)==='_'?undefined:v;}));}catch(e){} }
  S=load();
  function auditTime(){ return new Date().toLocaleString('pt-BR',{dateStyle:'short',timeStyle:'short'}); }
  function addAudit(action,subject,detail){ if(!S.audit)S.audit=[]; S.audit.unshift({id:uid(),when:auditTime(),actor:'Administrador',action:action,subject:subject,detail:detail}); S.audit=S.audit.slice(0,80); }

  function toast(msg){ var t=document.createElement('div'); t.textContent=msg; t.setAttribute('role','status'); t.setAttribute('aria-live','polite');
    t.style.cssText='position:fixed;bottom:1.3rem;left:50%;transform:translateX(-50%) translateY(0);background:#1A1D1B;color:#fff;padding:.8rem 1.25rem;border:1px solid rgba(189,139,27,.5);font-family:var(--sans);font-weight:600;font-size:.86rem;letter-spacing:-.005em;z-index:200;box-shadow:0 18px 46px rgba(0,0,0,.32);opacity:0;transition:opacity .25s,transform .25s';
    document.body.appendChild(t); requestAnimationFrame(function(){t.style.opacity='1';}); setTimeout(function(){t.style.opacity='0';t.style.transform='translateX(-50%) translateY(6px)';},2200); setTimeout(function(){t.remove();},2700); }

  // ---- screens ----
  function show(id){ $$('.screen').forEach(function(s){s.classList.toggle('active',s.id===id);}); if(id==='app'){applyRole(); goView('inicio');} window.scrollTo(0,0); }
  // tela inicial decidida no fim do script, depois de PERMS e de todos os listeners

  // ---- icons ----
  var IC={
    up:'<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V5M7 10l5-5 5 5"/><path d="M5 19h14"/></svg>',
    drive:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M8 3h8l5 9-4 6H7l-4-6z"/></svg>',
    file:'<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 3h6l4 4v14H5V3z"/></svg>',
    cam:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 7h13v10H2z"/><path d="M15 10l6-3v10l-6-3"/></svg>',
    plug:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 7V3M15 7V3M7 7h10v4a5 5 0 01-10 0z"/><path d="M12 16v5"/></svg>'
  };

  // ---- routing / delegation ----
  document.addEventListener('click', function(e){
    var el;
    if(el=e.target.closest('[data-login]')){ show('login'); return; }
    if(el=e.target.closest('[data-back]')){ show('site'); return; }
    if(el=e.target.closest('[data-dologin]')){ doLogin(); return; }
    if(el=e.target.closest('[data-logout]')){ S.auth=false; save(); show('site'); return; }
    if(el=e.target.closest('.tab[data-nav]')){ goView(el.dataset.nav); return; }
    if(el=e.target.closest('.subtab[data-sub]')){ var host=el.closest('[data-subhost]'); if(host&&host.closest('#v-crm')) S._crmSub=el.dataset.sub; if(host&&host.closest('#v-fin')) S._finSub=el.dataset.sub; if(host&&host.closest('#v-admin')) S._adminSub=el.dataset.sub; if(host&&host.closest('#v-cambio')) S._fxSub=el.dataset.sub; $$('.subtab',host).forEach(function(b){b.classList.toggle('active',b===el); b.setAttribute('aria-selected', b===el?'true':'false');}); $$('.subview',host).forEach(function(v){v.classList.toggle('active',v.dataset.subview===el.dataset.sub);}); return; }
    // add fin row
    if(el=e.target.closest('[data-finadd]')){ addFin(); return; }
    if(el=e.target.closest('[data-estadd]')){ S.est.push({id:uid(),produto:'Novo produto',lote:'',origem:'',qtd:0,custo:0,local:'',sit:'OK'}); save(); renderView('est'); return; }
    if(el=e.target.closest('[data-del]')){ var arr=el.dataset.del, id=el.dataset.id; S[arr]=S[arr].filter(function(r){return r.id!==id;}); save(); renderView(el.dataset.view); return; }
    // attachments
    if(el=e.target.closest('[data-drop]')){ $('input[type=file]',el).click(); return; }
    if(el=e.target.closest('[data-rmfile]')){ var sec=el.dataset.sec; S.attach[sec]=S.attach[sec].filter(function(f){return f.id!==el.dataset.id;}); save(); rerenderAttach(sec); return; }
    if(el=e.target.closest('[data-drivesave]')){ var sec=el.dataset.drivesave; var inp=$('[data-driveinput]',el.closest('.integ')); if(inp){ S.apis[driveKey(sec)]=inp.value.trim(); save(); rerenderAttach(sec); toast('Pasta do Drive salva.'); } return; }
    if(el=e.target.closest('[data-driveconnect]')){ var di=$('[data-driveinput]',el.closest('.integ')); toast(di&&di.value.trim()?'Drive configurado. Conexão OAuth entra na Fase 2 (backend).':'Cole o link da pasta do Drive primeiro.'); return; }
    if(el=e.target.closest('[data-fxconnect]')){ var fi=$('[data-fxinput]'); if(fi)S.apis.fxBase=fi.value.trim(); addAudit('Configuração de câmbio atualizada','API bancária','Endpoint registrado; a validação real exige sandbox e contrato do banco.'); save(); toast('Endpoint salvo. A validação real depende do sandbox do banco.'); renderView('cambio'); return; }
    if(el=e.target.closest('[data-fxquote]')){ requestFxQuote(); return; }
    if(el=e.target.closest('[data-fxclose]')){ acceptFxQuote(); return; }
    if(el=e.target.closest('[data-camconnect]')){ S.set.cam=($('[data-caminput]')||{}).value||S.set.cam; save(); toast('Endpoint salvo. Feed Supervision + RuView conecta na Fase 2.'); renderView('est'); return; }
    if(el=e.target.closest('[data-block]')){ var g=el.closest('[data-block]'); $$('button',g).forEach(function(b){b.className='';}); e.target.className='on-'+e.target.dataset.r; S.blocks[+g.dataset.block]=e.target.dataset.r; save(); ddCompute(); return; }
    if(el=e.target.closest('[data-agroblock]')){ var ga=el.closest('[data-agroblock]'); $$('button',ga).forEach(function(b){b.className='';}); e.target.className='on-'+e.target.dataset.r; S.dd.agro[ga.dataset.agroblock]=e.target.dataset.r; save(); ddCompute(); return; }
    if(el=e.target.closest('[data-ddemit]')){ emitLaudo(); return; }
    if(el=e.target.closest('[data-oppmove]')){ moveOpp(el.dataset.id, +el.dataset.oppmove); return; }
    if(el=e.target.closest('[data-oppdel]')){ S.crm.opps=S.crm.opps.filter(function(o){return o.id!==el.dataset.oppdel;}); save(); renderView('crm'); return; }
    if(el=e.target.closest('[data-crmadd]')){ crmAdd(el.dataset.crmadd); return; }
    if(el=e.target.closest('[data-crmdel]')){ var col=el.dataset.crmdel; S.crm[col]=S.crm[col].filter(function(r){return r.id!==el.dataset.id;}); save(); renderView('crm'); return; }
    if(el=e.target.closest('[data-actdone]')){ var a=crmFind('atividades',el.dataset.actdone); if(a){a.status=a.status==='aberta'?'concluida':'aberta'; save(); renderView('crm');} return; }
    if(el=e.target.closest('[data-leadconv]')){ convertLead(el.dataset.leadconv); return; }
    if(el=e.target.closest('[data-propsend]')){ S.proposals.unshift({id:uid(),cliente:(($('#pfCliente')||{}).value||'Cliente'),score:+(($('#pfScore')||{}).value||0),limite:+(($('#pfLimite')||{}).value||0),prazo:(($('#pfPrazo')||{}).value||''),parecer:(($('#pfParecer')||{}).value||''),status:'enviada',data:new Date().toISOString().slice(0,10)}); save(); toast('Proposta enviada ao cliente.'); renderView('credito'); return; }
    if(el=e.target.closest('[data-propaccept]')){ var pa=propFind(el.dataset.propaccept); if(pa){pa.status='aceita'; save(); toast('Proposta aceita.'); renderView('credito');} return; }
    if(el=e.target.closest('[data-propdecline]')){ var pd=propFind(el.dataset.propdecline); if(pd){pd.status='declinada'; save(); renderView('credito');} return; }
    if(el=e.target.closest('[data-useradd]')){ S.users.push({id:uid(),nome:'Convite pendente',email:'',role:'user',team:'',ativo:false,mfa:'pendente',perms:null}); addAudit('Convite criado','Novo usuário','Acesso permanece bloqueado até aceite e MFA.'); save(); renderView('admin'); return; }
    if(el=e.target.closest('[data-userdel]')){ var removed=findUser(el.dataset.userdel); S.users=S.users.filter(function(u){return u.id!==el.dataset.userdel;}); addAudit('Usuário removido',removed?removed.email:'Usuário','Acesso revogado pelo administrador.'); save(); applyRole(); renderView('admin'); return; }
    if(el=e.target.closest('[data-permedit]')){ S._perm = S._perm===el.dataset.permedit?null:el.dataset.permedit; renderView('admin'); return; }
    if(el=e.target.closest('[data-apisave]')){ ['fxBase','fxProvider','fxClientRef','fxAuth','fxEnvironment','fxScopes','fxWebhookRef','driveCredito','driveDD'].forEach(function(k){var f=$('#api_'+k); if(f)S.apis[k]=f.value.trim();}); addAudit('Configuração de integração atualizada','Administração','Somente referências não secretas foram registradas neste protótipo.'); save(); toast('Configuração salva. Segredos continuam exclusivamente no backend.'); renderView('admin'); return; }
    if(el=e.target.closest('[data-noop]')){ toast('Ação de protótipo registrada.'); return; }
  });
  document.addEventListener('change', function(e){
    var inp=e.target;
    if(inp.id==='roleAs'){ S.viewAs=inp.value||null; save(); applyRole(); goView('inicio'); return; }
    if(inp.dataset.userfield){ var uu=findUser(inp.dataset.id); if(uu){ var old=uu[inp.dataset.userfield]; uu[inp.dataset.userfield]= inp.dataset.userfield==='ativo'?inp.checked:inp.value; if(old!==uu[inp.dataset.userfield]) addAudit('Acesso de usuário alterado',uu.email,inp.dataset.userfield+': '+String(old)+' → '+String(uu[inp.dataset.userfield])); save(); renderView('admin'); } return; }
    if(inp.dataset.permtool){ var pu=findUser(inp.dataset.id); if(pu){ if(!pu.perms) pu.perms=JSON.parse(JSON.stringify(PERMS[pu.role]||PERMS.user)); pu.perms[inp.dataset.permtool]=inp.value; addAudit('Permissão alterada',pu.email,TOOLLBL[inp.dataset.permtool]+': '+inp.value); save(); } return; }
    if(inp.dataset.file){ var sec=inp.dataset.file; [].slice.call(inp.files).forEach(function(f){ var m={id:uid(),name:f.name,size:f.size,type:f.type}; if(f.type&&f.type.indexOf('image/')===0){m._url=URL.createObjectURL(f);} S.attach[sec].push(m); }); save(); rerenderAttach(sec); inp.value=''; return; }
    if(inp.dataset.finfield){ var r=find(S.fin,inp.dataset.id); if(r){ r[inp.dataset.finfield]= inp.type==='number'?+inp.value:inp.value; save(); recalcFin(); } }
    if(inp.dataset.estfield){ var r2=find(S.est,inp.dataset.id); if(r2){ r2[inp.dataset.estfield]= inp.type==='number'?+inp.value:inp.value; save(); recalcEst(); } }
    if(inp.dataset.crmfield){ var rc=crmFind(inp.dataset.crmcol,inp.dataset.id); if(rc){ rc[inp.dataset.crmfield]= inp.type==='number'?+inp.value:inp.value; save(); } }
    if(inp.dataset.fxfield){ fxSet(inp.dataset.fxfield,inp.value); save(); }
    if(inp.dataset.ddfield){ ddSet(inp.dataset.ddfield,inp.value); save(); return; }
    if(inp.dataset.ddprofile){ S.dd.profile[inp.dataset.ddprofile]=inp.checked; save(); renderView('dd'); return; }
  });
  document.addEventListener('input', function(e){
    var inp=e.target;
    if(inp.dataset.finfield && inp.dataset.finfield==='value'){ var r=find(S.fin,inp.dataset.id); if(r){ r.value=+inp.value; recalcFin(); save(); } }
    if(inp.dataset.estfield && (inp.dataset.estfield==='qtd'||inp.dataset.estfield==='custo')){ var r2=find(S.est,inp.dataset.id); if(r2){ r2[inp.dataset.estfield]=+inp.value; recalcEst(); save(); } }
  });
  document.addEventListener('dragover', function(e){ var d=e.target.closest('[data-drop]'); if(d){e.preventDefault(); d.classList.add('over');}});
  document.addEventListener('dragleave', function(e){ var d=e.target.closest('[data-drop]'); if(d)d.classList.remove('over');});
  document.addEventListener('drop', function(e){ var d=e.target.closest('[data-drop]'); if(d){ e.preventDefault(); d.classList.remove('over'); var sec=$('input[type=file]',d).dataset.file; [].slice.call(e.dataTransfer.files).forEach(function(f){ var m={id:uid(),name:f.name,size:f.size,type:f.type}; if(f.type&&f.type.indexOf('image/')===0){m._url=URL.createObjectURL(f);} S.attach[sec].push(m);}); save(); rerenderAttach(sec); }});

  var VALID={email:'admcuentasbolitas@gmail.com', pass:'Bolitas*'};
  function doLogin(){
    var em=(($('#loginEmail')||{}).value||'').trim().toLowerCase(), pw=(($('#loginPass')||{}).value||''), err=$('#loginErr');
    if(em===VALID.email.toLowerCase() && pw===VALID.pass){ if(err)err.style.display='none'; S.auth=true; save(); show('app'); }
    else{ if(err){err.textContent='E-mail ou senha incorretos.'; err.style.display='block';} var p=$('#loginPass'); if(p){p.value='';p.focus();} }
  }
  var lf=$('#loginForm'); if(lf) lf.addEventListener('submit', function(e){ e.preventDefault(); doLogin(); });
  var lp=$('#loginPass'); if(lp) lp.addEventListener('keydown', function(e){ if(e.key==='Enter'){ e.preventDefault(); doLogin(); } });

  function find(arr,id){ for(var i=0;i<arr.length;i++) if(arr[i].id===id) return arr[i]; return null; }

  // ---- RBAC ----
  var TOOLS=['inicio','dd','fin','est','cambio','credito','crm','admin'];
  var TOOLLBL={inicio:'Início',dd:'Due Diligence',fin:'Financeiro',est:'Estoque',cambio:'Câmbio',credito:'Crédito',crm:'CRM',admin:'Administração'};
  var PERMS={
    admin:{inicio:'write',dd:'write',fin:'write',est:'write',cambio:'write',credito:'write',crm:'write',admin:'write'},
    master:{inicio:'write',dd:'write',fin:'write',est:'write',cambio:'write',credito:'write',crm:'write',admin:'none'},
    head:{inicio:'read',dd:'read',fin:'none',est:'read',cambio:'none',credito:'write',crm:'write',admin:'none'},
    user:{inicio:'read',dd:'none',fin:'none',est:'none',cambio:'none',credito:'write',crm:'write',admin:'none'}
  };
  function findUser(id){ for(var i=0;i<S.users.length;i++) if(S.users[i].id===id) return S.users[i]; return null; }
  function effUser(){ return S.viewAs? findUser(S.viewAs) : null; }
  function effRole(){ var u=effUser(); return u?u.role:'admin'; }
  function effPerms(){ var u=effUser(); if(!u) return PERMS.admin; return u.perms||PERMS[u.role]||PERMS.user; }
  function can(tool){ return effPerms()[tool]||'none'; }
  function isAdmin(){ return !S.viewAs; }
  function roleLabel(r){ return {admin:'Administrador',master:'Master',head:'Head',user:'User'}[r]||r; }
  function applyRole(){
    var sel=$('#roleAs'); if(sel){ sel.innerHTML='<option value="">Ver como: Administrador</option>'+S.users.filter(function(u){return u.ativo;}).map(function(u){return '<option value="'+u.id+'">Ver como: '+esc(u.nome)+' ('+roleLabel(u.role)+')</option>';}).join(''); sel.value=S.viewAs||''; }
    $$('#app .tab').forEach(function(t){ t.style.display = can(t.dataset.nav)==='none' ? 'none' : ''; });
  }
  // ---- app nav ----
  function goView(v){
    if(can(v)==='none') v='inicio';
    $$('#app .tab').forEach(function(t){var on=t.dataset.nav===v; t.classList.toggle('active',on); t.setAttribute('aria-selected', on?'true':'false');});
    $$('#app .view').forEach(function(x){x.classList.toggle('active',x.dataset.view===v);});
    renderView(v);
    var wrap=$('#appwrap'); if(wrap) wrap.classList.toggle('ro', can(v)==='read');
    var rb=$('#roBanner'); if(rb) rb.style.display = can(v)==='read' ? 'block' : 'none';
    window.scrollTo(0,0);
  }
  function renderView(v){ var el=$('#v-'+v); if(!el)return; ({inicio:rInicio,dd:rDD,fin:rFin,est:rEst,cambio:rCambio,credito:rCredito,crm:rCRM,admin:rAdmin}[v]||function(){})(el); }

  // ---- shared components ----
  function driveKey(section){ return section==='dd'?'driveDD':'driveCredito'; }
  function attachBlock(section){
    var files=S.attach[section]||[];
    return '<div data-attsec="'+section+'">'+
      '<div class="drop" data-drop="1"><input type="file" multiple hidden data-file="'+section+'">'+IC.up+
        '<div class="t">Arraste ou clique para anexar documentos</div><div class="s">PDF, imagem ou planilha · anexo real</div></div>'+
      '<div class="filelist" id="fl-'+section+'">'+files.map(function(f){return fileItem(f,section);}).join('')+'</div>'+
      (isAdmin()?drivePanel(section):'<p class="muted" style="margin-top:.8rem">Seus anexos são recebidos pela VORKAX. A pasta de destino no Google Drive é gerida pelo administrador.</p>')+'</div>';
  }
  function fileItem(f,section){
    var thumb=f._url?'<img src="'+f._url+'">':IC.file;
    var dest=S.apis[driveKey(section)]?'fila p/ Drive':'recebido';
    return '<div class="fileitem"><div class="thumb">'+thumb+'</div><div style="min-width:0;flex:1"><div class="fn">'+esc(f.name)+'</div><div class="fs">'+kb(f.size)+' · '+dest+'</div></div><button class="delx" data-rmfile="1" data-sec="'+section+'" data-id="'+f.id+'" aria-label="Remover">✕</button></div>';
  }
  function drivePanel(section){
    var k=driveKey(section), c=S.apis[k];
    return '<div class="integ" style="margin-top:1rem"><div class="h">'+IC.drive+' Google Drive <span class="adminonly-tag">só admin</span><span class="status'+(c?' on':'')+'" style="margin-left:auto">'+(c?'pasta configurada · aguardando backend':'não conectado')+'</span></div>'+
      '<p class="muted">Os anexos desta área vão para a pasta do Drive indicada aqui. A conexão real (OAuth) entra na Fase 2.</p>'+
      '<div style="display:flex;gap:.5rem;margin-top:.7rem;flex-wrap:wrap"><input data-driveinput placeholder="Link da pasta do Google Drive" value="'+esc(c||'')+'" style="flex:1;min-width:200px;padding:.55rem .7rem;border:1px solid var(--line-2);font-family:inherit"><button class="btn ghost sm" data-drivesave="'+section+'">Salvar pasta</button><button class="btn gold sm" data-driveconnect>Conectar Drive</button></div></div>';
  }

  // ---- INÍCIO ----
  function rInicio(el){
    var saldo=sum(S.fin.filter(function(r){return r.type==='in'&&r.status==='recebido';}))-sum(S.fin.filter(function(r){return r.type==='out'&&r.status==='pago';}));
    el.innerHTML=''+
    '<div class="vhead"><div><h1>Início</h1><div class="sub">Visão geral da operação</div></div><span class="chip gold">Confiança verificada</span></div>'+
    '<div class="row c4">'+
      stat('Laudos emitidos · mês','128','▲ 22% vs. anterior','up')+
      stat('Exposição protegida','R$ 4,8<small> mi</small>','42 operações','')+
      stat('Prejuízo evitado','R$ 1,13<small> mi</small>','▲ 3 fraudes barradas','up')+
      stat('Saldo em caixa',money(saldo),'atualizado agora','')+
    '</div>'+
    '<div class="row c3" style="margin-top:1.1rem">'+
      '<div class="card"><h3>Distribuição do semáforo · 30 dias</h3><div class="barset">'+
        bar('<span class="sem"><span class="go"></span></span> Verde',64,'var(--go)','82')+
        bar('<span class="sem"><span class="warn"></span></span> Amarelo',27,'var(--warn)','34')+
        bar('<span class="sem"><span class="stop"></span></span> Vermelho',9,'var(--stop)','12')+
      '</div><p class="muted" style="margin-top:.9rem">12 vermelhos = 12 operações que teriam saído sem checagem.</p></div>'+
      '<div class="card"><h3>Financeiro rápido</h3>'+
        '<div class="stat" style="margin-bottom:.8rem"><div class="lab">A receber (30d)</div><div class="val" style="color:var(--go);font-size:1.4rem">'+money(sum(S.fin.filter(function(r){return r.status==='a_receber';})))+'</div></div>'+
        '<div class="stat"><div class="lab">A pagar (30d)</div><div class="val" style="color:var(--stop);font-size:1.4rem">'+money(sum(S.fin.filter(function(r){return r.status==='a_pagar';})))+'</div></div>'+
        '<button class="btn ghost sm" data-nav="fin" style="margin-top:1rem" onclick="">Abrir financeiro</button></div>'+
      '<div class="card"><h3>Alertas</h3>'+
        alert_('var(--stop)','CNPJ reprovado no Bloco 1','Hortifrúti Vale · identidade não confirmada')+
        alert_('var(--warn)','Lote ALH-2405 brotando','Priorizar venda no estoque')+
        alert_('var(--info)','Câmbio a liquidar','US$ 70k · vence em 2 dias')+
      '</div>'+
    '</div>'+
    '<h3 class="sectitle">Laudos recentes</h3><div class="card p0"><div class="tablewrap"><table><thead><tr><th>Comprador</th><th>CNPJ</th><th>Tipo</th><th>Semáforo</th><th class="r">Limite</th><th class="r">Data</th></tr></thead><tbody>'+
      lrow('Atacadão do Campo','12.345.678/0001-90','Completo','go','Verde','R$ 480.000','07/09')+
      lrow('Distribuidora Sul','98.765.432/0001-11','Completo','warn','Amarelo','R$ 120.000','07/09')+
      lrow('Hortifrúti Vale','45.678.912/0001-33','Básico','stop','Vermelho','—','06/09')+
      lrow('Cooperativa Grão Norte','33.221.100/0001-55','Completo','go','Verde','R$ 950.000','06/09')+
    '</tbody></table></div></div>';
    $('[data-nav="fin"]',el).addEventListener('click',function(){goView('fin');});
  }
  function stat(l,v,d,cls){return '<div class="card stat"><div class="lab">'+l+'</div><div class="val">'+v+'</div><div class="delta '+(cls||'')+'">'+d+'</div></div>';}
  function bar(nm,w,c,vv){return '<div class="barrow"><span class="nm">'+nm+'</span><div class="track"><i style="width:'+w+'%;background:'+c+'"></i></div><span class="vv">'+vv+'</span></div>';}
  function alert_(c,t,s){return '<div style="display:flex;gap:.7rem;align-items:center;padding:.6rem 0;border-bottom:1px solid var(--line)"><span style="width:.55rem;height:.55rem;border-radius:50%;background:'+c+';flex:none"></span><div><div style="font-weight:500;font-size:.88rem">'+t+'</div><div style="font-size:.76rem;color:var(--ink-faint)">'+s+'</div></div></div>';}
  function lrow(n,c,t,sem,st,lim,d){var cls=sem==='go'?'go':sem==='warn'?'warn':'stop';return '<tr><td class="strong">'+n+'</td><td class="num">'+c+'</td><td>'+t+'</td><td><span class="chip '+cls+'">'+st+'</span></td><td class="r">'+lim+'</td><td class="r">'+d+'</td></tr>';}
  function sum(arr){return arr.reduce(function(a,r){return a+Number(r.value||0);},0);}
  function emptyState(msg){return '<div class="empty"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 7h16M4 12h10M4 17h13"/></svg><p class="muted">'+msg+'</p></div>';}

  // ---- DUE DILIGENCE ----
  function ddVal(path){ var o=S.dd; path.split('.').forEach(function(k){o=o&&o[k];}); return o==null?'':o; }
  function ddSet(path,value){ var bits=path.split('.'),o=S.dd; for(var i=0;i<bits.length-1;i++)o=o[bits[i]]||(o[bits[i]]={}); o[bits[bits.length-1]]=value; }
  function ddField(label,path,placeholder,type){ return '<div class="field"><label>'+label+'</label><input '+(type?'type="'+type+'" ':'')+'data-ddfield="'+path+'" value="'+esc(ddVal(path))+'" placeholder="'+esc(placeholder||'')+'"></div>'; }
  function ddCheck(key,label){ var on=!!(S.dd.profile&&S.dd.profile[key]); return '<label style="display:flex;gap:.6rem;align-items:flex-start;padding:.5rem 0;cursor:pointer"><input type="checkbox" data-ddprofile="'+key+'"'+(on?' checked':'')+' style="margin-top:.2rem"><span style="font-size:.88rem">'+label+'</span></label>'; }
  function grouplab(t){ return '<div style="font-family:var(--mono);font-size:.66rem;letter-spacing:.04em;text-transform:uppercase;color:var(--gold-deep);font-weight:600;margin:.9rem 0 .1rem">'+t+'</div>'; }
  function ddBlock(attr,key,n,t,d){
    var st = attr==='data-block'? S.blocks[+key] : (S.dd.agro[key]||'');
    return '<div style="display:flex;align-items:center;gap:1rem;padding:.85rem 0;border-top:1px solid var(--line)"><div style="flex:1"><div style="font-family:var(--mono);font-size:.66rem;color:var(--gold-deep);font-weight:600">'+n+'</div><strong>'+t+'</strong><div class="muted">'+d+'</div></div>'+
      '<div class="toggle3" '+attr+'="'+key+'"><button data-r="go"'+(st==='go'?' class="on-go"':'')+'>OK</button><button data-r="warn"'+(st==='warn'?' class="on-warn"':'')+'>Atenção</button><button data-r="stop"'+(st==='stop'?' class="on-stop"':'')+'>Falhou</button></div></div>';
  }
  function agroSection(){
    var p=S.dd.profile||{}, rows='';
    if(p.exportaUE) rows+=ddBlock('data-agroblock','eudr','AGRO · EUDR','Origem e desmatamento','Geolocalização, data de produção e declaração de due diligence');
    if(p.perecivel) rows+=ddBlock('data-agroblock','cadeia','AGRO · Cadeia e produto','Rastreabilidade e segurança alimentar','Lote, origem, custódia, sanitário e fitossanitário');
    if(p.imovel) rows+=ddBlock('data-agroblock','terra','AGRO · Terra e ambiental','Regularidade fundiária e ambiental','Matrícula/CAR, IBAMA, embargos e licenças');
    if(!rows) return '';
    return grouplab('Módulos agro · condicionais ao perfil')+rows;
  }
  function rDD(el){
    el.innerHTML=''+
    '<div class="vhead"><div><h1>Due Diligence</h1><div class="sub">Emissão do Laudo Único</div></div><span class="chip gold">Interativo</span></div>'+
    '<div class="row" style="grid-template-columns:1.15fr .85fr">'+
      '<div>'+
        '<div class="card"><h3>1 · Identificação e caso</h3><div class="row c2">'+
          ddField('CNPJ / identificação fiscal','intake.cnpj','00.000.000/0000-00')+ddField('Razão social','intake.razao','Nome legal da contraparte')+
          ddField('Representante que vincula','intake.rep','Nome completo')+ddField('Beneficiário final (UBO)','intake.ubo','Pessoa natural que controla')+
          '<div class="field"><label>Tipo de laudo</label><select data-ddfield="intake.tipo"><option'+(ddVal('intake.tipo')==='Completo'?' selected':'')+'>Completo</option><option'+(ddVal('intake.tipo')==='Básico'?' selected':'')+'>Básico</option></select></div>'+
          ddField('Produto / operação','intake.produto','Ex.: alho, feijão, grãos')+ddField('Valor da operação','intake.valor','Ex.: 950000','number')+
          '<div class="field"><label>Moeda</label><select data-ddfield="intake.moeda"><option'+(ddVal('intake.moeda')==='BRL'?' selected':'')+'>BRL</option><option'+(ddVal('intake.moeda')==='USD'?' selected':'')+'>USD</option><option'+(ddVal('intake.moeda')==='EUR'?' selected':'')+'>EUR</option></select></div>'+
          ddField('Origem / destino (rota)','intake.rota','Ex.: SC → SP, ou exportação AR')+
        '</div></div>'+
        '<div class="card" style="margin-top:1.1rem"><h3>Perfil da contraparte</h3><p class="muted">Ligue apenas o que se aplica. Os módulos agro só entram quando o perfil exige, para não pesar o laudo sem necessidade.</p>'+
          ddCheck('exportaUE','Exporta à União Europeia em commodity EUDR (café, cacau, soja, madeira, borracha, palma, boi)')+
          ddCheck('perecivel','Produto perecível ou operação de exportação')+
          ddCheck('imovel','Imóvel/terra como garantia ou objeto da operação')+
        '</div>'+
        '<div class="card" style="margin-top:1.1rem"><h3>Documentos <span class="rt chip">'+(S.attach.dd.length)+' anexos</span></h3>'+attachBlock('dd')+'</div>'+
        '<div class="card" style="margin-top:1.1rem"><h3>Blocos de análise</h3>'+
          grouplab('Integridade e identidade')+
          ddBlock('data-block','0','BLOCO 01','Identidade & antifraude','Canal oficial + vínculo com o QSA · eliminatório')+
          ddBlock('data-block','1','BLOCO 02','Idoneidade','Protestos, processos, sanções, PEP, mídia adversa')+
          grouplab('Capacidade de pagamento · crédito')+
          ddBlock('data-block','2','BLOCO 03','Capacidade','Score + porte físico + referências')+
          agroSection()+
        '</div>'+
      '</div>'+
      '<div>'+
        '<div class="verdict stop" id="ddVerdict"><div style="display:flex;align-items:center;gap:.9rem"><span class="sem" style="transform:scale(1.3)"><span id="ddg"></span><span id="ddw"></span><span id="dds"></span></span><div class="big" id="ddText">Vermelho</div></div><p class="muted" id="ddReason" style="margin:.7rem 0 0;color:var(--ink)"></p></div>'+
        '<div class="card" style="margin-top:1.1rem"><h3>Índices separados</h3><div class="row c2">'+
          '<div class="stat"><div class="lab">Integridade & identidade</div><div class="val" id="ddIntegridade" style="font-size:1.6rem">—</div><div class="muted">Blocos 01 + 02 · define o semáforo</div></div>'+
          '<div class="stat"><div class="lab">Capacidade (crédito)</div><div class="val" id="ddCapacidade" style="font-size:1.6rem">—</div><div class="muted">Bloco 03 · define o limite</div></div>'+
        '</div><p class="muted" style="margin-top:.6rem">Integridade e crédito são medidos separado: um comprador idôneo pode ter limite baixo, e boa capacidade não compensa falha de identidade.</p></div>'+
        '<div class="card" style="margin-top:1.1rem"><h3>Limite sugerido</h3><div class="stat"><div class="val" id="ddLimit">R$ 0</div><div class="muted" style="margin-top:.4rem">Capacidade × Fator de confiança × Ajuste de garantia</div></div></div>'+
        '<div class="card" style="margin-top:1.1rem"><h3>Laudo</h3>'+
          '<div class="field"><label>Condições precedentes</label><textarea data-ddfield="condicoes" rows="3" placeholder="Ex.: entrada de 30%, aval dos sócios, reconfirmar conta por telefone">'+esc(ddVal('condicoes'))+'</textarea></div>'+
          '<div class="field"><label>Revisor responsável</label><input data-ddfield="revisor" value="'+esc(ddVal('revisor'))+'" placeholder="Nome de quem assina o laudo"></div>'+
          '<button class="btn gold" data-ddemit style="margin-top:.4rem;width:100%;justify-content:center">Emitir laudo</button>'+
        '</div>'+
      '</div>'+
    '</div>';
    ddCompute();
  }
  function ddScoreOf(st){ return st==='go'?88:st==='warn'?55:st==='stop'?18:0; }
  function ddActiveAgro(){ var p=S.dd.profile||{},a=S.dd.agro||{},list=[]; if(p.exportaUE)list.push(a.eudr); if(p.perecivel)list.push(a.cadeia); if(p.imovel)list.push(a.terra); return list; }
  function ddCompute(){
    var s=S.blocks, vd=$('#ddVerdict'); if(!vd)return;
    var all=s.concat(ddActiveAgro());
    var v='go'; if(s[0]==='stop')v='stop'; else if(all.indexOf('stop')>=0)v='stop'; else if(all.indexOf('warn')>=0)v='warn';
    vd.className='verdict '+v;
    var reason = s[0]==='stop' ? 'Reprovado no Bloco 1 (identidade). Veto automático: a carga não deve ser liberada.'
      : v==='stop' ? 'Reprovado em bloco eliminatório. Não liberar a carga.'
      : v==='warn' ? 'Sinais de atenção. Reduza o limite, exija garantia ou entrada.'
      : 'Comprador validado. Libere a carga com o limite sugerido.';
    $('#ddText').textContent={go:'Verde',warn:'Amarelo',stop:'Vermelho'}[v]; $('#ddReason').textContent=reason;
    $('#ddg').style.background=v==='go'?'var(--go)':'var(--line-2)'; $('#ddw').style.background=v==='warn'?'var(--warn)':'var(--line-2)'; $('#dds').style.background=v==='stop'?'var(--stop)':'var(--line-2)';
    var integ=Math.round(ddScoreOf(s[0])*.6+ddScoreOf(s[1])*.4), cap=ddScoreOf(s[2]);
    var ie=$('#ddIntegridade'); if(ie){ie.textContent=integ; ie.style.color=s[0]==='stop'?'var(--stop)':integ>=75?'var(--go)':integ>=45?'var(--warn)':'var(--stop)';}
    var ce=$('#ddCapacidade'); if(ce){ce.textContent=cap; ce.style.color=cap>=75?'var(--go)':cap>=45?'var(--warn)':'var(--stop)';}
    var lim=v==='stop'?0:Math.round(1050000*(v==='go'?.95:.55)*(cap>=75?1:.85)/1000)*1000;
    var le=$('#ddLimit'); if(le)le.textContent=money(lim);
  }
  function ddStatusLabel(st){ return st==='go'?'Confirmado':st==='warn'?'Atenção / lacuna':st==='stop'?'Falhou':'Não avaliado'; }
  function emitLaudo(){
    if(!String(S.dd.revisor||'').trim()){ toast('Informe o revisor responsável antes de emitir o laudo.'); return; }
    ddCompute();
    var i=S.dd.intake||{}, p=S.dd.profile||{}, a=S.dd.agro||{}, s=S.blocks;
    var v=($('#ddVerdict').className.replace('verdict','').trim())||'stop';
    var txt={go:'VERDE',warn:'AMARELO',stop:'VERMELHO'}[v]||'VERMELHO';
    var integ=($('#ddIntegridade')||{}).textContent||'—', cap=($('#ddCapacidade')||{}).textContent||'—', lim=($('#ddLimit')||{}).textContent||'R$ 0';
    var fatos=[['Bloco 01 · Identidade & antifraude',s[0]],['Bloco 02 · Idoneidade',s[1]],['Bloco 03 · Capacidade de pagamento',s[2]]];
    if(p.exportaUE)fatos.push(['Agro · EUDR (origem / desmatamento)',a.eudr]);
    if(p.perecivel)fatos.push(['Agro · Cadeia e produto',a.cadeia]);
    if(p.imovel)fatos.push(['Agro · Terra e ambiental',a.terra]);
    var lac=[];
    fatos.forEach(function(f){ if(f[1]==='warn')lac.push(f[0]+': ponto de atenção não esclarecido.'); if(!f[1])lac.push(f[0]+': não avaliado.'); });
    if(!String(i.ubo||'').trim())lac.push('Beneficiário final (UBO) não declarado: registrar até a pessoa natural.');
    if(!String(i.produto||'').trim())lac.push('Produto / operação não informado no intake.');
    if(!String(i.valor||'').trim())lac.push('Valor da operação não informado.');
    var sem={go:'#2E7D32',warn:'#B8860B',stop:'#B23A2E'}[v]||'#B23A2E';
    var esc2=function(x){return esc(x);};
    var rows=fatos.map(function(f){return '<tr><td>'+esc2(f[0])+'</td><td style="font-weight:600">'+ddStatusLabel(f[1])+'</td></tr>';}).join('');
    var lacHtml=lac.length?('<ul>'+lac.map(function(x){return '<li>'+esc2(x)+'</li>';}).join('')+'</ul>'):'<p>Sem lacunas materiais registradas nesta análise.</p>';
    var cond=String(S.dd.condicoes||'').trim();
    var now=new Date().toLocaleString('pt-BR');
    var html='<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Laudo Único · '+esc2(i.razao||i.cnpj||'Contraparte')+'</title>'+
      '<style>body{font-family:Georgia,serif;color:#1a1d1b;max-width:820px;margin:2rem auto;padding:0 1.5rem;line-height:1.5}h1{font-size:1.5rem;margin:0}h2{font-size:1rem;border-bottom:1px solid #ccc;padding-bottom:.2rem;margin-top:1.8rem}.tag{display:inline-block;color:#fff;background:'+sem+';padding:.25rem .8rem;font-weight:700;letter-spacing:.05em;margin-top:.5rem}table{width:100%;border-collapse:collapse;margin-top:.5rem}td{border-bottom:1px solid #eee;padding:.4rem .3rem;font-size:.92rem}.grid{display:flex;gap:2rem;margin-top:.6rem}.grid div{flex:1}.num{font-size:1.6rem;font-weight:700}.muted{color:#666;font-size:.82rem}.disc{margin-top:2rem;font-size:.78rem;color:#666;border-top:1px solid #ccc;padding-top:.8rem}@media print{.noprint{display:none}}</style></head><body>'+
      '<div class="noprint" style="text-align:right"><button onclick="window.print()" style="padding:.5rem 1rem;cursor:pointer">Imprimir / salvar PDF</button></div>'+
      '<h1>Laudo Único · VORKAX</h1><div class="tag">SEMÁFORO '+txt+'</div>'+
      '<h2>Identificação e caso</h2>'+
      '<table><tr><td>Razão social</td><td>'+esc2(i.razao||'—')+'</td></tr><tr><td>CNPJ / ID fiscal</td><td>'+esc2(i.cnpj||'—')+'</td></tr><tr><td>Representante que vincula</td><td>'+esc2(i.rep||'—')+'</td></tr><tr><td>Beneficiário final (UBO)</td><td>'+esc2(i.ubo||'não declarado')+'</td></tr><tr><td>Produto / operação</td><td>'+esc2(i.produto||'—')+'</td></tr><tr><td>Valor</td><td>'+esc2(i.valor||'—')+' '+esc2(i.moeda||'')+'</td></tr><tr><td>Rota</td><td>'+esc2(i.rota||'—')+'</td></tr><tr><td>Tipo de laudo</td><td>'+esc2(i.tipo||'—')+'</td></tr></table>'+
      '<h2>Resultado</h2><div class="grid"><div><div class="muted">INTEGRIDADE</div><div class="num">'+esc2(integ)+'</div></div><div><div class="muted">CAPACIDADE</div><div class="num">'+esc2(cap)+'</div></div><div><div class="muted">LIMITE SUGERIDO</div><div class="num">'+esc2(lim)+'</div></div></div>'+
      '<h2>Fatos por bloco</h2><table><tr><td style="font-weight:700">Bloco</td><td style="font-weight:700">Resultado</td></tr>'+rows+'</table>'+
      '<h2>Lacunas declaradas</h2>'+lacHtml+'<p class="muted">Regra de evidência: "não encontrado" não significa "inexistente". As conclusões declaram fonte, jurisdição, período e limitações.</p>'+
      '<h2>Condições precedentes</h2>'+(cond?'<p>'+esc2(cond)+'</p>':'<p>Nenhuma condição precedente registrada.</p>')+
      '<h2>Decisão e assinatura</h2><p>Decisão humana proporcional ao risco. Revisor responsável: <strong>'+esc2(S.dd.revisor)+'</strong>.<br>Emitido em '+esc2(now)+'.</p>'+
      '<div class="disc">Este laudo é uma avaliação factual da VORKAX para uso do solicitante. Não é parecer jurídico, certificação de sustentabilidade, garantia de pagamento nem autorização de operação. Protótipo local: fontes, evidência versionada e assinatura eletrônica entram na Fase 2 (backend).</div>'+
      '</body></html>';
    var w=window.open('','_blank'); if(!w){ toast('Libere o pop-up para gerar o laudo.'); return; }
    w.document.write(window.VK_I18N ? window.VK_I18N.html(html) : html); w.document.close();
    addAudit('Laudo emitido', i.razao||i.cnpj||'Contraparte', 'Semáforo '+txt+' · revisor '+S.dd.revisor); save();
    toast('Laudo gerado. Use Imprimir / salvar PDF na janela aberta.');
  }
  function field(l,v){return '<div class="field"><label>'+l+'</label><input value="'+v+'"></div>';}
  function rerenderAttach(sec){ var host=$('[data-attsec="'+sec+'"]'); if(host){ host.outerHTML=attachBlock(sec); } var badge=$('#v-'+(sec==='dd'?'dd':'credito')+' .rt'); }

  // ---- FINANCEIRO ----
  function rFin(el){
    var sub=S._finSub||'resumo';
    el.innerHTML=''+
    '<div class="vhead"><div><h1>Financeiro</h1><div class="sub">Caixa, compromissos e resultado da operação</div></div><button class="btn ghost sm" data-noop>Exportar</button></div>'+
    '<div data-subhost><div class="subtabs" role="tablist" aria-label="Seções do financeiro">'+
      '<button class="subtab'+(sub==='resumo'?' active':'')+'" data-sub="resumo" role="tab" aria-selected="'+(sub==='resumo')+'">Visão geral</button><button class="subtab'+(sub==='lanc'?' active':'')+'" data-sub="lanc" role="tab" aria-selected="'+(sub==='lanc')+'">Fluxo de caixa</button><button class="subtab'+(sub==='agenda'?' active':'')+'" data-sub="agenda" role="tab" aria-selected="'+(sub==='agenda')+'">Agenda</button><button class="subtab'+(sub==='cap'?' active':'')+'" data-sub="cap" role="tab" aria-selected="'+(sub==='cap')+'">A pagar &amp; receber</button><button class="subtab'+(sub==='dre'?' active':'')+'" data-sub="dre" role="tab" aria-selected="'+(sub==='dre')+'">DRE</button><button class="subtab'+(sub==='relatorios'?' active':'')+'" data-sub="relatorios" role="tab" aria-selected="'+(sub==='relatorios')+'">Relatórios</button></div>'+
      '<div class="subview'+(sub==='resumo'?' active':'')+'" data-subview="resumo">'+finResumo()+'</div>'+
      '<div class="subview'+(sub==='lanc'?' active':'')+'" data-subview="lanc">'+finLanc()+'</div>'+
      '<div class="subview'+(sub==='agenda'?' active':'')+'" data-subview="agenda">'+finAgenda()+'</div>'+
      '<div class="subview'+(sub==='cap'?' active':'')+'" data-subview="cap">'+finCAP()+'</div>'+
      '<div class="subview'+(sub==='dre'?' active':'')+'" data-subview="dre">'+finDRE()+'</div>'+
      '<div class="subview'+(sub==='relatorios'?' active':'')+'" data-subview="relatorios">'+finRelatorios()+'</div>'+
    '</div>';
  }
  function finResumo(){
    var ent=sum(S.fin.filter(function(r){return r.type==='in';})), sai=sum(S.fin.filter(function(r){return r.type==='out';}));
    var saldo=sum(S.fin.filter(function(r){return r.type==='in'&&r.status==='recebido';}))-sum(S.fin.filter(function(r){return r.type==='out'&&r.status==='pago';}));
    var cats={}; S.fin.filter(function(r){return r.type==='out';}).forEach(function(r){cats[r.cat]=(cats[r.cat]||0)+r.value;});
    var mx=Math.max.apply(null,Object.keys(cats).map(function(k){return cats[k];}).concat([1]));
    var bars=Object.keys(cats).sort(function(a,b){return cats[b]-cats[a];}).map(function(k){return bar(k,Math.round(cats[k]/mx*100),'var(--gold)',money(cats[k]));}).join('');
    return '<div class="row c4">'+
      stat('Saldo em caixa',money(saldo),'realizado','')+
      stat('Entradas',money(ent),'no período','up')+
      stat('Saídas',money(sai),'no período','down')+
      stat('Resultado',money(ent-sai),'margem '+(ent?Math.round((ent-sai)/ent*100):0)+'%','up')+
    '</div><div class="row c2" style="margin-top:1.1rem"><div class="card"><h3>Composição de saídas por categoria</h3><div class="barset">'+bars+'</div></div>'+
    '<div class="card"><h3>Entradas x Saídas</h3><div class="barset">'+bar('Entradas',Math.round(ent/Math.max(ent,sai)*100),'var(--go)',money(ent))+bar('Saídas',Math.round(sai/Math.max(ent,sai)*100),'var(--stop)',money(sai))+'</div><p class="muted" style="margin-top:1rem">Fluxo consolidado dos lançamentos. Adicione ou edite em "Lançamentos".</p></div></div>';
  }
  var CATS=['Receita de vendas','Receita recorrente','Fornecedores','Folha','Bureaus e dados','Marketing','Impostos','Outros'];
  var CENTERS=['Comercial','Operação','Administrativo','Suprimentos'];
  var STATUS=[['recebido','Recebido'],['pago','Pago'],['a_receber','A receber'],['a_pagar','A pagar']];
  function finLanc(){
    return '<div class="card p0"><div class="tablewrap"><table><thead><tr><th>Data</th><th>Descrição</th><th>Categoria</th><th>Centro</th><th>Tipo</th><th class="r">Valor</th><th>Status</th><th></th></tr></thead><tbody id="finBody">'+
      S.fin.map(finTr).join('')+
      '<tr class="tot"><td colspan="5">Saldo do período</td><td class="r" id="finTot">'+money(sum(S.fin.filter(function(r){return r.type==='in';}))-sum(S.fin.filter(function(r){return r.type==='out';})))+'</td><td colspan="2"></td></tr>'+
    '</tbody></table></div>'+
    '<div class="addbar"><div class="field"><label>Descrição</label><input id="nfDesc" placeholder="Nova movimentação"></div>'+
      '<div class="field" style="max-width:150px"><label>Categoria</label><select id="nfCat">'+CATS.map(function(c){return '<option>'+c+'</option>';}).join('')+'</select></div>'+
      '<div class="field" style="max-width:110px"><label>Tipo</label><select id="nfType"><option value="in">Entrada</option><option value="out">Saída</option></select></div>'+
      '<div class="field" style="max-width:130px"><label>Valor (R$)</label><input id="nfVal" type="number" value="0"></div>'+
      '<div class="field" style="max-width:130px"><label>Status</label><select id="nfStatus">'+STATUS.map(function(s){return '<option value="'+s[0]+'">'+s[1]+'</option>';}).join('')+'</select></div>'+
      '<button class="btn gold sm" data-finadd>+ Adicionar</button></div></div>';
  }
  function finTr(r){
    return '<tr><td><input value="'+r.date+'" data-finfield="date" data-id="'+r.id+'" style="min-width:92px"></td>'+
      '<td style="min-width:180px"><input class="strong" value="'+esc(r.desc)+'" data-finfield="desc" data-id="'+r.id+'"></td>'+
      '<td>'+sel(CATS.map(function(c){return [c,c];}),r.cat,'cat',r.id)+'</td>'+
      '<td>'+sel(CENTERS.map(function(c){return [c,c];}),r.center,'center',r.id)+'</td>'+
      '<td>'+sel([['in','Entrada'],['out','Saída']],r.type,'type',r.id)+'</td>'+
      '<td class="r"><input class="r" type="number" value="'+r.value+'" data-finfield="value" data-id="'+r.id+'" style="min-width:96px"></td>'+
      '<td>'+sel(STATUS,r.status,'status',r.id)+'</td>'+
      '<td><button class="delx" data-del="fin" data-id="'+r.id+'" data-view="fin" aria-label="Excluir lançamento">✕</button></td></tr>';
  }
  function sel(opts,val,field,id){ return '<select data-finfield="'+field+'" data-id="'+id+'">'+opts.map(function(o){return '<option value="'+o[0]+'"'+(o[0]===val?' selected':'')+'>'+o[1]+'</option>';}).join('')+'</select>'; }
  function addFin(){
    var d=$('#nfDesc'); if(!d)return;
    S.fin.unshift({id:uid(),date:new Date().toISOString().slice(0,10),desc:d.value||'Movimentação',cat:$('#nfCat').value,center:'Comercial',type:$('#nfType').value,value:+$('#nfVal').value||0,status:$('#nfStatus').value});
    S._finSub='lanc'; save(); renderView('fin');
  }
  function recalcFin(){ var t=$('#finTot'); if(t)t.textContent=money(sum(S.fin.filter(function(r){return r.type==='in';}))-sum(S.fin.filter(function(r){return r.type==='out';}))); }
  function finCAP(){
    var rec=S.fin.filter(function(r){return r.status==='a_receber';}), pag=S.fin.filter(function(r){return r.status==='a_pagar';});
    function list(arr,color){return arr.length?arr.map(function(r){return '<div style="display:flex;justify-content:space-between;padding:.6rem 0;border-bottom:1px solid var(--line)"><div><div style="font-weight:500">'+esc(r.desc)+'</div><div class="muted">vence '+r.date+' · '+r.cat+'</div></div><div class="num" style="color:'+color+'">'+money(r.value)+'</div></div>';}).join(''):emptyState('Nada pendente.');}
    return '<div class="row c2"><div class="card"><h3>A receber <span class="rt num" style="color:var(--go)">'+money(sum(rec))+'</span></h3>'+list(rec,'var(--go)')+'</div>'+
      '<div class="card"><h3>A pagar <span class="rt num" style="color:var(--stop)">'+money(sum(pag))+'</span></h3>'+list(pag,'var(--stop)')+'</div></div>';
  }
  function finAgenda(){
    var itens=S.fin.slice().sort(function(a,b){return a.date.localeCompare(b.date);});
    var pend=itens.filter(function(r){return r.status==='a_receber'||r.status==='a_pagar';});
    function linha(r){ var status={a_receber:'a receber',a_pagar:'a pagar',recebido:'recebido',pago:'pago'}[r.status]||r.status; return '<div style="display:flex;justify-content:space-between;gap:.8rem;padding:.7rem 0;border-bottom:1px solid var(--line)"><div><div style="font-weight:600">'+esc(r.desc)+'</div><div class="muted">'+r.date+' · '+r.cat+' · '+status+'</div></div><div class="num" style="color:'+(r.type==='in'?'var(--go)':'var(--stop)')+'">'+money(r.value)+'</div></div>'; }
    return '<div class="row c2"><div class="card"><h3>Próximos compromissos <span class="rt chip">'+pend.length+'</span></h3>'+(pend.length?pend.map(linha).join(''):emptyState('Nenhum compromisso pendente.'))+'</div><div class="card"><h3>Agenda financeira</h3>'+itens.slice(0,8).map(linha).join('')+'<p class="muted" style="margin-top:.8rem">A agenda é atualizada a partir dos lançamentos e seus status.</p></div></div>';
  }
  function finDRE(){
    var byCat={}; S.fin.forEach(function(r){byCat[r.cat]=(byCat[r.cat]||0)+(r.type==='in'?r.value:-r.value);});
    var rec=S.fin.filter(function(r){return r.type==='in';}), desp=S.fin.filter(function(r){return r.type==='out';});
    var tr=Object.keys(byCat).map(function(k){var v=byCat[k];return '<tr><td class="strong">'+k+'</td><td class="r" style="color:'+(v>=0?'var(--go)':'var(--stop)')+'">'+money(v)+'</td></tr>';}).join('');
    var res=sum(rec)-sum(desp);
    return '<div class="card p0"><div class="tablewrap"><table><thead><tr><th>Conta gerencial</th><th class="r">Resultado</th></tr></thead><tbody>'+tr+
      '<tr class="tot"><td>Receita bruta</td><td class="r" style="color:var(--go)">'+money(sum(rec))+'</td></tr>'+
      '<tr class="tot"><td>Despesas</td><td class="r" style="color:var(--stop)">'+money(sum(desp))+'</td></tr>'+
      '<tr class="tot"><td>Resultado líquido</td><td class="r">'+money(res)+'</td></tr>'+
    '</tbody></table></div><p class="muted" style="padding:.8rem 1rem">DRE gerencial calculado dos lançamentos por categoria. Conciliação bancária e plano de contas completo entram na evolução do módulo.</p></div>';
  }
  function finRelatorios(){
    var ent=sum(S.fin.filter(function(r){return r.type==='in';})), sai=sum(S.fin.filter(function(r){return r.type==='out';}));
    var pendRec=sum(S.fin.filter(function(r){return r.status==='a_receber';})), pendPag=sum(S.fin.filter(function(r){return r.status==='a_pagar';}));
    return '<div class="row c4">'+stat('Receita projetada',money(ent),'lançamentos do período','up')+stat('Despesa projetada',money(sai),'lançamentos do período','down')+stat('A receber',money(pendRec),'em aberto','up')+stat('A pagar',money(pendPag),'em aberto','down')+'</div><div class="row c2" style="margin-top:1.1rem"><div class="card"><h3>Leitura gerencial</h3><p class="muted">Receitas, despesas e compromissos reunidos em uma visão pronta para decisão. Os valores são calculados dos lançamentos do Fluxo de caixa.</p><div class="barset" style="margin-top:1rem">'+bar('Margem projetada',Math.max(0,Math.round((ent-sai)/Math.max(ent,1)*100)),'var(--gold)',Math.round((ent-sai)/Math.max(ent,1)*100)+'%')+'</div></div><div class="card"><h3>O que acompanhar</h3><p style="margin:0 0 .65rem">• Priorize recebimentos com vencimento próximo.</p><p style="margin:0 0 .65rem">• Confirme despesas antes do pagamento.</p><p style="margin:0">• Use a DRE para analisar resultado por categoria.</p></div></div>';
  }

  // ---- ESTOQUE ----
  function rEst(el){
    var valor=S.est.reduce(function(a,r){return a+r.qtd*1000*r.custo;},0);
    el.innerHTML=''+
    '<div class="vhead"><div><h1>Estoque</h1><div class="sub">Planilha de lotes, câmara fria e visão por câmeras</div></div><button class="btn gold sm" data-estadd>+ Lote</button></div>'+
    '<div class="row c4">'+
      stat('Valor em estoque',money(valor),S.est.length+' lotes','')+
      stat('Volume total',fmt(S.est.reduce(function(a,r){return a+r.qtd;},0))+'<small> t</small>','somado dos lotes','')+
      stat('Câmara fria','78<small>%</small>','ocupação','')+
      stat('Perdas · mês','1,9<small>%</small>','brotamento','down')+
    '</div>'+
    '<h3 class="sectitle">Planilha de estoque <span class="chip" style="margin-left:.4rem">editável</span></h3>'+
    '<div class="card p0"><div class="tablewrap"><table><thead><tr><th>Produto</th><th>Lote</th><th>Origem</th><th class="r">Qtd (t)</th><th class="r">Custo/kg</th><th class="r">Valor lote</th><th>Local</th><th>Situação</th><th></th></tr></thead><tbody id="estBody">'+
      S.est.map(estTr).join('')+
      '<tr class="tot"><td colspan="5">Total em estoque</td><td class="r" id="estTot">'+money(valor)+'</td><td colspan="3"></td></tr>'+
    '</tbody></table></div></div>'+
    '<h3 class="sectitle">Visão por câmeras · Supervision + RuView</h3>'+
    '<div class="integ"><div class="h">'+IC.cam+' Sistema de câmeras <span class="status">em fase final · pronto para conectar</span></div>'+
      '<p class="muted">Contagem e detecção de anomalia por visão (Supervision) e sensoriamento por RuView. O feed liga na Fase 2, aqui é o engate: informe o endpoint do gateway.</p>'+
      '<div style="display:flex;gap:.5rem;margin-top:.7rem;flex-wrap:wrap"><input data-caminput placeholder="Endpoint do gateway de câmeras (ex.: rtsp:// ou wss://)" value="'+(S.set.cam||'')+'" style="flex:1;min-width:220px;padding:.55rem .7rem;border:1px solid var(--line-2);border-radius:9px;font-family:inherit"><button class="btn gold sm" data-camconnect>'+IC.plug+' Conectar câmeras</button></div>'+
      '<div class="cams"><div class="cam"><div class="scan"></div><div class="rec"></div><div class="lbl">CAM 01 · Câmara fria A</div>aguardando feed</div><div class="cam"><div class="scan"></div><div class="rec"></div><div class="lbl">CAM 02 · Doca</div>aguardando feed</div><div class="cam"><div class="scan"></div><div class="rec"></div><div class="lbl">RuView · Armazém 2</div>aguardando sensor</div></div></div>';
  }
  var SITS=[['OK','OK'],['Girar','Girar'],['Brotando','Brotando'],['Vendido','Vendido']];
  function estTr(r){
    return '<tr><td style="min-width:120px"><input class="strong" value="'+esc(r.produto)+'" data-estfield="produto" data-id="'+r.id+'"></td>'+
      '<td><input value="'+esc(r.lote)+'" data-estfield="lote" data-id="'+r.id+'" style="min-width:90px"></td>'+
      '<td><input value="'+esc(r.origem)+'" data-estfield="origem" data-id="'+r.id+'" style="min-width:120px"></td>'+
      '<td class="r"><input class="r" type="number" value="'+r.qtd+'" data-estfield="qtd" data-id="'+r.id+'" style="min-width:70px"></td>'+
      '<td class="r"><input class="r" type="number" step="0.01" value="'+r.custo+'" data-estfield="custo" data-id="'+r.id+'" style="min-width:80px"></td>'+
      '<td class="r strong" data-estval="'+r.id+'">'+money(r.qtd*1000*r.custo)+'</td>'+
      '<td><input value="'+esc(r.local)+'" data-estfield="local" data-id="'+r.id+'" style="min-width:100px"></td>'+
      '<td>'+estSel(r)+'</td>'+
      '<td><button class="delx" data-del="est" data-id="'+r.id+'" data-view="est" aria-label="Excluir lote">✕</button></td></tr>';
  }
  function estSel(r){return '<select data-estfield="sit" data-id="'+r.id+'">'+SITS.map(function(o){return '<option'+(o[0]===r.sit?' selected':'')+'>'+o[1]+'</option>';}).join('')+'</select>';}
  function recalcEst(){ S.est.forEach(function(r){var c=$('[data-estval="'+r.id+'"]'); if(c)c.textContent=money(r.qtd*1000*r.custo);}); var t=$('#estTot'); if(t)t.textContent=money(S.est.reduce(function(a,r){return a+r.qtd*1000*r.custo;},0)); }

  // ---- CÂMBIO ----
  function fxChecks(){
    var a=S.apis||{}, https=/^https:\/\//i.test(a.fxBase||'');
    return [
      ['Endpoint HTTPS',https],['Provedor identificado',!!a.fxProvider],['Referência de segredo no backend',!!a.fxClientRef],
      ['OAuth 2.0 + mTLS',a.fxAuth==='oauth2_mtls'],['Escopo mínimo definido',!!a.fxScopes],['Webhook assinado mapeado',!!a.fxWebhookRef]
    ];
  }
  function fxReadiness(){ var ok=fxChecks().filter(function(x){return x[1];}).length; return {ok:ok,total:fxChecks().length,ready:ok===fxChecks().length&&S.apis.fxEnvironment==='produção'}; }
  function fxVal(path){ var o=S.fx; path.split('.').forEach(function(k){o=o&&o[k];}); return o==null?'':o; }
  function fxSet(path,value){ var bits=path.split('.'), o=S.fx; for(var i=0;i<bits.length-1;i++)o=o[bits[i]]||(o[bits[i]]={}); o[bits[bits.length-1]]=value; }
  function fxField(label,path,placeholder,type){ return '<div class="field"><label>'+label+'</label><input '+(type?'type="'+type+'" ':'')+'data-fxfield="'+path+'" value="'+esc(fxVal(path))+'" placeholder="'+esc(placeholder||'')+'"></div>'; }
  function fxQuoteCard(){
    var q=S.fx.quote;
    if(!q)return '<div class="card"><h3>Cotação</h3><p class="muted">Preencha as partes e solicite uma cotação. O preço exibido só será válido quando retornar do gateway bancário.</p></div>';
    return '<div class="card"><h3>Cotação recebida <span class="chip go">API bancária</span></h3><div class="row c2"><div><div class="muted">Taxa contratada</div><div class="num" style="font-size:1.5rem">'+esc(q.rate)+'</div></div><div><div class="muted">Válida até</div><div class="strong">'+esc(q.expiresAt||'conforme banco')+'</div></div></div><div style="margin-top:.7rem;padding:.8rem;background:var(--surface-2);border-radius:10px"><div style="display:flex;justify-content:space-between"><span>Enviar</span><b>'+esc(q.sourceAmount||fxVal('draft.amount'))+' '+esc(q.sourceCurrency||fxVal('draft.currency'))+'</b></div><div style="display:flex;justify-content:space-between;margin-top:.35rem"><span>Receber</span><b>'+esc(q.targetAmount||'—')+' '+esc(q.targetCurrency||'BRL')+'</b></div></div><button class="btn gold" data-fxclose style="width:100%;justify-content:center;margin-top:.9rem">Realizar fechamento</button></div>';
  }
  function fxRequired(){ return ['sender.legalName','sender.taxId','sender.country','beneficiary.legalName','beneficiary.country','beneficiary.bankName','beneficiary.ibanOrAccount','draft.currency','draft.amount','draft.purpose']; }
  function fxPayload(){ return {idempotencyKey:uid(),sender:S.fx.sender,beneficiary:S.fx.beneficiary,operation:S.fx.draft}; }
  function fxGateway(){ return String((S.apis||{}).fxBase||'').replace(/\/$/,''); }
  async function requestFxQuote(){
    var missing=fxRequired().filter(function(p){return !String(fxVal(p)).trim();});
    if(missing.length){ toast('Complete os dados obrigatórios das partes e da operação.'); return; }
    var base=fxGateway(); if(!/^https:\/\//.test(base)){ toast('Configure o gateway HTTPS de câmbio em Administração.'); return; }
    try{ var res=await fetch(base+'/v1/fx/quotes',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',body:JSON.stringify(fxPayload())}); var q=await res.json(); if(!res.ok||!q.id||q.rate==null)throw new Error(q.message||'Resposta de cotação inválida'); S.fx.quote=q; addAudit('Cotação bancária recebida',q.id,'Cotação vinculada à operação de câmbio.'); save(); renderView('cambio'); }
    catch(err){ toast('Não foi possível obter a cotação do gateway: '+(err.message||'erro de conexão')); }
  }
  async function acceptFxQuote(){
    var q=S.fx.quote, base=fxGateway(); if(!q){toast('Solicite uma cotação válida antes do fechamento.');return;} if(q.expiresAt&&Date.parse(q.expiresAt)<Date.now()){S.fx.quote=null;save();renderView('cambio');toast('A cotação expirou. Solicite uma nova.');return;}
    try{ var res=await fetch(base+'/v1/fx/quotes/'+encodeURIComponent(q.id)+'/accept',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',body:JSON.stringify({idempotencyKey:uid()})}); var op=await res.json(); if(!res.ok||!op.id)throw new Error(op.message||'Fechamento recusado'); S.fx.operations.unshift({id:op.id,when:auditTime(),currency:q.sourceCurrency||S.fx.draft.currency,amount:q.sourceAmount||S.fx.draft.amount,rate:q.rate,status:op.status||'solicitado'}); S.fx.quote=null; addAudit('Fechamento solicitado',op.id,'Ordem enviada ao gateway bancário; aguarde confirmação.'); save(); renderView('cambio'); toast('Fechamento solicitado ao banco.'); }
    catch(err){ toast('O fechamento não foi confirmado: '+(err.message||'erro de conexão')); }
  }
  function rCambio(el){
    var sub=S._fxSub||'cotacao', fx=fxReadiness(), ops=(S.fx.operations||[]);
    function pane(id,html){return '<div class="subview'+(sub===id?' active':'')+'" data-subview="'+id+'">'+html+'</div>';}
    var quote='<div class="row" style="grid-template-columns:1fr 1fr"><div class="card"><h3>Solicitar cotação em tempo real</h3><div class="row c2"><div class="field"><label>Moeda enviada</label><select data-fxfield="draft.currency"><option'+(fxVal('draft.currency')==='USD'?' selected':'')+'>USD</option><option'+(fxVal('draft.currency')==='EUR'?' selected':'')+'>EUR</option></select></div>'+fxField('Valor','draft.amount','Ex.: 70000','number')+'</div>'+fxField('Finalidade econômica','draft.purpose','Ex.: importação de mercadorias')+fxField('Referência comercial / invoice','draft.reference','Número da fatura ou contrato')+'<div class="row c2">'+fxField('Data de liquidação','draft.settlementDate','','date')+'<div class="field"><label>Encargos</label><select data-fxfield="draft.feeBearer"><option value="SHA"'+(fxVal('draft.feeBearer')==='SHA'?' selected':'')+'>SHA · compartilhados</option><option value="OUR"'+(fxVal('draft.feeBearer')==='OUR'?' selected':'')+'>OUR · remetente</option><option value="BEN"'+(fxVal('draft.feeBearer')==='BEN'?' selected':'')+'>BEN · beneficiário</option></select></div></div><button class="btn gold" data-fxquote style="width:100%;justify-content:center">Solicitar cotação do banco</button><p class="muted" style="margin-top:.7rem">A cotação só é exibida após resposta do gateway bancário autenticado.</p></div>'+fxQuoteCard()+'</div>';
    var sender='<div class="card"><h3>Empresa remetente</h3><p class="muted">Dados cadastrais, representante e conta de origem. O banco pode exigir documentos adicionais conforme finalidade e risco.</p><div class="row c2">'+fxField('Razão social','sender.legalName','Nome legal da empresa')+fxField('CNPJ / identificação fiscal','sender.taxId','00.000.000/0000-00')+fxField('País de constituição','sender.country','BR')+fxField('Endereço registrado','sender.address','Rua, número, cidade, CEP')+fxField('Representante autorizado','sender.representative','Nome completo')+fxField('CPF / documento do representante','sender.representativeId','CPF ou passaporte')+fxField('Banco de origem','sender.fundingBank','Nome do banco')+fxField('Conta de origem','sender.fundingAccount','Agência e conta')+'</div></div>';
    var beneficiary='<div class="card"><h3>Empresa beneficiária</h3><p class="muted">Confirme os dados com o beneficiário; IBAN ou conta local e SWIFT/BIC são definidos pelo país e banco de destino.</p><div class="row c2">'+fxField('Razão social / nome legal','beneficiary.legalName','Nome do titular da conta')+fxField('Identificação fiscal local','beneficiary.taxId','Tax ID / VAT / CNPJ')+fxField('País de residência','beneficiary.country','Ex.: AR, US, DE')+fxField('Endereço registrado','beneficiary.address','Rua, cidade, código postal, país')+fxField('Titular da conta','beneficiary.accountHolder','Deve corresponder ao beneficiário')+fxField('Banco destinatário','beneficiary.bankName','Nome do banco')+fxField('País do banco','beneficiary.bankCountry','Código ISO do país')+fxField('SWIFT / BIC','beneficiary.swift','Quando aplicável')+fxField('IBAN ou conta local','beneficiary.ibanOrAccount','IBAN, ABA+conta ou conta local')+'</div></div>';
    var history='<div class="card p0"><div class="tablewrap"><table><thead><tr><th>Quando</th><th>Operação</th><th>Moeda</th><th class="r">Valor</th><th class="r">Taxa</th><th>Status</th></tr></thead><tbody>'+(ops.length?ops.map(function(o){return '<tr><td>'+esc(o.when)+'</td><td class="num">'+esc(o.id)+'</td><td>'+esc(o.currency)+'</td><td class="r">'+esc(o.amount)+'</td><td class="r">'+esc(o.rate)+'</td><td><span class="chip warn">'+esc(o.status)+'</span></td></tr>';}).join(''):'<tr><td colspan="6" class="muted">Nenhum fechamento confirmado pelo banco.</td></tr>')+'</tbody></table></div></div>';
    el.innerHTML='<div class="vhead"><div><h1>Câmbio</h1><div class="sub">Cotação e fechamento com correspondente bancário</div></div><span class="chip '+(fx.ready?'go':'warn')+'">Gateway '+fx.ok+'/'+fx.total+'</span></div><div data-subhost><div class="subtabs" role="tablist" aria-label="Etapas de câmbio"><button class="subtab'+(sub==='cotacao'?' active':'')+'" data-sub="cotacao">Cotação &amp; fechamento</button><button class="subtab'+(sub==='remetente'?' active':'')+'" data-sub="remetente">Empresa remetente</button><button class="subtab'+(sub==='beneficiario'?' active':'')+'" data-sub="beneficiario">Empresa beneficiária</button><button class="subtab'+(sub==='operacoes'?' active':'')+'" data-sub="operacoes">Operações</button></div>'+pane('cotacao',quote)+pane('remetente',sender)+pane('beneficiario',beneficiary)+pane('operacoes',history)+'</div><p class="muted" style="margin-top:1rem">A validação cadastral, documentação de suporte, classificação cambial e aprovação final são responsabilidade do banco/correspondente. Dados pessoais e bancários devem ir para banco criptografado, não para o navegador.</p>';
  }

  // ---- CRÉDITO ----
  function rCredito(el){ el.innerHTML = isAdmin()? creditoAdmin() : creditoClient(); }
  function creditoAdmin(){
    return '<div class="vhead"><div><h1>Análise de Crédito</h1><div class="sub">Receba documentos, pontue o score e envie a proposta ao cliente</div></div><span class="chip gold">Administrador</span></div>'+
    '<div class="row" style="grid-template-columns:1.1fr .9fr">'+
      '<div>'+
        '<div class="card"><h3>Contraparte em análise</h3><div class="row c2">'+field('Empresa','Cooperativa Grão Norte')+field('CNPJ','33.221.100/0001-55')+field('Operação pretendida','R$ 950.000 · 45 dias')+'<div class="field"><label>Garantia</label><select><option>Aval dos sócios</option><option>Nota promissória</option><option>Sem garantia</option></select></div></div></div>'+
        '<div class="card" style="margin-top:1.1rem"><h3>Documentos recebidos <span class="rt chip">'+S.attach.credito.length+'</span></h3>'+attachBlock('credito')+'</div>'+
        '<div class="card" style="margin-top:1.1rem"><h3>Fatores do parecer</h3><div class="barset">'+bar('Score bureau',81,'var(--go)','812')+bar('Porte físico',74,'var(--go)','Alto')+bar('Protestos/processos',12,'var(--go)','Limpo')+bar('Alavancagem',44,'var(--warn)','Média')+'</div></div>'+
      '</div>'+
      '<div>'+
        '<div class="card"><h3>Emitir proposta ao cliente</h3>'+
          '<div class="field"><label>Cliente / equipe</label><input id="pfCliente" value="Atacadão do Campo"></div>'+
          '<div class="row c2"><div class="field"><label>Score</label><input id="pfScore" type="number" value="81"></div><div class="field"><label>Limite (R$)</label><input id="pfLimite" type="number" value="950000"></div></div>'+
          '<div class="field"><label>Prazo</label><input id="pfPrazo" value="45 dias"></div>'+
          '<div class="field"><label>Parecer</label><textarea id="pfParecer" rows="3" style="font-family:inherit;font-size:.9rem;padding:.6rem .75rem;border:1px solid var(--line-2)">Capacidade e idoneidade confirmadas. Limite dentro da exposição pretendida.</textarea></div>'+
          '<button class="btn gold" data-propsend style="width:100%;justify-content:center">Enviar proposta ao cliente</button></div>'+
        '<div class="card" style="margin-top:1.1rem"><h3>Propostas enviadas</h3>'+(S.proposals.length?S.proposals.map(propAdminRow).join(''):emptyState('Nenhuma proposta.'))+'</div>'+
      '</div>'+
    '</div>';
  }
  function propAdminRow(p){ var st={enviada:'warn',aceita:'go',declinada:'stop'}[p.status]||''; return '<div style="display:flex;justify-content:space-between;align-items:center;gap:.6rem;padding:.6rem 0;border-bottom:1px solid var(--line)"><div><div style="font-weight:600">'+esc(p.cliente)+' · '+money(p.limite)+'</div><div class="muted">Score '+p.score+' · '+esc(p.prazo)+' · '+p.data+'</div></div><span class="chip '+st+'">'+({enviada:'Enviada',aceita:'Aceita',declinada:'Declinada'}[p.status])+'</span></div>'; }
  function creditoClient(){
    return '<div class="vhead"><div><h1>Crédito</h1><div class="sub">Anexe documentos e acompanhe suas propostas</div></div><span class="chip gold">Cliente</span></div>'+
    '<div class="row" style="grid-template-columns:1fr 1fr">'+
      '<div class="card"><h3>Meus documentos <span class="rt chip">'+S.attach.credito.length+'</span></h3><p class="muted" style="margin-bottom:.8rem">Anexe seus documentos, ou de clientes seus, para a VORKAX analisar e devolver a proposta.</p>'+attachBlock('credito')+'</div>'+
      '<div class="card"><h3>Minhas propostas de crédito</h3>'+(S.proposals.length?S.proposals.map(propClientCard).join(''):emptyState('Sem propostas ainda. Anexe seus documentos para análise.'))+'</div>'+
    '</div>';
  }
  function propClientCard(p){
    var st={enviada:'warn',aceita:'go',declinada:'stop'}[p.status]||'';
    var actions = p.status==='enviada' ? '<div style="display:flex;gap:.6rem;margin-top:.9rem"><button class="btn gold sm" data-propaccept="'+p.id+'">Aceitar</button><button class="btn ghost sm" data-propdecline="'+p.id+'">Declinar</button></div>' : '<div class="muted" style="margin-top:.6rem">Proposta '+({aceita:'aceita',declinada:'declinada'}[p.status])+' em '+p.data+'.</div>';
    return '<div class="propcard"><div style="display:flex;justify-content:space-between;align-items:start"><div><div style="font-weight:700;font-size:1.1rem">'+money(p.limite)+'</div><div class="muted">'+esc(p.cliente)+' · prazo '+esc(p.prazo)+'</div></div><span class="chip '+st+'">'+({enviada:'Aguardando você',aceita:'Aceita',declinada:'Declinada'}[p.status])+'</span></div>'+
      '<div style="display:flex;gap:1.4rem;margin:.9rem 0"><div><div class="muted" style="font-size:.72rem">SCORE</div><div class="num" style="font-size:1.6rem;color:var(--gold-deep)">'+p.score+'</div></div><div style="flex:1"><div class="muted" style="font-size:.72rem">PARECER</div><div style="font-size:.9rem">'+esc(p.parecer)+'</div></div></div>'+actions+'</div>';
  }
  function propFind(id){ for(var i=0;i<S.proposals.length;i++) if(S.proposals[i].id===id) return S.proposals[i]; return null; }

  // ---- CRM ----
  var STAGES=[['prospeccao','Prospecção'],['qualificacao','Qualificação'],['proposta','Proposta'],['negociacao','Negociação'],['ganho','Ganho'],['perdido','Perdido']];
  var STORD=STAGES.map(function(s){return s[0];});
  function crmFind(col,id){ var a=S.crm[col]||[]; for(var i=0;i<a.length;i++) if(a[i].id===id) return a[i]; return null; }
  function csum(arr){ return arr.reduce(function(a,o){return a+Number(o.valor||0);},0); }
  function moveOpp(id,dir){ var o=crmFind('opps',id); if(!o)return; var i=STORD.indexOf(o.stage)+dir; if(i<0)i=0; if(i>STORD.length-1)i=STORD.length-1; o.stage=STORD[i]; o.prob=({prospeccao:20,qualificacao:40,proposta:60,negociacao:75,ganho:100,perdido:0})[o.stage]; save(); renderView('crm'); }
  function crmAdd(col){ var b={leads:{nome:'Novo lead',empresa:'',origem:'Inbound',status:'novo',valor:0},contas:{nome:'Nova conta',segmento:'',cidade:'',dono:'Eduardo'},contatos:{nome:'Novo contato',conta:'',cargo:'',email:'',tel:''},atividades:{tipo:'tarefa',assunto:'Nova atividade',quando:new Date().toISOString().slice(0,10),rel:'',status:'aberta'},opps:{nome:'Nova oportunidade',conta:'',valor:0,stage:'prospeccao',prob:20,fecha:''}}[col]; b.id=uid(); S.crm[col].unshift(b); S._crmSub={opps:'pipe',leads:'leads',contas:'contas',contatos:'contatos',atividades:'ativ'}[col]; save(); renderView('crm'); }
  function convertLead(id){ var l=crmFind('leads',id); if(!l)return; S.crm.opps.unshift({id:uid(),nome:'Oportunidade · '+(l.empresa||l.nome),conta:l.empresa||'',valor:l.valor||0,stage:'qualificacao',prob:40,fecha:''}); l.status='qualificado'; S._crmSub='pipe'; save(); toast('Lead convertido em oportunidade.'); renderView('crm'); }
  function ci(col,id,field,val,num){ return '<input'+(num?' type="number" class="r"':'')+' value="'+esc(val)+'" data-crmfield="'+field+'" data-crmcol="'+col+'" data-id="'+id+'" style="min-width:80px">'; }
  function csel(col,id,field,val,opts){ return '<select data-crmfield="'+field+'" data-crmcol="'+col+'" data-id="'+id+'">'+opts.map(function(o){return '<option'+(o===val?' selected':'')+'>'+o+'</option>';}).join('')+'</select>'; }
  function rCRM(el){
    var sub=S._crmSub||'dash';
    el.innerHTML=''+
      '<div class="vhead"><div><h1>CRM Comercial</h1><div class="sub">A máquina de vendas da operação</div></div><span class="chip gold">Pipeline ao vivo</span></div>'+
      '<div data-subhost><div class="subtabs" role="tablist" aria-label="Seções do CRM">'+
      '<button class="subtab'+(sub==='dash'?' active':'')+'" data-sub="dash" role="tab" aria-selected="'+(sub==='dash')+'">Dashboard</button><button class="subtab'+(sub==='pipe'?' active':'')+'" data-sub="pipe" role="tab" aria-selected="'+(sub==='pipe')+'">Oportunidades</button><button class="subtab'+(sub==='leads'?' active':'')+'" data-sub="leads" role="tab" aria-selected="'+(sub==='leads')+'">Leads</button><button class="subtab'+(sub==='contas'?' active':'')+'" data-sub="contas" role="tab" aria-selected="'+(sub==='contas')+'">Contas</button><button class="subtab'+(sub==='contatos'?' active':'')+'" data-sub="contatos" role="tab" aria-selected="'+(sub==='contatos')+'">Contatos</button><button class="subtab'+(sub==='ativ'?' active':'')+'" data-sub="ativ" role="tab" aria-selected="'+(sub==='ativ')+'">Atividades</button></div>'+
      '<div class="subview'+(sub==='dash'?' active':'')+'" data-subview="dash">'+crmDash()+'</div>'+
      '<div class="subview'+(sub==='pipe'?' active':'')+'" data-subview="pipe">'+crmPipe()+'</div>'+
      '<div class="subview'+(sub==='leads'?' active':'')+'" data-subview="leads">'+crmLeads()+'</div>'+
      '<div class="subview'+(sub==='contas'?' active':'')+'" data-subview="contas">'+crmContas()+'</div>'+
      '<div class="subview'+(sub==='contatos'?' active':'')+'" data-subview="contatos">'+crmContatos()+'</div>'+
      '<div class="subview'+(sub==='ativ'?' active':'')+'" data-subview="ativ">'+crmAtiv()+'</div>'+
    '</div>';
  }
  function crmDash(){
    var open=S.crm.opps.filter(function(o){return o.stage!=='ganho'&&o.stage!=='perdido';});
    var pond=open.reduce(function(a,o){return a+o.valor*(o.prob||0)/100;},0);
    var ganho=csum(S.crm.opps.filter(function(o){return o.stage==='ganho';}));
    var nc=S.crm.opps.filter(function(o){return o.stage==='ganho';}).length, np=S.crm.opps.filter(function(o){return o.stage==='perdido';}).length;
    var conv=(nc+np)?Math.round(nc/(nc+np)*100):0, tot=Math.max(csum(S.crm.opps),1);
    var bars=STAGES.filter(function(s){return s[0]!=='perdido';}).map(function(s){var it=S.crm.opps.filter(function(o){return o.stage===s[0];}); return bar(s[1],Math.round(csum(it)/tot*100),'var(--gold)',money(csum(it))+' · '+it.length);}).join('');
    return '<div class="row c4">'+
      stat('Pipeline aberto',money(csum(open)),open.length+' oportunidades','')+
      stat('Previsão ponderada',money(pond),'por probabilidade','')+
      stat('Ganho (fechado)',money(ganho),nc+' negócios','up')+
      stat('Conversão',conv+'<small>%</small>',nc+' ganhos · '+np+' perdidos','')+
    '</div><div class="row c2" style="margin-top:1.1rem"><div class="card"><h3>Funil por estágio</h3><div class="barset">'+bars+'</div></div>'+
    '<div class="card"><h3>Próximas atividades</h3>'+(S.crm.atividades.filter(function(a){return a.status==='aberta';}).slice(0,6).map(function(a){return '<div style="display:flex;gap:.7rem;align-items:center;padding:.55rem 0;border-bottom:1px solid var(--line)"><span class="chip">'+a.tipo+'</span><div><div style="font-weight:500;font-size:.88rem">'+esc(a.assunto)+'</div><div class="muted">'+a.quando+' · '+esc(a.rel)+'</div></div></div>';}).join('')||emptyState('Sem atividades abertas.'))+'</div></div>';
  }
  function crmPipe(){
    var cols=STAGES.filter(function(s){return s[0]!=='perdido';}).map(function(s){
      var it=S.crm.opps.filter(function(o){return o.stage===s[0];});
      return '<div class="kcol"><div class="khead">'+s[1]+' <span class="knum">'+money(csum(it))+'</span><span class="kcount">'+it.length+'</span></div>'+it.map(kcard).join('')+'</div>';
    }).join('');
    return '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.6rem;margin-bottom:.7rem"><p class="muted">Mova entre estágios com ◀ ▶. Perdidos: '+S.crm.opps.filter(function(o){return o.stage==='perdido';}).length+'.</p><button class="btn gold sm" data-crmadd="opps">+ Oportunidade</button></div><div class="kanban">'+cols+'</div>';
  }
  function kcard(o){ return '<div class="kcard"><div class="kt">'+esc(o.nome)+'</div><div class="kc">'+esc(o.conta)+'</div><div class="kv">'+money(o.valor)+' · '+(o.prob||0)+'%</div><div class="kact"><button data-oppmove="-1" data-id="'+o.id+'" title="Voltar" aria-label="Voltar estágio">◀</button><button data-oppmove="1" data-id="'+o.id+'" title="Avançar" aria-label="Avançar estágio">▶</button><button data-oppdel="'+o.id+'" title="Remover" aria-label="Remover oportunidade" style="margin-left:auto">✕</button></div></div>'; }
  function crmLeads(){
    var rows=S.crm.leads.map(function(r){return '<tr><td class="strong">'+ci('leads',r.id,'nome',r.nome)+'</td><td>'+ci('leads',r.id,'empresa',r.empresa)+'</td><td>'+ci('leads',r.id,'origem',r.origem)+'</td><td>'+csel('leads',r.id,'status',r.status,['novo','contatado','qualificado','perdido'])+'</td><td class="r">'+ci('leads',r.id,'valor',r.valor,true)+'</td><td style="white-space:nowrap"><button class="btn tiny" data-leadconv="'+r.id+'">→ Oportunidade</button> <button class="delx" data-crmdel="leads" data-id="'+r.id+'" aria-label="Excluir lead">✕</button></td></tr>';}).join('');
    return '<div class="card p0"><div class="tablewrap"><table><thead><tr><th>Nome</th><th>Empresa</th><th>Origem</th><th>Status</th><th class="r">Valor pot.</th><th>Ações</th></tr></thead><tbody>'+rows+'</tbody></table></div><div class="addbar" style="border:none;padding:1rem"><button class="btn gold sm" data-crmadd="leads">+ Lead</button></div></div>';
  }
  function crmContas(){
    var rows=S.crm.contas.map(function(r){return '<tr><td class="strong">'+ci('contas',r.id,'nome',r.nome)+'</td><td>'+ci('contas',r.id,'segmento',r.segmento)+'</td><td>'+ci('contas',r.id,'cidade',r.cidade)+'</td><td>'+csel('contas',r.id,'dono',r.dono,['Eduardo','Sócio','SDR'])+'</td><td><button class="delx" data-crmdel="contas" data-id="'+r.id+'" aria-label="Excluir conta">✕</button></td></tr>';}).join('');
    return '<div class="card p0"><div class="tablewrap"><table><thead><tr><th>Conta</th><th>Segmento</th><th>Cidade</th><th>Dono</th><th></th></tr></thead><tbody>'+rows+'</tbody></table></div><div class="addbar" style="border:none;padding:1rem"><button class="btn gold sm" data-crmadd="contas">+ Conta</button></div></div>';
  }
  function crmContatos(){
    var rows=S.crm.contatos.map(function(r){return '<tr><td class="strong">'+ci('contatos',r.id,'nome',r.nome)+'</td><td>'+ci('contatos',r.id,'conta',r.conta)+'</td><td>'+ci('contatos',r.id,'cargo',r.cargo)+'</td><td>'+ci('contatos',r.id,'email',r.email)+'</td><td>'+ci('contatos',r.id,'tel',r.tel)+'</td><td><button class="delx" data-crmdel="contatos" data-id="'+r.id+'" aria-label="Excluir contato">✕</button></td></tr>';}).join('');
    return '<div class="card p0"><div class="tablewrap"><table><thead><tr><th>Nome</th><th>Conta</th><th>Cargo</th><th>E-mail</th><th>Telefone</th><th></th></tr></thead><tbody>'+rows+'</tbody></table></div><div class="addbar" style="border:none;padding:1rem"><button class="btn gold sm" data-crmadd="contatos">+ Contato</button></div></div>';
  }
  function crmAtiv(){
    var rows=S.crm.atividades.map(function(r){var d=r.status==='concluida';return '<tr'+(d?' style="opacity:.55"':'')+'><td>'+csel('atividades',r.id,'tipo',r.tipo,['ligacao','email','reuniao','tarefa'])+'</td><td class="strong">'+ci('atividades',r.id,'assunto',r.assunto)+'</td><td>'+ci('atividades',r.id,'quando',r.quando)+'</td><td>'+ci('atividades',r.id,'rel',r.rel)+'</td><td><span class="chip '+(d?'go':'warn')+'">'+(d?'Concluída':'Aberta')+'</span></td><td style="white-space:nowrap"><button class="btn tiny" data-actdone="'+r.id+'">'+(d?'Reabrir':'Concluir')+'</button> <button class="delx" data-crmdel="atividades" data-id="'+r.id+'" aria-label="Excluir atividade">✕</button></td></tr>';}).join('');
    return '<div class="card p0"><div class="tablewrap"><table><thead><tr><th>Tipo</th><th>Assunto</th><th>Quando</th><th>Relacionado</th><th>Status</th><th>Ações</th></tr></thead><tbody>'+rows+'</tbody></table></div><div class="addbar" style="border:none;padding:1rem"><button class="btn gold sm" data-crmadd="atividades">+ Atividade</button></div></div>';
  }

  // ---- ADMINISTRAÇÃO (só admin) ----
  function rAdmin(el){
    var sub=S._adminSub||'usuarios';
    el.innerHTML=''+
    '<div class="vhead"><div><h1>Administração</h1><div class="sub">Identidade, autorização, auditoria e integrações · exclusivo do administrador</div></div><span class="rolebadge admin">Administrador</span></div>'+
    '<div class="card" style="margin-bottom:1.1rem"><strong>Modelo de produção:</strong> autenticação por OIDC/MFA no provedor de identidade; autorização no servidor por relação recurso → organização → usuário. Este console modela as políticas; ele não substitui o backend.</div>'+
    '<div data-subhost><div class="subtabs" role="tablist" aria-label="Seções da administração"><button class="subtab'+(sub==='usuarios'?' active':'')+'" data-sub="usuarios" role="tab" aria-selected="'+(sub==='usuarios')+'">Usuários</button><button class="subtab'+(sub==='papeis'?' active':'')+'" data-sub="papeis" role="tab" aria-selected="'+(sub==='papeis')+'">Políticas</button><button class="subtab'+(sub==='audit'?' active':'')+'" data-sub="audit" role="tab" aria-selected="'+(sub==='audit')+'">Auditoria</button><button class="subtab'+(sub==='integ'?' active':'')+'" data-sub="integ" role="tab" aria-selected="'+(sub==='integ')+'">Integrações &amp; APIs</button></div>'+
      '<div class="subview'+(sub==='usuarios'?' active':'')+'" data-subview="usuarios">'+adminUsers()+'</div>'+
      '<div class="subview'+(sub==='papeis'?' active':'')+'" data-subview="papeis">'+adminRoles()+'</div>'+
      '<div class="subview'+(sub==='audit'?' active':'')+'" data-subview="audit">'+adminAudit()+'</div>'+
      '<div class="subview'+(sub==='integ'?' active':'')+'" data-subview="integ">'+adminInteg()+'</div>'+
    '</div>';
  }
  function usel(id,field,val,opts){ return '<select data-userfield="'+field+'" data-id="'+id+'">'+opts.map(function(o){return '<option value="'+o[0]+'"'+(o[0]===val?' selected':'')+'>'+o[1]+'</option>';}).join('')+'</select>'; }
  function adminUsers(){
    var rows=S.users.map(function(u){
      var perm=(S._perm===u.id)?('<tr><td colspan="7" style="background:var(--surface-2)">'+permEditor(u)+'</td></tr>'):'';
      return '<tr><td class="strong"><input value="'+esc(u.nome)+'" data-userfield="nome" data-id="'+u.id+'"></td>'+
        '<td><input value="'+esc(u.email)+'" data-userfield="email" data-id="'+u.id+'" style="min-width:160px"></td>'+
        '<td>'+usel(u.id,'role',u.role,[['master','Master'],['head','Head'],['user','User']])+'</td>'+
        '<td><input value="'+esc(u.team)+'" data-userfield="team" data-id="'+u.id+'"></td>'+
        '<td>'+usel(u.id,'mfa',u.mfa||'pendente',[['obrigatório','MFA ativo'],['pendente','MFA pendente']])+'</td>'+
        '<td style="text-align:center"><input type="checkbox" data-userfield="ativo" data-id="'+u.id+'"'+(u.ativo?' checked':'')+'></td>'+
        '<td style="white-space:nowrap"><button class="btn tiny" data-permedit="'+u.id+'">Acessos</button> <button class="delx" data-userdel="'+u.id+'" aria-label="Revogar acesso">✕</button></td></tr>'+perm;
    }).join('');
    return '<div class="card p0"><div class="tablewrap"><table><thead><tr><th>Nome</th><th>E-mail</th><th>Papel</th><th>Organização</th><th>MFA</th><th>Ativo</th><th>Ações</th></tr></thead><tbody>'+rows+'</tbody></table></div><div class="addbar" style="border:none;padding:1rem"><button class="btn gold sm" data-useradd>+ Convidar usuário</button></div></div>'+
      '<p class="muted" style="margin-top:.8rem">Convites começam bloqueados. Em produção, o aceite, a senha e o MFA são tratados pelo provedor de identidade; o backend aplica as permissões, nunca o navegador.</p>';
  }
  function permEditor(u){
    var pm=u.perms||PERMS[u.role]||PERMS.user;
    var rows=TOOLS.filter(function(t){return t!=='admin';}).map(function(t){
      return '<tr><td>'+TOOLLBL[t]+'</td>'+['none','read','write'].map(function(lv){return '<td><label style="cursor:pointer;display:inline-flex;gap:.3rem;align-items:center"><input type="radio" name="perm_'+u.id+'_'+t+'"'+(pm[t]===lv?' checked':'')+' data-permtool="'+t+'" data-id="'+u.id+'" value="'+lv+'">'+({none:'—',read:'Leitura',write:'Edição'}[lv])+'</label></td>';}).join('')+'</tr>';
    }).join('');
    return '<div style="padding:.6rem 0"><strong>Permissões de '+esc(u.nome)+' ('+roleLabel(u.role)+')</strong> <span class="muted">definidas pelo master</span><table class="permgrid"><thead><tr><th>Ferramenta</th><th>Nenhum</th><th>Leitura</th><th>Edição</th></tr></thead><tbody>'+rows+'</tbody></table></div>';
  }
  function adminInteg(){
    var checks=fxChecks().map(function(c){return '<div style="display:flex;justify-content:space-between;padding:.35rem 0;border-bottom:1px solid var(--line)"><span>'+c[0]+'</span><span class="chip '+(c[1]?'go':'warn')+'">'+(c[1]?'definido':'pendente')+'</span></div>';}).join('');
    return '<div class="row c2">'+
      '<div class="card"><h3>'+IC.plug+' API bancária de câmbio</h3><div class="field"><label>Banco / provedor</label><input id="api_fxProvider" value="'+esc(S.apis.fxProvider||'')+'" placeholder="Nome do banco ou parceiro"></div><div class="field"><label>Base URL (sandbox ou produção)</label><input id="api_fxBase" value="'+esc(S.apis.fxBase||'')+'" placeholder="https://api.banco.com"></div><div class="field"><label>Referência do segredo no backend</label><input id="api_fxClientRef" value="'+esc(S.apis.fxClientRef||'')+'" placeholder="vault://verax/banco/client-id"></div><div class="field"><label>Autenticação</label><select id="api_fxAuth"><option value="oauth2_mtls"'+(S.apis.fxAuth==='oauth2_mtls'?' selected':'')+'>OAuth 2.0 + mTLS</option><option value="oauth2"'+(S.apis.fxAuth==='oauth2'?' selected':'')+'>OAuth 2.0</option></select></div><div class="field"><label>Ambiente</label><select id="api_fxEnvironment"><option value="sandbox"'+(S.apis.fxEnvironment==='sandbox'?' selected':'')+'>Sandbox</option><option value="produção"'+(S.apis.fxEnvironment==='produção'?' selected':'')+'>Produção</option></select></div><div class="field"><label>Escopos mínimos</label><input id="api_fxScopes" value="'+esc(S.apis.fxScopes||'')+'" placeholder="cotações, operações"></div><div class="field"><label>Referência da chave pública de webhook</label><input id="api_fxWebhookRef" value="'+esc(S.apis.fxWebhookRef||'')+'" placeholder="kms://verax/banco/webhook-key"></div></div>'+
      '<div class="card"><h3>Gate de homologação</h3>'+checks+'<p class="muted" style="margin-top:1rem">Nenhuma chave, token, certificado ou senha é armazenado neste navegador. O backend deve buscar segredos em cofre e validar a resposta e os webhooks do banco.</p></div>'+
      '<div class="card"><h3>'+IC.drive+' Google Drive</h3><div class="field"><label>Pasta · Due Diligence</label><input id="api_driveDD" value="'+esc(S.apis.driveDD||'')+'" placeholder="Link da pasta do Drive"></div><div class="field"><label>Pasta · Crédito</label><input id="api_driveCredito" value="'+esc(S.apis.driveCredito||'')+'" placeholder="Link da pasta do Drive"></div></div>'+
    '</div><button class="btn gold" data-apisave style="margin-top:1.1rem">Salvar configuração não secreta</button>'+
    '<p class="muted" style="margin-top:.8rem">A conexão real só começa após homologação do banco: contrato de API, sandbox, mTLS/OAuth, idempotência, reconciliação e monitoramento.</p>';
  }
  function adminAudit(){
    var rows=(S.audit||[]).map(function(a){return '<tr><td class="num">'+esc(a.when)+'</td><td>'+esc(a.actor)+'</td><td class="strong">'+esc(a.action)+'</td><td>'+esc(a.subject)+'</td><td>'+esc(a.detail)+'</td></tr>';}).join('')||'<tr><td colspan="5" class="muted">Sem eventos registrados.</td></tr>';
    return '<div class="card p0"><div class="tablewrap"><table><thead><tr><th>Quando</th><th>Ator</th><th>Evento</th><th>Objeto</th><th>Detalhe</th></tr></thead><tbody>'+rows+'</tbody></table></div></div><p class="muted" style="margin-top:.8rem">No backend, este log deve ser imutável, incluir IP/correlation ID e ser retido conforme a política da organização.</p>';
  }
  function adminRoles(){
    var rows=['admin','master','head','user'].map(function(r){return '<tr><td><span class="rolebadge '+r+'">'+roleLabel(r)+'</span></td>'+TOOLS.map(function(t){return '<td>'+({none:'—',read:'leitura',write:'edição'}[PERMS[r][t]])+'</td>';}).join('')+'</tr>';}).join('');
    return '<div class="card p0"><div class="tablewrap"><table class="permgrid"><thead><tr><th>Papel</th>'+TOOLS.map(function(t){return '<th>'+TOOLLBL[t]+'</th>';}).join('')+'</tr></thead><tbody>'+rows+'</tbody></table></div></div>'+
    '<p class="muted" style="margin-top:.9rem"><strong>Administrador</strong>: identidade, políticas e integrações. <strong>Master</strong>: operação da organização, sem administração. <strong>Head</strong>: acesso por área. <strong>User</strong>: mínimo necessário. A matriz é uma política de referência: o backend deve verificar cada requisição com o escopo da organização e do recurso.</p>';
  }

  function esc(s){return String(s==null?'':s).replace(/"/g,'&quot;').replace(/</g,'&lt;');}

  // public site nav solidify + parallax + reveal
  var pbar=$('#pbar');
  function ps(){ if(pbar)pbar.classList.toggle('solid', window.scrollY>50); var pl=$('[data-parallax]'); if(pl && !matchMedia('(prefers-reduced-motion:reduce)').matches){var b=pl.parentElement.getBoundingClientRect(); if(b.bottom>0&&b.top<innerHeight)pl.style.transform='translateY('+(b.top*-0.1)+'px)';} }
  addEventListener('scroll',ps,{passive:true}); ps();
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});
  $$('.reveal').forEach(function(x){io.observe(x);});

  // ---- inicialização (após TODOS os listeners e PERMS estarem definidos) ----
  if(S.auth){ try{ show('app'); }catch(e){ if(window.console&&console.error)console.error('init app',e); } }
  else if(location.hash==='#login'){ show('login'); }
})();
