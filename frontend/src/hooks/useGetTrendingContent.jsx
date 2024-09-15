import { useEffect, useState } from 'react';
import useContentStore from '../store/content';
import axios from 'axios';

const useGetTrendingContent = () => {
    const [trendingContent, setTrendingContent] = useState(null);
    const { contentType } = useContentStore();

    useEffect(() => {
        const hadAuthCheck = localStorage.getItem('authCheck');
        const getTrendingContent = async () => {
            const res = await axios.get(
                `/api/v1/${contentType}/trending`,
                {
                    headers: {
                        Authorization: `Bearer ${hadAuthCheck}`,
                    },
                }
            );
            setTrendingContent(res.data.content);
        };
        getTrendingContent();
    }, [contentType]);

    return { trendingContent };
};

export default useGetTrendingContent;
