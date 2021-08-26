import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Pie} from 'react-chartjs-2';
import ForbiddenMessage from './ForbiddenMessage';
import { useEffect } from 'react';
import { get_t_deceptive_count } from '../actions/profile';

const TDeceptiveCount = ({isAuthenticated, is_admin, email, fake, genuine, get_t_deceptive_count}) => {

    useEffect(() => {
        get_t_deceptive_count();
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
                                text:'Deceptive Count for Actual Reviews',
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
            <ForbiddenMessage />
        );
    }
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    is_admin: state.auth.is_admin,
    email: state.profile.email,
    fake: state.profile.t_fake,
    genuine: state.profile.t_genuine
}); 

export default connect(mapStateToProps, {get_t_deceptive_count})(TDeceptiveCount);
