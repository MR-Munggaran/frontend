import React, { useEffect } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { Usercontext } from "../context/UserContext";
import axios from "axios";

const EditPosts = () => {
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("Uncategorized");
  const [description, setDescription] = React.useState("");
  const [thumbnail, setThumbnail] = React.useState("");
  const [error, setError] = React.useState('');

  const navigate = useNavigate()
  const {id} = useParams()

  const {currentUser} = React.useContext(Usercontext)
  const token = currentUser?.token

  // redirect to login page for any user who isn't logged in
  React.useEffect(()=> {
    if (!token) {
      navigate('/login')
    }
  },[])

  const modules = {
    toolbar: {
      container: [
        [{ header: [2, 3, 4, false] }],
        ["bold", "italic", "underline", "blockquote"],
        [{ color: [] }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
      ],
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "clean",
  ];
  const POST_CATEGORIES = [
    "Agriculture",
    "Bussiness",
    "Education",
    "Entertainment",
    "Art",
    "Investment",
    "Uncategorized",
    "Weather",
  ];

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:5000/api/posts/${id}`)
        setTitle(res.data.title)
        setDescription(res.data.description)
      } catch (error) {
        setError(error)
      }
    }
    getPost()
  },[])

  const editPost = async e => {
    e.preventDefault()

    const postData = new FormData()
    postData.set('title', title)
    postData.set('category', category)
    postData.set('description', description)
    postData.set('thumbnail', thumbnail)

    try {
      const res = await axios.patch(`http://127.0.0.1:5000/api/posts/${id}`, postData, {withCredentials: true, headers:{Authorization: `Bearer ${token}`}})
      if(res.status == 200) {
        return navigate('/')
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  return (
    <div>
      <section className="create-post">
        <div className="container">
          <h2>Edit Post</h2>
          {error && <p className="form__error-message">{error}</p>}
          <form action="" className="form create-post__form" onSubmit={editPost}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <select
              name="category"
              id=""
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {POST_CATEGORIES.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
            <ReactQuill
              modules={modules}
              formats={formats}
              value={description}
              onChange={setDescription}
              theme="snow"
            />
            <input
              type="file"
              onChange={(e) => setThumbnail(e.target.files[0])}
              accept="png, jpg, jpeg"
            />
            <button type="submit" className="btn primary">
              Update
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default EditPosts;
