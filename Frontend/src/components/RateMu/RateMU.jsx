import { useState } from "react";


export const RateMU = ( MeetingId, userId ) => {

    const SendComment = async() => {
        try {
            const response = await fetch((`${import.meta.env.VITE_API_URL}/comment`), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    userId: userId,
                    meetingId: MeetingId, 
                    score: `${score}/5`, 
                    comment: comment
                })
            })
            const data = await response.json();
            if (!data.success){
                alert( data.message ? data.message : data.error)
            }
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
        
    }

    const [score, setScore] = useState('4/5')
    const [comment, setComment] = useState('lorem ipsum')

    return (
        <div>
            <p>rate the meet-up</p>
            <input type="number" onChange={(e) => setScore(e.target.value)} min='1' max='5'/>
            <p>comment on the meet-up</p>
            <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
            <button style={{border: 'solid 1px black'}} onClick={SendComment}>Send</button>
        </div>
    )
}