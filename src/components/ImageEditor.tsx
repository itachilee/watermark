import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

interface ImageEditorProps {
    image: string;
}

interface Marker {
    x: number;
    y: number;
    text: string;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ image }) => {
    const [markers, setMarkers] = useState<Marker[]>([]);
    const [currentText, setCurrentText] = useState<string>('');
    const imageRef = useRef<HTMLImageElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);



    const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {

        const rect = imageRef.current?.getBoundingClientRect();
        if (rect) {

            setCanvas()
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            setMarkers([...markers, { x, y, text: currentText }]);
            draw()
            setCurrentText('');
        }
    };


    const setCanvas = () => {

        const canvas = canvasRef.current;

        if (canvas) {
            const context = canvas.getContext('2d');
            if (context && imageRef.current) {
                canvas.width = imageRef.current.width;
                canvas.height = imageRef.current.height;
                context.drawImage(imageRef.current, 0, 0);
            }
        }
    }


    const draw = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            if (context && imageRef.current) {
                canvas.width = imageRef.current.width;
                canvas.height = imageRef.current.height;

                context.drawImage(imageRef.current, 0, 0);
                markers.forEach(marker => {
                    context.fillText(marker.text, marker.x, marker.y);
                });
            }

        }
    }

    const handleExport = async () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');

            if (context && imageRef.current) {
                canvas.width = imageRef.current.width;
                canvas.height = imageRef.current.height;


                context.drawImage(imageRef.current, 0, 0);

                markers.forEach(marker => {
                    context.fillText(marker.text, marker.x, marker.y);
                });

                const canvasImage = await html2canvas(canvas);
                const link = document.createElement('a');
                link.href = canvasImage.toDataURL('image/png');
                link.download = 'edited-image.png';
                link.click();
            }
        }
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={currentText}
                    onChange={(e) => setCurrentText(e.target.value)}
                    placeholder="Enter text"
                />
            </div>
            <div>
                <img
                    src={image}
                    alt="Editable"
                    ref={imageRef}
                    onClick={handleImageClick}
                    style={{ cursor: 'crosshair', maxWidth: '100%' }}
                />
                <canvas ref={canvasRef} />
            </div>
            <div>
                <button onClick={handleExport}>Export Image</button>
            </div>
        </div>
    );
};

export default ImageEditor;
