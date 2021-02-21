import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Posts from './components/Posts'
import Pagination from './components/Pagination'
import logo from './logo.svg'
import './App.css'
import { LastTask } from './components/LastTask'

function App() {
  const [posts, setPosts] = useState([])
  const [filterPost, setFilterPost] = useState('')
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(5)
  const [showLastTask, setShowLastTask] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
      setPosts(res.data)
      setLoading(false)
    }

    fetchPosts()
  }, [])

  const filteredPosts = () => {
    const copyPosts = JSON.parse(JSON.stringify(posts))
    return copyPosts.filter(post => {
      return post.title.toLowerCase().includes(filterPost.toLowerCase())
    })
  }

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts().slice(indexOfFirstPost, indexOfLastPost)
  const paginate = pageNumber => setCurrentPage(pageNumber)

  const searchPost = e => setFilterPost(e.target.value)

  const sortHandler = e => {
    const copyPosts = JSON.parse(JSON.stringify(posts))
    if (e.target.value === 'inc') {
      setPosts(copyPosts.sort((a, b) => (a.id > b.id ? 1 : -1)))
    }
    if (e.target.value === 'dec') {
      setPosts(copyPosts.sort((a, b) => (a.id < b.id ? 1 : -1)))
    }
  }

  const setPageCount = e => {
    setPostsPerPage(parseInt(e.target.value))
  }
  return (
    <div className='container mt-5'>
      <div className='mx-auto text-center'>
        <h1 className='text-success mb-3'>Тестовое задание</h1>
        <button
          className='btn btn-danger mb-3'
          onClick={() => setShowLastTask(!showLastTask)}
        >
          задание №5
        </button>
        {showLastTask && <LastTask />}
        <div className='row mb-3 justify-content-center'>
          <div className='col-3'>
            <div className='input-group mb-3'>
              <input
                type='text'
                className='form-control'
                placeholder='Поиск по названию'
                onChange={searchPost}
              />
            </div>
          </div>

          <div className='col-2'>
            <div className='input-group mb-3 mr-2'>
              <select className='form-select' onChange={sortHandler}>
                <option value='inc'>По возрастанию</option>
                <option value='dec'>По убыванию</option>
              </select>
            </div>
          </div>

          <div className='col-1'>
            <div className='input-group mb-3 mr-2'>
              <select className='form-select' onChange={setPageCount}>
                <option value='5'>5</option>
                <option value='15'>15</option>
                <option value='25'>25</option>
                <option value='50'>50</option>
              </select>
            </div>
          </div>
        </div>

        <Posts posts={currentPosts} loading={loading} />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={filteredPosts().length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  )
}

export default App
