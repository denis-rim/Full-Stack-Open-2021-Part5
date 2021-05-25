import React, { useState } from 'react'

const Blog = ({ user, blog, addLike, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const likeBlog = () => {
    blog.likes += 1
    addLike(blog.id, blog)
  }

  const deleteBlog = async () => {
    await removeBlog(blog.id, blog)
  }

  return (
    <div className="blog" style={blogStyle}>
      <div>
        <span>{blog.title}</span>
        <span>{blog.author}</span>
        <button onClick={toggleVisibility}>{!visible ? 'View' : 'Hide'}</button>
      </div>
      {visible && (
        <div>
          <p>Title: {blog.title}</p>
          <p>{blog.url}</p>
          <span id="like-count">
            Likes: {blog.likes}{' '}
            <button id="like-button" onClick={likeBlog}>
              like
            </button>
          </span>
          <p>{blog.author}</p>

          {user.username === blog.user[0].username ? (
            <button onClick={deleteBlog}>Remove</button>
          ) : null}
        </div>
      )}
    </div>
  )
}
export default Blog
