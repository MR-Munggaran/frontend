import React, { useEffect, useState } from "react";
import axios from "axios";
import PostItem from "../components/PostItem";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";

const CategoryPosts = () => {
  const {category} = useParams()
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/posts/categories/${category}`);
        setPosts(response?.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchPosts();
  }, [category]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="posts">
      {posts.length > 0 ? (
        <div className="container posts__container">
          {posts.map(
            ({ _id: id, thumbnail, category, title, description, creator, createdAt }) => (
              <PostItem
                key={id} // Memastikan bahwa nilai 'key' adalah unik untuk setiap elemen
                postId={id}
                thumbnail={thumbnail}
                category={category}
                title={title}
                description={description}
                authorID={creator}
                createdAt={createdAt}
              />
            )
          )}
        </div>
      ) : (
        <h2 className="center"> No CategoryPosts Found</h2>
      )}
    </section>
  );
};

export default CategoryPosts;
