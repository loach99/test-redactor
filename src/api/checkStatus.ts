export const fetchCheckStatus = async (token:string) => {
    const response = await fetch(`https://judge029.p.rapidapi.com/submissions/${token}?base64_encoded=true&wait=false&fields=*`, { 
        method: 'GET',
        headers: {
            "X-RapidAPI-Host": import.meta.env.VITE_APP_RAPID_API_HOST,
            "X-RapidAPI-Key": import.meta.env.VITE_APP_RAPID_API_KEY
        }
    }).then((response) => response.json())

    return response;
}