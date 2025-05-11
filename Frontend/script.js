const routes = {
    home: 'home1.html',
    forum: 'forum.html',
    profile: 'profile.html',
    event: 'event.html',
    framework: 'framework.html',
    networks: 'networks.html',
  };
  
  function navigate(pageName) {
    location.hash = pageName; 
  }
  
  function loadPage() {
    const hash = location.hash.slice(1); 
    const page = routes[hash] || routes['home']; 
    fetch(page)
      .then(res => res.text())
      .then(data => {
        document.getElementById('content').innerHTML = data;
      })
      .catch(() => {
        document.getElementById('content').innerHTML = '<h2>😢 Page Not Found</h2>';
      });
  }
  
  window.addEventListener('hashchange', loadPage);
  window.addEventListener('load', loadPage);
  
  document.querySelectorAll('.like-btn').forEach(button => {
    button.addEventListener('click', () => {
      const img = button.querySelector('img');
      img.classList.toggle('liked');
    });
  });