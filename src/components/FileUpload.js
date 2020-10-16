import React from "react";
import Files from "react-butterfiles";
import {Button} from 'react-bootstrap';

const FileUpload = ({ accept, onChange = () => {}, children, ...props }) => {
  const handleImageChange = (files) => {
    const src = files[0]?.src;
    if (src.base64) {
      onChange(src.base64, src.file);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(src.file);
    reader.onload = () => {
      onChange(reader.result, src.file);

    };
  };

  return (
    <Files
      accept={accept}
      onSuccess={handleImageChange}
      onError={(err) => console.log("[ERROR]", err)} // TODO: use snackbar
    >
      {({ browseFiles }) => <Button className="upload-button" onClick={browseFiles}>Upload {children}</Button>}
    </Files>
  );
};

export default FileUpload;