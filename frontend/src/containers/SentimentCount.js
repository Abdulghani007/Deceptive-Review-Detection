import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Pie, Doughnut} from 'react-chartjs-2';
import ForbiddenMessage from './ForbiddenMessage';
import { get_sentiment_count } from '../actions/profile';
import { useEffect } from 'react';

const SentimentCount = ({isAuthenticated, is_admin, email, positive, neutral, negative, get_sentiment_count}) => {

    useEffect(() => {
        get_sentiment_count();
    }, [])

    const state = {
        labels: ['Positive', 'Neutral', 'Negative'],
        datasets: [
          {
            label: 'Sentiment',
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            // hoverBackgroundColor: [
            // '#501800',
            // '#4B5000',
            // '#175000',
            // ],
            hoverOffset: 4,
            data: [positive, neutral, negative]
          }
        ]
      }

    if(isAuthenticated && is_admin)
        return (
            <div className="m-5">
                {/* <p>Positive: {positive}</p>
                <p>Neutral: {neutral}</p>
                <p>Negative: {negative}</p> */}

                <Doughnut
                    className="doughnut"
                    data={state}
                    width={754}
                    height={400}
                    options = {{
                        maintainAspectRatio: false,
                        plugins:{
                            title:{
                                display:true,
                                text:'Sentiment Analysis for Training Data',
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
    positive: state.profile.positive,
    neutral: state.profile.neutral,
    negative: state.profile.negative
}); 

export default connect(mapStateToProps, {get_sentiment_count})(SentimentCount);
