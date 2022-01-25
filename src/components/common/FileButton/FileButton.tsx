import { FC, useRef, useState, useEffect } from "react";

// UI Decentraland
import { Button } from 'decentraland-ui/dist/components/Button/Button';

// UI Custom Component
import File from '../File/File';

interface FileButtonProps {
  label: string;
  multiple?: boolean;
  onChange?: Function;
  accept?: string;
  maxFiles?: number;
};

const FileButton: FC<FileButtonProps> = ({label, multiple = false, onChange = null, accept = null, maxFiles = null}) => {
  const inputFileRef = useRef<any>();
  const [uploadFiles, setUploadFiles] = useState([]);
  const [hasFiles, setHasFiles] = useState(false);

  const handleFileUpload = (event) => {
    let files = event.currentTarget.files;
    if (files.length) {
      let fileList = [];
      if (uploadFiles.length) {
        uploadFiles.forEach(obj => {
          fileList.push(obj);
        })
      }

      for (var i = 0; i < files.length; i++) {
        if (maxFiles &&
          fileList.length == maxFiles) {
          continue;
        }
        fileList.push(files.item(i));
      }
      setUploadFiles(fileList);
    }
  };

  useEffect(() => {
    if (uploadFiles.length) {
      setHasFiles(true);
    }
    else {
      setHasFiles(false);
    }

    if (onChange) {
      onChange(uploadFiles)
    }
  }, [uploadFiles]);

  const onButtonClicked = () => {
    inputFileRef.current.click();
  }

  const handleRemoveFile = (fileIndex) => {
    // console.log('handleRemoveFile', fileIndex);
    let fileList = [];

    if (uploadFiles.length == 1) {
      fileList = [];
    }
    else if (fileIndex === 0) {
      fileList = uploadFiles.slice(1, uploadFiles.length);
    }
    else if (fileIndex > 0 && fileIndex == uploadFiles.length - 1) {
      fileList = uploadFiles.slice(0, uploadFiles.length - 1);
    }
    else {
      let firstPart = uploadFiles.slice(0, fileIndex);
      let secondPart = uploadFiles.slice(fileIndex+1);
      fileList = firstPart.concat(secondPart);
    }

    setUploadFiles(fileList);
  }

  const renderFileList = () => {
    // console.log('uploadFiles', uploadFiles);
    let fileList = uploadFiles.map((fileObj, index) => {
      return (
        <File
          key={index}
          title={fileObj.name}
          handleClick={() => {handleRemoveFile(index)}}
          className="file" />
      )
    })
    return fileList;
  }

  return (
    <div>
      { hasFiles && renderFileList()}
      <Button
        secondary
        className="btn-upload"
        onClick={onButtonClicked}
        type="button">
        {label}
      </Button>
      <input
        type="file"
        className="hidden"
        ref={inputFileRef}
        max="2"
        multiple={multiple}
        accept={accept}
        onChange={handleFileUpload} />
    </div>
  )
};

export default FileButton;