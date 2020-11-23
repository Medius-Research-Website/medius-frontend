import React,{useState} from 'react';
import {convertToRaw, Editor, EditorState, RichUtils} from 'draft-js';

const RichTextEditor = ({onChange,className})=>{
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
        );
    const editorOnChangeHandler = (editorState)=>{
        setEditorState(editorState);
        let RawContent=convertToRaw(editorState.getCurrentContent());
        onChange(JSON.stringify(RawContent));
    }

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
    
        if (newState) {
          editorOnChangeHandler(newState);
          return 'handled';
        }
    
        return 'not-handled';
      }
    const onClickStyleHandle=(style)=>{
        editorOnChangeHandler(RichUtils.toggleInlineStyle(editorState, style));
    }
    const onClickBlockHandler = (style)=>{
        editorOnChangeHandler(RichUtils.toggleBlockType(editorState,style));
    }
    return (<div className={`${className}`}>
        <div className="editorButtons">
            <button onClick={()=>{onClickStyleHandle('BOLD')}}><b>B</b></button>
            <button onClick={()=>{onClickStyleHandle('ITALIC')}}><i>I</i></button>
            <button onClick={()=>{onClickStyleHandle('UNDERLINE')}}><u>U</u></button>
            <button onClick={()=>{onClickBlockHandler('unordered-list-item')}}>UL</button>
            <button onClick={()=>{onClickBlockHandler('ordered-list-item')}}>OL</button>
        </div>
        <hr />

        <Editor editorState={editorState} 
            onChange={editorOnChangeHandler} 
            handleKeyCommand={handleKeyCommand}
    />
    </div>);    
}
export default RichTextEditor;