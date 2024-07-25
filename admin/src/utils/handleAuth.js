import { setCookie, getCookie, removeCookie } from './cookies'

export const handleSignup = async (name, email, password, city, setIsLoading, setSection, dispatch) => {
    try {
        setIsLoading(true);
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/signup-seller`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email, name, password, city
            })
        })

        const result = await response.json();

        if (result?.message === 'Account created successfully.') {
            setCookie('DB_SELLER', result?.token);
            dispatch({
                type: 'login',
                payload: {
                    user: result?.user,
                    token: result?.token
                }
            });
            setIsLoading(false)
            setSection('success');
        } else {
            setIsLoading(false)
            alert(result?.message)
        }

    } catch (error) {
        setIsLoading(false)
        console.log(error);
        alert('Failed to send otp.')
    }
}


export const handleLogin = async (email, password, setIsLoading, dispatch, navigate) => {
    try {
        setIsLoading(true)
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/login-seller`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password
            })
        });

        const result = await response.json();

        if (result?.message === 'Login successfull') {
            dispatch({
                type: 'login',
                payload: {
                    user: result?.user,
                    token: result?.token
                }
            });
            setCookie('DB_SELLER', result?.token);
            setIsLoading(false);
            navigate('/');
        } else {
            setIsLoading(false);
            alert(result?.message);
        }

    } catch (error) {
        setIsLoading(false);
        console.log(error);
        alert('Failed to handle login.');
    }
}


export const handleSendEmail = async (email, subject, msg, type, isSeller, setIsLoading, setSection) => {
    try {
        setIsLoading(true);
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/send-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email, subject, msg, type, isSeller
            })
        })

        const result = await response.json();

        if (result?.message === 'Message sent successfully') {
            setIsLoading(false)
            setSection('otp')
        } else {
            setSection('form')
            setIsLoading(false)
            alert(result?.message)
        }

    } catch (error) {
        setIsLoading(false)
        console.log(error);
        alert('Failed to send otp.')
    }
}

export const handleLogout = (dispatch, navigate) => {
    dispatch({ type: 'logout' });
    removeCookie('DB_SELLER');
    navigate('/login');
};

export const autoLogin = async (dispatch, navigate, setIsLoading) => {
    try {
        setIsLoading(true)
        const token = getCookie('DB_SELLER');
        if (!token) {
            setIsLoading(false)
            navigate('/login');
            return;
        };

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auto-login`, {
            method: 'POST', // Make sure to include method
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ isSeller: true }) // Make sure to include body
        });

        const result = await response.json();

        if (result?.message === 'Auto login successfull') { // Make sure the message matches
            dispatch({
                type: 'login',
                payload: { user: result.user, token }
            });
            setIsLoading(false)
        } else {
            console.log(result?.message);
            setIsLoading(false)
            navigate('/login');
        }
    } catch (error) {
        console.log(error);
        navigate('/login');
    }
};