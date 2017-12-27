import React from 'react';

const DragDrop = ({ onChange, value }) => {
  let fileInput = null;

  const fileReader = new FileReader();
  console.log(fileReader);
  fileReader.onload = () => onChange({ target: { name: 'base64', value: fileReader.result } });

  const handleImage = (e) => {
    e.preventDefault();
    const file = (e.target.files || e.dataTransfer.files)[0];
    fileReader.readAsDataURL(file);
  };

  const style = value ? { backgroundImage: `url(${value})` } : { backgroundImage: 'black'};

  return (
    <div className="drag-drop">
      <input
        type="file"
        accept="image/*"
        ref={element => fileInput = element}
        onChange={handleImage}
      />
      <div
        className="dropzone"
        style={style}
        onDragOver={e => e.preventDefault()}
        onDrop={handleImage}
        onClick={() => fileInput.click()}
      ></div>
    </div>
  );
};

export default DragDrop;
