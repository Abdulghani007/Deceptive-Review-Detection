import React from 'react';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import ForbiddenMessage from './ForbiddenMessage';
import { useState } from 'react';
import { get_users, load_user } from '../actions/profile';
import { useEffect } from 'react';

const UserReviews = ({isAuthenticated, is_admin, users, get_users}) => {

    useEffect(()  => {
        get_users();
    }, []);

    const [pageNumber, setPageNumber] = useState(0);

    const usersPerPage = 5
    const pageVisited = pageNumber * usersPerPage;

    const displayUsers = users.slice(pageVisited, pageVisited + usersPerPage).map((user, index) => {
        return (
            <tr>
                <th scope="row">{pageVisited + index + 1}</th>
                <td>{user.email}</td>
                <td>{(user.review).length > 100 ? (user.review).slice(0, 100) + "..." : user.review}</td>
                <td>{(user.filtered_review).length > 100 ? (user.filtered_review).slice(0, 100) + "..." : user.filtered_review}</td>
                <td>{user.deceptive}</td>
                <td>{user.sentiment}</td>
                <td>{user.last_updated}</td>
            </tr>
        );
    });

    const pageCount = Math.ceil(users.length / usersPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected);
    }
    
    if(isAuthenticated && is_admin)
    {   
        return(
            <div>
                <div className="row align-items-center justify-content-center m-4">
                    <div className="col-md-12 col-lg-12">
                        <table className="table table-hover table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Review</th>
                                    <th scope="col">Filtered Review</th>
                                    <th scope="col">Deceptive</th>
                                    <th scope="col">Sentiment</th>
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
                </div>
            </div>
        );
    }
    else 
    {
        return (
            <ForbiddenMessage />
        );
    }
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    is_admin: state.auth.is_admin,
    users: state.profile.users
});
export default connect(mapStateToProps, {get_users})(UserReviews);