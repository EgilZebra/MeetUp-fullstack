import { useNavigate, useRouteError } from "react-router-dom";

export const ErrorPage = () => {

    const error = useRouteError();
    const GoTo = useNavigate();
    const GoToLanding = () => {
        GoTo('/')
    }

    return (
        <div>
            <p>{error.data}</p>
            <h2>You have encountered an error!</h2>
            <h1 style={{textDecoration: 'underline'}}>{error.status}</h1>
            <p> ~ {error.statusText} ~ </p>
            <button onClick={GoToLanding}>return to LandingPage</button>
        </div>
    );
}