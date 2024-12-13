interface formData {
    language_id: number;
    source_code: string;
    stdin: string;
}

export const fetchCompileCode = async (formData: formData) => {

    const response = await fetch(import.meta.env.VITE_APP_RAPID_API_URL, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "Content-Type": "application/json",
            "X-RapidAPI-Host": import.meta.env.VITE_APP_RAPID_API_HOST,
            "X-RapidAPI-Key": import.meta.env.VITE_APP_RAPID_API_KEY,
        },
        body: JSON.stringify(formData)
    }).then((response) => response.json())
    return response;
}