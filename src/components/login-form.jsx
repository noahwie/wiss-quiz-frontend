import { useState } from "react";
import Button from "./button";

const LoginForm = ({ onLogin }) => {
    // state form data
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");

    // state form error messages
    const [usernameOrEmailError, setUsernameOrEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // state loading
    const [isLoading, setIsLoading] = useState(false);

    // validation functions

    // validate username or email
    const validateUsernameOrEmail = (value) => {
        if(!value.trim()) {
            setUsernameOrEmailError("Benutzername oder Email ist erforderlich");
            return false;
        }

        if(value.length < 3) {
            setUsernameOrEmailError("Mindestens 3 Zeichen erforderlich");
            return false;
        }

        setUsernameOrEmailError("");
        return true;
    };

    // password validieren
    const validatePassword = (value) => {
        if (!value) {
            setPasswordError("Passwort ist erforderlich");
            return false;
        }

        if (value.length < 6) {
            setPasswordError("Passwort muss mindestens 6 Zeichen haben");
            return false;
        }
        setPasswordError("");
        return true;
    };

    // on change handler
    const handleUsernameOrEmailChange = (e) => {
        const value = e.target.value;
        setUsernameOrEmail(value);
        if (usernameOrEmailError) validateUsernameOrEmail(value);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        if (passwordError) validatePassword(value);
    };

    // submit handler
    const handleSubmit = (e) => {
        e.preventDefault();

        const usernameOrEmailOk = validateUsernameOrEmail(usernameOrEmail);
        const passwordOk = validatePassword(password);

        // bei fehler abbrechen
        if (!usernameOrEmailOk || !passwordOk) {
            return;
        }

        setIsLoading(true);

        // Login daten an parent weitergeben
        const loginData = {
            usernameOrEmail: usernameOrEmail,
            password: password,
        };

        // parent funktion aufrufen
        if (onLogin) {
            onLogin(loginData);
        }

        setIsLoading(false);
    };

    // helper css klasse für input
    const getInputClassName = (hasError, hasValue) => {
        let className = "form-input";
        if (!hasValue) return className;
        if (hasError) return `${className} form-input--error`;
        return `${className} form-input--success`;
    };

    // render
    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h2>Login</h2>

            {/*USERNAME OR EMAIL INPUT*/}
            <div className="form-group">
                <label htmlFor="usernameOrEmail">
                    Benutzername oder Email <span className="required">*</span>
                </label>
                <input
                    type="text"
                    id="usernameOrEmail"
                    value={usernameOrEmail}
                    onChange={handleUsernameOrEmailChange}
                    placeholder="admin oder admin@quiz.com"
                    className={getInputClassName(usernameOrEmailError, usernameOrEmail)}
                    disabled={isLoading}
                />
                {usernameOrEmailError && (<span className="error-message">{usernameOrEmailError}</span>)}
            </div>

            {/* PASSWORD INPUT */}
            <div className="form-group">
                <label htmlFor="password">
                    Password <span className="required">*</span>
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Mindestens 6 Zeichen"
                    className={getInputClassName(passwordError, password)}
                    disabled={isLoading}
                />
                {passwordError && (<span className="error-message">{passwordError}</span>)}
            </div>

            {/* SUBMIT BUTTON */}
            <div className="form-submit">
                <Button
                    text={isLoading ? "Lädt..." : "Einloggen"}
                    onAnswerClick={handleSubmit}
                    disabled={isLoading}
                    className="submit-button"
                />
            </div>
        </form>
    );
};

export default LoginForm;