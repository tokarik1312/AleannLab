import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import styles from './Job.module.css';
import moment from 'moment';
import { Link } from 'react-router-dom';


function Job(props) {

  const [city, setCity] = useState()


  useEffect(() => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${props.location.lat},${props.location.long}&key=AIzaSyDgtYJYbADlpQFcZlAh12HBTKh7RpUJ5OA`)
      .then(res => res.json())
      .then(
        (result) => {
          setCity(result.results[0].formatted_address)
        },
        (error) => {
          console.log(error)
        }
      )
  }, [props.location.lat, props.location.long])



  function handleOnClick() {
    localStorage.setItem('data', JSON.stringify(props));
    props.mySetData(props)
  }


  return (
    <div className={styles.job}>
      <div className={styles.text}>
        <div className={styles.image}>
          <img className={styles.picture} src={props.pictures[0]} alt=''></img>
        </div>
        <div className={styles.block}>
          <div className={styles.title} onClick={handleOnClick}><Link className={styles.navlink} to={{ pathname: "/details" }}>{props.title}</Link></div>
          <div className={styles.address}>Address • {props.address}</div>
          <div className={styles.location}><i className="bi bi-geo-alt-fill"></i> {city}</div>
        </div>
      </div>
      <div className={styles.stars}>
        <ReactStars
          count={5}
          size={24}
          isHalf={true}
          emptyIcon={<i className="bi bi-star-fill star"></i>}
          halfIcon={<i className="bi bi-star-fill star"></i>}
          fullIcon={<i className="bi bi-star-fill star"></i>}
          activeColor="#ffd700"
        />
      </div>
      <div className={styles.block2}>
        <div className={styles.icon}>
          <i className="bi bi-bookmark fs-3" id='one'></i>
        </div>
        <div className={styles.date}>Posted {moment(props.createdAt).fromNow()}</div>
      </div>
    </div>
  );
}

Job.propTypes = {};

Job.defaultProps = {};

export default Job;
