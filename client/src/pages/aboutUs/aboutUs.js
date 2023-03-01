import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import Loading from '../loading/loading'
import Section1 from './section1/section1'
import Section2 from './section2/section2'
import Section3 from './section3/section3'
import Section4 from './section4/section4'
import Section5 from './section5/section5'
function AboutUs() {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    window.scrollTo({ top: 0 })
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])
  return (
    <>

      {
        loading ?
          <Loading />
          :
          <div>
                <Helmet>
                <meta charSet="utf-8" />
                <title>About us</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 />
          </div>}

    </>

  )
}

export default AboutUs