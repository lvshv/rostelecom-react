import React, { useState } from 'react'

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <ul className='pagination justify-content-center'>
        {pageNumbers.map(number => {
          return (
            <li
              key={number}
              className={
                currentPage === number ? 'page-item active' : 'page-item'
              }
            >
              <a
                onClick={() => paginate(number)}
                href='!#'
                className='page-link'
              >
                {number}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Pagination
