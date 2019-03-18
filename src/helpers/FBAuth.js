export default function login(userType, action) {
    window.FB.login(function (response) {
        if (response.authResponse) {
            window.FB.api('/me', function (response) {
                const user = {
                    id: response.id,
                    name: response.name,
                    userType: userType
                };
                try {
                    if (userType === 'coursier') {
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(showPosition);
                        }
                        function showPosition(position) {
                            user.location = {
                                lat: position.coords.latitude,
                                long: position.coords.longitude
                            };
                            action(user);
                        }
                    }else {
                        action(user);
                    }
                    
                } catch (error) {
                    // TODO: show error message to user
                    console.log({ error });
                }
            });
        } else {
            // TODO: show error message to user
            console.log('User cancelled login or did not fully authorize.');
        }
    }, { scope: 'public_profile,email' });
}