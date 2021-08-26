import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Bar} from 'react-chartjs-2';
import ForbiddenMessage from './ForbiddenMessage';
import { useEffect } from 'react';
import { get_svmd_accuracy } from '../actions/profile';

const SVMDAccuracy = ({isAuthenticated, is_admin, email, training_accuracy, testing_accuracy, get_svmd_accuracy}) => {
    
    useEffect(() => {
       get_svmd_accuracy();
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
                                        text:'SVM Accuracy for Training and Testing Data',
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
    training_accuracy: state.profile.svmd_training_accuracy,
    testing_accuracy: state.profile.svmd_testing_accuracy, 
}); 

export default connect(mapStateToProps, {get_svmd_accuracy})(SVMDAccuracy);
