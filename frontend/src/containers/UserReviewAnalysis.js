import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { get_data_counts, get_t_deceptive_count, get_t_features, get_t_sentiment_count, get_users } from '../actions/profile';
import ButtonCard from './ButtonCard';
import ForbiddenMessage from './ForbiddenMessage';
import Sample from './sample';

const UserReviewAnalysis = ({isAuthenticated, is_admin, email, get_t_sentiment_count, get_t_deceptive_count, get_t_features, get_users, users_positive_count, users_neutral_count, users_negative_count, users_fake_count, users_genuine_count, get_data_counts}) => {

    useEffect(() => {
        get_data_counts();
    }, [])
    // Actual Reviews
    const [tPosSuccess, setTPosSuccess] = useState(false);
    const [tNeuSuccess, setTNeuSuccess] = useState(false);
    const [tNegSuccess, setTNegSuccess] = useState(false);
    const [tSentimentCount, setTSentimentCount] = useState(false);
    const [tDeceptiveCount, setTDeceptiveCount] = useState(false);

    // Users
    const [users, setUsers] = useState(false)
    
    const onSubmit = e => {
        e.preventDefault();

        if(e.target.name === "t_sentiment_count")
        {
            get_t_sentiment_count();
            setTSentimentCount(true);
        }
        else if(e.target.name === "t_deceptive_count")
        {
            get_t_deceptive_count();
            setTDeceptiveCount(true);
        }
        else if(e.target.name === "t_positive" || e.target.name === "t_negative" || e.target.name === "t_neutral")
        {
            // Function all for actual data features
            get_t_features(e.target.name);
            if(e.target.name === "t_positive")
                setTPosSuccess(true);
            else if(e.target.name === "t_negative")
                setTNegSuccess(true);
            else if(e.target.name === "t_neutral")
                setTNeuSuccess(true);
        }
        else if(e.target.name === "users")
        {
            get_users();
            setUsers(true);
        }
    };

    if(tPosSuccess)
        return <Redirect to='/t_pos_features' />;
    else if(tNegSuccess)
        return <Redirect to='/t_neg_features' />;
    else if(tNeuSuccess)
        return <Redirect to='/t_neu_features' />;
    else if(tSentimentCount)
        return <Redirect to='/t_sentiment_count' />;
    else if(tDeceptiveCount)
        return <Redirect to='/t_deceptive_count' />;
    else if(users)
        return <Redirect to='/users' />;
 
    if(isAuthenticated && is_admin)
        return (
            <div className="">

                <div className="container my-4">
                    <div className="row">
                        <div className="col-lg-7 col-md-7">
                            <div className="shadow-sm p-3 bg-delicate rounded">
                                <h2 className="text-black-50">{"Welcome " + email} &#127881;</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="user-review-analysis">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                <h1 className="my-3">User Review Analysis</h1>
                            </div>
                        </div>
                    </div>

                    <div className="container my-5">   
                        <div className="card shadow">
                            <div className="card-header bg-dark text-light rounded-radius-top">
                                <h4 className="fw-bold"><i class="fas fa-icons"></i> Feature Extraction</h4>
                            </div>
                            <div class="card-body">
                                <div className="row">
                                    
                                    <ButtonCard 
                                        Name="t_positive" 
                                        bgColor='bg-premium-dark' 
                                        iconName='far fa-smile-beam fa-lg'
                                        iconColor='text-success'
                                        onSubmit={e => onSubmit(e)} 
                                        value="Positive Features"
                                        text="User Reviews"
                                        count = {users_positive_count}
                                    />

                                    <ButtonCard 
                                        Name="t_neutral" 
                                        bgColor='bg-midnight-bloom' 
                                        iconName='far fa-meh-rolling-eyes fa-lg'
                                        iconColor='text-bright-blue'
                                        onSubmit={e => onSubmit(e)} 
                                        value="Neutral Features"
                                        text="User Reviews"
                                        count= {users_neutral_count}
                                    />
                                    <ButtonCard 
                                        Name="t_negative" 
                                        bgColor='bg-lost-memory' 
                                        iconName='far fa-frown fa-lg'
                                        iconColor='text-orange'
                                        onSubmit={e => onSubmit(e)} 
                                        value="Negative Features"
                                        text="User Reviews"
                                        count={users_negative_count}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container my-5">   
                        <div className="card shadow">
                            <div className="card-header bg-dark text-light rounded-radius-top">
                                <h4 className="fw-bold"><i class="fas fa-chart-line"></i> Classification Report</h4>
                            </div>
                            <div class="card-body">
                                <div className="row">
                                    <ButtonCard 
                                        Name="t_deceptive_count" 
                                        bgColor='bg-plum-plate' 
                                        iconName='fas fa-chart-pie fa-lg' 
                                        iconColor='text-dark-primary' 
                                        onSubmit={e => onSubmit(e)} 
                                        value="Deceptive Count"
                                        text="User Reviews"
                                        count={users_fake_count + users_genuine_count}
                                    />

                                    <ButtonCard 
                                        Name="t_sentiment_count" 
                                        bgColor='bg-roseanna' 
                                        iconName='fas fa-chart-pie fa-lg' 
                                        iconColor='text-light-pink' 
                                        onSubmit={e => onSubmit(e)} 
                                        value="Sentiment Count"
                                        text="User Reviews"
                                        count={users_positive_count + users_neutral_count + users_negative_count}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container my-5">   
                        <div className="card shadow">
                            <div className="card-header bg-dark text-light rounded-radius-top">
                                <h4 className="fw-bold"><i class="fas fa-database"></i> Users Data</h4>
                            </div>
                            <div class="card-body">
                                <div className="row">
                                    <ButtonCard 
                                        Name="users" 
                                        bgColor='bg-mauve' 
                                        iconName='fas fa-users fa-lg'
                                        iconColor='text-dark-purple'
                                        onSubmit = {e => onSubmit(e)} 
                                        value="Users Reviews" 
                                        text="User Reviews"
                                        count={users_fake_count + users_genuine_count}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    else{
        return (
            <div>
                <ForbiddenMessage />
                <Sample/>
            </div>
            
        );
    }
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    is_admin: state.auth.is_admin,
    email: state.profile.email,
    users_positive_count: state.profile.users_positive_count,
    users_neutral_count: state.profile.users_neutral_count,
    users_negative_count: state.profile.users_negative_count,
    users_fake_count: state.profile.users_fake_count,
    users_genuine_count: state.profile.users_genuine_count,
}); 

export default connect(mapStateToProps, { get_t_sentiment_count, get_t_deceptive_count, get_t_features, get_users, get_data_counts})(UserReviewAnalysis);