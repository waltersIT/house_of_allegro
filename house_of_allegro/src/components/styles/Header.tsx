
interface Props {
  title: string;
  youtubeUrl: string;
}
function Header({ title, youtubeUrl }: Props) {
  const getYouTubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([\w-]+)/
    );

    if (!videoIdMatch) {
      console.error("Invalid YouTube URL:", url);

    return "";}

    const videoId = videoIdMatch[1];

    return videoIdMatch ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1&fs=0&disablekb=1&iv_load_policy=3&rel=0` : '';
  };
  return (
    <>
      <header>
        <div className="overlay"></div>

        <iframe
          src={getYouTubeEmbedUrl(youtubeUrl)}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        ></iframe>
        <div className="container h-100">
          <div className="d-flex h-100 text-center align-items-center">
            <div className="w-100 text-white">
              <h1 className="header-title">{title}</h1>
            </div>
          </div>
        </div>
      </header>
      
    </>
  );
}
export default Header;
