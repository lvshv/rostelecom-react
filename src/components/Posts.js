import React from 'react'

const Posts = ({ posts, loading }) => {
  if (loading) {
    return (
      <div className='spinner-border text-warning' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    )
  }

  return (
    <ul className='list-group mb-4 col-8 mx-auto'>
      {posts.map(post => {
        return (
          <li key={post.title} className='list-group-item'>
            <div className=''>
              <div className='row'></div>
              <span className='badge rounded-pill bg-info text-dark'>
                пост №{post.id}
              </span>
              <h5 className='my-3'>{post.title.toUpperCase()}</h5>
              <p className=''>{post.body}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default Posts
