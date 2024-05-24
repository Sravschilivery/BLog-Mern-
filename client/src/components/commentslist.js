import React from "react";

const CommentsList = ({ comments }) => {
    if (!comments || comments.length === 0) {
        return (
            <div>No comments found.</div>
        );
    }
    return (
        <>
            <h3 className="sm:text-2xl text-xl font-bold my-6 text-gray-900">
                Comments:
            </h3>
            {comments.map((comment, index) => ( // Changed variable name to "comment"
                <div key={index}>
                  
                    <h4 className="text-xl font-bold">{comment.username}</h4> {/* Use "comment" instead of "comments" */}
                    <p className="mt-1 mb-4">{comment.text}</p> {/* Use "comment" instead of "comments" */}
                    
                </div>
            ))}
        </>
    );
};

export default CommentsList