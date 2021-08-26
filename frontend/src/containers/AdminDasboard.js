import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { get_data_counts, get_deceptive_accuracies, get_deceptive_count, get_features, get_nbd_accuracy, get_rfd_accuracy, get_sentiment_count, get_svmd_accuracy, get_t_deceptive_count, get_t_features, get_t_sentiment_count, get_users } from '../actions/profile';
import ButtonCard from './ButtonCard';
import ForbiddenMessage from './ForbiddenMessage';
import Sample from './sample';

const AdminDashboard = ({isAuthenticated, is_admin, email, training_positive_count, training_neutral_count, training_negative_count, training_fake_count, training_genuine_count, get_features, get_sentiment_count, get_deceptive_count, get_t_sentiment_count, get_t_deceptive_count, get_t_features, get_nbd_accuracy, get_rfd_accuracy, get_svmd_accuracy, get_deceptive_accuracies, get_users, get_data_counts}) => {

    useEffect(() => {
        get_data_counts();
    }, [])
    // Training Data
    const [posSuccess, setposSuccess] = useState(false);
    const [negSuccess, setnegSuccess] = useState(false);
    const [neuSuccess, setneuSuccess] = useState(false);
    const [sentimentCount, setSentimentCount] = useState(false);
    const [deceptiveCount, setDeceptiveCount] = useState(false);

    // Actual Reviews
    // const [tPosSuccess, setTPosSuccess] = useState(false);
    // const [tNeuSuccess, setTNeuSuccess] = useState(false);
    // const [tNegSuccess, setTNegSuccess] = useState(false);
    // const [tSentimentCount, setTSentimentCount] = useState(false);
    // const [tDeceptiveCount, setTDeceptiveCount] = useState(false);

    // Accuracy
    // const [nbdAccuracy, setNbdAccuracy] = useState(false);
    // const [rfdAccuracy, setRfdAccuracy] = useState(false);
    // const [svmdAccuracy, setSvmdAccuracy] = useState(false);

    // const [deceptiveAccuracies, setDeceptiveAccuracies] = useState(false)

    // Users
    // const [users, setUsers] = useState(false)
    
    const onSubmit = e => {
        e.preventDefault();
        console.log(e.target.name);
        if(e.target.name === "sentiment_count")
        {
            get_sentiment_count();
            setSentimentCount(true);
        }
        // else if(e.target.name === "t_sentiment_count")
        // {
        //     get_t_sentiment_count();
        //     setTSentimentCount(true);
        // }
        else if(e.target.name === "deceptive_count")
        {
            get_deceptive_count();
            setDeceptiveCount(true);
        }
        // else if(e.target.name === "t_deceptive_count")
        // {
        //     get_t_deceptive_count();
        //     setTDeceptiveCount(true);
        // }
        // else if(e.target.name === "nbd_accuracy")
        // {
        //     get_nbd_accuracy();
        //     setNbdAccuracy(true);
        // }
        // else if(e.target.name === "rfd_accuracy")
        // {
        //     get_rfd_accuracy();
        //     setRfdAccuracy(true);
        // }
        // else if(e.target.name === "svmd_accuracy")
        // {
        //     get_svmd_accuracy();
        //     setSvmdAccuracy(true);
        // }
        // else if(e.target.name === "deceptive_accuracies")
        // {
        //     get_deceptive_accuracies();
        //     setDeceptiveAccuracies(true);
        // }
        // else if(e.target.name === "t_positive" || e.target.name === "t_negative" || e.target.name === "t_neutral")
        // {
        //     // Function all for actual data features
        //     get_t_features(e.target.name);
        //     if(e.target.name === "t_positive")
        //         setTPosSuccess(true);
        //     else if(e.target.name === "t_negative")
        //         setTNegSuccess(true);
        //     else if(e.target.name === "t_neutral")
        //         setTNeuSuccess(true);
        // }
        else if(e.target.name === "positive" || e.target.name === "negative" || e.target.name === "neutral")
        {
            get_features(e.target.name);
            if(e.target.name === "positive")
                setposSuccess(true);
            else if(e.target.name === "negative")
                setnegSuccess(true);
            else if(e.target.name === "neutral")
                setneuSuccess(true);
        } 
        // else if(e.target.name === "users")
        // {
        //     get_users();
        //     setUsers(true);
        // }
    };

    if(posSuccess)
        return <Redirect to='/pos_features' />;
    else if(negSuccess)
        return <Redirect to='/neg_features' />;
    else if(neuSuccess)
        return <Redirect to='/neu_features' />;
    else if(sentimentCount)
        return <Redirect to='/sentiment_count' />;
    else if(deceptiveCount)
        return <Redirect to='/deceptive_count' />;
    // else if(tPosSuccess)
    //     return <Redirect to='/t_pos_features' />;
    // else if(tNegSuccess)
    //     return <Redirect to='/t_neg_features' />;
    // else if(tNeuSuccess)
    //     return <Redirect to='/t_neu_features' />;
    // else if(tSentimentCount)
    //     return <Redirect to='/t_sentiment_count' />;
    // else if(tDeceptiveCount)
    //     return <Redirect to='/t_deceptive_count' />;
    // else if(nbdAccuracy)
    //     return <Redirect to='/nbd_accuracy' />;
    // else if(rfdAccuracy)
    //     return <Redirect to='/rfd_accuracy' />;
    // else if(svmdAccuracy)
    //     return <Redirect to='/svmd_accuracy' />;
    // else if(deceptiveAccuracies)
    //     return <Redirect to='/accuracy_comparison' />;
    // else if(users)
    //     return <Redirect to='/users' />;
 
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

                <div id="training-data-analysis">                    
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                <h1 className="my-3">Training Data Analysis</h1>
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
                                    Name="positive" 
                                    bgColor='bg-premium-dark' 
                                    iconName='far fa-smile-beam fa-lg'
                                    iconColor='text-success'
                                    onSubmit={e => onSubmit(e)} 
                                    value="Positive Features"
                                    text="Traning Data"
                                    count={training_positive_count}
                                />

                                <ButtonCard 
                                    Name="neutral" 
                                    bgColor='bg-midnight-bloom' 
                                    iconName='far fa-meh-rolling-eyes fa-lg'
                                    iconColor='text-bright-blue'
                                    onSubmit={e => onSubmit(e)} 
                                    value="Neutral Features"
                                    text="Training Data"
                                    count={training_neutral_count}
                                />

                                <ButtonCard 
                                    Name="negative" 
                                    bgColor='bg-coal'
                                    iconName='far fa-frown fa-lg'
                                    iconColor='text-danger' 
                                    onSubmit={e => onSubmit(e)} 
                                    value="Negative Features"
                                    text="Training Data"
                                    count={training_negative_count}
                                />
                            </div>
                            </div>
                        </div>
                    </div> 

                    <div className="container my-5">   
                        <div className="card shadow">
                            <div className="card-header bg-dark text-light rounded-radius-top">
                                <h4 className="fw-bold"><i class="fas fa-sort-amount-down-alt"></i> Frequencies</h4>
                            </div>
                            <div class="card-body">
                                <div className="row">
                                    <ButtonCard 
                                        Name="deceptive_count" 
                                        bgColor='bg-opa' 
                                        iconName='fas fa-chart-pie fa-lg' 
                                        iconColor='text-bright-blue' 
                                        onSubmit={e => onSubmit(e)} 
                                        value="Deceptive Count"
                                        text="Training Data"
                                        count={training_fake_count + training_genuine_count}   
                                    />

                                    <ButtonCard Name="sentiment_count" 
                                        bgColor='bg-purple-love' 
                                        iconName='fas fa-chart-pie fa-lg' 
                                        iconColor='text-dull-purple' 
                                        onSubmit={e => onSubmit(e)} 
                                        value="Sentiment Count"
                                        text="Traning Data"
                                        count={training_positive_count + training_neutral_count + training_negative_count}
                                    />
                                </div>   
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div id="accuracy">                    
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                <h1 className="my-3">Algorithm Accuracy</h1>
                            </div>
                        </div>
                    </div>

                    <div className="container my-5">   
                        <div className="card shadow">
                            <div className="card-header bg-dark text-light rounded-radius-top">
                                <h4 className="fw-bold">Accuracy Metrices</h4>
                            </div>
                            <div class="card-body">
                                <div className="row">
                            
                                    <ButtonCard 
                                        Name="nbd_accuracy" 
                                        bgColor='bg-endless-river' 
                                        iconName='far fa-chart-bar fa-lg'
                                        iconColor='text-bright-blue'
                                        onSubmit={e => onSubmit(e)} 
                                        value="NB Accuracy"
                                        
                                    />

                                    <ButtonCard 
                                        Name="rfd_accuracy" 
                                        bgColor='bg-mauve' 
                                        iconName='far fa-chart-bar fa-lg'
                                        iconColor='text-dark-purple'
                                        onSubmit={e => onSubmit(e)} 
                                        value="RF Accuracy"
                                    />
                                    
                                    <ButtonCard 
                                        Name="svmd_accuracy" 
                                        bgColor='bg-pizelex' 
                                        iconName='far fa-chart-bar fa-lg'
                                        iconColor='text-dull-purple'
                                        onSubmit={e => onSubmit(e)} 
                                        value="SVM Accuracy"
                                    />
                                    
                                    <ButtonCard 
                                        Name="deceptive_accuracies" 
                                        bgColor='bg-forest' 
                                        iconName='far fa-chart-bar fa-lg'
                                        iconColor='text-light-brown'
                                        onSubmit = {e => onSubmit(e)} 
                                        value="Accuracy Comparison" 
                                    />
                                </div>
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
                                <h4 className="fw-bold">Feature Extraction</h4>
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
                                    />

                                    <ButtonCard 
                                        Name="t_neutral" 
                                        bgColor='bg-midnight-bloom' 
                                        iconName='far fa-meh-rolling-eyes fa-lg'
                                        iconColor='text-bright-blue'
                                        onSubmit={e => onSubmit(e)} 
                                        value="Neutral Features"
                                    />
                                    <ButtonCard 
                                        Name="t_negative" 
                                        bgColor='bg-lost-memory' 
                                        iconName='far fa-frown fa-lg'
                                        iconColor='text-orange'
                                        onSubmit={e => onSubmit(e)} 
                                        value="Negative Features"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container my-5">   
                        <div className="card shadow">
                            <div className="card-header bg-dark text-light rounded-radius-top">
                                <h4 className="fw-bold">Classification Report</h4>
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
                                    />

                                    <ButtonCard 
                                        Name="t_sentiment_count" 
                                        bgColor='bg-roseanna' 
                                        iconName='fas fa-chart-pie fa-lg' 
                                        iconColor='text-light-pink' 
                                        onSubmit={e => onSubmit(e)} 
                                        value="Sentiment Count"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container my-5">   
                        <div className="card shadow">
                            <div className="card-header bg-dark text-light rounded-radius-top">
                                <h4 className="fw-bold">Users Data</h4>
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
                                    />
                                </div>
                            </div>
                        </div>
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
    positive: state.profile.positive,
    neutral: state.profile.neutral,
    negative: state.profile.negative,
    training_positive_count: state.profile.training_positive_count,
    training_neutral_count: state.profile.training_neutral_count,
    training_negative_count: state.profile.training_negative_count,
    training_fake_count: state.profile.training_fake_count,
    training_genuine_count: state.profile.training_genuine_count,
}); 

export default connect(mapStateToProps, {get_features, get_sentiment_count, get_deceptive_count, get_t_sentiment_count, get_t_deceptive_count, get_t_features, get_nbd_accuracy, get_rfd_accuracy, get_svmd_accuracy, get_deceptive_accuracies, get_users, get_data_counts})(AdminDashboard);