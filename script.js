// lista de todas as pistas (id, texto)
var textoPistas = {
  F1: "A arma do crime foi roubada do arsenal e estava na cabine, perto do corpo.",
  F2: "Só o Capitão e o Fuzileiro podiam entrar no arsenal.",
  F3: "A chave inglesa da Engenheira estava no arsenal.",
  F4: "O cartão de acesso do arsenal (do Fuzileiro) estava na enfermaria.",
  F5: "A bengala do Fuzileiro estava presa nas engrenagens do gerador.",
  F6: "A coleira do cachorro estava na cabine, perto do corpo.",
  F7: "O Cientista achou a carta de amor da Enfermeira e demorou para contar.",
  F8: "O computador mostra que o robô foi reprogramado.",
  F9: "A Engenheira descobriu que o Capitão tinha um caso com a Enfermeira.",
  F10: "O Recruta mente para proteger a irmã, que é a Engenheira.",
  F11: "O Capitão anotava tudo no diário de bordo."
};

// lista dos locais, com a descrição e as pistas de cada um
var locais = [
  { nome: "Cabine", desc: "O corpo do Capitão está no chão. Perto dele tem uma arma e uma coleira.", pistas: ["F1", "F6"] },
  { nome: "Enfermaria", desc: "É onde a Enfermeira trabalha. Em cima da mesa tem um cartão de acesso.", pistas: ["F4"] },
  { nome: "Geradores", desc: "Aqui fica a energia da nave e o Robô. Tem uma bengala presa nas engrenagens.", pistas: ["F5"] },
  { nome: "Arsenal", desc: "Lugar das armas. Só o Fuzileiro e o Capitão entram. Tem uma ferramenta caída no chão.", pistas: ["F2", "F3"] },
  { nome: "Laboratório", desc: "O Cientista está calmo demais. Ele conta que achou uma carta de amor.", pistas: ["F7"] },
  { nome: "Dormitórios", desc: "Na cama do Capitão tem um caderno com anotações.", pistas: ["F11"] },
  { nome: "Cafeteria", desc: "O Fuzileiro fica fazendo perguntas pessoais para todo mundo. Ele tem medo de ser trocado por um alienígena.", pistas: [] },
  { nome: "Administração", desc: "O Recruta está nervoso. No computador aparece que alguém mexeu no código do Robô.", pistas: ["F8", "F10"] },
  { nome: "Escudos", desc: "Parte que cuida do casco da nave. Não tem nada de estranho aqui.", pistas: [] },
  { nome: "Depósito", desc: "Cheio de caixas. O Robô organiza tudo aqui, mas quando você pergunta dos horários ele só diz erro.", pistas: [] },
  { nome: "Segurança", desc: "Várias telas das câmeras. O Fuzileiro gosta de ficar aqui vigiando todo mundo.", pistas: [] },
  { nome: "Motores", desc: "A Engenheira conserta os motores. Ela diz que já sabia do caso do marido com a Enfermeira.", pistas: ["F9"] },
  { nome: "Reatores", desc: "Fica o núcleo de energia da nave. Não achei nada novo aqui.", pistas: [] }
];

var suspeitos = ["Enfermeira", "Fuzileiro", "Engenheira", "Cientista", "Recruta", "Robô", "Cachorro"];

// resposta quando o jogador erra
var erros = {
  "Enfermeira": "Errado. Se ela tivesse usado o cartão para pegar a arma, ele não estaria na enfermaria (F4).",
  "Fuzileiro": "Errado. A bengala dele estava presa no gerador (F5), então ele não estava no arsenal.",
  "Cientista": "Errado. Ele demorou para contar da carta (F7), mas nada liga ele ao arsenal nem ao crime.",
  "Recruta": "Errado. Ele mente (F10), mas é para proteger outra pessoa. Pense em quem.",
  "Robô": "Errado. O robô foi reprogramado (F8), alguém usou ele para apagar os rastros.",
  "Cachorro": "Errado. A coleira estava na cabine (F6), mas o cachorro só estava lá."
};

var achadas = [];   // pistas que o jogador já achou
var visitados = []; // locais que o jogador já visitou

// mostra os botões dos locais
function mostrarLocais() {
  var html = "";
  for (var i = 0; i < locais.length; i++) {
    var classe = visitados.indexOf(i) >= 0 ? "visitado" : "";
    html += '<button class="' + classe + '" onclick="visitar(' + i + ')">' + locais[i].nome + '</button>';
  }
  document.getElementById("locais").innerHTML = html;
}

// quando clica em um local
function visitar(i) {
  var local = locais[i];
  if (visitados.indexOf(i) < 0) {
    visitados.push(i);
  }
  var html = "<h3>" + local.nome + "</h3><p>" + local.desc + "</p>";
  if (local.pistas.length == 0) {
    html += "<p>Nenhuma pista aqui.</p>";
  }
  for (var j = 0; j < local.pistas.length; j++) {
    var id = local.pistas[j];
    html += '<div class="pista"><b>' + id + ":</b> " + textoPistas[id] + "</div>";
    if (achadas.indexOf(id) < 0) {
      achadas.push(id);
    }
  }
  document.getElementById("cena").innerHTML = html;
  mostrarLocais();
  atualizarPistas();
}

// atualiza a lista de pistas e libera os botões de acusar
function atualizarPistas() {
  var html = "";
  for (var id in textoPistas) {
    if (achadas.indexOf(id) >= 0) {
      html += '<div class="pista"><b>' + id + ":</b> " + textoPistas[id] + "</div>";
    }
  }
  if (html == "") {
    html = "Nenhuma pista ainda.";
  }
  document.getElementById("pistas").innerHTML = html;
  document.getElementById("contador").innerHTML = achadas.length;

  var botoes = document.getElementById("suspeitos").getElementsByTagName("button");
  var liberado = achadas.length == 11;
  for (var k = 0; k < botoes.length; k++) {
    botoes[k].disabled = !liberado;
  }
  if (liberado) {
    document.getElementById("aviso").innerHTML = "Você achou todas as pistas! Quem matou o Capitão?";
  }
}

// quando clica para acusar alguém
function acusar(nome) {
  var r = document.getElementById("resultado");
  if (nome == "Engenheira") {
    r.className = "certo";
    r.innerHTML = "<b>Acertou! A Engenheira matou o Capitão.</b><br><br>" +
      "Ela descobriu a traição do marido com a Enfermeira (F9, F7, F11) e isso deu o motivo. " +
      "A chave inglesa dela estava no arsenal (F3), de onde a arma foi roubada (F1). " +
      "O cartão foi deixado na enfermaria para culpar a Enfermeira (F4), a bengala prendeu o Fuzileiro no gerador (F5), " +
      "o robô foi reprogramado (F8) e o Recruta mentiu para proteger ela (F10).<br><br>" +
      "Conclusão em lógica: p ∨ s ∨ t, ¬p, ¬s, então t (Silogismo Disjuntivo).";
  } else {
    r.className = "errado";
    r.innerHTML = erros[nome];
  }
}

// cria os botões dos suspeitos
var htmlSuspeitos = "";
for (var s = 0; s < suspeitos.length; s++) {
  htmlSuspeitos += '<button disabled onclick="acusar(\'' + suspeitos[s] + '\')">' + suspeitos[s] + "</button>";
}
document.getElementById("suspeitos").innerHTML = htmlSuspeitos;

mostrarLocais();
