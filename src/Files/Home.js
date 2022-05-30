import React, { useState, useEffect } from 'react'
import axios from 'axios';
export default function Home() {
  const [news, newsdata] = useState([])
  const [search, setSearch] = useState('');

  const searchRecords = () => {
      fetch(`https://hn.algolia.com/api/v1/search?query=${search}`)
           .then((res)=>res.json())
          .then(res => {
            console.log('serach data' , res.hits)
            newsdata(res.hits)
          });

  }
  const getData = () => {
    fetch('http://hn.algolia.com/api/v1/search')
      .then((res) => res.json())
      .then((res) => {
        console.log(res.hits)
        newsdata(res.hits)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
    {/* <li key={i}> {item.author}  {item.url}  {item.created_at}</li> */}
      <h2>React Fetch API Example</h2>
     <div className='container my-2 d-flex justify-content-center'>
     <input
                                        name="new_ques"
                                        className="form-control w-50"
                                        placeholder="Enter news here"
                                        type="text" onKeyUp={searchRecords} onChange={(e) => setSearch(e.target.value)}
                                    />
     </div>
     <div className='container p-3 bg-light'>
        
       
        {news.map((item, i) => {
          return  <div className='row mt-2'>
                       {i}
                   <div className='col-3 mx-1 bg-white '>
                       <p className='text-center text-danger'>{item.title} </p>
                   </div>
                   <div className='col-4 mx-1 bg-white'>
                   <a href={`${item.url}`} target="_blank" className='text-center text-primary'>{item.url} </a>
                   </div>
                   <div className='col-4 mx-1 bg-white'>
                   <p className='text-center text-warning'>{item.created_at} </p>
                   </div>
                </div>
        })}
     
       
     </div>
    </>
  )
}