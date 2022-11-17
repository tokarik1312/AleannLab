import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import styles from './Job-list.module.css';
import "./main.scss";
import Job from '../Job/Job'



function JobList(props) {



  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [jobs, setJobs] = useState([])
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 8;
  const pagesVisited = pageNumber * usersPerPage;



  useEffect(() => {
    fetch("https://api.json-generator.com/templates/ZM1r0eic3XEy/data?access_token=wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setJobs(result.slice(0, 50));
        }, 
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])


console.log(jobs)

  const pageCount = Math.ceil(jobs.length / usersPerPage);


  function handlePageClick(page) {
    setPageNumber(page.selected)
  }



  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className={styles.block}>
        <div>
          {
            jobs.slice(pagesVisited, pagesVisited + usersPerPage).map((job) => {
              return <Job
                key={job.id}
                id={job.id}
                title={job.title}
                address={job.address}
                pictures={job.pictures}
                location={job.location}
                createdAt={job.createdAt}
                benefits={job.benefits}
                description={job.description}
                email={job.email}
                employment_type={job.employment_type}
                name={job.name}
                phone={job.phone}
                salary={job.salary}
                updatedAt={job.updatedAt}
                mySetData={props.mySetData}></Job>
            })
          }
        </div>

        <ReactPaginate
          previousLabel={<span className="material-icons arrow1">chevron_left</span>}
          nextLabel={<span className="material-icons arrow2">chevron_right</span>}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"page justify-content-center"}
          pageClassName={"page__btn"}
          pageLinkClassName={"page__numbers"}
          previousClassName={"arrow1"}
          previousLinkClassName={"arrow1"}
          nextClassName={"arrow2"}
          nextLinkClassName={"arrow2"}
          breakClassName={"page__dots"}
          breakLinkClassName={"page__dots"}
          activeClassName={"active"}
        />

      </div>
    );
  }



}

JobList.propTypes = {};

JobList.defaultProps = {};

export default JobList;
