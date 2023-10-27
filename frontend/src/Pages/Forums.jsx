import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Moment from "react-moment";
import "moment-timezone";
import { FaCalendar, FaComment, FaDochub } from "react-icons/fa6";
import subjects from "../data";
import { AuthContext } from "../Context/AuthContext";

const ForumContainer = styled.div`
    width: 70%;
    margin: var(--margin-center);
    padding: var(--standard-padding);
`;

const ForumHeaderContainer = styled.div`
    display: flex;
    margin-top: var(--standard-margin);
    align-items: center;
    justify-content: space-between;
`;

const PostContainer = styled.div``;
const Card = styled.div`
    padding: var(--standard-padding);
    margin: var(--standard-margin) 0;
`;

const SubjectContainer = styled.div`
    margin-top: var(--standard-margin);
`;
const Forums = () => {
    const clearPostData = {
        title: "",
        subject: "",
        message: "",
        user_id: "",
        forum_id: "",
    };
    const { id } = useParams();
    const [forum, setForum] = useState({});
    const [posts, setPosts] = useState([]);
    const [totalTopics, setTotalTopics] = useState(0);
    const [postFormData, setPostFormData] = useState(clearPostData);
    const { auth } = useContext(AuthContext);
    const [user, setUser] = useState([]);

    useEffect(() => {
        if (auth !== "no_auth") {
            setUser(JSON.parse(localStorage.getItem("user")));
        } else {
            setUser({});
        }
    }, [auth]);

    useEffect(() => {
        getForumById();
    }, []);

    useEffect(() => {
        getForumPosts();
    }, [postFormData]);

    const getForumById = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/v1/forums/${id}`,
            );
            console.log(response.data.data);
            setForum(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getForumPosts = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/v1/posts/forum/${id}`,
            );
            console.log(response.data.data);
            setPosts(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getTotalTopics = async () => {
        const uniqueSubjects = new Set(posts.map((post) => post.subject));
        setTotalTopics(uniqueSubjects.size);
    };

    useEffect(() => {
        getTotalTopics();
    }, [posts]);

    useEffect(() => {
        setPostFormData({
            title: "",
            subject: "",
            message: "",
            user_id: "65331b64cae8b4ed26f2efb9",
            forum_id: id,
        });
    }, [id]);

    const sendPost = async () => {
        const newPost = {
            title: postFormData.title,
            subject: postFormData.subject,
            message: postFormData.message,
            user_id: "65331b64cae8b4ed26f2efb9",
            forum_id: id,
        };
        try {
            await axios
                .post(`http://localhost:5000/api/v1/posts`, newPost)
                .then((response) => {
                    setPostFormData(clearPostData);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        setPostFormData({
            title: "",
            subject: "",
            message: "",
            user_id: user._id,
            forum_id: id,
        });
    }, [id]);
    return (
        <ForumContainer>
            <div>
                <h1>{forum.name}</h1>
                <p>{forum.description}</p>
            </div>
            <ForumHeaderContainer>
                <div>
                    <p>
                        <FaCalendar className="accent" />
                        &nbsp;Started&nbsp;<Moment fromNow>{forum.createdAt}</Moment>
                    </p>
                </div>
                <div>
                    <p>
                        <FaCalendar className="accent" />
                        &nbsp;Updated&nbsp;<Moment fromNow>{forum.updatedAt}</Moment>
                    </p>
                </div>
                <div>
                    <p>
                        <FaDochub className="accent" />
                        &nbsp;Total Topics&nbsp;{totalTopics}
                    </p>
                </div>
                <div>
                    <p>
                        <FaComment className="accent" />
                        &nbsp;Total Post&nbsp;{posts.length}
                    </p>
                </div>
            </ForumHeaderContainer>
            {auth !== "no_auth" && (
                <div>
                    <h2>Create a new Post</h2>

                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        onChange={(event) => {
                            setPostFormData({ ...postFormData, title: event.target.value });
                        }}
                        value={postFormData.title}
                        width="100"
                    />
                    <label htmlFor="subject">Subject</label>
                    <select
                        name="subject"
                        id="subject"
                        width="100"
                        onChange={(event) => {
                            setPostFormData({ ...postFormData, subject: event.target.value });
                        }}
                        value={postFormData.subject}
                    >
                        {subjects.map((subject, i) => (
                            <option key={i} value={subject.value}>
                                {subject.display}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="message" cols="100" rows="5">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        onChange={(event) => {
                            setPostFormData({ ...postFormData, message: event.target.value });
                        }}
                        value={postFormData.message}
                    ></textarea>
                    <button onClick={sendPost}>Create</button>
                </div>
            )}
            <PostContainer>
                <h2>Latest Posts</h2>
                {posts.map((post) => (
                    <Card
                        style={{ backgroundColor: "var(--card-background)" }}
                        key={post._id}
                    >
                        <Link to={`/posts/${post._id}`}>
                            <h3 style={{ color: "var(--card-heading)" }}>{post.title}</h3>
                        </Link>
                        <p style={{ color: "var(--card-paragraph)" }}>{post.message}</p>
                        <SubjectContainer>
                            <p className="badge">{post.subject.toUpperCase()}</p>
                        </SubjectContainer>
                    </Card>
                ))}
            </PostContainer>
        </ForumContainer>
    );
};

export default Forums;
