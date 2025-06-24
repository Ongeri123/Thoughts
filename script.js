 

//creating a div element to contain the blog post created.
let container1 = document.createElement('div');
container1.className = 'blog-container1';

//creating unordered list inside container1
let list = document.createElement('ol');

//adding list to the blog container
container1.appendChild(list);

let heading1 = document.createElement('h1');
heading1.className = 'heading-1';
heading1.textContent = 'Blog Post';

list.appendChild(heading1);


//creating a div element to contain the form to create a blog.

let container2 = document.createElement('div')
container2.className = 'new-post-container';

let heading2 = document.createElement('h2');
heading2.className = 'add-post';
heading2.textContent = '+ Add New Post';
container2.appendChild(heading2);

let showFormBtn = document.createElement('button');
showFormBtn.textContent = 'Create New Post';
showFormBtn.className = 'toggle-form-btn';

container2.appendChild(showFormBtn)

let form = document.createElement('form');
form.className = 'new-post-form';


// Create input fields
let titleInput = document.createElement('input');
titleInput.type = 'text';
titleInput.placeholder = 'Post Title';
titleInput.required = true;

let authorInput = document.createElement('input');
authorInput.type = 'text';
authorInput.placeholder = 'Author Name';
authorInput.required = true;

let imageUrlInput = document.createElement('input');
imageUrlInput.type = 'text';
imageUrlInput.placeholder = 'Image Url';
imageUrlInput.required = true;

let contentInput = document.createElement('textarea');
contentInput.placeholder = 'Write your blog post here...';
contentInput.required = true;

let submitBtn = document.createElement('button');
submitBtn.type = 'submit';
submitBtn.textContent = 'Add Post';

let cancelBtn = document.createElement('button');
cancelBtn.type = 'submit';
cancelBtn.textContent = 'Cancel';

form.append(titleInput, authorInput, imageUrlInput, contentInput, submitBtn, cancelBtn);


container2.appendChild(showFormBtn);
container2.appendChild(form);

// adding function to create new post function


showFormBtn.addEventListener('click', function() {
  if (form.style.display === 'none') {
    form.style.display = 'block';
  } else {
    form.style.display = 'none';
  }
});


// adding functionality to the create new post button

form.addEventListener('submit', function(event) {
  event.preventDefault(); // stop page reload

  // Get input values
  let title = titleInput.value.trim();
  let author = authorInput.value.trim();
  let imageUrl = imageUrlInput.value.trim();
  let content = contentInput.value.trim();

  if (title && author && imageUrl && content) {
    // Create list item
    let newPost = document.createElement('li');
    newPost.className = 'blog-post';

    // Title
    let postTitle = document.createElement('h3');
    postTitle.textContent = title;

    // Author
    let postAuthor = document.createElement('small');
    postAuthor.textContent = 'By ' + author;

    // Image
    let postImage = document.createElement('img');
    postImage.src = imageUrl;
    postImage.alt = title;
    postImage.style.maxWidth = '100%';

    // Content
    let postContent = document.createElement('p');
    postContent.textContent = content;

    // Append all to post
      newPost.append(postTitle, postAuthor, postImage, postContent);
      
      let postCard = document.createElement('div');
      postCard.className = 'clickable-post';

      postCard.append(postTitle, postAuthor, postImage, postContent);
      newPost.appendChild(postCard); // newPost is your <li>

      postCard.addEventListener('click', function () {
      displayPostInContainer3(title, author, imageUrl, content);
     });

    // Append new post to list
      list.insertBefore(newPost, list.children[1]);


    // Reset form and hide it
    form.reset();
    form.style.display = 'none';
  } else {
    alert('Please fill in all fields.');
  }
   
    newPost.addEventListener('click', function () {
  displayPostInContainer3(title, author, imageUrl, content);
});

});







// document.body.appendChild(container2);

let container3 = document.createElement('div');
container3.className = 'pulse-tab';

let heading3 = document.createElement('h2');
heading3.className = 'Post-Pulse';
heading3.textContent = 'Post Pulse';
container3.appendChild(heading3);


let majorContainer = document.createElement('div');
majorContainer.className = 'major-container';

function displayPostInContainer3(title, author, imageUrl, content) {
  // Clear the existing contents of container3
  container3.innerHTML = '';

  // Re-insert the section heading
  let heading = document.createElement('h2');
  heading.textContent = 'Post Pulse';
  heading.className = 'Post-Pulse';
  container3.appendChild(heading);

  // Build out the selected post
  let postTitle = document.createElement('h3');
  postTitle.textContent = title;

  let postAuthor = document.createElement('small');
  postAuthor.textContent = 'By ' + author;

  let postImage = document.createElement('img');
  postImage.src = imageUrl;
  postImage.alt = title;
  postImage.style.maxWidth = '100%';

  let postContent = document.createElement('p');
  postContent.textContent = content;

  // Append all to the pulse container
  container3.append(postTitle, postAuthor, postImage, postContent);
}


majorContainer.appendChild(container1);
majorContainer.appendChild(container2);


document.body.appendChild(majorContainer);
document.body.appendChild(container3);
