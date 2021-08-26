import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Pie} from 'react-chartjs-2';
import ForbiddenMessage from './ForbiddenMessage';
import { get_deceptive_count } from '../actions/profile';
import { useEffect } from 'react';

const DeceptiveCount = ({isAuthenticated, is_admin, email, fake, genuine, get_deceptive_count}) => {

    useEffect(() => {
        get_deceptive_count();
    }, [])
    
    const state = {
        labels: ['Fake', 'Genuine'],
        datasets: [
          {
            label: 'Deceptive',
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
            ],
            // hoverBackgroundColor: [
            // '#501800',
            // '#4B5000',
            // '#175000',
            // ],
            hoverOffset: 4,
            data: [fake, genuine]
          }
        ]
      }

    if(isAuthenticated && is_admin)
        return (
            <div className="m-5">
                {/* <p>Positive: {positive}</p>
                <p>Neutral: {neutral}</p>
                <p>Negative: {negative}</p> */}

                <Pie
                    data={state}
                    width={754}
                    height={400}
                    options = {{
                        maintainAspectRatio: false,
                        plugins:{
                            title:{
                                display:true,
                                text:'Deceptive count for training data',
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
        );
    else{
        return (
            // <div className = 'container'>
            //     <div className = 'mt-5 p-5 bg-white rounded-3'>
            //         <h1 className = 'display-4 fw-bold'>403 Forbidden</h1>
            //         <p>
            //             You do not have access to this page please login and try again.
            //         </p>
            //         <hr className = 'my-4' />
            //         <p>Click the button to login and get started.</p>
            //         <Link className = 'btn btn-primary fw-bold' exact to='/login'>Login</Link>
            //     </div>
            // </div>
            <ForbiddenMessage />
        );
    }
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    is_admin: state.auth.is_admin,
    email: state.profile.email,
    fake: state.profile.fake,
    genuine: state.profile.genuine
}); 

export default connect(mapStateToProps, {get_deceptive_count})(DeceptiveCount);
