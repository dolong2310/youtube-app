import React, { useEffect, useState } from "react";
import "./_comments.scss";
import Comment from "../comment/Comment";
import { useDispatch, useSelector } from "react-redux";
import {
    addComment,
    getCommentsOfVideoById,
} from "../../redux/actions/comments.action";

function Comments({ videoId, totalComments }) {
    const dispatch = useDispatch();
    const [text, setText] = useState("");

    const { photoURL } = useSelector((state) => state.auth?.user);

    useEffect(() => {
        dispatch(getCommentsOfVideoById(videoId));
    }, [dispatch, videoId]);

    const comments = useSelector((state) => state.commentList.comments);

    const _comments = comments?.map(
        (comment) => comment.snippet.topLevelComment.snippet
    );

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (text.length === 0) return;

        dispatch(addComment(videoId, text));
        setText("");
    };

    return (
        <div className="comments">
            <p>{totalComments} comments</p>
            <div className="comments__form d-flex w-100 my-2">
                <img
                    src={photoURL}
                    alt="avatar"
                    className="rounded-circle mr-3"
                />
                <form
                    onSubmit={handleCommentSubmit}
                    className="d-flex flex-grow-1"
                >
                    <input
                        type="text"
                        className="flex-grow-1"
                        placeholder="Write a comment..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button className="border-0 p-2">Comment</button>
                </form>
            </div>

            <div className="comments__list">
                {_comments?.map((comment, index) => (
                    <Comment comment={comment} key={index} />
                ))}
            </div>
        </div>
    );
}

export default Comments;
