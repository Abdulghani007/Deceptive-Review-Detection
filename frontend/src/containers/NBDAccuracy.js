import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Bar} from 'react-chartjs-2';
import ReactPaginate from 'react-paginate';
import ForbiddenMessage from './ForbiddenMessage';
import { get_nbd_accuracy } from '../actions/profile';
import { useEffect } from 'react';

const NBDAccuracy = ({isAuthenticated, is_admin, email, training_accuracy, testing_accuracy, users_reviews, get_nbd_accuracy}) => {

    useEffect(() => {
        get_nbd_accuracy();
    }, [])

    const state = {
        labels: ['Training', 'Testing'],
        datasets: [
          {
            label: 'Dataset 1',
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 205, 86)'
            ],
            // hoverBackgroundColor: [
            // '#501800',
            // '#4B5000',
            // '#175000',
            // ],
            hoverOffset: 4,
            data: [training_accuracy, testing_accuracy]
          }
        ]
    }

    // const [pageNumber, setPageNumber] = useState(0);

    // const usersPerPage = 2
    // const pageVisited = pageNumber * usersPerPage;

    
    // const displayUsers = users_reviews.slice(pageVisited, pageVisited + usersPerPage).map((user, index) => {
    //     return (
    //         <tr>
    //             <th scope="row">{pageVisited + index + 1}</th>
    //             <td>{user[0]}</td>
    //             <td>{user[1].length > 100 ? user[1].slice(0, 100) + "..." : user[1]}</td>
    //             <td>{user[2].length > 100 ? user[2].slice(0, 100) + "..." : user[2]}</td>
    //             <td>{user[3]}</td>
    //             <td>{user[4]}</td>
    //         </tr>
    //     );
    // })

    // const pageCount = Math.ceil(users_reviews.length / usersPerPage);

    // const changePage = ({selected}) => {
    //     setPageNumber(selected);
    // }
    if(isAuthenticated && is_admin)
        return (
                <div className="container my-5">
                    
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-8 col-lg-6">
                        <Bar
                            data={state}
                            width={600}
                            height={400}
                            options = {{
                                maintainAspectRatio: false,
                                plugins:{
                                    title:{
                                        display:true,
                                        text:'Naive Bayes Accuracy for Training and Testing Data',
                                        font:{
                                            size: 30
                                        },
                                        padding:{
                                            bottom: 15
                                        },
                                        position:'top'
                                    },
                                    legend:{
                                        display:true,
                                        position: 'bottom',
                                        labels:{
                                            padding: 20
                                        }
                                    }
                                
                                }
                                
                            }}
                        />
                        </div>
                    </div>
                    {/* <div className="row align-items-center justify-content-center">
                        <div className="col-md-12 col-lg-12">
                            <table className="table table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Review</th>
                                        <th scope="col">Filtered Review</th>
                                        <th scope="col">Deceptive</th>
                                        <th scope="col">Last Updated</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayUsers}    
                                </tbody>                     
                            </table>      
                        </div>
                    </div>
                    <div className="row align-items-center justify-content-center my-4">
                        <div className="col-md-12 col-lg-12">
                            <ReactPaginate 
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={"paginationBttns"}
                            previousClassName={"previousBttn"}
                            nextClassName={"nextBttn"}
                            disabledClassName={"paginationDisabled"}
                            activeClassName={"paginationActive"}
                            />
                        </div>
                    </div> */}
                </div>
                
        );
    else{
        return (
            <ForbiddenMessage />
        );
    }
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    is_admin: state.auth.is_admin,
    email: state.profile.email,
    training_accuracy: state.profile.nbd_training_accuracy,
    testing_accuracy: state.profile.nbd_testing_accuracy, 
    users_reviews: state.profile.users
}); 

export default connect(mapStateToProps, {get_nbd_accuracy})(NBDAccuracy);
