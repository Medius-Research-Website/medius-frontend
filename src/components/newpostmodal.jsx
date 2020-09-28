import React, { Component, useState } from "react";
import './css_files/newpostmodal.scss';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { toggleNewPostModal, createPost } from "../actions";
const InitialState=0;
const IdeaFormState=1;
const FileFormState=2;
class NewPostModal extends Component{
    
    constructor(props){
        super(props);
        this.state={
            formState:InitialState
        }
    }
    submit(post){
        //handleSubmission
        console.log(post);
        //this.props.createPost(post,this.props.history);
        //still have error: Action mus be a plain object ....
        this.closeModal();
    }
    submitFile(files){
        console.log(files);
        //need action to handle this
        this.closeModal();
    }
    closeModal(){
        this.setState({formState:InitialState})
        this.props.toggleNewPostModal();
    }
    render(){
        if (this.props.show)
            return(
                <div className="feed__modal">
                    <div onClick={this.closeModal.bind(this)} className="feed__modal__background"/>
                    <div className="feed__modal__form">
                        <button onClick={this.closeModal.bind(this)} className="feed__modal__form__close-button">x</button>
                        <p className="feed__modal__form__title">
                             Something on your mind ?
                        </p>      
                        {(this.state.formState===InitialState)
                        ?(<div className="feed__modal__form__main feed__modal__form__main--ini">
                            <div className="feed__modal__form__main--ini__idea" onClick={(e)=>{this.setState({formState : IdeaFormState});}}>
                                <span>
                                    post an investment idea
                                </span>
                            </div>
                            <div className="feed__modal__form__main--ini__file" onClick={(e)=>{this.setState({formState : FileFormState});}}>
                                <span>
                                    upload a file
                                </span>
                            </div>
                        </div>)
                        :((this.state.formState===IdeaFormState)
                        ?(<InvestmentIdeaForm  submit={this.submit.bind(this)}/>)
                        :(<FileUpLoadForm submit={this.submitFile.bind(this)} />)
                        )}  
                    
                    </div>
                </div>
            )
        else
            return <React.Fragment/>;
    }
}
const InvestmentIdeaForm = (props)=>{
    const [ticker,setTicker] = useState("");
    const [idea, setIdea]=useState("");
    const [insight, setInsight] = useState("");
    const [sell,setSell] = useState(true);
    const [errorMessages, setErrorMessages]=useState([]);
    const submitHandler = ()=>{
        setErrorMessages([]);
        let ifError=false;
        if (ticker==="")
            {
                setErrorMessages(prev=>[...prev,"Ticker cannot be left empty"]);
                ifError=true;
            }
        if (insight==="")
            {
                setErrorMessages(prev=>[...prev,"Insight field cannot be left empty"]);
                ifError=true;
            }
        
        if (ifError) return;
        
        let post={
            idea,
            insight,
            ticker,
            sell,
            date:new Date()
        }
        props.submit(post);
        
    }
    return(
        <div className="feed__modal__form__main">
            <input 
                value={ticker}
                onChange={(e)=>{setTicker(e.target.value)}}
                className="input--ticker"
                type="text" placeholder="Company Ticker"/>
            <input 
                value={insight}
                onChange={(e)=>{setInsight(e.target.value)}}
                className="input--insight"
                type="text" placeholder="What is your unique insight? (int one sentence)"/>
            <input 
                value={idea}
                onChange={(e)=>{setIdea(e.target.value)}}
                className="input--idea"
                type="text" placeholder="Investment Idea (5 to 7 sentences)"/>
            <div className="input--toggle-and-submit">
                <span className={`${sell?null:"inactive"}`}>Sell</span>
                <Switch 
                    value={!sell}
                    toggle={()=>{setSell(prev=>!prev);}}/>
                <span className={`${sell?"inactive":null}`}>Buy</span>
                <button onClick={submitHandler} className="input--submit"> Post </button>
            </div>
            {errorMessages.map((errorMessage,idx)=>
                <p key={idx} className="input--error">{errorMessage}</p>
            )
            }
        </div>
    )
}
const Switch = (props)=>{
    return (
        <div onClick={props.toggle} className="form__switch">
            <div className={`form__switch__slider ${props.value?"active":null}`}/>
        </div>
    )
}
const FileUpLoadForm = (props)=>{
    const submitHandler=()=>{
        let element=document.querySelector(".js-file-uploader");
        if (!element) return;
        let files=element.files;
        props.submit(files);
    }
    return(
        <div className="feed__modal__form__main">
            <input className="js-file-uploader" type="file"/>
            <button onClick={submitHandler} className="input--submit"> Post </button>
        </div>
    )

}
const mapStateToProps = (state)=>({
    show:state.posts.newPostModal,
});


export default withRouter(connect(mapStateToProps,{toggleNewPostModal, createPost})(NewPostModal));