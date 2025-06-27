# THOUGHTS
This project is a simple frontend blog manager app that interacts with a mock API. You can view, add, edit, and delete blog posts.

# 🛠️ Setup
Create your project structure:
Install JSON Server (mock API):
Add sample data to db.json:
Start the backend:
Use live-server to serve the frontend.


#📡 API Endpoints
Base URL: http://localhost:3000

GET /posts – Get all blog posts.

GET /posts/:id – Get a single post by ID.

POST /posts – Create a new post.

PATCH /posts/:id – Update a post.

DELETE /posts/:id – Delete a post.


# ✅ Core Deliverables
As a user, you can:

1. View All Posts
On page load, run displayPosts() to:

Fetch data from http://localhost:3000/posts.

Render each post's title and image inside the #post-list div.

2. View Post Details
When clicking a title from #post-list, run handlePostClick() to:

Fetch post details (title, content, author).

Render in #post-detail.

3. Add New Post
Listen for submit on form #new-post-form.

In addNewPostListener():

Create a new post object from form inputs.

Append it to #post-list.

(No persistence needed for core deliverables.)

💡 Remember: Add a main() function that runs displayPosts() and addNewPostListener() after the DOM loads.

# 📁 Project Structure

project-folder/
├── index.html
├── css/
│   └── styles.css
├── src/
│   └── index.js
├── db.json

# Code Sample
## Part of js
const url = "http://localhost:3000/Posts";

//Header
const topHeader = document.createElement('header');
topHeader.className = 'site-header';
topHeader.innerHTML =
document.body.prepend(topHeader);

// Blog Post List 
const container1 = document.createElement('div');
container1.className = 'blog-container1';

const list = document.createElement('ol');
const heading1 = document.createElement('h1');
heading1.className = 'heading-1';
heading1.textContent = 'Blog Post';

list.appendChild(heading1);
container1.appendChild(list);

// New Post Form 
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

# Author
The program was crafted by Newton Ongeri, a young tech enthusiast and a future software engineer.

# License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
Newton Ongeri
