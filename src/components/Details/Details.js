import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import './Details.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import moment from 'moment';
import { Link } from 'react-router-dom';
import { defaultTheme } from './Theme';



function Marker({ text }) {
  return (
    <div className='marker'>
      <i className="bi bi-geo-alt-fill" style={{ fontSize: '30px' }}>{text}</i>
    </div>
  );
}



function Details(props) {

  const [data] = useState(props.data || JSON.parse(localStorage.getItem('data')))


  const employment_type = data.employment_type.map((type, index) => {
    return (
      <div key={index} className="employment_type d-flex justify-content-center align-items-center me-5">
        <p className="type_text mt-2">{type}</p>
      </div>
    )
  })

  const benefits = data.benefits.map((benefit, index) => {
    return (
      <div key={index} className="benefit d-flex justify-content-center align-items-center me-5">
        <p className="benefit_text mt-2">{benefit}</p>
      </div>
    )
  })

  const images = data.pictures.map((image, index) => {
    return (
      <div key={index} className="d-flex justify-content-center align-items-center me-5 mt-4">
        <img src={image} className="picture" alt=''></img>
      </div>
    )
  })




  function toJobBoard() {
    localStorage.clear()
  }


  return (
    <div>
      <div className="mb-5 mt-5 container-xxl">
        <div className="row">
          <div className="col-sm-12 col-md-8 fs-3">
            <nav className="navbar border-bottom">
              <div className="container-fluid justify-content-between">
                <p className="job_details">Job Details</p>
                <div className="block_lg">
                  <div className="save_to_my_list d-flex">
                    <div className="ps-3"><i className="bi bi-bookmark fs-3" id='one'></i></div>
                    <div className="px-3"><p className="save_to_my_list">Save to my list</p></div>
                  </div>
                  <div className="save_to_my_list d-flex">
                    <div className="ps-3"><i className="bi bi-share-fill"></i></div>
                    <div className="px-3"><p className="save_to_my_list">Share</p></div>
                  </div>
                </div>
              </div>
            </nav>
            <nav className="navbar mt-5 block_sm">
              <div className="container-fluid justify-content-between">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="save_to_my_list d-flex">
                    <div className=""><i className="bi bi-star fs-3" id='one'></i></div>
                    <div className="px-3"><p className="save_to_my_list">Save to my list</p></div>
                  </div>
                  <div className="save_to_my_list d-flex">
                    <div className="ps-3"><i className="bi bi-share-fill"></i></div>
                    <div className="px-3"><p className="save_to_my_list">Share</p></div>
                  </div>
                </div>
              </div>
            </nav>
            <div className="mt-5">
              <button type="button" className="btn btn-dark mybtn mybtn1">APPLY NOW</button>
            </div>
            <div className="row d-flex mt-5">
              <div className="col-sm-8 col-lg-10">
                <div className="title">{data.title}</div>
                <div className="mt-4 date">Posted {moment(data.createdAt).fromNow()}</div>
              </div>
              <div className="salary col-sm-4 col-lg-2">
                <div className="money">€ {data.salary}</div>
                <div className="moneyText">Brutto, per year</div>
              </div>
            </div>
            <div className="mt-5">
              {data.description}
            </div>
            <div className="mt-5 mybtn2">
              <button type="button" className="btn btn-dark mybtn">APPLY NOW</button>
            </div>
            <div className="d-flex flex-column">
              <nav className="navbar border-bottom" style={{ marginTop: '100px' }}>
                <div className="container-fluid justify-content-between">
                  <p className="job_details">Additional info</p>
                </div>
              </nav>
              <div className="row">
                <div>
                  <p className="mt-3">Employment type</p>
                  <div className="d-flex">
                    {employment_type}
                  </div>
                </div>
                <div>
                  <p className="mt-5">Benefits</p>
                  <div className="d-flex">
                    {benefits}
                  </div>
                </div>
              </div>
              <nav className="navbar border-bottom" style={{ marginTop: '100px' }}>
                <div className="container-fluid justify-content-between">
                  <p className="job_details">Attached images</p>
                </div>
              </nav>
              <div className="d-flex">
                {images}
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-4 d-flex flex-column">
            <nav className="navbar border-bottom mb-5 contacts" style={{ marginTop: '100px' }}>
              <div className="container-fluid justify-content-between">
                <p className="job_details">Contacts</p>
              </div>
            </nav>
            <div className="map">
              <div className="map-text ">
                <div className="text">
                  <div className="text1">
                    <p>Name: {data.name}.</p>
                  </div>
                  <div className="text2 d-flex mt-4">
                    <i className="bi bi-geo-alt-fill"></i>
                    <div className="ms-2">{data.address}</div>
                  </div>
                  <div className="text3 mt-3">
                    <div>{data.phone}</div>
                    <div>{data.email}</div>
                  </div>
                </div>
                <div className="round"></div>
              </div>
              <div className="google-map">
                <GoogleMapReact
                  bootstrapURLKeys={{ key: "AIzaSyDgtYJYbADlpQFcZlAh12HBTKh7RpUJ5OA" }}
                  defaultCenter={{ lat: data.location.lat, lng: data.location.long }}
                  defaultZoom={14}
                  options={{ styles: defaultTheme }}
                >
                  <Marker
                    lat={data.location.lat}
                    lng={data.location.long}
                  />
                </GoogleMapReact>
              </div>
            </div>
          </div>
        </div >
      </div >
      <div className="return">
        <Link style={{ textDecoration: "none" }} to={{ pathname: "/" }}>
          <button onClick={toJobBoard} type="button" className="btn return_btn d-flex align-items-center justify-content-center">
            <span className="material-icons">chevron_left</span>
            <span>RETURN TO JOB BOARD</span>
          </button>
        </Link>
      </div>
    </div>
  )

}


Details.propTypes = {};

Details.defaultProps = {};

export default Details;
