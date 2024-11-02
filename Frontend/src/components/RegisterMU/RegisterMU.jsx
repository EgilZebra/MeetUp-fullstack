const API_URL_BASE = (process.env.VITE_API_URL == undefined) ? import.meta.env.VITE_API_URL : process.env.VITE_API_URL ;

export const RegisterMU = ( MeetingId ) => {


    const token = localStorage.getItem(token);
    const RegisterToMu = async() => {
        try {
            const response = await fetch((`${API_URL_BASE}/register`), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 
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

    const UnRegisterToMu = async() => {
        try {
            const response = await fetch((`${API_URL_BASE}/register`), {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 
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