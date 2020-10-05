import React, { Component, useState } from "react";
import './css_files/newpostmodal.scss';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { toggleNewPostModal, createPost } from "../actions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb, faUpload, faNewspaper } from '@fortawesome/free-solid-svg-icons'

const INITIAL_STATE=0;
const IDEA_FORM_STATE=1;
const FIRE_FORM_STATE=2;
const ARTICLE_FORM_STATE=3;
class NewPostModal extends Component{
    
    constructor(props){
        super(props);
        this.state={
            formState:INITIAL_STATE
        }
    }

    submit(post){
        //handleSubmission
        console.log(post);
        this.props.createPost(post, this.props.history);
        //still have error: Action mus be a plain object ....
        this.closeModal();
    }

    submitFile(files){
        console.log(files);
        //need action to handle this
        this.closeModal();
    }

    submitArticle(post){
        console.log(post);
        //need action handdle this
        this.closeModal();
    }

    closeModal(){
        this.setState({formState:INITIAL_STATE})
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
                        {(this.state.formState===INITIAL_STATE)
                        ?(<div className="feed__modal__form__main feed__modal__form__main--ini">
                            <div className="feed__modal__form__main--ini__idea" onClick={(e)=>{this.setState({formState : IDEA_FORM_STATE});}}>
                                <FontAwesomeIcon icon={faLightbulb} className="fa-7x icon"/> 
                                <span>post an investment idea</span>
                            </div>
                            <div className="feed__modal__form__main--ini__file" onClick={(e)=>{this.setState({formState : FIRE_FORM_STATE});}}>
                                <FontAwesomeIcon icon={faUpload} className="fa-7x icon"/>
                                <span>upload a file</span>
                            </div>
                            <div className="feed__modal__form__main--ini__article" onClick={(e)=>{this.setState({formState : ARTICLE_FORM_STATE});}}>
                                <FontAwesomeIcon icon={faNewspaper} className="fa-7x icon"/>
                                <span>write an article</span>
                            </div>
                        </div>)
                        :((this.state.formState===IDEA_FORM_STATE)
                            ?(<InvestmentIdeaForm  submit={this.submit.bind(this)}/>)
                            :((this.state.formState===FIRE_FORM_STATE)
                                ?(<FileUpLoadForm submit={this.submitFile.bind(this)} />)
                                :(<ArticleForm submit={this.submitArticle.bind(this)}/>))
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
            date:new Date(),
            type:"idea"
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
            <textarea 
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
                <button onClick={submitHandler} className="input--submit btn btn-success"> Post </button>
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
        props.submit({files,type:"report"});
    }
    return(
        <div className="feed__modal__form__main">
            <input className="js-file-uploader" type="file"/>
            <button onClick={submitHandler} className="input--submit btn btn-success"> Post </button>
        </div>
    )

}



const ArticleForm = (props)=>{
    const [title, setTitle] = useState("");
    const [bodyContent, setBody]=useState("");
    
    const [errorMessages, setErrorMessages]=useState([]);
    const submitHandler = ()=>{
        setErrorMessages([]);
        let ifError=false;
        if (title==="")
            {
                setErrorMessages(prev=>[...prev,"Title cannot be left empty"]);
                ifError=true;
            }
        if (bodyContent==="")
            {
                setErrorMessages(prev=>[...prev,"Body field cannot be left empty"]);
                ifError=true;
            }
        
        if (ifError) return;
        
        let post={
            title,
            body:bodyContent,
            type:"article"
        }
        props.submit(post);
    }
    return(
        <div className="feed__modal__form__main">
            <input 
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}}
                className="input--title"
                type="text" placeholder="Artcile Title"/>
            <textarea 
                value={bodyContent}
                onChange={(e)=>{setBody(e.target.value)}}
                className="input--body"
                type="text" placeholder="Article body"/>
            
            <button onClick={submitHandler} className="input--submit btn btn-success"> Post </button>
            {errorMessages.map((errorMessage,idx)=>
                <p key={idx} className="input--error">{errorMessage}</p>
            )
            }
        </div>
    )
}
const mapStateToProps = (state)=>({
    show:state.posts.newPostModal,
});
export default withRouter(connect(mapStateToProps,{toggleNewPostModal, createPost})(NewPostModal));