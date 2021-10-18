import React, { useState, useEffect } from 'react'

import { IComment } from '../../utils/typeScript'

import AvatarComment from './avatarComment'
import AvatarReply from './avatarReply'
import CommentList from './commentList'

interface IProps {
    comment: IComment
}

const Comments: React.FC<IProps> = ({ comment }) => {
    const [showReply, setShowReply] = useState<IComment[]>([])
    const [next, setNext] = useState(2)

    useEffect(() => {
        if(!comment.replyCM) return
        setShowReply(comment.replyCM)
    },[comment.replyCM])
    return (
        <div className='my-3 d-flex' style={{ 
            opacity: comment._id ? 1 : 0.5, 
            pointerEvents: comment._id ? 'initial' : 'none' 
        }}>
            { <AvatarComment user={comment.user} /> }

            <CommentList comment={comment} showReply={showReply} setShowReply={setShowReply}>
                {
                    showReply.slice(0,next).map((comment, index) => (
                        <div key={index} style={{ 
                            opacity: comment._id ? 1 : 0.5, 
                            pointerEvents: comment._id ? 'initial' : 'none' 
                        }}>
                            <AvatarReply 
                                user={comment.user}
                                reply_user={comment.reply_user}
                            />

                            <CommentList 
                                comment={comment} 
                                showReply={showReply} 
                                setShowReply={setShowReply}
                            />
                        </div>
                    ))
                }

            <div style={{ cursor: 'pointer' }}>
                {
                    showReply.length - next> 0
                    // plus 5 comments when show
                    ? <small style={{ color: 'crimson' }} onClick={() => setNext(next + 5)}>
                        Xem thêm bình luận...
                    </small>
                    : showReply.length > 2 && 
                    //show 2 first comments if comments > 2 when hide
                    <small style={{ color: 'teal' }} onClick={() => setNext(2)}>
                        Ẩn bớt bình luận...
                    </small>
                }
            </div>

            </CommentList>
        </div>
    )
}

export default Comments
