import React, { useEffect, useRef, useState } from 'react';

export function GoogleLoginButton({ clientId, onSuccess, onError }) {
  const [isOAuthClientLoaded, setIsOAuthClientLoaded] = useState(false);
  const btnContainerRef = useRef(null);

  useEffect(() => {
    const scriptTag = document.createElement('script');
    scriptTag.src = 'https://accounts.google.com/gsi/client';
    scriptTag.async = true;
    scriptTag.defer = true;
    scriptTag.onload = () => {
      setIsOAuthClientLoaded(true);
    };
    scriptTag.onerror = () => {
      setIsOAuthClientLoaded(false);
    };
    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  useEffect(() => {
    if (!isOAuthClientLoaded) {
      return;
    }

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: (response) => {
        if (response.error) {
          onError(response.error);
        } else {
          onSuccess(response);
        }
      },
    });

    window.google.accounts.id.renderButton(btnContainerRef.current, {
      theme: 'outline',
      size: 'large',
      text: 'Iniciar con Google',
    });
  }, [isOAuthClientLoaded, clientId, onSuccess, onError]);

  return <div ref={btnContainerRef} />;
}
