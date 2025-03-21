import React, { useState, useRef } from 'react';
import "../styles/heroadmin.css";
import { backEndURL } from "../Backendurl";

const HeroImage = () => {
    const [formData, setFormData] = useState({
        image: '',
    });
    const [selectedHeroImageId, setSelectedHeroImageId] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [HeroImages, setHeroImages] = useState([]);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedHeroImageId !== null) {
            setHeroImages((prevHeroImages) =>
                prevHeroImages.map((HeroImage, index) =>
                    index === selectedHeroImageId ? { ...formData } : HeroImage
                )
            );
        } else {
            setHeroImages((prevHeroImages) => [...prevHeroImages, formData]);
        }
        setFormData({ image: '' });
        setImagePreview('');
        setSelectedHeroImageId(null);
    };

    const handleUpdateClick = (index) => {
        setFormData(HeroImages[index]);
        setImagePreview(HeroImages[index].image || '');
        setSelectedHeroImageId(index);
        formRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleDelete = (index) => {
        setHeroImages((prevHeroImages) => prevHeroImages.filter((_, i) => i !== index));
    };

    return (
        <div className="course-admin">
            <form ref={formRef} onSubmit={handleSubmit} className="course-form">

                <input type="file" onChange={handleImageChange} />
                {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
                <button type="submit">
                    {selectedHeroImageId !== null ? 'Update Course' : 'Add Image'}
                </button>
            </form>
            <div className='course-list'>
                <ul>
                    {HeroImages.map((HeroImage, index) => (
                        <li key={index}>
                            {HeroImage.image && <img src={HeroImage.image} alt="image" className="image-preview" />}
                            <div className='button-container'>
                                <button className='edit-button' onClick={() => handleUpdateClick(index)}>Edit</button>
                                <button className='delete-button' onClick={() => handleDelete(index)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
};

export default HeroImage;
