export const RegisterMU = ( MeetingId ) => {

    const username = localStorage.getItem(username);
    const RegisterToMu = async() => {
        try {
            const response = await fetch((`${import.meta.env.VITE_API_URL}/register`), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    userName: username,
                    meetingId: MeetingId, 
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

    const UnRegisterToMu = async() => {
        try {
            const response = await fetch((`${import.meta.env.VITE_API_URL}/register`), {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    userName: username,
                    meetingId: MeetingId 
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

    return (
        <>
            <div>
                <button style={{border: 'solid 1px black'}} onClick={RegisterToMu}>Register to this meet-up</button>
                <button style={{border: 'solid 1px black'}} onClick={UnRegisterToMu}>Remove registration from this meet-up</button>
            </div>
        </>
    )
}