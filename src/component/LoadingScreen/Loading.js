import './Loading.css'
export default function Loading() {
    const loadingGif = 'https://upload.wikimedia.org/wikipedia/commons/2/29/Loader.gif'
    return(
        <div className='loading-container'>
            <div className='loading'>
                <img src={loadingGif}></img>
            </div>
        </div>
    );
}