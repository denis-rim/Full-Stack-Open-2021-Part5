import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("blogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("blogAppUser");
    setUser(null);
  };

  if (!user) return <Login setUser={setUser} />;

  console.log(user);

  return (
    <div className="app">
      <h2>blogs</h2>
      {user && (
        <h3>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </h3>
      )}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
