import { useState } from "react"

export const RateMU = ( MeetingId, userId ) => {

    const SendComment = async() => {
        await fetch((`${process.env.API_URL}`), {
            method: 'POST',
            headers: {
                'Conttent-Type': 'application/json'
            },
            body: JSON.stringify({
                 userId: userId, 
                 MeetingId: MeetingId, 
                 score: `${score}/5`, 
                 comment: comment
            })
        })
    }

    const [score, setScore] = useState('4/5')
    const [comment, setComment] = useState('lorem')

    return (
        <div>
            <p>rate the meet-up</p>
            <input type="number" value={score} onChange={(e) => setScore(e.target.value)} min='1' max='5'/>
            <p>comment on the meet-up</p>
            <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
            <button style={{border: 'solid 1px black'}} onClick={SendComment}>Send</button>
        </div>
    )
}