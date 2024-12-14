export const fetchGetStatus = async () => {
    const response = await fetch(`https://judge029.p.rapidapi.com/statuses`, { 
        method: 'GET',
        headers: {
            "X-RapidAPI-Host": import.meta.env.VITE_APP_RAPID_API_HOST,
            "X-RapidAPI-Key": import.meta.env.VITE_APP_RAPID_API_KEY
        }
    }).then((response) => response.json())

    return response;
}