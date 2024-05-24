import React,{useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import articleContent from './article-content';

//Pages
import NotFound from "./NotFound";

//Components
import Articles from "../components/articles";
import CommentsList from "../components/commentslist";
import AddCommentForm from "../components/AddCommentForm";
const Article = () => {
    const {name} = useParams();
    const article = articleContent.find((article) => article.name === name);
    const [articlesInfo, setArticlesInfo] = useState ({ comments: []});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch(`/api/articles/${name}`);
                if (!result.ok) {
                    throw new Error('Failed to fetch data');
                }
                const body = await result.json();
                console.log('Fetched data:', body);
                setArticlesInfo(body);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error gracefully, e.g., show an error message to the user
            }
        };
        fetchData();
    }, [name]);
    if (!article) return <NotFound/>;
    const otherArticles = articleContent.filter(article => article.name !== name)
    return (
        <>
            <h1 className="sm:text-4xl text-2xl font-bold my-6 text-gray-900">
                {article.title}
            </h1>  
            {article.content.map((paragraph, index) => (
                <p className="mx-auto leading-relaxed text-base mb-4" key={index}> {paragraph} </p>
            ))}
            <CommentsList comments={articlesInfo.comments}/>
            <AddCommentForm articleName={name} setArticlesInfo={setArticlesInfo} />
            <h1 className="sm:text-2xl text-xl font-bold my-4 text-gray-900">Other Articles</h1>
            <div className="flex flex-wrap -m-4">
                <Articles articles={otherArticles}/>
            </div>
        </>
    );
};

export default Article;