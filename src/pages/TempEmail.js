import React, { useState, useEffect } from 'react';
import './TempEmail.css';
import CryptoJS from 'crypto-js';

const apiKey = '30f08a4db8mshdac76adf1e2f94cp1fe4aejsnd7f3bd909df9';

const TempEmail = () => {
    const [loading, setLoading] = useState(true);
    const [currentTheme, setCurrentTheme] = useState('light');
    const [currentEmail, setCurrentEmail] = useState('');
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        showLoadingScreen();
    }, []);

    const showLoadingScreen = () => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    const generateEmail = () => {
        // Lista de palabras en español e inglés
        const words = [
            "sol", "luna", "estrella", "cielo", "mar", "montaña", "río", 
            "nube", "viento", "bosque", "flor", "fuego", "tierra",
            "fire", "water", "earth", "sky", "wind", "star", "moon",
            "sun", "ocean", "forest", "river", "mountain", "cloud"
        ];
    
        fetch('https://privatix-temp-mail-v1.p.rapidapi.com/request/domains/', {
            method: 'GET',
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': 'privatix-temp-mail-v1.p.rapidapi.com',
            },
        })
        .then((response) => response.json())
        .then((domains) => {
            if (Array.isArray(domains) && domains.length > 0) {
                const randomDomain = domains[Math.floor(Math.random() * domains.length)];
                const randomWord = words[Math.floor(Math.random() * words.length)];
                const randomNumber = Math.floor(Math.random() * 10000);
                const newEmail = `${randomWord}${randomNumber}${randomDomain}`;
                setCurrentEmail(newEmail);
                localStorage.setItem('currentEmail', newEmail);
            }
            
        })
        .catch((error) => {
            console.error('Error al generar el correo:', error);
        });
    };

    const refreshInbox = () => {
        if (!currentEmail) {
            alert('Primero genera un correo.');
            return;
        }

        const emailId = CryptoJS.MD5(currentEmail).toString();

        fetch(`https://privatix-temp-mail-v1.p.rapidapi.com/request/mail/id/${emailId}/`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': 'privatix-temp-mail-v1.p.rapidapi.com',
            },
        })
            .then((response) => response.json())
            .then((emails) => {
                setEmails(emails);
            })
            .catch((error) => {
                console.error('Error al actualizar la bandeja de entrada:', error);
            });
    };

    const copyEmail = () => {
        navigator.clipboard.writeText(currentEmail).then(() => {
            alert('Correo copiado al portapapeles');
        });
    };

    const changeTheme = () => {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setCurrentTheme(newTheme);
        document.body.className = `${newTheme}-theme`;
    };

    return (
        <div className="App">
            {loading && (
                <div className="loading-screen" id="loadingScreen">
                    <div>Cargando<span id="loadingDots">...</span></div>
                </div>
            )}
            {!loading && (
                <div id="mainContent">
                    <button className="theme-toggle" onClick={changeTheme}>
                        {currentTheme === 'light' ? '🌞' : '🌑'}
                    </button>
                    <div className={`container ${currentTheme}-theme`}>
                        <h1>Correos Temporales</h1>
                        <div className="email-display">
                            <div className={`email-container ${currentTheme}-theme`} id="emailContainer">
                                {currentEmail}
                            </div>
                            <button className="icon-button" onClick={copyEmail}>
                                📋
                            </button>
                        </div>
                        <div className="controls">
                            <button className="button" onClick={generateEmail}>
                                Nuevo Correo
                            </button>
                            <button className="button" onClick={refreshInbox}>
                                Refrescar Bandeja
                            </button>
                        </div>
                        <div className={`inbox-container ${currentTheme}-theme`} id="inboxContainer">
                            {emails.length > 0 ? (
                                emails.map((email, index) => (
                                    <div key={index} className={`email ${currentTheme}-theme`}>
                                        <h3>De: {email.mail_from}</h3>
                                        <p>Asunto: {email.mail_subject}</p>
                                        <div>{email.mail_html || email.mail_text || 'Contenido del correo no disponible'}</div>
                                    </div>
                                ))
                            ) : (
                                <div>No hay correos en la bandeja de entrada.</div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TempEmail;