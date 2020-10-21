import React from "react";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

const Text = styled.p`
  padding: 8px;
  width: 100%;
  font-size: 50px;
  text-align: center;
  background-color: rgba(0,0,0,0)
`;
const Textarea = styled(TextareaAutosize)`
  display: block;
  padding: 8px;
  width: 100%;
  font-size: 50px;
  text-align: center;
  background: transparent;
  border: 0;
  //outline: 0;
`;

/**
 * An editable multi-line auto-resizing field that relies on a parent
 * component for the editing status
 *
 * @param {*} param0
 */
const EditableTextarea = ({
  isEditing,
  onChange,
  textareaRef = null,

  htmlNode,
  children,
  ...props
}) => {
  return (
    <>
      {!isEditing ? (
        <Text as={htmlNode} {...props}>
          {children}
        </Text>
      ) : (
        <Textarea
          ref={textareaRef}
          value={children}
          onChange={onChange}
          style={{height: 100}}
          {...props}
        />
      )}
    </>
  );
};

export default EditableTextarea;