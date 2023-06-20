import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux";
import { actions } from "../../redux/modules";

const Redirect = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userSelector = useAppSelector(state => state.user);
    
    useEffect(() => {
        let id = window.sessionStorage.getItem('id');
        let userEmail = window.sessionStorage.getItem('userEmail');
        let userCreatedAt = window.sessionStorage.getItem('userCreatedAt');

        // If the sessionStorage does not have cached data;
        // i.e. log in for the first time
        if (id === null || id === '0') {
            id = userSelector.userInfo.id.toString();
            userEmail = userSelector.userInfo.userEmail;
            userCreatedAt = userSelector.userInfo.userCreatedAt;
            window.sessionStorage.setItem('id', id);
            window.sessionStorage.setItem('userEmail', userEmail);
            window.sessionStorage.setItem('userCreatedAt', userCreatedAt);
        }

        // If the sessionStorage is alive
        else {
            dispatch(actions.user.userPersist({
                id: id,
                userEmail: userEmail,
                userCreatedAt: userCreatedAt
            }))
        }
    }, [userSelector.userInfo])

    return  (
        <div></div>
    )
}

export default Redirect