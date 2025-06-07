import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UploadForm() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await axios.post('http://localhost:8081/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoading(false);
            navigate('/result', { state: { data: response.data } });
        } catch (error) {
            console.error('Ошибка при загрузке файла:', error);
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Загрузить фото машины</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit" disabled={loading}>
                    {loading ? 'Загрузка...' : 'Загрузить'}
                </button>
            </form>
        </div>
    );
}

export default UploadForm;