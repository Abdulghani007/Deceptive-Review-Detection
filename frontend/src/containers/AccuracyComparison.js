import React from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import ForbiddenMessage from './ForbiddenMessage';
import { get_deceptive_accuracies, get_users } from '../actions/profile';
import { useEffect } from 'react';

const AccuracyComparison = ({isAuthenticated, is_admin, nbd_training_accuracy, nbd_testing_accuracy, rfd_training_accuracy, rfd_testing_accuracy, svmd_training_accuracy, svmd_testing_accuracy, get_users, get_deceptive_accuracies}) => {
    
    useEffect(() => {
        get_deceptive_accuracies();
    }, [])
    
    const state = {
        labels: ['Naive Bayes', 'Random Forest', 'SVM'],
        datasets: [
            {
              label: 'Training',
              backgroundColor: 'rgb(255, 159, 64)',
              // hoverBackgroundColor: [
              // '#501800',
              // '#4B5000',
              // '#175000',
              // ],
              hoverOffset: 4,
              data: [nbd_training_accuracy, rfd_training_accuracy, svmd_training_accuracy]
            }, 
            {
                label: 'Testing',
                backgroundColor: 'rgb(75, 192, 192)',
                // hoverBackgroundColor: [
                // '#501800',
                // '#4B5000',
                // '#175000',
                // ],
                hoverOffset: 4,
                data: [nbd_testing_accuracy, rfd_testing_accuracy, svmd_testing_accuracy]
              },
          ]
    }
    if(isAuthenticated && is_admin) 
    {
        return(
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
                                        text:'Accuracy Comparison for NB, RF and SVM',
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
    email: state.profile.email,
    nbd_training_accuracy: state.profile.nbd_training_accuracy,
    rfd_training_accuracy: state.profile.rfd_training_accuracy,
    svmd_training_accuracy: state.profile.svmd_training_accuracy,
    nbd_testing_accuracy: state.profile.nbd_testing_accuracy,
    rfd_testing_accuracy: state.profile.rfd_testing_accuracy,
    svmd_testing_accuracy: state.profile.svmd_testing_accuracy,
});

export default connect(mapStateToProps, {get_users, get_deceptive_accuracies})(AccuracyComparison);