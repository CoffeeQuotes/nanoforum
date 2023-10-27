import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Moment from "react-moment";
import "moment-timezone";
import {AuthContext} from "../Context/AuthContext";

const PostContainer = styled.div`
    width: 70%;
    margin: var(--margin-center);
    padding: var(--standard-padding);
`;
const PostHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const RepliesContainer = styled.div`
    width: 70%;
    margin: var(--margin-center);
`;
const ReplyHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const AddReplyContainer = styled.div`
    margin: var(--standard-margin);
    padding: var(--standard-padding);
`;
const SubjectContainer = styled.div`
    margin-top: var(--standard-margin);
`;
const PostContentContainer = styled.div`
    margin-top: var(--standard-margin);
`;
const ReplyContentContainer = styled.div`
    margin-top: var(--standard-margin);
`;
const Post = () => {
    const clearReplyData = {
        content: "",
        user_id: "",
        forum_id: "",
        post_id: "",
    };
    const { id } = useParams();
    const [post, setPost] = useState([]);
    const [replies, setReplies] = useState([]);
    const [replyFormData, setReplyFormData] = useState(clearReplyData);
    const { auth } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const getPost = async () => {
        await axios
            .get(`http://localhost:5000/api/v1/posts/${id}`)
            .then((response) => {
                setPost(response.data.data);
                console.log(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        getPost();
    }, []);

    useEffect(() => {
        if (auth !== "no_auth") {
            setUser(JSON.parse(localStorage.getItem("user")));
        } else {
            setUser({});
        }
    },[auth]);
    const getPostReplies = async () => {
        await axios
            .get(`http://localhost:5000/api/v1/reply/post/${id}`)
            .then((response) => {
                setReplies(response.data.data);
                console.log(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        getPostReplies();
    }, [replyFormData]);
    const sendReply = async () => {
        const newReply = {
            content: replyFormData.content,
            user_id: replyFormData.user_id,
            forum_id: replyFormData.forum_id,
            post_id: replyFormData.post_id,
        };
        try {
            await axios
                .post(`http://localhost:5000/api/v1/reply`, newReply)
                .then((response) => {
                    setReplyFormData(clearReplyData);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        setReplyFormData({
            content: "",
            user_id: user._id,
            forum_id: post.forum_id,
            post_id: post._id,
        });
    }, [post]);
    return (
        <>
            <PostContainer>
                <PostHeaderContainer>
                    <h1>{post.title}</h1>
                    <Moment fromNow>{post.timestamps}</Moment>
                </PostHeaderContainer>
                <SubjectContainer>
                    <p className="badge badge-alt" style={{ textTransform: "uppercase" }}>
                        {post.subject}
                    </p>
                </SubjectContainer>
                <PostContentContainer>{post.message}</PostContentContainer>
            </PostContainer>
            <RepliesContainer>
                <h2>Replies</h2>
                {replies.map((reply) => (
                    <div key={reply._id}>
                        <ReplyContentContainer>
                            <ReplyHeaderContainer>
                                <h3>
                                    <Link to={`/users/${reply.user_id}`}>
                                        {reply.user.firstname + " " + reply.user.lastname}
                                    </Link>
                                </h3>
                                <p>
                                    <Moment fromNow>{reply.createdAt}</Moment>{" "}
                                </p>
                            </ReplyHeaderContainer>
                            <p>{reply.content}</p>
                        </ReplyContentContainer>
                    </div>
                ))}
                {auth !== 'no_auth' && (
                    <AddReplyContainer>
                        <label htmlFor="content">Comment as <b>{user.firstname}&nbsp;{user.lastname}</b></label>
                        <textarea
                            id="content"
                            name="conent"
                            rows="5"
                            cols="100"
                            onChange={(event) => {
                                setReplyFormData({
                                    ...replyFormData,
                                    content: event.target.value,
                                });
                            }}
                            value={replyFormData.content}
                        ></textarea>
                        <button onClick={sendReply}>Reply</button>
                    </AddReplyContainer>
                )}
            </RepliesContainer>
        </>
    );
};
export default Post;
