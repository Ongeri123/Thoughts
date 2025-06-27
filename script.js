
const url = "http://localhost:3000/Posts";

// === Header ===
const topHeader = document.createElement('header');
topHeader.className = 'site-header';
topHeader.innerHTML = '<h1>Thoughts</h1>';
document.body.prepend(topHeader);

// === Blog Post List ===
const container1 = document.createElement('div');
container1.className = 'blog-container1';

const list = document.createElement('ol');
const heading1 = document.createElement('h1');
heading1.className = 'heading-1';
heading1.textContent = 'Blog Post';

list.appendChild(heading1);
container1.appendChild(list);

// === New Post Form ===
const container2 = document.createElement('div');
container2.className = 'new-post-container';

const heading2 = document.createElement('h2');
heading2.className = 'add-post';
heading2.textContent = '+ Add New Post';
container2.appendChild(heading2);

const showFormBtn = document.createElement('button');
showFormBtn.textContent = 'Create New Post';
showFormBtn.className = 'toggle-form-btn';
container2.appendChild(showFormBtn);

const form = document.createElement('form');
form.className = 'new-post-form';

const formContainer = document.createElement('div');
formContainer.className = 'form-container';

const titleInput = document.createElement('input');
titleInput.placeholder = 'Post Title';
titleInput.required = true;

const authorInput = document.createElement('input');
authorInput.placeholder = 'Author Name';
authorInput.required = true;

const imageUrlInput = document.createElement('input');
imageUrlInput.placeholder = 'Image URL';
imageUrlInput.required = true;

const contentInput = document.createElement('textarea');
contentInput.placeholder = 'Write your blog post here...';
contentInput.required = true;

const submitBtn = document.createElement('button');
submitBtn.textContent = '+ Add Post';
submitBtn.className = 'submit-Btn';
submitBtn.type = 'submit';

const cancelBtn = document.createElement('button');
cancelBtn.textContent = 'Cancel';
cancelBtn.className = 'cancel-Btn';
cancelBtn.type = 'button';

formContainer.append(titleInput, authorInput, imageUrlInput, contentInput);
form.append(formContainer, submitBtn, cancelBtn);
container2.appendChild(form);
form.style.display = 'none';

// === Form Interactivity ===
let isEditing = false;
let editingPostId = null;

showFormBtn.onclick = () => {
  form.style.display = 'block';
  showFormBtn.style.display = 'none';
};

cancelBtn.onclick = () => {
  form.reset();
  form.style.display = 'none';
  showFormBtn.style.display = 'inline-block';
  isEditing = false;
  editingPostId = null;
};

form.onsubmit = (e) => {
  e.preventDefault();
  const postData = {
    title: titleInput.value.trim(),
    author: authorInput.value.trim(),
    imageUrl: imageUrlInput.value.trim(),
    content: contentInput.value.trim(),
    date: new Date().toISOString().split('T')[0]
  };
  if (!postData.title || !postData.author || !postData.imageUrl || !postData.content) return;

  if (isEditing && editingPostId) {
    fetch(`${url}/${editingPostId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    }).then(() => location.reload());
  } else {
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...postData, id: Date.now() })
    }).then(() => location.reload());
  }

};

// === Post Pulse Section ===
const container3 = document.createElement('div');
container3.className = 'pulse-tab';

const heading3 = document.createElement('h2');
heading3.className = 'Post-Pulse';
heading3.textContent = 'Post Pulse';
container3.appendChild(heading3);

function displayPostInContainer3(post) {
  container3.innerHTML = '';
  container3.appendChild(heading3);

  const title = document.createElement('h3');
  title.textContent = post.title;

  const author = document.createElement('small');
  author.textContent = 'By ' + post.author;

  const image = document.createElement('img');
  image.src = post.imageUrl;
  image.alt = post.title;

  const content = document.createElement('p');
  content.textContent = post.content;

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.className = 'edit-btn';

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';

  editBtn.onclick = () => {
    titleInput.value = post.title;
    authorInput.value = post.author;
    imageUrlInput.value = post.imageUrl;
    contentInput.value = post.content;
    isEditing = true;
    editingPostId = post.id;
    form.style.display = 'block';
    showFormBtn.style.display = 'none';
  };

  deleteBtn.onclick = () => {
    fetch(`${url}/${post.id}`, { method: 'DELETE' }).then(() => location.reload());
  };

  container3.append(title, author, image, content, editBtn, deleteBtn);
}

// === Layout Assembly ===
const majorContainer = document.createElement('div');
majorContainer.className = 'major-container';
majorContainer.append(container1, container2);

const main = document.createElement('main');
main.className = 'main-content';
main.append(majorContainer, container3);
document.body.appendChild(main);

// === Fetch and Render Posts ===
fetch(url)
  .then(res => res.json())
  .then(posts => {
    posts.forEach(post => {
      const item = document.createElement('li');
      item.className = 'blog-post';

      const title = document.createElement('h3');
      title.textContent = post.title;

      const author = document.createElement('small');
      author.textContent = 'By ' + post.author;

      const clickable = document.createElement('div');
      clickable.className = 'clickable-post';
      clickable.append(title, author);
      clickable.onclick = () => displayPostInContainer3(post);

      item.appendChild(clickable);
      list.appendChild(item);
    });
  });
