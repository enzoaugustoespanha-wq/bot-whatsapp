exports.phrasesLeft = (getName, sab2, encodeURIComponent) => {
response = [`${encodeURIComponent(getName(sab2.participants[0]))} acaba de sair do grupo!`, `${encodeURIComponent(getName(sab2.participants[0]))}`, `${encodeURIComponent(getName(sab2.participants[0]))} de sair do grupo: ${encodeURIComponent(mdata_2.subject)}`, `Nem gostava de você, eu só digo aleluia por tu ter saído :)`, `Nunca fui com a tua cara, digo glória por tu ter saído!`, `Nada pra ver aqui, ele(a) saiu por um 'acidente'...`]
   return response[Math.floor(Math.random() * response.length)]
}

exports.phrasesWelcome = (mdata_2, getName, sab2, encodeURIComponent) => {
response = [`ao grupo ${encodeURIComponent(mdata_2.subject)}`, `O membro ${encodeURIComponent(getName(sab2.participants[0].split('@')[0]))} acaba de cair de paraquedas aqui no grupo...`, `Leia a descrição do grupo para passar um tempo aqui...`, `Minhas saudações a você, novo membro desconhecido.`]
   return response[Math.floor(Math.random() * response.length)]
}


exports.playResult = (data) => {
  return `      *lıl.ılı.lıll「𝐏𝐋𝐀𝐘 𝐘𝐎𝐔𝐓𝐔𝐁𝐄」llı.ıllı.ılı*

*📄 Título:* ${data.resultado[0].title}
*👤 Canal:* ${data.resultado[0].author.name}
*🕑 Duração:* ${data.resultado[0].timestamp}
*📆 Postagem:* ${data.resultado[0].ago}
*🌐 Id do video:* ${data.resultado[0].videoId}
*📁 Formato:* Mp3
*👀 Visualizações:* ${data.resultado[0].views}
*🤖 Bot: _SANDRO-BOT_*
*🥼 Criador: _SANDRO_*
*🖇 Link:* ${data.resultado[0].url}`
}

exports.playResult = (ytbr) => {
  return `𝙎𝘼𝙉𝘿𝙍𝙊 𝙈𝘿 𝙈𝙀𝙇𝙃𝙊𝙍 𝘽𝙊𝙏 2024`
}

exports.playVideo = (data) => {
  return `      *lıl.ılı.lıll「𝐏𝐋𝐀𝐘 𝐕Í𝐃𝐄𝐎」llı.ıllı.ılı*

*📄 Título:* ${data.resultado[0].title}
*👤 Canal:* ${data.resultado[0].author.name}
*🕑 Duração:* ${data.resultado[0].timestamp}
*📆 Postagem:* ${data.resultado[0].ago}
*🌐 Id do video:* ${data.resultado[0].videoId}
*📁 Formato:* Mp3
*👀 Visualizações:* ${data.resultado[0].views}
*🤖 Bot: _SANDRO-BOT_*
*🥼 Criador: _SANDRO_*
*🖇 Link:* ${data.resultado[0].url}`
} 

exports.playVideo2 = (data) => {
  return `      *lıl.ılı.lıll「𝐏𝐋𝐀𝐘 𝐕Í𝐃𝐄𝐎」llı.ıllı.ılı*

*📄 Título:* ${data.resultado[0].title}
*👤 Canal:* ${data.resultado[0].author.name}
*🕑 Duração:* ${data.resultado[0].timestamp}
*📆 Postagem:* ${data.resultado[0].ago}
*🌐 Id do video:* ${data.resultado[0].videoId}
*📁 Formato:* Mp3
*👀 Visualizações:* ${data.resultado[0].views}
*🤖 Bot: _SANDRO-BOT_*
*🥼 Criador: _SANDRO_*
*🖇 Link:* ${data.resultado[0].url}`
} 

exports.playDocumentResult = (data) => {
  return `      *lıl.ılı.lıll「𝐏𝐋𝐀𝐘 𝐃𝐎𝐂𝐔𝐌𝐄𝐍𝐓𝐎」llı.ıllı.ılı*

*📄 Título:* ${data.resultado[0].title}
*👤 Canal:* ${data.resultado[0].author.name}
*🕑 Duração:* ${data.resultado[0].timestamp}
*📆 Postagem:* ${data.resultado[0].ago}
*🌐 Id do video:* ${data.resultado[0].videoId}
*📁 Formato:* Mp3
*👀 Visualizações:* ${data.resultado[0].views}
*🤖 Bot: _SANDRO-BOT_*
*🥼 Criador: _SANDRO_*
*🖇 Link:* ${data.resultado[0].url}`
}

exports.shazamResult = (data) => {
  return `      *lıl.ılı.lıll「𝐏𝐋𝐀𝐘 𝐘𝐎𝐔𝐓𝐔𝐁𝐄」llı.ıllı.ılı*

*📄 Título:* ${data.resultado[0].title}
*👤 Canal:* ${data.resultado[0].author.name}
*🕑 Duração:* ${data.resultado[0].timestamp}
*📆 Postagem:* ${data.resultado[0].ago}
*🌐 Id do video:* ${data.resultado[0].videoId}
*📁 Formato:* Mp3
*👀 Visualizações:* ${data.resultado[0].views}
*🤖 Bot:_SANDRO-BOT_*
*🥼 Criador: _SANDRO_*
*🖇 Link:* ${data.resultado[0].url}`
} 

exports.playMixResult = (data) => {
return `*Irei enviar 5 resultados, são eles:*\n–\n*1°* ${data.resultado[0].title}\n• *Duração:* ${data.resultado[0].timestamp} | ${data.resultado[0].seconds} segundos.\n–\n*2°* ${data.resultado[1].title}\n• *Duração:* ${data.resultado[1].timestamp} | ${data.resultado[1].seconds} segundos.\n–\n*3°* ${data.resultado[2].title}\n• *Duração:* ${data.resultado[2].timestamp} | ${data.resultado[2].seconds} segundos.\n–\n*4°* ${data.resultado[3].title}\n• *Duração:* ${data.resultado[3].timestamp} | ${data.resultado[3].seconds} segundos.\n–\n*5°* ${data.resultado[4].title}\n• *Duração:* ${data.resultado[4].timestamp} | ${data.resultado[4].seconds} segundos.`
}

exports.spotifyResult = (data, dataUrl, getPreview) => {
return `• ID: *${data.resultado.tracksArray[0].id}*\n–\n• Nome da Música: *${data.resultado.tracksArray[0].title}*\n• Duração: *${dataUrl.resultado.duration}*\n• Nome do(s) Artista(s): *${data.resultado.tracksArray[0].artists.map(v => `${v.name}`).join(', ')}*\n• Url: *${data.resultado.tracksArray[0].url}*\n• Preview 30s: *${getPreview.data}*`
}

exports.syntaxDownloadMusic = () => {
return `Por favor, insira o título de uma música ou vídeo.`
}

exports.syntaxPlayMix = () => {
return `Por favor, coloque um nome de um artista para obter sucesso ao resultado.`
}

exports.igstalk = (data) => {
// Variáveis:
var isPrivateAccount = data.resultado.is_private === true ? "Sim." : data.resultado.is_private === false ? "Não." : undefined
var isMusicProfile = data.resultado.is_music_on_profile === true ? "Sim." : data.resultado.is_music_on_profile === false ? "Não." : undefined
var isAccountBusiness = data.resultado.is_business === true ? "Sim." : data.resultado.is_business === false ? "Não." : undefined
var isVerifiedAccount = data.resultado.is_verified === true ? "Sim." : data.resultado.is_verified === false ? "Não." : undefined
var isHighlight = data.resultado.is_highlight === true ? "Sim." : data.resultado.is_highlight === false ? "Não." : undefined
// Texto de envio:
return `• Usuário(@): *${data.resultado.username}*\n• Link do perfil: *http://instagram.com/${data.resultado.username}*\n• Nome completo do usuário: *${data.resultado.fullname}*\n–\n• Contém música neste perfil? *${isMusicProfile}*\n• Esta conta contém verificado? *${isVerifiedAccount}*\n• Esta conta é privada? *${isPrivateAccount}*\n• Conta empresarial ou pertence a uma empresa? *${isAccountBusiness}*\n• Esta conta contém algum destaque de stories? *${isHighlight}*\n–\n• Número de seguidores do(a) usuário(a): *${data.resultado.followers} seguidores.*\n• Número de pessoas sendo seguidas pelo(a) usuário(a): *${data.resultado.following} seguindo.*\n–\n• *Biografia:*\n${data.resultado.biography}`
}

exports.kwaiDownload = (result) => { 
return `*Legenda:* ${result[0].legenda}\n*Usuário:* ${result[0].author}`
}

exports.tiktokDownload = (data) => {
return `*Usuário:*〔 @${data.resultado.username} 〕\n–\n• *Descrição:* ${data.resultado.description}`
}

exports.soundcloud = (data, tinyUrl) => {
return `*[ SoundCloud ]* - Informações Áudio:\n- \n• *Música:* ${data.resultado.titulo}\n• *Total de Downloads:* ${data.resultado.total_downloads}\n–\n    • Caso o *áudio* não seja enviado, baixe através do link: ${tinyUrl.data}`
}

exports.icmsResult = (data) => {
return `📊 Estado ICMS: *${data.resultado.icms}%*\n–\n• Valor ICMS _(valor líquido/taxa)_: *R$ ${data.resultado.icmsTotal}*\n• Total BRL _(valor apresentado + valor icms, em real.)_: *R$ ${data.resultado.total}*\n• Total USD _(valor apresentado + valor icms, convertido p/dolar)_: *$ ${data.resultado.dolar}*\n–\n📌 *Observação:* O valor na remessa pode ser outro, esse cálculo é uma probabilidade de que pode ser aplicada essa taxa. Também pode variar a *alíquota* de cada estado, que é a tal coisa que está sendo encomendada.\n–\n⚠️ *Como é realizado o cálculo de um valor abaixo de R$50?*\n	 Produto × icms(seu estado) = valor_icms\n	 Produto + valor_icms = total\n–\n⚠️ *Como é realizado o cálculo de um valor acima de R$50?*\n 	 Produto + (60 + icms(seu estado)) = valor_icms\n	 Produto + valor_icms = total`
}

exports.syntaxIcms = (prefix) => {
return `*Ops!* O comando está sendo utilizado de forma errada, _por favor confira abaixo a forma correta de uso, para obter sucesso._\n–\nPara usar este comando é nescessario, usar da seguinte forma: *${prefix}icms 704|82*, _explicando sobre os valores apresentados:_\n      • *704* ‐ O valor que você deseja saber a probabilidade da possível taxa a ser aplicada sobre o valor.\n      • *82* - O ddd do estado onde você mora, ou o que você deseja consultar.`
}

exports.syntaxTrackParcels = (prefix) => {
return `• Coloque o código da encomenda fornecido pelo Correios, abaixo tem a *explicação e o exemplo de uso*:\n–\n⚠️ *Exemplo:* ${prefix}Rastrear [Código]\n    • O *código de rastreamento dos Correios* serve para registrar que uma encomenda foi postada e permite localizá-la durante o processo de envio.\n    • Ele é composto por 9 números e 4 letras, duas delas localizadas no início e duas no final da numeração, como no exemplo: *PC123456789BR*.`
}

exports.invalidCodeRastrear = () => {
return `• *Código inválido ou nenhum resultado foi retornado.* Por favor informe um código válido, _verifique se você seguiu a instrução abaixo:_\n    • Ele é composto por 9 números e 4 letras, duas delas localizadas no início e duas no final da numeração, como no exemplo: *PC123456789BR*.`
}

exports.syntaxNewsGame = (prefix) => {
return `O *comando* está sendo usado de forma incorreta. Por favor, verifique os exemplos apresentados abaixo:\n• *Uso:* ${prefix}gamenews -filter *(total: 12)*\n–\n    • ${prefix}gamenews -cod\n    • ${prefix}gamenews -csgo\n    • ${prefix}gamenews -fortnite\n    • ${prefix}gamenews -fifa\n    • ${prefix}gamenews -gamexp\n    • ${prefix}gamenews -pes\n    • ${prefix}gamenews -lol\n    • ${prefix}gamenews -pokemon\n    • ${prefix}gamenews -premio-sports\n    • ${prefix}gamenews -rainbow-6\n    • ${prefix}gamenews -valorant\n    • ${prefix}gamenews -tcg`
}

exports.syntaxNewsEsportes = (prefix) => {
return `O *comando* está sendo usado de forma incorreta. Por favor, verifique os exemplos apresentados abaixo:\n• *Uso:* .esportenews -filter *(total: 18)*\n–\n    • ${prefix}esportenews -all\n         • Não realiza nenhum filtro, retorna todas as notícias dos esportes sendo de *forma aleatória.*\n–\n    • ${prefix}esportenews -futebol\n         • Realiza um filtro de notícias, retornando como resposta somente notícias sobre *Futebol*.\n–\n    • ${prefix}esportenews -basquete\n         • Realiza um filtro de notícias, retornando como resposta somente notícias sobre *Basquete*.\n–\n    • ${prefix}esportenews -volei\n         • Realiza um filtro de notícias, retornando como resposta somente notícias sobre *Vôlei*.\n–\n    • ${prefix}esportenews -tenis\n         • Realiza um filtro de notícias, retornando como resposta somente notícias sobre *Tênis*.\n–\n    • ${prefix}esportenews -atletismo\n         • Realiza um filtro de notícias, retornando como resposta somente notícias sobre *Atletismo*.\n–\n    • ${prefix}esportenews -natacao\n         • Realiza um filtro de notícias, retornando como resposta somente notícias sobre *Natação*.\n–\n    • ${prefix}esportenews -ciclismo\n         • Realiza um filtro de notícias, retornando como resposta somente notícias sobre *Ciclismo*.\n–\n    • ${prefix}esportenews -boxe\n         • Realiza um filtro de notícias, retornando como resposta somente notícias sobre *Boxe*.\n–\n    • ${prefix}esportenews -beisebol\n         • Realiza um filtro de notícias, retornando como resposta somente notícias sobre *Beisebol*.\n–\n    • ${prefix}esportenews -futebol-eua\n         • Realiza um filtro de notícias, retornando como resposta somente notícias sobre o *Futebol Americano.*\n–\n    • ${prefix}esportenews -judo\n         • Realiza um filtro de notícias, retornando como resposta somente notícias sobre *Judô*.\n–\n    • ${prefix}esportenews -ginastica\n         • Realiza um filtro de notícias, retornando como resposta somente notícias sobre a *Ginástica Artística*.\n–\n    • ${prefix}esportenews -golfe\n          • Realiza um filtro de notícias, retornando como resposta somente notícias sobre *Golfe*.\n–\n    • ${prefix}esportenews -formula-1\n         • Realiza um filtro de notícias, retornando como resposta somente notícias sobre a *Fórmula 1*.\n–\n    • ${prefix}esportenews -futsal\n         • Realiza um filtro de notícias, retornando como resposta somente notícias sobre *Futsal*.\n–\n    • ${prefix}esportenews -surfe\n         • Realiza um filtro de notícias, retornando como resposta somente notícias sobre *Surfe*.\n–\n    • ${prefix}esportenews -skate\n         • Realiza um filtro de notícias, retornando como resposta somente notícias esportivas sobre: *Skate*.`
}

exports.rastrearEncomenda = (data, q) => {
return `• N° de Rastreio: *${q}*\n—\n📌 *Último Status:*\n—\n${data.resultado.lastStatus}\n—\n📦 *Histórico* - Informações detalhadas sobre o trajeto do objeto: ${data.resultado.pathObject}`
}

exports.deezerMusic = (theMusicD, prefix) => {
 return `*[ Deezer ]* - Informações da Música:\n–\n• Música: *${theMusicD.title}*\n• Link Música: *${theMusicD.link}*\n• Duração em segundos: *${theMusicD.duration}s*\n• Album: *${theMusicD.album.title}*\n• Link Album: *${theMusicD.album.title}*\n• Esta música é explícita? *${theMusicD.explicit_lyrics ? 'Sim' : 'Não'}*\n–\n• Nome do Artista: *${theMusicD.artist.name}*\n• Link da Página: *${theMusicD.artist.link}*\n–\nAbaixo será encaminhado uma preview(prévia) da música informada.\n    • Com a duração de apenas *30s*.\n    • Para obter use o comando *${prefix}play* ou baixe o Deezer em sua loja de Apps.`
}

exports.lyrics = (data, II) => {
 return `• Título: *${data.resultado.name}*\n• Artista: *${data.resultado.byArtist.name}*\n• Descrição: *${data.resultado.description}*\n• URL: *${data.resultado.url}*\n• Letra (Original):\n${II}${data.resultado.lyricOriginal}${II}`
}

exports.result_APOD = (dataSab, resultExp) => {
return `🔭 Título - ${dataSab.nasa.title}\n\n🌐📝 Explicação - ${resultExp.result}`
}

exports.searchBooks = (getBook) => {
return `• Titulo: *${getBook.data.volumeInfo.title}*\n• Autor do Livro: *${getBook.data.volumeInfo.authors[0]}*\n• Publicado em: *${getBook.data.volumeInfo.publishedDate}*\n• *Publicado por:* ${getBook.data.volumeInfo.publisher}\n• Quantidade de Paginas: *${getBook.data.volumeInfo.pageCount}*\n–\n• Descrição: *${getBook.data.volumeInfo.description}*\n–\n👓 Ler: *${getBook.data.accessInfo.webReaderLink}*\n➕ Saiba mais: *${getBook.data.volumeInfo.canonicalVolumeLink}*`
}

exports.mediafireDownload = (ABC, encurt) => {
  return `*[ MediaFire ]* - Informações Arquivo:\n–\n• *Nome do Arquivo:* ${ABC.resultado[0].nama}\n• *Tamanho:* ${ABC.resultado[0].size}\n• *Tipo de arquivo a ser enviado:* ${ABC.resultado[0].mime}\n–\n*Por favor, aguarde um pouco estou realizando o envio do arquivo.*\n    • Caso haver um atraso de *2min* pode ser o tamanho do arquivo a ser enviado.\n    • *Não enviou?* Realize o download pelo link: ${encurt.data}`
}

exports.quoteCurrencies = (resposta) => {
return `*[COTAÇÃO]* - Os dados informados são atualizados 24h por dia: 🗣💰\n–\n• Moeda: *${resposta.name}*\n• Valor da moeda mais alto em 24 horas: *R$ ${Number(resposta.high).toFixed(2)}*\n• Valor da moeda mais baixo em 24 horas: *R$ ${Number(resposta.low).toFixed(2)}*\n• Valor da moeda atualizado agora no momento: *R$ ${Number(resposta.bid).toFixed(2)}*`
}

exports.horoscopo = (q, ABC) =>  {
return `Signo: ${q}\n${ABC.resultado.inform}`
}

exports.respostaChatGPT = (anu1) => {
return `${anu1.resultado}`
}

exports.respostaResumida = (anu1) => {
return `${anu1.resultado}`
}

exports.respostaRedacao = (anu1) => {
return `${anu1.result}`
}

exports.respostaBard = (r) => {
return `${r.resultado}`
}

exports.corretorOrtografico = (anu1) => {
return `📖 *Texto corrigido:* ${anu1.resultado}`
}

exports.wikiResposta = (wikis) => {
return `${wikis.data.query.pages[Object.keys(wikis.data.query.pages)].extract}`
}

exports.aptoide = (getApk, sizeApk, lnDown) => {
return `• Nome: *${getApk.name}*\n• Pacote do aplicativo à ser enviado: *${getApk.package}*\n• Tamanho do arquivo à ser enviado por mim: *${sizeApk} MB*\n• Versão do aplicativo à ser enviada por mim: *${getApk.file.vername}*\n——\n• [📁] *Não baixou?* Clique no link abaixo e realize o processo:\n↳ ${lnDown.data}`
}

exports.memesImages = (teks) => { 
return `${teks.titulo} (Baixado por AKAME BOT)`
}

exports.iFunnyVideo = (teks) => { 
return `${teks.titulo} (Baixado por AKAME BOT)`
}

exports.translator = (bla) => {
return `Seu texto foi traduzido com sucesso: ${bla.result}`
}

exports.smartphoneInfo = (smartInfo) => {
return `• *Smartphone:* ${smartInfo.resultado.nomeCelular}\n• *Resumo:* ${smartInfo.resultado.informações}\n–\n• *Informações técnicas sobre o Smartphone:*\n\n${smartInfo.resultado.resumoExtra}`
}

exports.clima = (wttrin) => {
return `⚠️️ Sobre o clima de agora no local.\n–\n→ *Local:* ${wttrin.nearest_area.map((j, i) => j.areaName[i].value+', '+j.region[i].value+', '+j.country[i].value).flat().join(' | ')}\n→ *Temperatura atual:* ${wttrin.current_condition.map(j => j.temp_C).flat().join(' | ')} C° - [${wttrin.current_condition.map(j => j.temp_F).flat().join(' | ')} F°]\n→ *Sensação térmica:* ${wttrin.current_condition.map(j => j.FeelsLikeC).flat().join(' | ')} C° = [${wttrin.current_condition.map(j => j.FeelsLikeF).flat().join(' | ')} F°]\n→ *Umidade do Ar / Ventos:* ${wttrin.current_condition.map(j => j.humidity).flat().join(' | ')}%\n→ *Chuva em polegadas:* ${wttrin.current_condition.map(j => j.precipInches).flat().join(' | ')} Pol - [${wttrin.current_condition.map(j => j.precipMM).flat().join(' | ')} MM]\n→ *Cobertura de nuvens:* ${wttrin.current_condition.map(j => j.cloudcover).flat().join(' | ')}%\n→ *Indice de Ultra-Violeta (UV):* ${wttrin.current_condition.map(j => j.uvIndex).flat().join(' | ')}\n→ *Nivel de visibilidade:* ${wttrin.current_condition.map(j => j.visibility).flat().join(' | ')} KM - [${wttrin.current_condition.map(j => j.visibilityMiles).flat().join(' | ')} M.]\n→ *Descrição do clima:* ${wttrin.current_condition.map(j => j.weatherDesc).flat().map(j => j.value).flat().join(', ')} - [ID #${wttrin.current_condition.map(j => j.weatherCode).flat().join(' | ')}]\n→ *Direção do vento:* ${wttrin.current_condition.map(j => j.winddir16Point).flat().join(', ')} - [${wttrin.current_condition.map(j => j.winddirDegree).flat().join(', ')}°]\n→ *Velocidade dos ventos em KM:* ${wttrin.current_condition.map(j => j.windspeedKmph).flat().join(', ')} KM - [${wttrin.current_condition.map(j => j.windspeedMiles).flat().join(', ')} M.]\n→ *Pressão do ar:* ${wttrin.current_condition.map(j => j.pressure).flat().join(' | ')} hPa - [${wttrin.current_condition.map(j => j.pressureInches).flat().join(' | ')} mmHg]\n–\n️🏘 Algumas informações do local.\n–\n→ *Tipo de requisição:* ${wttrin.request.map(j => j.type).flat().join(' | ')}\n→ *Local da requisição:* ${wttrin.request.map(j => j.query).flat().join(' | ')}\n→ *Local mais aproximado:* ${wttrin.nearest_area.map(j => j.latitude).flat().join(' | ')} Lat. | ${wttrin.nearest_area.map(j => j.longitude).flat().join(' | ')} Lon.\n→ *Total de Habitantes:* ${wttrin.nearest_area.map(j => j.population).flat().join(' | ')}\n→ *Data agora no local:* ${wttrin.current_condition.map(j => j.localObsDateTime).flat().join(', ')}\n→ *Tempo de observação:* ${wttrin.current_condition.map(j => j.observation_time).flat().join(', ')}`
}

exports.movies = (movieInfo) => {
return `• Nome do Filme traduzido para o Português: *${movieInfo.data.results[0].title}*\n• Título no idioma oficial do Filme (${movieInfo.data.results[0].original_language}): *${movieInfo.data.results[0].original_title}*\n• Data de Lançamento: *${movieInfo.data.results[0].release_date}*\n• Avaliações: *${movieInfo.data.results[0].vote_average} - (${movieInfo.data.results[0].vote_count} Votos)*\n• Popularidade do Filme (%): *${movieInfo.data.results[0].popularity.toFixed(1)}%*\n• Classificação adulta? *${movieInfo.data.results[0].adult ? 'Sim.' : 'Não.'}*\n• Linguagem Oficial do Filme: *${movieInfo.data.results[0].original_language}*\n–\n• [🎬] *Sinopse do Filme:*\n↳ ${movieInfo.data.results[0].overview}`
}
 