import React, { useEffect, useState } from 'react'
import Loading from '../loading/loading'
import Section1 from './section1/section1'
import Section2 from './section2/section2'
import Section3 from './section3/section3'
import Section4 from './section4/section4'
import Section5 from './section5/section5'
import Section6 from './section6/section6'
import Section7 from './section7/section7'
import {Helmet} from "react-helmet";


function Home() {

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    window.scrollTo({ top: 0 })
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])
  return (
    <div>
      {
        loading ?
          <Loading /> :
          <div>
             <Helmet>
                <meta charSet="utf-8" />
                <title>Home page</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 />
            <Section6 />
            <Section7 />
          </div>
      }
    </div>
  )
}

export default Home