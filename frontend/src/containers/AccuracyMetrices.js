import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { get_data_counts, get_deceptive_accuracies, get_nbd_accuracy, get_rfd_accuracy, get_svmd_accuracy, } from '../actions/profile';
import ButtonCard from './ButtonCard';
import ForbiddenMessage from './ForbiddenMessage';
import Sample from './sample';

const AccuracyMetrices = ({isAuthenticated, is_admin, email, get_nbd_accuracy, get_rfd_accuracy, get_svmd_accuracy, get_deceptive_accuracies, training_count, testing_count, get_data_counts}) => {

    useEffect(() => {
        get_data_counts();
    }, [])

    // Accuracy
    const [nbdAccuracy, setNbdAccuracy] = useState(false);
    const [rfdAccuracy, setRfdAccuracy] = useState(false);
    const [svmdAccuracy, setSvmdAccuracy] = useState(false);

    const [deceptiveAccuracies, setDeceptiveAccuracies] = useState(false)

    
    const onSubmit = e => {
        e.preventDefault();
        console.log(e.target.name);
        if(e.target.name === "nbd_accuracy")
        {
            get_nbd_accuracy();
            setNbdAccuracy(true);
        }
        else if(e.target.name === "rfd_accuracy")
        {
            get_rfd_accuracy();
            setRfdAccuracy(true);
        }
        else if(e.target.name === "svmd_accuracy")
        {
            get_svmd_accuracy();
            setSvmdAccuracy(true);
        }
        else if(e.target.name === "deceptive_accuracies")
        {
            get_deceptive_accuracies();
            setDeceptiveAccuracies(true);
        }

    };

    if(nbdAccuracy)
        return <Redirect to='/nbd_accuracy' />;
    else if(rfdAccuracy)
        return <Redirect to='/rfd_accuracy' />;
    else if(svmdAccuracy)
        return <Redirect to='/svmd_accuracy' />;
    else if(deceptiveAccuracies)
        return <Redirect to='/accuracy_comparison' />;
 
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

                <div id="accuracy">                    
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
                                <h4 className="fw-bold"><i class="fas fa-chart-area"></i> Accuracy Metrices</h4>
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
                                        text='Training & Testing'
                                        count = {training_count + ' & ' + testing_count}
                                        
                                    />

                                    <ButtonCard 
                                        Name="rfd_accuracy" 
                                        bgColor='bg-mauve' 
                                        iconName='far fa-chart-bar fa-lg'
                                        iconColor='text-dark-purple'
                                        onSubmit={e => onSubmit(e)} 
                                        value="RF Accuracy"
                                        text='Training & Testing'
                                        count = {training_count + ' & ' + testing_count}
                                    />
                                    
                                    <ButtonCard 
                                        Name="svmd_accuracy" 
                                        bgColor='bg-pizelex' 
                                        iconName='far fa-chart-bar fa-lg'
                                        iconColor='text-dull-purple'
                                        onSubmit={e => onSubmit(e)} 
                                        value="SVM Accuracy"
                                        text='Training & Testing'
                                        count = {training_count + ' & ' + testing_count}
                                    />
                                    
                                    <ButtonCard 
                                        Name="deceptive_accuracies" 
                                        bgColor='bg-forest' 
                                        iconName='far fa-chart-bar fa-lg'
                                        iconColor='text-light-brown'
                                        onSubmit = {e => onSubmit(e)} 
                                        value="Accuracy Comparison"
                                        text='Training & Testing'
                                        count = {'NB, RF & SVM'} 
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
    training_count: state.profile.training_count,
    testing_count: state.profile.testing_count
}); 

export default connect(mapStateToProps, {get_nbd_accuracy, get_rfd_accuracy, get_svmd_accuracy, get_deceptive_accuracies, get_data_counts})(AccuracyMetrices);