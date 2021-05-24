import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import Notification from "./components/Notification";
import AddBlogForm from "./components/AddBlogForm";
import Toggleable from "./components/Toggleable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);

  const blogFormRef = useRef();

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

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        showMessage(
          `a new blog ${blogObject.title} by ${blogObject.author} added`
        );
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

  const likeBlog = (id, blogObject) => {
    blogService
      .like(id, blogObject)
      .then((returnedBlog) => {
        showMessage(`you liked ${blogObject.title}`);
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

  const addBlogForm = () => (
    <Toggleable buttonLabel="Add blog" ref={blogFormRef}>
      <AddBlogForm createBlog={addBlog} />
    </Toggleable>
  );

  return (
    <div className="app">
      <h2>blogs</h2>
      {user && (
        <div>
          <h3>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </h3>
          {addBlogForm()}
        </div>
      )}

      <Notification message={notificationMessage} />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} addLike={likeBlog} />
      ))}
    </div>
  );
};

export default App;
