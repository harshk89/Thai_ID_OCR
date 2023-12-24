import React, { useState } from 'react'
import { Typography, Container, Box, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const ImageUploader = (props) => {

    const {setSelectedImage} = props;

  const [imageSrc, setImageSrc] = useState(null)
  const [error, setError] = useState(null);

  console.log(imageSrc, error)

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Check file size
      if (file.size > 2 * 1024 * 1024) {
        setError('File size exceeds the maximum limit of 2MB.');
        return;
      }

      // Check file type
      const supportedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!supportedTypes.includes(file.type)) {
        setError('Unsupported file type. Please use JPEG, JPG, or PNG.');
        return;
      }

      const reader = new FileReader();

      reader.onload = (event) => {
        // The result attribute contains the base64-encoded string
        const base64String = event.target.result;
        setImageSrc(base64String);
        setSelectedImage(base64String);
        setError(null);
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (file) {
      // Check file size
      if (file.size > 2 * 1024 * 1024) {
        setError('File size exceeds the maximum limit of 2MB.');
        return;
      }

      // Check file type
      const supportedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!supportedTypes.includes(file.type)) {
        setError('Unsupported file type. Please use JPEG, JPG, or PNG.');
        return;
      }

      const reader = new FileReader();

      reader.onload = (event) => {
        // Set the base64 representation of the image in the state
        setImageSrc(event.target.result);
        setSelectedImage(event.target.result);
        setError(null);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '30px',
          border: '2px dashed #cccccc',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        <input id="upload-button"
          type="file"
          accept="image/jpeg, image/jpg, image/png"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
        <label htmlFor="upload-button">
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Upload Image
          </Button>
        </label>

        {imageSrc ? (
        <div>
          <Typography variant="subtitle1">Selected Image:</Typography>
          <img
            src={imageSrc}
            alt="Selected"
            style={{ maxWidth: '350px' }}
          />
        </div>
        ) : (
          <Box>
            <Typography variant="body1">
              {error || 'Drag & drop an image or click to select one'}
            </Typography>
            <Typography variant="body2" color="textSecondary" mt={1}>
            Upload Instructions:
            </Typography>
            <ul>
              <li>Maximum file size: 2MB</li>
              <li>Supported file types: JPEG, JPG, PNG</li>
              <li>Ensure the image is clear and readable</li>
            </ul>
          </Box>
        )}
      </div>

    </>
  )
}

export default ImageUploader