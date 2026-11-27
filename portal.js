import {auth,db} from "./firebase-app.js";
import {onAuthStateChanged} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";
import {collection,doc,getDocFromServer,getDocs,addDoc,serverTimestamp,query,where} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";
const el=(tag,t)=>{const e=document.createElement(tag);e.textContent=t;return e;};
const section=document.querySelector("main section");
const tipo=section?.id==="agendar"?"visitas":section?.id==="apadrinhar"?"apadrinhamentos":null;
if(tipo){
 const antigo=section.querySelector(tipo==="visitas"?".card-bloqueado":".card-crianca");
 if(tipo==="apadrinhamentos"){const h=antigo?.previousElementSibling;if(h?.tagName==="H2")h.remove();}
 antigo?.remove();
 const area=el("div","");area.className="card-suave";section.append(area);
 onAuthStateChanged(auth,async u=>{
 area.replaceChildren();if(!u){area.append(el("p","Entre na sua conta para enviar uma solicitação."));return;}
 const form=el("form",""), texto=el("textarea",""), data=el("input",""), status=el("p",""), b=el("button","Enviar solicitação");
 texto.className=data.className="campo-input";texto.placeholder="Mensagem (não inclua dados de crianças)";texto.maxLength=500;texto.required=true;texto.setAttribute("aria-label","Mensagem");data.type="date";data.required=tipo==="visitas";data.setAttribute("aria-label","Data desejada");data.min=new Date().toLocaleDateString("en-CA");b.className="btn-coral-block";
 form.append(texto);if(tipo==="visitas")form.append(el("label","Data desejada"),data);form.append(b,status);area.append(form);
 async function historico(){try{const s=await getDocs(query(collection(db,tipo),where("uid","==",u.uid)));if(auth.currentUser?.uid!==u.uid)return;const old=area.querySelector(".historico");old?.remove();const h=el("div","");h.className="historico";h.append(el("h3","Minhas solicitações"));for(const d of s.docs)h.append(el("p",[d.data().data,d.data().status].filter(Boolean).join(" — ")));area.append(h);}catch(e){status.textContent="Histórico indisponível.";}}
 form.onsubmit=async e=>{e.preventDefault();if(auth.currentUser?.uid!==u.uid)return;b.disabled=true;try{await addDoc(collection(db,tipo),{uid:u.uid,email:u.email,texto:texto.value.trim(),data:tipo==="visitas"?data.value:"",status:"pendente",criadoEm:serverTimestamp()});form.reset();status.textContent="Solicitação enviada!";await historico();}catch(e){status.textContent="Não foi possível enviar. Verifique sua conta e tente novamente.";}finally{b.disabled=false;}};await historico();
 });
}
const pub=section?.id==="inicio"?"avisos":section?.id==="ajudar"?"doacoes":section?.id==="sobre"?"institucional":null;
if(pub){getDocs(collection(db,pub)).then(s=>{if(s.empty)return;section.append(el("h2",pub==="avisos"?"Avisos e notícias":pub==="doacoes"?"Necessidades de doações":"Informações da instituição"));for(const d of s.docs){const c=el("article","");c.className="card-suave";c.append(el("h4",d.data().titulo),el("p",d.data().texto));section.append(c);}}).catch(console.error);}
onAuthStateChanged(auth,async u=>{document.getElementById("link-admin")?.remove();if(!u)return;try{const a=await getDocFromServer(doc(db,"administradores",u.uid));if(auth.currentUser?.uid!==u.uid||!a.exists()||a.data().ativo!==true)return;const link=el("a","Administração");link.id="link-admin";link.href="admin.html";link.className="item-menu";document.getElementById("menu")?.append(link);}catch(e){console.error("Admin:",e.code);}});
