import React from 'react'
import styles from '../section1/section1.module.scss'
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import pomadaBack from '../../../images/pomadaBack.jpg'
import qaraLogo from '../../../images/qaraLogo.png'
import qaraqiz from '../../../images/qaraqiz.jpg'
import agLogo from '../../../images/agLogo.png'
import agQiz from '../../../images/agQiz.jpg'
function Section1() {
    return (
        <div className={styles.section1}>
            <Carousel fade>
                <Carousel.Item style={{ height: "40rem", width: "100%" }}>
                    <img
                        className="d-block w-100"
                        src={pomadaBack}
                        alt="First slide"
                        style={{ height: "40rem", width: "100%" }}

                    />
                    <Carousel.Caption className={styles.caption}>
                        <img src={qaraLogo} />
                        <h3>ORIGINAL STYLE</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                        <button>VIEW MORE</button>


                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{ height: "40rem", width: "100%" }}>
                    <img
                        className="d-block w-100"
                        src={qaraqiz}
                        alt="Second slide"
                        style={{ height: "40rem", width: "100%" }}

                    />

                    <Carousel.Caption className={styles.captionblack}>
                        <img src={agLogo} />
                        <h3>INFINITE BEAUTY</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Praesent commodo cursus magna, vel scelerisque nisl consect.
                        </p>
                        <button>VIEW MORE</button>


                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{ height: "40rem", width: "100%" }}>
                    <img
                        className="d-block w-100"
                        src={agQiz}
                        alt="Third slide"
                        style={{ height: "40rem", width: "100%" }}
                    />

                    <Carousel.Caption className={styles.caption}>
                        <img src={qaraLogo} />
                        <h3>SUMMER LOOK</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                        <button>VIEW MORE</button>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>


        </div>
    )
}

export default Section1