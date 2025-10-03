function createHeader() {
  const topHeader = createElement('header', 'site-header');
  const headerContent = createElement('div', 'header-content');
  const title = createElement('h1', null, 'Thoughts');
  const themeToggle = createElement('div', 'theme-toggle');
  themeToggle.title = 'Toggle theme';
  const toggleSlider = createElement('div', 'toggle-slider');
  
  themeToggle.appendChild(toggleSlider);
  headerContent.append(title, themeToggle);
  topHeader.appendChild(headerContent);
  document.body.prepend(topHeader);
  
  themeToggle.onclick = () => {
    document.body.classList.toggle('dark-theme');
    themeToggle.classList.toggle('active');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
  };
  
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.classList.add('active');
  }
}

function createShareDropdown(post) {
  const shareDropdown = createElement('div', 'share-dropdown');
  shareDropdown.style.display = 'none';
  
  const socialLinks = [
    { name: 'Facebook', icon: ICONS.facebook, url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(post.title)}` },
    { name: 'Twitter', icon: ICONS.twitter, url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}` },
    { name: 'Instagram', icon: ICONS.instagram, url: 'https://www.instagram.com/' },
    { name: 'WhatsApp', icon: ICONS.whatsapp, url: `https://wa.me/?text=${encodeURIComponent(post.title + ' ' + window.location.href)}` }
  ];
  
  socialLinks.forEach(social => {
    const link = document.createElement('a');
    link.innerHTML = `${social.icon} ${social.name}`;
    link.href = social.url;
    link.target = '_blank';
    link.className = 'share-option';
    shareDropdown.appendChild(link);
  });
  
  return shareDropdown;
}

function createActionButtons(post) {
  const buttonContainer = createElement('div', 'button-container');
  const shareContainer = createElement('div', 'share-container');
  
  const shareBtn = document.createElement('button');
  shareBtn.innerHTML = `${ICONS.share} Share`;
  shareBtn.className = 'edit-btn';
  
  const editBtn = createButton('Edit', 'edit-btn', () => {
    titleInput.value = post.title;
    authorInput.value = post.author;
    imageUrlInput.value = post.imageUrl;
    contentInput.value = post.content;
    isEditing = true;
    editingPostId = post.id;
    form.style.display = 'block';
    showFormBtn.style.display = 'none';
  });
  
  const deleteBtn = createButton('Delete', 'delete-btn', () => {
    fetch(`${url}/${post.id}`, { method: 'DELETE' }).then(() => location.reload());
  });
  
  const shareDropdown = createShareDropdown(post);
  
  shareBtn.onclick = (e) => {
    e.stopPropagation();
    shareDropdown.style.display = shareDropdown.style.display === 'none' ? 'block' : 'none';
  };
  
  document.onclick = () => {
    shareDropdown.style.display = 'none';
  };
  
  shareContainer.append(shareBtn, shareDropdown);
  buttonContainer.append(shareContainer, editBtn, deleteBtn);
  return buttonContainer;
}

function createPostContent(post) {
  const title = createElement('h3', null, post.title);
  const author = createElement('small', null, 'By ' + post.author);
  const image = document.createElement('img');
  image.src = post.imageUrl;
  image.alt = post.title;
  const content = createElement('p', null, post.content);
  return { title, author, image, content };
}

function createPostListItem(post) {
  const item = createElement('li', 'blog-post');
  const thumbnail = document.createElement('img');
  thumbnail.src = post.imageUrl;
  thumbnail.alt = post.title;
  thumbnail.className = 'post-thumbnail';
  
  const textContent = createElement('div', 'post-text');
  const title = createElement('h3', null, post.title);
  const author = createElement('small', null, 'By ' + post.author);
  textContent.append(title, author);
  
  const clickable = createElement('div', 'clickable-post');
  clickable.append(thumbnail, textContent);
  clickable.onclick = () => displayPostInContainer3(post);
  
  item.appendChild(clickable);
  return item;
}