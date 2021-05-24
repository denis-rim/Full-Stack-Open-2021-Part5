import React, { useState } from "react";

const Blog = ({ blog, addLike }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const likeBlog = () => {
    blog.likes += 1;
    addLike(blog.id, blog);
  };

  const displayShortInfo = () => (
    <div>
      {blog.title} {blog.author}
    </div>
  );

  const displayFullInfo = () => (
    <div>
      <p>Title: {blog.title}</p>
      <p>{blog.url}</p>
      <p>
        Likes: {blog.likes} <button onClick={likeBlog}>like</button>
      </p>
      <p>{blog.author}</p>
    </div>
  );

  return (
    <div style={blogStyle}>
      {!visible ? displayShortInfo() : displayFullInfo()}
      <button onClick={toggleVisibility}>{!visible ? "View" : "Hide"}</button>
    </div>
  );
};
export default Blog;
