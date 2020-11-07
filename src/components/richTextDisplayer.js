import React from 'react';
import {Editor, convertFromRaw, EditorState} from 'draft-js';

const RichTextDisplayer = ({value, className})=>{
    
    //console.log(value)
            //console.log(value);
    try{

    
    let content=JSON.parse(value);
    console.log(content);
    console.log(convertFromRaw(content));
    const editorState=EditorState.createWithContent(convertFromRaw(content));
    console.log(editorState);
    return (<div className={`${className}`}>
    <Editor editorState={editorState} 
    readOnly={true}
    />
    </div>);    
    }catch(error){
        console.log("Not in rich text format");
        return(
            <div className={className}>{value}</div>
        )
    }
    
}
export default RichTextDisplayer;