import React, { useState, useRef } from "react";
import "../styles/imagevideo.css"

export default function ImageVideo({ handleImageUpload, handleVideoUpload }) {
  const [formData, setFormData] = useState({
    image: '',
    video: ''
  });
  const [imagePreview, setImagePreview] = useState('');
  const [videoPreview, setVideoPreview] = useState('');
  const [selectedMediaId, setSelectedMediaId] = useState(null);
  const [mediaList, setMediaList] = useState([]);
  const formRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, video: reader.result }));
        setVideoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMediaId !== null) {
      setMediaList((prevMediaList) =>
        prevMediaList.map((media, index) =>
          index === selectedMediaId ? { ...formData } : media
        )
      );
    } else {
      setMediaList((prevMediaList) => [...prevMediaList, formData]);
    }
    setFormData({ image: '', video: '' });
    setImagePreview('');
    setVideoPreview('');
    setSelectedMediaId(null);
  };

  const handleUpdateClick = (index) => {
    setFormData(mediaList[index]);
    setImagePreview(mediaList[index].image || '');
    setVideoPreview(mediaList[index].video || '');
    setSelectedMediaId(index);
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = (index) => {
    setMediaList((prevMediaList) => prevMediaList.filter((_, i) => i !== index));
  };

  return (
    <div className="image-video-container">
      <form ref={formRef} onSubmit={handleSubmit} className="image-video-form">
        <label>Upload Thumbnail Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <label>Upload Video (Optional):</label>
        <input type="file" accept="video/*" onChange={handleVideoChange} />

        {imagePreview && <img src={imagePreview} alt="Image Preview" className="image-preview" />}
        {videoPreview && <video src={videoPreview} controls className="video-preview" />}

        <button type="submit" className="image-video-form-button">
          {selectedMediaId !== null ? 'Update Media' : 'Add Media'}
        </button>
      </form>

      <div className="media-list">
        <ul>
          {mediaList.map((media, index) => (
            <li key={index}>
              {media.image && <img src={media.image} alt="Image Preview" className="image-preview" />}
              {media.video && <video src={media.video} controls className="video-preview" />}
              <div className="button-container">
                <button className="edit-button" onClick={() => handleUpdateClick(index)}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => handleDelete(index)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
