import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginActions } from '../../store/login-slice';
import { uiActions } from '../../store/ui-slice';
import { validationActions } from '../../store/validation-slice';
import Button from '../UI/Button/Button';
import styles from './Form.module.css';

const Form = () => {
    const dispatch = useDispatch();
    const isEmailValid = useSelector(({ validation }) => validation.validEmail);
    const isPasswordValid = useSelector(state => state.validation.validPassword);
    const isEmailTouched = useSelector(state => state.validation.emailTouched);
    const isPasswordTouched = useSelector(state => state.validation.passwordTouched);
    const showForm = useSelector(state => state.ui.showForm);

    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    const emailChangeHandler = (e) => {
        dispatch(validationActions.isEmailTouched({ isTouched: true }));
        setEnteredEmail(e.target.value);

        if (enteredEmail !== '' && enteredEmail.includes('@')) {
            dispatch(validationActions.isEmailValid({ isValid: true }));
        }
    }

    const emailBlurHandler = () => {
        dispatch(validationActions.isEmailTouched({ isTouched: true }));
    }

    const passwordChangeHandler = (e) => {
        dispatch(validationActions.isPasswordTouched({ isTouched: true }));
        setEnteredPassword(e.target.value);

        if (enteredPassword.length >= 5) {
            dispatch(validationActions.isPasswordValid({ isValid: true }));
        }
    }

    const passwordBlurHandler = () => {
        dispatch(validationActions.isPasswordTouched({ isTouched: true }));
    }

    if (isEmailTouched && !isEmailValid) {
        dispatch(validationActions.isEmailValid({ isValid: false }));
    }

    if (isPasswordTouched && !isPasswordValid) {
        dispatch(validationActions.isPasswordValid({ isValid: false }));
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if (isEmailValid && isPasswordValid) {
            dispatch(loginActions.login());
            dispatch(uiActions.toggleForm(false));
        }
    }

    const emailError = isEmailValid === false ?
        (<p className={styles.invalid}>Email must contains '@'</p>) : '';

    const passwordError = isPasswordValid === false ?
        (<p className={styles.invalid}>Password have to contains minimum 5 characters.</p>) : '';

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <div className={styles['form-input']}>
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" onChange={emailChangeHandler} onBlur={emailBlurHandler} />
                {emailError}
            </div>
            <div className={styles['form-input']}>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={passwordChangeHandler} onBlur={passwordBlurHandler} />
                {passwordError}
            </div>
            <div className={styles['form-controls']}>
                <Button type="submit" value="Submit" />
            </div>
        </form>
    )
}

export default Form;
