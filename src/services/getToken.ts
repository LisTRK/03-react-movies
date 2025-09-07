const getToken = ():string => {
    // const token = import.meta.env.VITE_TMDB_TOKEN as string;
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjU3MTg5ZWQ2M2FiYWY1MTI5YzA1Yjk0YTQ5NDA5ZSIsIm5iZiI6MTc0NzQwMjgyMi45MDksInN1YiI6IjY4Mjc0MDQ2ZmMyOTA4N2M0ZWExN2IxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ga1yG8JAcLLFWXpbszDhMLbsxe15e3UgcbA9V4S0Hb4";
    
    if (!token) {
        console.log("ErrorToken");
        throw new Error("VITE_TMDB_TOKEN is not defined in the environment variables.");
    }
    
    return token;
}

export default getToken;