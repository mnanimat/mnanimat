/**
 * MNAnimat - Releases Loader
 * Busca releases públicos de github.com/mnanimat e cria botões de download
 */

const USERNAME = 'mnanimat';
const grid = document.getElementById('releases-grid');

async function fetchJSON(url){
  const r = await fetch(url, { headers: { 'Accept': 'application/vnd.github.v3+json' } });
  if(!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

async function loadReleases(){
  try{
    const repos = await fetchJSON(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`);
    // filtra apenas repos não fork e públicos
    const activeRepos = repos.filter(r => !r.fork).slice(0, 30);

    const allReleases = [];

    // Busca releases em paralelo (limite de 15 para não estourar rate limit)
    const promises = activeRepos.slice(0, 15).map(async repo => {
      try{
        const rels = await fetchJSON(`https://api.github.com/repos/${USERNAME}/${repo.name}/releases?per_page=3`);
        return rels.map(rel => ({ repo, rel }));
      }catch(e){
        return [];
      }
    });

    const results = await Promise.all(promises);
    results.flat().forEach(item => { if(item.rel) allReleases.push(item); });

    // Se não tiver releases, mostra repos com link para releases page
    if(allReleases.length === 0){
      renderReposAsFallback(activeRepos);
      return;
    }

    // Ordena por data de publicação
    allReleases.sort((a,b) => new Date(b.rel.published_at) - new Date(a.rel.published_at));

    grid.innerHTML = '';

    allReleases.slice(0, 24).forEach(({repo, rel}) => {
      const card = document.createElement('div');
      card.className = 'release-card';
      const asset = rel.assets && rel.assets[0];
      const downloadUrl = asset ? asset.browser_download_url : rel.zipball_url || rel.html_url;
      const size = asset ? `(${(asset.size/1024/1024).toFixed(1)} MB)` : '';

      card.innerHTML = `
        <h3>📦 ${repo.name} <span class="tag">${rel.tag_name}</span></h3>
        <p>${rel.name || repo.description || 'Release disponível para download.'}</p>
        <div style="font-size:0.78rem; color:#5a6b85; margin-bottom:10px; font-family:JetBrains Mono">${new Date(rel.published_at).toLocaleDateString('pt-BR')} • ${repo.language || ''} ${size}</div>
        <a class="download-btn" href="${downloadUrl}" target="_blank">⬇️ Baixar ${asset ? asset.name : 'Release'}</a>
        <a href="${rel.html_url}" target="_blank" style="display:block; text-align:center; margin-top:8px; font-size:0.8rem; color:#7c3aed; text-decoration:none;">Ver notas da versão →</a>
      `;
      grid.appendChild(card);
    });

  }catch(err){
    console.error(err);
    grid.innerHTML = `<div class="loading">API do GitHub temporariamente limitada. Use os links diretos abaixo.<br><small>${err.message}</small></div>`;
  }
}

function renderReposAsFallback(repos){
  grid.innerHTML = '';
  repos.slice(0, 18).forEach(repo => {
    const card = document.createElement('div');
    card.className = 'release-card';
    card.innerHTML = `
      <h3>📁 ${repo.name} <span class="tag">${repo.language || 'projeto'}</span></h3>
      <p>${repo.description || 'Projeto público de Micael Nildo'}</p>
      <a class="download-btn" href="${repo.html_url}/releases" target="_blank">⬇️ Ver Releases em GitHub</a>
      <div style="display:flex; gap:8px; margin-top:8px">
        <a href="${repo.html_url}/archive/refs/heads/${repo.default_branch}.zip" style="flex:1; text-align:center; font-size:0.8rem; text-decoration:none; background:#eaf2ff; padding:6px; border-radius:8px">Baixar ZIP</a>
        <a href="${repo.html_url}" style="flex:1; text-align:center; font-size:0.8rem; text-decoration:none; background:#fff; border:1px solid #e2e8f0; padding:6px; border-radius:8px">Código</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Efeito de neve caindo leve com JS (opcional, performance friendly)
function createSnow(){
  const style = document.createElement('style');
  style.textContent = `
  @keyframes fall { 0% { transform: translateY(-10vh) translateX(0) } 100% { transform: translateY(110vh) translateX(20px) } }
  .snowflake{ position:fixed; top:-10px; color:#fff; user-select:none; pointer-events:none; animation-name:fall; animation-timing-function:linear; z-index:9999; text-shadow:0 0 6px rgba(0,229,255,0.8)}
  `;
  document.head.appendChild(style);
  const count = 22;
  for(let i=0;i<count;i++){
    const flake = document.createElement('div');
    flake.className='snowflake';
    flake.textContent = ['❄','❅','❆'][Math.floor(Math.random()*3)];
    flake.style.left = Math.random()*100+'vw';
    flake.style.animationDuration = (8+Math.random()*12)+'s';
    flake.style.animationDelay = Math.random()*8+'s';
    flake.style.fontSize = (8+Math.random()*12)+'px';
    flake.style.opacity = 0.3+Math.random()*0.5;
    document.body.appendChild(flake);
  }
}

loadReleases();
createSnow();
