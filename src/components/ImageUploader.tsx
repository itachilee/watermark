import React from 'react';

interface ImageUploaderProps {
    onImageUpload: (image: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onImageUpload(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
    );
};

export default ImageUploader;
