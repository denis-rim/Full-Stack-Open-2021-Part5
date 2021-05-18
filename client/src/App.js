import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs))
      .catch((error) => {
        showMessage("Something went wrong. Please try again later.", "error");
      });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("blogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const showMessage = (text, type) => {
    setNotificationMessage({ text, type });

    setTimeout(() => {
      setNotificationMessage(null);
    }, 4000);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("blogAppUser");
    setUser(null);
  };

  const handleAddBlog = (event) => {
    event.preventDefault();

    const blogObject = {
      title,
      author,
      url,
    };

    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        showMessage(`a new blog ${title} by ${author} added`);
        setTitle("");
        setAuthor("");
        setUrl("");
      })
      .catch((error) => {
        if (!error.response.data.errorMessage) {
          return showMessage(
            "Something went wrong. Please try again later.",
            "error"
          );
        }
        showMessage(error.response.data.errorMessage, "error");
      });
  };

  if (!user) return <Login setUser={setUser} />;

  return (
    <div className="app">
      <h2>blogs</h2>
      {user && (
        <h3>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </h3>
      )}

      <Notification message={notificationMessage} />

      <h3>Add Blog</h3>
      <div style={{ margin: "2rem 0" }}>
        <form onSubmit={handleAddBlog}>
          <div>
            title
            <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url
            <input
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">Add blog</button>
        </form>
      </div>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
